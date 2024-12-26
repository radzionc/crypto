import { getPickParams } from '@lib/dynamodb/getPickParams'
import { totalScan } from '@lib/dynamodb/totalScan'
import { Trader } from '../entities/Trader'
import { getEnvVar } from '../getEnvVar'
import { DeleteCommand, PutCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '@lib/dynamodb/client'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { updateItem } from '@lib/dynamodb/updateItem'

const tableName = getEnvVar('TRADER_STATE_TABLE_NAME')

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
