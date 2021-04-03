import { useEffect } from 'react'
import { usePriceOytHusd } from 'state/hooks'

const useGetDocumentTitlePrice = () => {
  const oytPriceUsd = usePriceOytHusd()
  useEffect(() => {
    document.title = `OgeeYieldSwap - $${Number(oytPriceUsd).toLocaleString(undefined, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    })}`
  })
}
export default useGetDocumentTitlePrice
