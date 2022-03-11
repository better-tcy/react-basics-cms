## 介绍

**这是一个可以通过 JSON 配置就可生成页面的组件，可具有更高的开发便捷性即维护性。**

## 为什么要做这个组件？

**在大多数的 B 端项目开发中，很多表格及表单页面大致相同，而前端开发编写一个页面需要大量的功能代码及业务代码 而且如果不封装的情况下很难做到复用性(复制粘贴修改部分代码 确实可以复用 但是抛开优雅度不说，维护时会发现成本很高 每个被粘贴的文件都需要手动去改)所以配置生成页面这个组件 应运而生。**

## 这个组件有什么好处

我们先来看两张图片

[![react_cms_image1](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_image1.png?raw=true 'react_cms_image1')](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_image1.png?raw=true 'react_cms_image1')

[![react_cms_image2](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_image2.png?raw=true 'react_cms_image2')](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_image2.png?raw=true 'react_cms_image2')

1.上方图片 看起来可能不是一个特别复杂的页面，但是每一个功能点都需要不少的代码去实现

- 搜索区域每一项开发以及搜索重置
- 新建弹窗以及开发弹窗中的每一项（如：输入框 上传 下拉框等等）
- 新建数据保存
- 启用停用
- 表格中查看行信息详情
- 修改行信息数据
- 删除行数据
- 表格分页以及每页显示多少条

全部实现这些功能需要大量的代码，但是使用**Page 组件**只需要传入对应的配置就可生成这样的功能页面

2.方便维护，因为项目中很多页面使用了这个 Page 组件 如果出现 bug 或者增加页面小功能的时候 只需修改 Page 组件 那么所有基于 Page 生成的页面都可映射为最新。

**注：通用功能会慢慢集成进来 复杂功能或复杂业务的页面最好单独开发**

## 配置示例代码

```javascript
import React, { memo, useRef } from 'react'

import { Button, Tag } from 'antd'

import Page from '@/component/business-components/page/Page'

import { btnAuthority } from 'page/utils'

const OneOne = memo((props) => {
  // pageAuthorityArr来源于点击导航派发到页面对应的按钮权限数组
  const { pageAuthorityArr } = props.location.state

  const pageConfig = {
    pageRequestUrl: {
      curdUrl: '/oneOne'
      // enableUrl: '/oneOne/start', // 默认值/oneOne/start
      // disabledUrl: '/oneOne/stop' // 默认值/oneOne/stop
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
          placeholder: '请输入姓名'
        },
        {
          type: 'input',
          label: '手机号',
          field: 'phone',
          placeholder: '请输入手机号'
        }
      ]
    },
    pageTableConfig: {
      // isShowAddBtn: false, // 默认都为true
      // isShowCheckDetailsBtn: false,
      // isShowUpdateBtn: false,
      // isShowRemoveBtn: false,
      // isShowEnableDisableBtn: false,
      // isShowActionColumns: false,
      columns: [
        {
          title: '角色名称',
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
      // accordingRowIsRenderCheckBtn(record) {
      //   // 返回值必须为true && false

      // },
      // 根据行数据 是否渲染 修改按钮
      // accordingRowIsRenderUpdateBtn(record) {

      // },
      // 根据行数据 是否渲染 删除按钮
      accordingRowIsRenderRemoveBtn(record) {
        if (record.id === 1) {
          return false
        } else {
          return true
        }
      }
      // 根据行数据 是否渲染 启用停用
      // accordingRowIsRenderEDBtn(record) {

      // }
    },
    pageModalConfig: {
      // width: 500, // 弹窗宽度 默认为560
      // labelCol:{}, // 详见antd 官网
      // wrapperCol:{},// 详见antd 官网
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
          type: 'password',
          label: '密码',
          field: 'password',
          placeholder: '请输入密码',
          rules: []
        },
        {
          type: 'select',
          label: '选择水果',
          mode: '', // 设置 Select 的模式为多选或标签 可选值为 multiple | tags，不传为单选
          field: 'fruit',
          placeholder: '请选择水果',
          rules: [],
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
          ]
        },
        {
          type: 'radio',
          label: '性别',
          field: 'radioVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
          rules: [],
          options: [
            {
              id: 1,
              name: '男'
            },
            {
              id: 2,
              name: '女'
            }
          ]
        },
        {
          type: 'checkbox',
          label: '汽车',
          field: 'checkboxVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
          rules: [],
          options: [
            {
              id: 1,
              name: '红旗'
            },
            {
              id: 2,
              name: '吉利'
            }
          ]
        },
        {
          type: 'tree',
          label: '学习的编程语言',
          field: 'treeVal',
          customizeOptionsValueKey: 'id', // 默认为value
          customizeOptionsLabelKey: 'name', // 默认为label
          customizeOptionsChildrenKey: 'children', // 默认为children
          rules: [],
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
          rules: [],
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
          ]
        }
      ]
    }
  }

  if (pageConfig.pageTableConfig) {
    // 页面增加按钮权限 pageAuthorityArr来源于点击导航派发到页面对应的按钮权限数组
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
    // 表格中其他按钮的权限 可结合src\assets\data\menuData.js中数据 梳理逻辑
    if (btnAuthority(pageAuthorityArr, '其他按钮')) {
      return function (record) {
        // 如果'其他按钮'和行信息有权限关联 可拿到record判断 是否返回按钮
        return (
          <Button
            key={1}
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

  const pageBtn1 = () => {
    // Page页其他按钮的权限 如果按钮权限数组pageAuthorityArr中存在'其他按钮'则显示此按钮
    if (btnAuthority(pageAuthorityArr, '其他按钮')) {
      return function (tableSelectedRowKeys) {
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

  // 添加其他按钮
  if (pageConfig.pageTableConfig) {
    // 表格中其他按钮
    pageConfig.pageTableConfig.tableMoreButtonArr = [tableBtn1()]

    // Page页中其他按钮
    pageConfig.pageTableConfig.pageMoreButtonArr = [pageBtn1()]
  }

  const pageRef = useRef()

  return (
    <div>
      <Page onRef={pageRef} pageConfig={pageConfig}></Page>
    </div>
  )
})

export default OneOne
```

## 展示

[![react_cms_config_image1](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_config_image1.png?raw=true 'react_cms_config_image1')](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_config_image1.png?raw=true 'react_cms_config_image1')

[![react_cms_config_image2](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_config_image2.png?raw=true 'react_cms_config_image2')](https://github.com/Betteryourself-tcy/images/blob/master/show_cms_config_image2.png?raw=true 'react_cms_config_image2')

## API

### pageConfig

| 属性             | 说明         | 类型   | 是否必填 | 默认值 |
| ---------------- | ------------ | ------ | -------- | ------ |
| pageRequestUrl   | 配置请求接口 | Object | true     | ——     |
| pageTitleConfig  | 配置页面标题 | Object | true     | ——     |
| pageSearchConfig | 配置搜索区域 | Object | false    | ——     |
| pageTableConfig  | 配置表格     | Object | true     | ——     |
| pageModalConfig  | 配置弹窗     | Object | false    | ——     |

### pageRequestUrl

| 属性        | 说明                 | 类型   | 是否必填 | 默认值           |
| ----------- | -------------------- | ------ | -------- | ---------------- |
| curdUrl     | restful 风格接口地址 | String | true     | ——               |
| enableUrl   | 启用接口地址         | String | false    | curdUrl+‘/start’ |
| disabledUrl | 禁用接口地址         | String | false    | curdUrl+'/stop'  |

### pageTitleConfig

| 属性  | 说明     | 类型   | 是否必填 | 默认值 |
| ----- | -------- | ------ | -------- | ------ |
| title | 页面标题 | String | true     | ——     |

### pageSearchConfig

| 属性                  | 说明                     | 类型     | 是否必填 | 默认值 |
| --------------------- | ------------------------ | -------- | -------- | ------ |
| searchItemMarginRight | 搜索区域每一项右边距     | String   | false    | 28px   |
| searchItemArr         | 搜索区域每一项组成的数组 | Object[] | true     | ——     |

### pageTableConfig

| 属性                          | 说明                            | 类型                | 是否必填 | 默认值     |
| ----------------------------- | ------------------------------- | ------------------- | -------- | ---------- |
| isShowAddBtn                  | 是否显示添加按钮                | Boolean             | false    | true       |
| isShowCheckDetailsBtn         | 是否显示查看行数据详情按钮      | Boolean             | false    | true       |
| isShowUpdateBtn               | 是否显示修改按钮                | Boolean             | false    | true       |
| isShowRemoveBtn               | 是否显示删除按钮                | Boolean             | false    | true       |
| isShowEnableDisableBtn        | 是否显示启用禁用按钮            | Boolean             | false    | true       |
| isShowEnableDisableBtn        | 是否显示启用禁用按钮            | Boolean             | false    | true       |
| isShowActionColumns           | 是否显示操作列                  | Boolean             | false    | true       |
| columns                       | 表格列的配置描述 详见 antd 官网 | ColumnsType[]       | true     | ——         |
| accordingRowIsRenderCheckBtn  | 根据行数据 是否渲染 查看按钮    | (record) => boolean | false    | () => true |
| accordingRowIsRenderUpdateBtn | 根据行数据 是否渲染 修改按钮    | (record) => boolean | false    | () => true |
| accordingRowIsRenderRemoveBtn | 根据行数据 是否渲染 删除按钮    | (record) => boolean | false    | () => true |
| accordingRowIsRenderEDBtn     | 根据行数据 是否渲染 启用停用    | (record) => boolean | false    | () => true |

### pageModalConfig

| 属性         | 说明                                                                    | 类型     | 是否必填 | 默认值                  |
| ------------ | ----------------------------------------------------------------------- | -------- | -------- | ----------------------- |
| width        | 弹窗宽度                                                                | Number   | false    | 560                     |
| labelCol     | 表单 label 标签布局 详见 antd 官网                                      | Object   | false    | { offset: 0, span: 6 }  |
| wrapperCol   | 需要为输入控件设置布局样式时 使用该属性，用法同 labelCol 详见 antd 官网 | Object   | false    | { offset: 1, span: 10 } |
| layout       | 表单布局 可选值 horizontal vertical inline                              | String   | false    | horizontal              |
| maskClosable | 点击蒙层是否允许关闭                                                    | Boolean  | false    | true                    |
| okText       | 确认按钮文字                                                            | String   | false    | 确定                    |
| cancelText   | 取消按钮文字                                                            | String   | false    | 取消                    |
| modalItemArr | 弹窗中每一项组成的数组                                                  | Object[] | true     | ——                      |

### searchItemArr && modalItemArr -> Object

**（一个 type 对应一个属性配置表 虽会有重复属性解释 但是方便阅读）**

**通用属性**

| 属性     | 说明                                        | 类型                                                          | 是否必填 | 默认值 |
| -------- | ------------------------------------------- | ------------------------------------------------------------- | -------- | ------ |
| type     | 组件类型                                    | String                                                        | true     | ——     |
| label    | 标签名称                                    | String                                                        | true     | ——     |
| field    | 后端交互字段                                | String \| Array(rangePicker->['开始日期字段','结束日期字段']) | true     | ——     |
| disabled | 是否禁用                                    | Boolean                                                       | false    | false  |
| rules    | 校验规则，设置字段的校验逻辑 详见 antd 官网 | Rule[]                                                        | false    | ——     |

**type = input \| password**

| 属性        | 说明     | 类型   | 是否必填 | 默认值     |
| ----------- | -------- | ------ | -------- | ---------- |
| placeholder | 站位文本 | String | false    | 请输入内容 |

**type = select**

| 属性                     | 说明                                                             | 类型     | 是否必填 | 默认值     |
| ------------------------ | ---------------------------------------------------------------- | -------- | -------- | ---------- |
| mode                     | 设置 Select 的模式为多选或标签 可选值为 multiple tags 不传为单选 | String   | false    | ''         |
| placeholder              | 站位文本                                                         | String   | false    | 请选择内容 |
| customizeOptionsValueKey | 自定义 options 中 的 value 字段                                  | String   | false    | value      |
| customizeOptionsLabelKey | 自定义 options 中 的 label 字段                                  | String   | false    | label      |
| options                  | 数据源                                                           | Object[] | true     | ——         |

**type = radio \| checkbox**

| 属性                     | 说明                            | 类型     | 是否必填 | 默认值 |
| ------------------------ | ------------------------------- | -------- | -------- | ------ |
| customizeOptionsValueKey | 自定义 options 中 的 value 字段 | String   | false    | value  |
| customizeOptionsLabelKey | 自定义 options 中 的 label 字段 | String   | false    | label  |
| options                  | 数据源                          | Object[] | true     | ——     |

**type = tree**

| 属性                        | 说明                               | 类型     | 是否必填 | 默认值     |
| --------------------------- | ---------------------------------- | -------- | -------- | ---------- |
| placeholder                 | 站位文本                           | String   | false    | 请选择内容 |
| customizeOptionsValueKey    | 自定义 options 中 的 value 字段    | String   | false    | value      |
| customizeOptionsLabelKey    | 自定义 options 中 的 label 字段    | String   | false    | label      |
| customizeOptionsChildrenKey | 自定义 options 中 的 children 字段 | String   | false    | children   |
| options                     | 数据源                             | Object[] | true     | ——         |

**type = datePicker \| rangePicker**

| 属性        | 说明                          | 类型   | 是否必填 | 默认值                                                       |
| ----------- | ----------------------------- | ------ | -------- | ------------------------------------------------------------ |
| format      | 展示的日期格式 详见 antd 官网 | String | false    | 时间戳                                                       |
| showTime    | 展示的日期格式 详见 antd 官网 | String | false    | 时间戳                                                       |
| placeholder | 站位文本                      | String | false    | datePicker->请选择日期；rangePicker->['开始日期','结束日期'] |

**type = upload**

| 属性      | 说明                                                               | 类型                       | 是否必填 | 默认值  |
| --------- | ------------------------------------------------------------------ | -------------------------- | -------- | ------- |
| actionUrl | 上传的地址                                                         | String                     | true     | ——      |
| headers   | 上传的请求头                                                       | Object                     | false    | ——      |
| accept    | 接受上传的文件类型 详见 antd 官网                                  | String                     | false    | ——      |
| data      | 传所需额外参数或返回上传额外参数的方法                             | Object \| (file) => object | false    | ——      |
| listType  | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card | String                     | false    | picture |

**type = textArea**

| 属性      | 说明             | 类型   | 是否必填 | 默认值 |
| --------- | ---------------- | ------ | -------- | ------ |
| rows      | 文本域行数       | Number | false    | 2      |
| maxLength | 输入内容最大长度 | Number | false    | 100    |

**type = cascader**

| 属性                        | 说明                                                           | 类型    | 是否必填 | 默认值   |
| --------------------------- | -------------------------------------------------------------- | ------- | -------- | -------- |
| multiple                    | 是否多选                                                       | Boolean | false    | false    |
| expandTrigger               | 次级菜单的展开方式，可选 'click' 和 'hover'                    | String  | false    | click    |
| changeOnSelect              | （单选时生效）当此项为 true 时，点选每级菜单选项值都会发生变化 | Boolean | false    | false    |
| customizeOptionsValueKey    | 自定义 options 中 的 value 字段                                | String  | false    | value    |
| customizeOptionsLabelKey    | 自定义 options 中 的 label 字段                                | String  | false    | label    |
| customizeOptionsChildrenKey | 自定义 options 中 的 children 字段                             | String  | false    | children |

### 页面增加按钮权限

```javascript
if (pageConfig.pageTableConfig) {
  // 表格增加按钮权限 pageAuthorityArr来源于点击导航派发到页面对应的按钮权限数组
  pageConfig.pageTableConfig.pageAuthorityArr = pageAuthorityArr
}
```

### 添加其他按钮

```javascript
if (pageConfig.pageTableConfig) {
  // 表格中其他按钮
  pageConfig.pageTableConfig.tableMoreButtonArr = [tableBtn1()]

  // Page页中其他按钮
  pageConfig.pageTableConfig.pageMoreButtonArr = [pageBtn1()]
}
```

**页面中其他按钮**

```javascript
function pageBtn1() {
  // Page页其他按钮的权限 如果按钮权限数组pageAuthorityArr中存在'其他按钮'则显示此按钮
  if (btnAuthority(pageAuthorityArr, '其他按钮')) {
    return function (tableSelectedRowKeys) {
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
```

**表格中其他按钮**

```javascript
function tableBtn1() {
  // 表格中其他按钮的权限 可结合src\assets\data\menuData.js中数据 梳理逻辑
  if (btnAuthority(pageAuthorityArr, '其他按钮')) {
    return function (record) {
      // 如果'其他按钮'和行信息有权限关联 可拿到record判断 是否返回按钮
      return (
        <Button
          key={1}
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
```

**页面中其他按钮的回调函数**

```javascript
function pageBtn1ClickFun(tableSelectedRowKeys) {
  console.log('表格中多选选中的数据', tableSelectedRowKeys)

  // 业务逻辑

  // 更新表格数据
  pageRef.current.getTableData()
}
```

**表格中其他按钮的回调函数**

```javascript
function tableBtn1ClickFun(record) {
  console.log('行信息', record)

  // 业务逻辑

  // 更新表格数据
  pageRef.current.getTableData()
}
```

### 创建 ref 用于调用子组件方法

```javascript
const pageRef = useRef()
```

## 使用组件

```javascript
return (
  <div>
    <Page onRef={pageRef} pageConfig={pageConfig}></Page>
  </div>
)
```
