import { queryUrl } from '@lib/utils/query/queryUrl'
import { omit } from '@lib/utils/record/omit'

import { BlockData } from './core/BlockData'
import { getBlockHash } from './core/getBlockHash'
import { mineBlock } from './core/mineBlock'

const blockHash =
  '0000000000000000000266819fe415c51f9c025e1059b4c1332c1033236166f0'

interface BlockDataResponse {
  id: string
  height: number
  version: number
  timestamp: number
  tx_count: number
  size: number
  weight: number
  merkle_root: string
  previousblockhash: string
  mediantime: number
  nonce: number
  bits: number
  difficulty: number
}

const test = async () => {
  const blockDataResponse = await queryUrl<BlockDataResponse>(
    `https://blockstream.info/api/block/${blockHash}`,
  )

  const blockData: BlockData = {
    version: blockDataResponse.version,
    previousBlockHash: blockDataResponse.previousblockhash,
    merkleRoot: blockDataResponse.merkle_root,
    timestamp: blockDataResponse.timestamp,
    bits: blockDataResponse.bits,
    nonce: blockDataResponse.nonce,
  }

  const computedHash = getBlockHash(blockData)

  console.log('\nVerifying actual block:')
  console.log('Computed block hash:', computedHash)
  console.log('Actual block hash:  ', blockHash)
  console.log(
    'Hash verification:',
    computedHash === blockHash ? 'Valid ✅' : 'Invalid ❌',
  )

  console.log('\nDemonstrating mining process:')
  const miningResult = mineBlock({
    blockData: omit(blockData, 'nonce'),
    startNonce: blockData.nonce - 20, // Start from 20 nonces before the solution
  })

  console.log('Mining completed!')
  console.log('Found valid hash:', miningResult.hash)
  console.log('Nonce used:', miningResult.nonce)
}

test()
