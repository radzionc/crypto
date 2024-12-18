import { getPickParams } from '@lib/dynamodb/getPickParams'
import { totalScan } from '@lib/dynamodb/totalScan'
import { PriceAlert } from '../entities/PriceAlert'
import { getEnvVar } from '../getEnvVar'
import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { updateItem } from '@lib/dynamodb/updateItem'

const tableName = getEnvVar('PRICE_ALERTS_TABLE_NAME')

export const getPriceAlertItemParams = (id: string) => ({
  TableName: tableName,
  Key: {
    id,
  },
})

export const getAllPriceAlerts = async <T extends (keyof PriceAlert)[]>(
  attributes?: T,
) => {
  return totalScan<Pick<PriceAlert, T[number]>>({
    TableName: tableName,
    ...getPickParams(attributes),
  })
}

export const deletePriceAlert = (id: string) => {
  const command = new DeleteCommand(getPriceAlertItemParams(id))

  return dbDocClient.send(command)
}

export const deleteAllPriceAlerts = async () => {
  const alerts = await getAllPriceAlerts(['id'])

  return Promise.all(alerts.map(({ id }) => deletePriceAlert(id)))
}

export const putPriceAlert = (user: PriceAlert) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: user,
  })

  return dbDocClient.send(command)
}

export const updatePriceAlert = async (
  id: string,
  fields: Partial<PriceAlert>,
) => {
  return updateItem({
    tableName: tableName,
    key: { id },
    fields,
  })
}
