import React, { memo, useState, useRef, useImperativeHandle } from 'react'

import { PageTitle, PageSearch, PageTable } from 'page/children'

import { checkPageConfigFun } from 'page/utils'

const Page = memo((props) => {
  const { pageConfig } = props

  const successPageConfig = checkPageConfigFun(pageConfig)

  const { pageRequestUrl, pageTitleConfig, pageSearchConfig, pageTableConfig, pageModalConfig } =
    successPageConfig

  useImperativeHandle(props.onRef, () => {
    return {
      getTableDataFun: pageTableRef.current?.getTableDataFun
    }
  })

  const pageTableRef = useRef()

  const [searchData, setSearchData] = useState(pageSearchConfig?.defaultSearchData || {})

  const newPageSearchConfig = {
    ...pageSearchConfig,
    getSearchValuesFun(searchData) {
      setSearchData({ ...searchData, isSearch: true })
    },
    resetSearchValuesFun() {
      setSearchData({})
    }
  }

  if (!successPageConfig) {
    return <h2>传入配置不正确，无法生成页面，详情请查看控制台</h2>
  }

  return (
    <div>
      {pageTitleConfig && <PageTitle pageTitleConfig={pageTitleConfig}></PageTitle>}

      <div style={{ padding: '18px' }}>
        {pageSearchConfig && <PageSearch pageSearchConfig={newPageSearchConfig}></PageSearch>}

        <PageTable
          onRef={pageTableRef}
          pageRequestUrl={pageRequestUrl}
          pageTableConfig={pageTableConfig}
          pageModalConfig={pageModalConfig}
          searchData={searchData}
        ></PageTable>
      </div>
    </div>
  )
})

export default Page
