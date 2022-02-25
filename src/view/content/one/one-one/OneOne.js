import React, { memo, useRef } from 'react';

import { Button, Tag } from 'antd'

import Page from '@/component/business-components/page/Page';


import { btnAuthority } from 'page/utils'

const OneOne = memo((props) => {
  const { pageAuthorityArr } = props.location.state

  const pageConfig = {
    pageRequestUrl: {
      curdUrl: '/oneOne',
      startUrl: '/oneOne/start',
      stopUrl: '/oneOne/stop',
    },
    pageTitleConfig: {
      title: '测试page'
    },
    pageSearchConfig: {
      // searchItemMarginRight: '50px',
      searchItemArr: [
        {
          type: 'input',
          label: '姓名',
          field: 'name',
        },
        {
          type: 'select',
          label: '性别',
          field: 'gender'
        },
        {
          type: 'rangePicker',
          label: '查询日期',
          format: 'YYYY-MM-DD', // 默认为时间戳
          field: ['startDate', 'endDate']
        }
      ],
    },
    pageTableConfig: {
      // isShowAddBtn: false, // 默认都为true
      // isShowGetBtn: false,
      // isShowUpdateBtn: false,
      // isShowRemoveBtn: false,
      // isShowEnableDisableBtn: false,
      // isShowActionColumns: false,
      columns: [
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name',
          align: "center",
        },
        {
          title: '手机号',
          dataIndex: 'iphone',
          key: 'iphone',
          align: "center",
        },
        {
          title: '职务',
          dataIndex: 'jobTitle',
          key: 'jobTitle',
          align: "center",
          render: (text) => {
            if (text === 1) {
              return <Tag color="processing">管理员</Tag>
            } else if (text === 2) {
              return <Tag color="processing">测试员</Tag>
            }
          }
        },
      ],
    },
    pageModalConfig: {
      modalItemArr: [
        {
          type: 'input',
          label: '姓名',
          field: 'name',
          rules: []
        },
        {
          type: 'password',
          label: '密码',
          field: 'password',
          rules: []
        },
        {
          type: 'select',
          label: '选择水果',
          field: 'fruit',
          rules: [],
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name',  // 默认为label
          options: [
            {
              name: '苹果',
              id: 1,
            },
            {
              name: '香蕉',
              id: 2,
            }
          ]
        },
        {
          type: 'radio',
          label: '单选',
          field: 'radioVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name',  // 默认为label
          rules: [],
          options: [
            {
              id: 1,
              name: '男'
            }, {
              id: 2,
              name: '女'
            }
          ]
        },
        {
          type: 'checkbox',
          label: '多选',
          field: 'checkboxVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name',  // 默认为label
          rules: [],
          options: [
            {
              id: 1,
              name: '红旗'
            }, {
              id: 2,
              name: '吉利'
            }
          ]
        },
        {
          type: 'tree',
          label: '树形选择',
          field: 'treeVal',
          rules: [],
          halfCheckedKeys: true,
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name',  // 默认为label
          customizeOptionsChildrenKey: 'children', // 默认为children
          options: [
            {
              id: 1,
              key: 1,
              name: '编程语言',
              children: [
                {
                  id: 2,
                  key: 2,
                  name: 'JavaScript'
                }
              ]
            }
          ]
        },
        {
          type: 'datePicker',
          label: '选择日期',
          field: 'datePickerVal',
          format: '', // 默认为时间戳
          rules: [],
        },
        {
          type: 'rangePicker',
          label: '选择日期区间',
          field: ['startDate', 'endDate'],
          format: '', // 默认为时间戳
          rules: [],
          showTime: true,
        },
      ]
    }
  }

  if (pageConfig.pageTableConfig) {
    // 表格增加权限
    pageConfig.pageTableConfig.pageAuthorityArr = pageAuthorityArr
  }

  const tableBtn1ClickFun = (record) => {
    console.log('表格中其他按钮的回调函数')
    console.log('行信息', record)

    // 业务逻辑

    // 更新表格数据
    pageRef.current.getTableData()
  }

  const pageBtn1ClickFun = (tableSelectedRowKeys) => {
    console.log('表格中多选选中的数据', tableSelectedRowKeys)

    // 业务逻辑

    // 更新表格数据
    // pageRef.current.getTableData()
  }

  const tableBtn1 = () => {
    // 表格中其他按钮的权限
    if (btnAuthority(pageAuthorityArr, '其他按钮')) {
      return function (record) {
        return <Button key={1} type="text" onClick={() => { tableBtn1ClickFun(record) }}>其他按钮</Button>
      }
    }
  }

  const pageBtn1 = () => {
    if (btnAuthority(pageAuthorityArr, '其他按钮')) {
      return function (tableSelectedRowKeys) {
        return <Button key={1} type="primary" onClick={() => { pageBtn1ClickFun(tableSelectedRowKeys) }}>其他按钮</Button>
      }
    }
  }

  // 其他按钮
  if (pageConfig.pageTableConfig) {
    // 表格中其他按钮
    pageConfig.pageTableConfig.tableMoreButtonArr = [
      tableBtn1()
    ]

    // Page中其他按钮
    pageConfig.pageTableConfig.pageMoreButtonArr = [
      pageBtn1()
    ]
  }


  const pageRef = useRef()

  return (
    <div>
      <Page onRef={pageRef} pageConfig={pageConfig}></Page>
    </div>
  );
});

export default OneOne