import { Tag } from 'antd'

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
    ]
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
        rules: [],
      },
      {
        type: 'rangePicker',
        label: '选择日期区间',
        field: ['startDate', 'endDate'],
        format: '',
        rules: [],
        showTime: true,
      },
    ]
  }
}

export default pageConfig