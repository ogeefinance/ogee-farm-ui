import { useEffect } from 'react'
import { usePriceOytHusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const oytPriceUsd = usePriceOytHusd()
  useEffect(() => {
    document.title = `Ogeeswap - $${Number(oytPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })} | Best AMM Platform on Houbi Eco Chain`
  })
}
export default useGetDocumentTitlePrice
