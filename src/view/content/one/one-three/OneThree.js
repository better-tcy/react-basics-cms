import React, { memo } from 'react'

import { PageSearch } from 'page/children'

const OneThree = memo(() => {
  const pageSearchConfig = {
    // searchItemMarginRight: '50px',
    searchItemArr: [
      {
        type: 'input',
        label: '姓名',
        field: 'name',
        placeholder: '请输入姓名'
      },
      {
        type: 'input',
        label: '手机号',
        field: 'phone',
        placeholder: '请输入手机号'
      }
    ],
    getSearchDataFun(values) {
      console.log('搜索栏数据', values)
    },
    resetSearchDataFun() {
      console.log('点击重置按钮')
    }
  }

  return (
    <div>
      <PageSearch pageSearchConfig={pageSearchConfig}></PageSearch>
    </div>
  )
})

export default OneThree
