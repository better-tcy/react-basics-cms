import React, { memo } from 'react';


import Page from '@/component/business-components/page/Page';

import pageConfig from './pageConfig'

const OneOne = memo(() => {

  return (
    <div>
      <Page pageConfig={pageConfig}></Page>
    </div>
  );
});

export default OneOne