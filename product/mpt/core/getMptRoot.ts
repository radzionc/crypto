import {
  serializeTransaction,
  toBytes,
  toRlp,
  Transaction,
  keccak256,
  toHex,
} from 'viem'

type NodeType = 'branch' | 'extension' | 'leaf'

type Node = {
  type: NodeType
  value?: Uint8Array
  children?: (Node | null)[]
  key?: number[]
  next?: Node
}

export const getMptRoot = async (
  transactions: Transaction[],
): Promise<string> => {
  const trie: Node = { type: 'branch', children: Array(16).fill(null) }

  for (let i = 0; i < transactions.length; i++) {
    const indexHex = i.toString(16).padStart(2, '0')
    const indexBytes = toBytes(`0x${indexHex}`)
    const indexNibbles = Array.from(indexBytes).reduce(
      (acc: number[], byte) => {
        acc.push((byte >> 4) & 0xf, byte & 0xf)
        return acc
      },
      [],
    )

    const value = toBytes(serializeTransaction(transactions[i]))
    insertNode(trie, indexNibbles, value)
  }

  return keccak256(encodeNode(trie))
}

function insertNode(node: Node, key: number[], value: Uint8Array): void {
  if (key.length === 0) {
    node.value = value
    return
  }

  if (node.type === 'branch') {
    const nibble = key[0]
    if (!node.children![nibble]) {
      node.children![nibble] =
        key.length === 1
          ? { type: 'leaf' as NodeType, key, value }
          : {
              type: 'extension' as NodeType,
              key: key.slice(1),
              next: {
                type: 'branch' as NodeType,
                children: Array(16).fill(null),
              },
            }
    }
    insertNode(node.children![nibble]!, key.slice(1), value)
  } else if (node.type === 'extension') {
    const sharedPrefix = commonPrefix(node.key!, key)
    if (sharedPrefix.length === node.key!.length) {
      insertNode(node.next!, key.slice(sharedPrefix.length), value)
    } else {
      // Split extension into a branch
      const remainingKey = key.slice(sharedPrefix.length)
      const oldKey = node.key!.slice(sharedPrefix.length)
      const branch = {
        type: 'branch' as NodeType,
        children: Array(16).fill(null),
      }

      branch.children![oldKey[0]] = node.next
      node.type = 'extension' as NodeType
      node.key = sharedPrefix
      node.next = branch

      insertNode(branch, remainingKey, value)
    }
  } else {
    throw new Error('Invalid node type for insertion')
  }
}

function commonPrefix(a: number[], b: number[]): number[] {
  const minLength = Math.min(a.length, b.length)
  let i = 0
  while (i < minLength && a[i] === b[i]) i++
  return a.slice(0, i)
}

function encodeNode(node: Node): Uint8Array {
  if (node.type === 'branch') {
    // Normalize children to either keccak256 hash (as hex string) or an empty hex string
    const children = node.children!.map((child) =>
      child ? keccak256(encodeNode(child)) : '0x',
    )
    // Add the value as the 17th element, ensuring it's a hex string
    const encodedArray = [...children, node.value ? toHex(node.value) : '0x']
    return toBytes(toRlp(encodedArray as `0x${string}`[])) // Ensure all elements are hex strings
  }

  if (node.type === 'leaf') {
    // Encode leaf node with hex-encoded path and value
    const encodedPath = encodePath(node.key!, true)
    return toBytes(
      toRlp([toHex(encodedPath), toHex(node.value!)] as `0x${string}`[]),
    )
  }

  if (node.type === 'extension') {
    // Encode extension node with hex-encoded path and keccak256 hash of the next node
    const encodedPath = encodePath(node.key!, false)
    return toBytes(
      toRlp([
        toHex(encodedPath),
        keccak256(encodeNode(node.next!)),
      ] as `0x${string}`[]),
    )
  }

  throw new Error('Invalid node type')
}

function encodePath(path: number[], isLeaf: boolean): Uint8Array {
  const odd = path.length % 2 === 1
  const prefix = isLeaf ? 2 : 0 // Leaf = 2, Extension = 0
  const padded = odd ? [prefix + 1, ...path] : [prefix, ...path]
  return toBytes(`0x${padded.map((n) => n.toString(16)).join('')}`)
}
