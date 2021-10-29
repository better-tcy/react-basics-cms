import React, { memo, useEffect } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getCommonDataOneM } from '@/store/middleware/business'

import MyUi from 'react-component-storehouse';
// import { Form } from 'antd'

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

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'key',
      render: ['删除', '修改', '查看详情']
    }
  ]

  const tableConfig = {
    pageSizeOptions: [10, 15, 20, 25], // 默认为[5, 10, 15, 20]
    total: 2,
    tableHeight: 800, // 表格高度 默认为 660
    getPaginationData(current, pageSize) { // pageSum或者pageSize发生改变 回调函数
      console.log(current, pageSize)
    },
    getSelectedRows(selectedRows) { // 多选选中的数据
      console.log(selectedRows)
    },
    getRowData(rowData) { // 点击操作按钮 获取操作行数据
      console.log(rowData)
    }
  }

  const formConfig = {
    formLayout: '', // 表单布局 可选 horizontal(默认) vertical inline
    labelColSpan: 2, // label占栅格比例 默认为 2
    wrapperColSpan: 6, // formItem占栅格比例 默认为 6
    // 按钮配置
    btnConfig: {
      btnOffset: 2, // 按钮左侧的栅格格数 默认为 2
      btnMargin: '10px',
      btnText: '搜索', // 按钮文字 默认为完成
    },
    formArr: [
      {
        type: 'input',
        label: '姓名',
        field: 'name',
        placeholder: '请输入姓名',
        rules: []
      },
      {
        type: 'password',
        label: '密码',
        field: 'password',
        placeholder: '请输入密码',
        rules: []
      },
      {
        type: 'textArea',
        label: '备注',
        field: 'textAreaVal',
        placeholder: '请输入备注',
        rules: [],
        row: 3 // textArea行数 默认为 2
      },
      {
        type: 'select',
        label: '选择',
        field: 'selectVal',
        placeholder: '请选择',
        options: [
          {
            label: '苹果',
            value: 1
          },
          {
            label: '香蕉',
            value: 2
          }
        ]
      },
      // 日期选择器
      {
        type: 'datePicker',
        label: '选择日期',
        field: 'datePickerVal',
        rules: [],
        // 以下三个配置必须相对应
        format: 'YYYY-MM-DD',// 设置日期格式 默认为YYYY-MM-DD
        picker: '', // 默认为日选择器 可选值为 week month year
        showTime: false // 是否显示时分秒 
      },
      // 范围选择器
      {
        type: 'rangePicker',
        label: '选择范围日期',
        field: 'rangePickerVal',
        rules: [],
        // 以下三个配置必须相对应
        format: 'YYYY-MM-DD',// 设置日期格式 默认为YYYY-MM-DD
        picker: '', // 默认为日选择器 可选值为 week month year
        showTime: false // 是否显示时分秒
      },
      {
        type: 'radio',
        label: '单选',
        field: 'radioVal',
        options: [
          {
            label: '男孩',
            value: 1
          },
          {
            label: '女孩',
            value: 2
          }
        ]
      },
      {
        type: 'checkbox',
        label: '多选',
        field: 'checkboxVal',
        options: [
          {
            label: '红旗',
            value: 1
          },
          {
            label: '吉利',
            value: 2
          },
          {
            label: '长安',
            value: 3
          }
        ]
      }
    ],
    getFormData(formData) {
      console.log(formData)
    },
    // 使用的功能 组件中未集成 可使用formItemRenders  --Beta
    // formItemRenders: [
    //   () => {
    //     return (
    //       <Form.Item
    //         label='上传'
    //         name='uploadVal'
    //         rules={[]}
    //       >
    //         上传组件
    //       </Form.Item >
    //     )
    //   }
    // ],
    // 表单中其他按钮
    btnRenders: [
      () => {
        return (
          <button>其他按钮</button>
        )
      }
    ]
  }

  // 表单默认数据
  const formInitialValues = {
    name: '哈哈哈',
    password: '123456',
    textAreaVal: '测试',
    selectVal: 1,
    datePickerVal: '2021-08-08',
    rangePickerVal: ['2021-08-08', '2021-12-08'],
    radioVal: 1,
    checkboxVal: [1, 2, 3]
  }

  return (
    <div>
      <div> {commonDataOneR} </div>

      <MyUi.MyTable tableConfig={tableConfig} columns={columns} dataSource={dataSource}></MyUi.MyTable>
      <MyUi.MyForm formConfig={formConfig} formInitialValues={formInitialValues}></MyUi.MyForm>
    </div>
  );
});

export default Home;