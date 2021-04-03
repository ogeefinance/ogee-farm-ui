import pools from 'config/constants/pools'

describe('Config pools', () => {
  it.each(pools.map((pool) => pool.ogeeId))('Pool #%d has an unique ogeeId', (ogeeId) => {
    const duplicates = pools.filter((p) => ogeeId === p.ogeeId)
    expect(duplicates).toHaveLength(1)
  })
  it.each(pools.map((pool) => [pool.ogeeId, pool.contractAddress]))(
    'Pool #%d has an unique contract address',
    (ogeeId, contractAddress) => {
      const duplicates = pools.filter((p) => contractAddress[56] === p.contractAddress[56])
      expect(duplicates).toHaveLength(1)
    },
  )
})
