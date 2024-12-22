import { Address, Chain, createPublicClient, http, parseAbi } from 'viem'
import { readContract } from 'viem/_types/actions/public/readContract'

type Input = {
  chain: Chain
  address: Address
}

export const getErc20Balance = async ({ chain, address }: Input) => {
  const erc20Abi = parseAbi([
    'function balanceOf(address owner) view returns (uint256)',
  ])

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })

  return readContract(publicClient, {
    address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
  })
}
