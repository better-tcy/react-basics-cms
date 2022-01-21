import React, { memo, useEffect } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom'

import { Button } from 'antd';

import { getCommonDataOneM } from '@/store/middleware/business'

const Home = memo(() => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { commonDataOne } = useSelector((state) => {
    return {
      commonDataOne: state.get('business').get('commonDataOneR')
    }
  }, shallowEqual)

  useEffect(() => {
    dispatch(getCommonDataOneM)
  }, [dispatch])


  return (
    <div>
      {commonDataOne}
      <Button onClick={() => { history.push('/content/home/test') }}>点我一下</Button>
    </div>
  );
});

export default Home;