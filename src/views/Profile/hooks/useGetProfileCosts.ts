import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberOytToReactivate: new BigNumber(0),
    numberOytToRegister: new BigNumber(0),
    numberOytToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberOytToReactivate, numberOytToRegister, numberOytToUpdate] = await makeBatchRequest([
          profileContract.methods.numberOytToReactivate().call,
          profileContract.methods.numberOytToRegister().call,
          profileContract.methods.numberOytToUpdate().call,
        ])

        setCosts({
          numberOytToReactivate: new BigNumber(numberOytToReactivate as string),
          numberOytToRegister: new BigNumber(numberOytToRegister as string),
          numberOytToUpdate: new BigNumber(numberOytToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve OYT costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
