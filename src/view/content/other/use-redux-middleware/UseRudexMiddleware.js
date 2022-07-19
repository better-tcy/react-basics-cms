import React, { memo, useEffect } from 'react'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { Button } from 'antd'

import { getCommonDataOneM } from '@/store/middleware/business'

const UseRudexMiddleware = memo(() => {
  const { commonDataOne } = useSelector((state) => {
    return {
      commonDataOne: state.get('business').get('commonDataOneR')
    }
  }, shallowEqual)

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCommonDataOneM)
  }, [dispatch])

  return (
    <div>
      <h2>{commonDataOne}</h2>
      <Button
        onClick={() => {
          history.push('/content/other/use-redux-middleware/children/Test')
        }}
      >
        点我一下
      </Button>
    </div>
  )
})

export default UseRudexMiddleware
