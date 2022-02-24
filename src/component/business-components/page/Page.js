import React, { memo, useState } from 'react';

import { PageTitle, PageSearch, PageTable } from 'page/children';

import { checkPageConfig } from 'page/utils'

const Page = memo((props) => {

  const { pageConfig } = props

  const newPageConfig = checkPageConfig(pageConfig)

  const {
    pageRequestUrl,
    pageTitleConfig,
    pageSearchConfig,
    pageTableConfig,
    pageModalConfig
  } = newPageConfig

  const [searchData, setSearchData] = useState({})

  const newPageSearchConfig = {
    ...pageSearchConfig,
    getSearchValues(searchData) {
      setSearchData(searchData)
    },
    resetSearchValues() {
      setSearchData({})
    },

  }

  if (!newPageConfig) {
    return (
      <h2>传入配置不正确，无法生成页面，详情请查看控制台</h2>
    )
  }

  return (
    <div>
      <PageTitle pageTitleConfig={pageTitleConfig}></PageTitle>

      <div style={{ padding: '18px' }}>
        {
          pageSearchConfig && <PageSearch pageSearchConfig={newPageSearchConfig}></PageSearch>
        }

        <PageTable pageRequestUrl={pageRequestUrl} searchData={searchData} pageTableConfig={pageTableConfig} pageModalConfig={pageModalConfig}></PageTable>
      </div>

    </div>
  );
});

export default Page;