import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

const createEvmAccount = () => {
  const privateKey = generatePrivateKey()

  const { address } = privateKeyToAccount(privateKey)

  console.log('EVM Account Created:')
  console.log('Address:', address)
  console.log('Private Key:', privateKey)
}

createEvmAccount()
