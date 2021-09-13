import { useApolloClient } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'

import { query, queryAccessor, queryOptions } from './query'

const CYCLE = process.env.NEXT_PUBLIC_UPDATE_INTERVAL

const getRandomNumber = () => Math.floor(Math.random() * 1000)

const generateRandomAnimals = () => ({
  apples: getRandomNumber(),
  oranges: getRandomNumber(),
  bananas: getRandomNumber(),
  silkworms: getRandomNumber(),
  marzapan: getRandomNumber(),
})

const getTrieStats = trie => {
  let maxDepth = 0
  let numValues = 0
  let numWeakTries = 0
  let numStrongTries = 0

  function getStats(trie, depth = 1) {
    if (depth > maxDepth) maxDepth = depth

    const weakChildren = Array.from(trie.weak?.values() ?? [])
    const strongChildren = Array.from(trie.strong?.values() ?? [])

    if (trie.weak) numWeakTries += weakChildren.length
    if (trie.strong) numStrongTries += strongChildren.length
    if (trie.data) numValues++

    weakChildren.forEach(c => getStats(c, depth + 1))
    strongChildren.forEach(c => getStats(c, depth + 1))
  }

  getStats(trie)

  return {
    depth: maxDepth,
    numValues,
    numWeakTries,
    numStrongTries,
  }
}

export const useDirectMutation = () => {
  const client = useApolloClient()
  const gqlCache = client.cache
  const [stats, setStats] = useState(() => ({ trieStats: {} }))
  const timeoutID = useRef()

  function tick() {
    const t0 = Date.now()

    const currentData = gqlCache.readQuery({
      query,
      ...queryOptions,
    })?.[queryAccessor]

    if (!currentData) {
      timeoutID.current = setTimeout(tick, CYCLE)
      return
    }

    const nextDataT0 = Date.now()
    const readCurrentWorking = nextDataT0 - t0

    const nextData = currentData.map(record => {
      const animals = generateRandomAnimals()

      return {
        ...record,
        ...animals,
      }
    })

    const writeQueryT0 = Date.now()
    const nextDataWorking = writeQueryT0 - nextDataT0

    gqlCache.writeQuery({
      query,
      data: {
        [queryAccessor]: nextData,
      },
      ...queryOptions,
    })

    const scanTriesT0 = Date.now()
    const writeQueryWorking = scanTriesT0 - writeQueryT0

    const trieStats = getTrieStats(gqlCache.data.storageTrie)

    const scanTriesWorking = Date.now() - scanTriesT0

    const working = Date.now() - t0
    const timeout = CYCLE - working
    timeoutID.current = setTimeout(tick, timeout > 0 ? timeout : 0)
    setStats({
      nextDataWorking,
      readCurrentWorking,
      scanTriesWorking,
      working,
      writeQueryWorking,
      trieStats,
    })
  }

  useEffect(() => {
    tick()
    return () => {
      if (timeoutID.current) clearTimeout(timeoutID.current)
    }
  }, [])

  return stats
}
