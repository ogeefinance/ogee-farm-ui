import { useEffect } from 'react'
import { usePriceOytHusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const oytPriceUsd = usePriceOytHusd()
  useEffect(() => {
    document.title = `Ogeeswap | Best AMM Platform on Houbi Eco Chain - $${Number(oytPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
  })
}
export default useGetDocumentTitlePrice
