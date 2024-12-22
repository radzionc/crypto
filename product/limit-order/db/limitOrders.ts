import { getPickParams } from '@lib/dynamodb/getPickParams'
import { totalScan } from '@lib/dynamodb/totalScan'
import { LimitOrder } from '../entities/LimitOrder'
import { getEnvVar } from '../getEnvVar'
import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { updateItem } from '@lib/dynamodb/updateItem'

const tableName = getEnvVar('LIMIT_ORDERS_TABLE_NAME')

export const getLimitOrderItemParams = (id: string) => ({
  TableName: tableName,
  Key: {
    id,
  },
})

export const getAllLimitOrders = async <T extends (keyof LimitOrder)[]>(
  attributes?: T,
) => {
  return totalScan<Pick<LimitOrder, T[number]>>({
    TableName: tableName,
    ...getPickParams(attributes),
  })
}

export const deleteLimitOrder = (id: string) => {
  const command = new DeleteCommand(getLimitOrderItemParams(id))

  return dbDocClient.send(command)
}

export const deleteAllLimitOrders = async () => {
  const alerts = await getAllLimitOrders(['id'])

  return Promise.all(alerts.map(({ id }) => deleteLimitOrder(id)))
}

export const putLimitOrder = (user: LimitOrder) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: user,
  })

  return dbDocClient.send(command)
}

export const updateLimitOrder = async (
  id: string,
  fields: Partial<LimitOrder>,
) => {
  return updateItem({
    tableName: tableName,
    key: { id },
    fields,
  })
}
