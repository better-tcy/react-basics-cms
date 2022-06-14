import React, { memo, useRef } from 'react'

import { Button, Tag } from 'antd'

import Page from '@/component/business-components/page/Page'

import { btnAuthorityFun } from 'page/utils'

const OneOne = memo((props) => {
  // pageAuthorityArr来源于点击导航派发到页面对应的按钮权限数组
  const { pageAuthorityArr } = props.location.state

  const pageRef = useRef()

  const pageConfig = {
    pageRequestUrl: {
      curdUrl: '/oneOne/',
      getMoreParams: {
        type: 1
      },
      postMoreParams: {
        type: 1
      },
      putMoreParams: {
        type: 1
      }
      // enableUrl: '/oneOne/start', // 默认值/oneOne/start
      // disabledUrl: '/oneOne/stop' // 默认值/oneOne/stop
    },
    pageTitleConfig: {
      title: '配置生成页面'
    },
    pageSearchConfig: {
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
      connectedSelectArr: [
        {
          label: '选择编程语言',
          field: 'programmingLanguage',
          placeholder: '请选择语言',
          customizeOptionsValueKey: 'id',
          customizeOptionsLabelKey: 'name',
          url: '/firstSelectData/',
          // requestKey: 'programmingLanguage',
          // requestValue: 10,
          rules: []
        },
        {
          label: '选择一门框架',
          field: 'frame',
          placeholder: '请选择框架',
          customizeOptionsValueKey: 'id',
          customizeOptionsLabelKey: 'name',
          url: '/secondSelectData/',
          requestKey: 'frame',
          rules: []
        },
        {
          label: '选择框架书籍',
          field: 'book',
          placeholder: '请选择书籍',
          customizeOptionsValueKey: 'id',
          customizeOptionsLabelKey: 'name',
          url: '/thirdSelectData/',
          requestKey: 'book',
          rules: []
        }
      ],
      defaultData: {
        name: '哈哈哈'
      }
    },
    pageTableConfig: {
      // isShowAddBtn: false, // 默认都为true
      // isShowCheckDetailsBtn: false,
      // isShowUpdateBtn: false,
      // isShowRemoveBtn: false,
      // isShowEnableDisableBtn: false,
      // isShowActionColumns: false,
      // actionColumnsWidth: 500, // 操作列的宽度 默认为500 如果表格列数较多，请给每个列添加宽度（columns中的每一项增加width属性）这样表格会增加横向滚动条，操作列悬浮固定在右侧
      columns: [
        {
          title: '用户名称',
          dataIndex: 'name',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机号',
          dataIndex: 'iphone',
          key: 'iphone',
          align: 'center'
        },
        {
          title: '职务',
          dataIndex: 'jobTitle',
          key: 'jobTitle',
          align: 'center',
          render: (text) => {
            if (text === 1) {
              return <Tag color="processing">管理员</Tag>
            } else if (text === 2) {
              return <Tag color="processing">测试员</Tag>
            }
          }
        }
      ],
      // 如果按钮权限不具体到表格行信息的时候 下面函数可不传 默认按钮都显示
      // 根据行数据 是否渲染 查看按钮
      // accordingRowIsRenderCheckBtnFun(record) {
      //   // 返回值必须为true && false

      // },
      // 根据行数据 是否渲染 修改按钮
      // accordingRowIsRenderUpdateBtnFun(record) {

      // },
      // 根据行数据 是否渲染 删除按钮
      accordingRowIsRenderRemoveBtnFun(record) {
        if (record.id === 1) {
          return false
        } else {
          return true
        }
      }
      // 根据行数据 是否渲染 启用停用
      // accordingRowIsRenderEDBtnFun(record) {

      // }
    },
    pageModalConfig: {
      // width: 500, // 弹窗宽度 默认为560
      // labelCol:{}, // 弹窗中表单label标签布局 详见antd官网 默认值 { offset: 0, span: 6 }
      // wrapperCol:{},// 弹窗表单中需要为输入控件设置布局样式时 使用该属性，用法同 labelCol 详见antd官网 默认值 { offset: 1, span: 12 }
      // layout:'' // 表单布局 可选值 horizontal | vertical | inline, 默认值为horizontal
      // maskClosable: false, // 点击蒙层是否允许关闭 默认为true
      // okText:'完成' // 确认按钮文字 默认为确定
      // cancelText:'关闭' // 取消按钮文字 默认为取消
      modalItemArr: [
        {
          type: 'input',
          label: '姓名',
          field: 'name',
          placeholder: '请输入姓名',
          // disabled: true, // 是否禁用 默认为false
          rules: [{ required: true, message: '请输入姓名' }]
        },
        {
          type: 'input',
          label: '手机号',
          field: 'phone',
          placeholder: '请输入手机号',
          isNumber: true, // 是否是数字输入框 默认为false
          rules: [{ required: true, message: '请输入手机号' }]
        },
        {
          type: 'password',
          label: '密码',
          field: 'password',
          placeholder: '请输入密码',
          isNumber: true, // 是否是数字输入框 默认为false
          rules: []
        },
        {
          type: 'select',
          label: '选择水果',
          field: 'fruit',
          placeholder: '请选择水果',
          mode: '', // 设置 Select 的模式为多选或标签 可选值为 multiple | tags，不传为单选
          customizeOptionsValueKey: 'id', // 自定义options中value字段  默认为value
          customizeOptionsLabelKey: 'name', // 自定义options中label字段 默认为label
          options: [
            {
              name: '苹果',
              id: 1
            },
            {
              name: '香蕉',
              id: 2
            }
          ],
          rules: []
        },
        {
          type: 'radio',
          label: '性别',
          field: 'radioVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
          options: [
            {
              id: 1,
              name: '男'
            },
            {
              id: 2,
              name: '女'
            }
          ],
          rules: []
        },
        {
          type: 'checkbox',
          label: '汽车',
          field: 'checkboxVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
          options: [
            {
              id: 1,
              name: '红旗'
            },
            {
              id: 2,
              name: '吉利'
            }
          ],
          rules: []
        },
        {
          type: 'tree',
          label: '学习的编程语言',
          field: 'treeVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
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
          ],
          rules: []
        },
        {
          type: 'datePicker',
          label: '选择日期',
          field: 'datePickerVal',
          format: '', // 默认为时间戳
          rules: []
        },
        {
          type: 'rangePicker',
          label: '选择日期区间',
          field: ['startDate', 'endDate'],
          format: '', // 默认为时间戳
          showTime: true,
          rules: []
        },
        {
          type: 'upload',
          label: '上传',
          field: 'uploadVal',
          actionUrl: 'http://localhost:3001/upload', // 上传的地址
          headers: {},
          accept: '', // 接受上传的文件类型, 详见 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
          data: {}, // 上传所需额外参数或返回上传额外参数的方法
          listType: '', //	上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
          rules: []
        },
        {
          type: 'textArea',
          label: '文本域',
          field: 'textAreaVal',
          placeholder: '请输入内容',
          rows: 3, // 文本域行数 默认为2
          maxLength: 10, // 输入内容最大长度 默认为100
          rules: []
        },
        {
          type: 'cascader',
          label: '级联选择',
          field: 'cascaderVal',
          placeholder: '请选择数据',
          multiple: false, // 是否多选 默认为false
          expandTrigger: 'hover', // 次级菜单的展开方式，可选 'click' 和 'hover' 默认为click
          changeOnSelect: true, //（单选时生效）当此项为 true时，点选每级菜单选项值都会发生变化 默认为false
          // customizeOptionsValueKey: 'id', // 默认为value
          // customizeOptionsLabelKey: 'name', // 默认为label
          // customizeOptionsChildrenKey:'child' // 默认为children
          options: [
            {
              label: '前端',
              value: 1,
              children: [
                {
                  label: 'Vue',
                  value: 2
                },
                {
                  label: 'React',
                  value: 3
                }
              ]
            },
            {
              label: '后端',
              value: 7,
              children: [
                {
                  label: 'Java',
                  value: 8
                },
                {
                  label: 'Golang',
                  value: 9
                },
                {
                  label: 'Python',
                  value: 10
                }
              ]
            }
          ],
          rules: []
        }
      ]
    }
  }

  if (pageConfig.pageTableConfig) {
    // 页面 && 表格按钮权限 pageAuthorityArr来源于点击导航派发到页面对应的按钮权限数组
    pageConfig.pageTableConfig.pageAuthorityArr = pageAuthorityArr
  }

  const pageBtn1ClickFun = (tableSelectedRowKeys) => {
    console.log('表格中多选选中的数据', tableSelectedRowKeys)

    // 业务逻辑

    // 更新表格数据
    // pageRef.current.getTableDataFun()
  }

  const tableBtn1ClickFun = (record) => {
    console.log('表格中其他按钮的回调函数')
    console.log('行信息', record)

    // 业务逻辑

    // 更新表格数据
    pageRef.current.getTableDataFun()
  }

  const renderPageBtn1Fun = () => {
    // Page页其他按钮的权限 如果按钮权限数组pageAuthorityArr中存在'其他按钮'则显示此按钮
    if (btnAuthorityFun(pageAuthorityArr, '其他按钮')) {
      return function (tableSelectedRowKeys) {
        // 返回的按钮 必须添加key属性
        return (
          <Button
            key={1}
            type="primary"
            onClick={() => {
              pageBtn1ClickFun(tableSelectedRowKeys)
            }}
          >
            其他按钮
          </Button>
        )
      }
    }
  }

  const renderTableBtn1Fun = () => {
    // 表格中其他按钮的权限 可结合src\assets\data\menuData.js中数据 梳理逻辑
    if (btnAuthorityFun(pageAuthorityArr, '其他按钮')) {
      return function (record) {
        // 如果'其他按钮'和行信息有权限关联 可拿到record判断 是否返回按钮
        // 返回的按钮 必须添加key属性 table中的其他按钮最好使用字符串作为key值 避免和组件内部按钮key冲突
        return (
          <Button
            key={'a'}
            type="text"
            style={{ color: 'rgb(250, 152, 35)' }}
            onClick={() => {
              tableBtn1ClickFun(record)
            }}
          >
            其他按钮
          </Button>
        )
      }
    }
  }

  // 添加其他按钮
  if (pageConfig.pageTableConfig) {
    // Page页中其他按钮
    pageConfig.pageTableConfig.pageMoreButtonArr = [renderPageBtn1Fun()]

    // 表格中其他按钮
    pageConfig.pageTableConfig.tableMoreButtonArr = [renderTableBtn1Fun()]
  }

  return (
    <div>
      <Page onRef={pageRef} pageConfig={pageConfig}></Page>
    </div>
  )
})

export default OneOne
