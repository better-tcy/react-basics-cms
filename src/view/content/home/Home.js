import React, { memo, useEffect } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { getCommonDataOneM } from '@/store/middleware/business'

const Home = memo(() => {

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
    </div>
  );
});

export default Home;