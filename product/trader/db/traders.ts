import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { totalScan } from '@lib/dynamodb/totalScan'
import { updateItem } from '@lib/dynamodb/updateItem'

import { Trader } from '../entities/Trader'
import { getEnvVar } from '../getEnvVar'

const tableName = getEnvVar('TRADERS_TABLE_NAME')

export const getTraderItemParams = (id: string) => ({
  TableName: tableName,
  Key: {
    id,
  },
})

export const getAllTraders = async <T extends (keyof Trader)[]>(
  attributes?: T,
) => {
  return totalScan<Pick<Trader, T[number]>>({
    TableName: tableName,
    ...getPickParams(attributes),
  })
}

export const getTrader = makeGetItem<string, Trader>({
  tableName,
  getKey: (id: string) => ({ id }),
})

export const deleteTrader = (id: string) => {
  const command = new DeleteCommand(getTraderItemParams(id))

  return dbDocClient.send(command)
}

export const deleteAllTraders = async () => {
  const alerts = await getAllTraders(['id'])

  return Promise.all(alerts.map(({ id }) => deleteTrader(id)))
}

export const putTrader = (item: Trader) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: item,
  })

  return dbDocClient.send(command)
}

export const updateTrader = async (id: string, fields: Partial<Trader>) => {
  return updateItem({
    tableName,
    key: { id },
    fields,
  })
}
