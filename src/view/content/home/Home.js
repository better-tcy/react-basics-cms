import React, { memo, useEffect } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getCommonDataOneM } from '@/store/middleware/business'


const Home = memo(() => {
  console.log('执行组件')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('挂载完成')
    dispatch(getCommonDataOneM)
  }, [dispatch])

  const { commonDataOneR } = useSelector((state) => {
    console.log('执行useSelector')
    return {
      commonDataOneR: state.get('business').get('commonDataOneR')
    }
  }, shallowEqual)


  return (
    <div>
      {console.log('编译jsx')}
      <div> {commonDataOneR} </div>
    </div>
  );
});

export default Home;