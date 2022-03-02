import React, { memo } from 'react'

const Test = memo(() => {
  return <h2>有token后就可以访问的页面 （和导航权限无关的页面）</h2>
})

export default Test
