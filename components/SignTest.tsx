import { useEffect } from 'react'
import { fromTheTop } from '../lib/demo'

export const SignTest = () => {
  useEffect(() => {
    console.log('fromTheTop')
    fromTheTop()
  }, [])
  return <></>
}
