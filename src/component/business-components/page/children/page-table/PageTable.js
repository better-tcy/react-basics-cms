import React, { memo, useEffect, useCallback, useState, useRef, useImperativeHandle } from 'react'

import { Button, Table, Space, Switch, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import _ from 'lodash'

import {
  getTableDataH,
  removeTableDataH,
  startTableDataH,
  stopTableDataH
} from '@/request/api/content/common/page'

import { btnAuthorityFun } from 'page/utils'

import { PageModal } from 'page/children'

import pageTableCss from './pageTable.module.css'
import './pageTableResetAntd.css'

const { confirm } = Modal

const PageTable = memo((props) => {
  const { pageRequestUrl, pageTableConfig, searchData, pageModalConfig } = props
  const { curdUrl, getMoreParams, postMoreParams, putMoreParams, enableUrl, disabledUrl } =
    pageRequestUrl
  const {
    columns,
    pageAuthorityArr,
    tableMoreButtonArr = [],
    pageMoreButtonArr = [],
    isShowAddBtn = true,
    isShowCheckDetailsBtn = true,
    isShowUpdateBtn = true,
    isShowRemoveBtn = true,
    isShowEnableDisableBtn = true,
    isShowActionColumns = true,
    actionColumnsWidth = 500,
    accordingRowIsRenderCheckBtnFun = () => true,
    accordingRowIsRenderUpdateBtnFun = () => true,
    accordingRowIsRenderRemoveBtnFun = () => true,
    accordingRowIsRenderEDBtnFun = () => true
  } = pageTableConfig

  const cloneDeepPageModalConfig = useRef({})

  // 为防止再次render的时候 重置cloneDeepPageModalConfig的值
  if (cloneDeepPageModalConfig.current.modalTitle) {
    cloneDeepPageModalConfig.current = _.cloneDeep(pageModalConfig)
  }

  if (cloneDeepPageModalConfig.current) {
    cloneDeepPageModalConfig.current.saveUrl = curdUrl
    cloneDeepPageModalConfig.current.postMoreParams = postMoreParams
    cloneDeepPageModalConfig.current.putMoreParams = putMoreParams
  }

  useImperativeHandle(props.onRef, () => {
    return {
      getTableDataFun
    }
  })

  const pageNum = useRef(1)
  const pageSize = useRef(10)

  const [tableData, setTableData] = useState({})

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)

  const tableBtnArr = [
    renderCheckRowDetailsBtnFun(),

    renderUpdateRowDataBtnFun(),

    renderRemoveRowDataBtnFun(),

    ...tableMoreButtonArr,

    renderEnableDisableBtnFun()
  ]

  const newColumns = [
    ...columns,
    isShowActionColumns
      ? {
        title: '操作',
        key: 'action',
        align: 'center',
        fixed: 'right',
        width: actionColumnsWidth,
        render: (_, record) => (
          <Space size="middle">
            {tableBtnArr.map((itemFun) => {
              if (itemFun instanceof Function) {
                return itemFun(record) || <div key={record.id} style={{ width: '66px' }}></div>
              } else {
                return <div key={record.id} style={{ width: '66px' }}></div>
              }
            })}
          </Space>
        )
      }
      : {}
  ]

  const paginationConfig = {
    pageSizeOptions: [5, 10, 15, 20],
    responsive: true,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: () => `共` + tableData.total + `条`,
    pageSize: pageSize.current,
    current: pageNum.current,
    total: tableData.total,
    onChange: (current, pagesize) => {
      pageNum.current = current
      pageSize.current = pagesize
      getTableDataFun()
    }
  }

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  function renderCheckRowDetailsBtnFun() {
    if (isShowCheckDetailsBtn && btnAuthorityFun(pageAuthorityArr, '查看')) {
      return function (record) {
        if (accordingRowIsRenderCheckBtnFun(record)) {
          return (
            <Button
              key={1}
              type="text"
              style={{ color: '#1890FF' }}
              onClick={() => {
                showModalFun('查看', record.id)
              }}
            >
              查看
            </Button>
          )
        }
      }
    }
  }

  function renderUpdateRowDataBtnFun() {
    if (isShowUpdateBtn && btnAuthorityFun(pageAuthorityArr, '修改')) {
      return function (record) {
        if (accordingRowIsRenderUpdateBtnFun(record)) {
          return (
            <Button
              key={2}
              type="text"
              style={{ color: '#48ED4B' }}
              onClick={() => {
                showModalFun('修改', record.id)
              }}
            >
              修改
            </Button>
          )
        }
      }
    }
  }

  function renderRemoveRowDataBtnFun() {
    if (isShowRemoveBtn && btnAuthorityFun(pageAuthorityArr, '删除')) {
      return function (record) {
        if (accordingRowIsRenderRemoveBtnFun(record)) {
          return (
            <Button
              key={3}
              type="text"
              style={{ color: '#EB3030' }}
              onClick={() => {
                removeTableDataFun(record.id)
              }}
            >
              删除
            </Button>
          )
        }
      }
    }
  }

  function renderEnableDisableBtnFun() {
    if (isShowEnableDisableBtn && btnAuthorityFun(pageAuthorityArr, '启用停用')) {
      return function (record) {
        if (accordingRowIsRenderEDBtnFun(record)) {
          return (
            <Switch
              key={4}
              checkedChildren="启用"
              unCheckedChildren="禁用"
              checked={record.status === 1}
              onClick={(checked) => {
                enableOrDisableFun(checked, [record.id])
              }}
            />
          )
        }
      }
    }
  }

  const commonConfirmFun = (title, callBackFun) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        callBackFun && callBackFun()
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const getTableDataFun = useCallback(() => {
    let cloneDeepSearchData = _.cloneDeep(searchData)
    cloneDeepSearchData.pageNum = pageNum.current
    cloneDeepSearchData.pageSize = pageSize.current
    cloneDeepSearchData = Object.assign(cloneDeepSearchData, getMoreParams)

    getTableDataH(curdUrl, cloneDeepSearchData).then((res) => {
      setTableData(res.data)
    })
  }, [curdUrl, searchData, getMoreParams])

  const showModalFun = (title, rowId) => {
    if (!cloneDeepPageModalConfig.current) {
      console.warn('如果想使用弹窗功能，请传入pageModalConfig这项配置')
      return
    }
    cloneDeepPageModalConfig.current.modalTitle = title
    rowId
      ? (cloneDeepPageModalConfig.current.itemId = rowId)
      : (cloneDeepPageModalConfig.current.itemId = '')
    setIsModalVisible(true)
  }

  const closeModalFun = (_, isRequestTableData) => {
    if (isRequestTableData) {
      getTableDataFun()
    }
    setIsModalVisible(false)
  }

  const removeTableDataFun = (id) => {
    function callBackFun() {
      removeTableDataH(curdUrl, { id }).then(() => {
        message.success('删除成功')
        getTableDataFun()
      })
    }

    commonConfirmFun('请确认是否删除？', callBackFun)
  }

  const enableRowsFun = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条数据')
      return
    }
    enableOrDisableFun(true, selectedRowKeys)
  }

  const disableRowsFun = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条数据')
      return
    }

    enableOrDisableFun(false, selectedRowKeys)
  }

  // 启用或禁用
  const enableOrDisableFun = (isEnable, rowIdArr) => {
    if (isEnable) {
      // 启用
      function callBackFun() {
        startTableDataH(enableUrl || `${curdUrl}start/`, { ids: rowIdArr }).then((res) => {
          message.success('已启用')
          getTableDataFun()
        })
      }

      commonConfirmFun('是否启用数据？', callBackFun)
    } else {
      // 禁用
      function callBackFun() {
        stopTableDataH(disabledUrl || `${curdUrl}stop/`, { ids: rowIdArr }).then((res) => {
          message.warning('已禁用')
          getTableDataFun()
        })
      }

      commonConfirmFun('是否禁用数据？', callBackFun)
    }
  }

  useEffect(() => {
    getTableDataFun()
  }, [getTableDataFun])

  return (
    <div className={`${pageTableCss.page_table} page_table`}>
      <div className={pageTableCss.page_table_top}>
        <div className={pageTableCss.page_table_title}>查询表格</div>
        <div className="page_table_btns">
          {isShowAddBtn && btnAuthorityFun(pageAuthorityArr, '新建') && (
            <Button
              type="primary"
              onClick={() => {
                showModalFun('新建')
              }}
            >
              新建
            </Button>
          )}
          {isShowEnableDisableBtn && btnAuthorityFun(pageAuthorityArr, '启用停用') && (
            <Button
              className={pageTableCss.start_btn}
              onClick={() => {
                enableRowsFun()
              }}
            >
              启用
            </Button>
          )}
          {isShowEnableDisableBtn && btnAuthorityFun(pageAuthorityArr, '启用停用') && (
            <Button
              className={pageTableCss.stop_btn}
              onClick={() => {
                disableRowsFun()
              }}
            >
              停用
            </Button>
          )}
          {pageMoreButtonArr.map((itemFun) => {
            if (itemFun instanceof Function) {
              return itemFun(selectedRowKeys)
            } else {
              return ''
            }
          })}
        </div>
      </div>

      <Table
        size="small"
        style={{ padding: '0 36px' }}
        scroll={{ x: 1500 }}
        columns={newColumns}
        dataSource={tableData.list}
        pagination={paginationConfig}
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
      />

      {cloneDeepPageModalConfig.current && (
        <PageModal
          isModalVisible={isModalVisible}
          pageModalConfig={cloneDeepPageModalConfig.current}
          onCloseModal={closeModalFun}
        ></PageModal>
      )}
    </div>
  )
})

export default PageTable
