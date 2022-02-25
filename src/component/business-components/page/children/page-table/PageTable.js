import React, { memo, useEffect, useCallback, useState, useRef, useImperativeHandle } from 'react';

import { Button, Table, Space, Switch, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import _ from 'lodash'

import { getTableDataH, removeTableDataH, startTableDataH, stopTableDataH } from '@/request/api/content/common/page'

import { btnAuthority } from 'page/utils'

import { PageModal } from 'page/children';

import pageTableCss from './pageTable.module.css'
import './pageTableResetAntd.css'

const { confirm } = Modal;

const PageTable = memo((props) => {

  const { pageRequestUrl, pageTableConfig, searchData, pageModalConfig } = props
  const { curdUrl, enableUrl, disabledUrl } = pageRequestUrl
  const {
    columns,
    pageAuthorityArr,
    tableMoreButtonArr = [],
    pageMoreButtonArr = [],
    isShowAddBtn = true,
    isShowGetBtn = true,
    isShowUpdateBtn = true,
    isShowRemoveBtn = true,
    isShowEnableDisableBtn = true,
    isShowActionColumns = true,
  } = pageTableConfig

  useImperativeHandle(props.onRef, () => {
    return {
      getTableData,
    };
  });

  const pageNum = useRef(1)
  const pageSize = useRef(10)

  const [tableData, setTableData] = useState({})

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const modalTitle = useRef('')
  const tableItemId = useRef()

  const [isModalVisible, setIsModalVisible] = useState(false);

  const newColumns = [
    ...columns,
    isShowActionColumns ? {
      title: '操作',
      key: 'action',
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          {btnAuthority(pageAuthorityArr, '查看') && isShowGetBtn && <Button type="text" style={{ color: '#1890FF' }} onClick={() => { showModal('查看', record.id) }}>查看</Button>}
          {btnAuthority(pageAuthorityArr, '修改') && isShowUpdateBtn && <Button type="text" style={{ color: '#48ED4B' }} onClick={() => { showModal('修改', record.id) }}>修改</Button>}
          {btnAuthority(pageAuthorityArr, '删除') && isShowRemoveBtn && <Button type="text" style={{ color: '#EB3030' }} onClick={() => { removeTableData(record.id) }}>删除</Button>}
          {
            tableMoreButtonArr.map((funItem) => {
              if (funItem instanceof Function) {
                return funItem(record)
              } else {
                return ''
              }
            })
          }
          {btnAuthority(pageAuthorityArr, '启用停用') && isShowEnableDisableBtn && <Switch checkedChildren="启用" unCheckedChildren="禁用"
            checked={record.status === 1} onClick={(checked) => { enableOrDisable(checked, [record.id]) }} />}
        </Space>
      ),
    } : {}
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
      getTableData()
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  const commonConfirm = (title, callBackFun) => {
    confirm({
      title: title,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        callBackFun && callBackFun()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const getTableData = useCallback(() => {
    const cloneDeepSearchData = _.cloneDeep(searchData)
    cloneDeepSearchData.pageNum = pageNum.current
    cloneDeepSearchData.pageSize = pageSize.current
    getTableDataH(curdUrl, cloneDeepSearchData).then((res) => {
      setTableData(res.data)
    })
  }, [curdUrl, searchData])

  const showModal = (title, rowId) => {
    if (!pageModalConfig) {
      console.warn('如果想使用弹窗功能，请传入pageModalConfig这项配置')
      return
    }
    modalTitle.current = title
    rowId ? (tableItemId.current = rowId) : (tableItemId.current = '')
    setIsModalVisible(true);
  };

  const closeModal = (_, isRequestTableData) => {
    if (isRequestTableData) {
      getTableData()
    }
    setIsModalVisible(false);
  };

  const removeTableData = (id) => {

    function callBackFun() {
      removeTableDataH(curdUrl, { id }).then(() => {
        message.success('删除成功')
        getTableData()
      })
    }

    commonConfirm('请确认是否删除？', callBackFun)
  }

  const enableRows = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条数据')
      return
    }
    enableOrDisable(true, selectedRowKeys)
  }

  const disableRows = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条数据')
      return
    }

    enableOrDisable(false, selectedRowKeys)
  }

  // 启用或禁用
  const enableOrDisable = (isEnable, rowIdArr) => {
    if (isEnable) {
      // 启用
      function callBackFun() {
        startTableDataH(enableUrl || `${curdUrl}start`, { ids: rowIdArr }).then((res) => {
          message.success('已启用')
          getTableData()
        })
      }

      commonConfirm('是否启用数据？', callBackFun)

    } else {
      // 禁用
      function callBackFun() {
        stopTableDataH(disabledUrl || `${curdUrl}stop`, { ids: rowIdArr }).then((res) => {
          message.warning('已禁用')
          getTableData()
        })
      }

      commonConfirm('是否禁用数据？', callBackFun)
    }
  }


  useEffect(() => {
    getTableData()
  }, [getTableData])

  return (
    <div className={`${pageTableCss.page_table} page_table`}>
      <div className={pageTableCss.page_table_top}>
        <div className={pageTableCss.page_table_title}>
          查询表格
        </div>
        <div className='page_table_btns'>
          {btnAuthority(pageAuthorityArr, '新建') && isShowAddBtn && <Button type="primary" onClick={() => { showModal('新建') }}>新建</Button>}
          {btnAuthority(pageAuthorityArr, '启用停用') && isShowEnableDisableBtn && <Button className={pageTableCss.start_btn} onClick={() => { enableRows() }}>启用</Button>}
          {btnAuthority(pageAuthorityArr, '启用停用') && isShowEnableDisableBtn && <Button className={pageTableCss.stop_btn} onClick={() => { disableRows() }}>停用</Button>}
          {
            pageMoreButtonArr.map((funItem) => {
              if (funItem instanceof Function) {
                return funItem(selectedRowKeys)
              } else {
                return ''
              }
            })
          }
        </div>
      </div>

      <Table size="small" style={{ padding: '0 36px' }} columns={newColumns} dataSource={tableData.list} pagination={paginationConfig} rowSelection={rowSelection} rowKey={record => record.id} />

      {
        pageModalConfig && <Modal title={modalTitle.current} destroyOnClose visible={isModalVisible} onCancel={closeModal} footer={[]}>
          <PageModal modalTitle={modalTitle.current} tableItemId={tableItemId.current} pageModalConfig={pageModalConfig} curdUrl={curdUrl} closeModal={closeModal}></PageModal>
        </Modal>
      }
    </div>
  );
});

export default PageTable;