import React, { memo, useEffect, useRef } from 'react'

import { Form, Button, message, Modal } from 'antd'

import moment from 'moment'

import _ from 'lodash'

import { renderItem as renderModalItem } from '../../utils'

import {
  addTableDataItemH,
  getTableDataItemDetailsH,
  updateTableDataItemH
} from '@/request/api/content/common/page'

const PageModal = memo((props) => {
  const { modalTitle, tableItemId, pageModalConfig, curdUrl, closeModal, isModalVisible } = props
  const {
    width = 560,
    maskClosable = true,
    okText = '确定',
    cancelText = '取消',
    layout = 'horizontal',
    labelCol = { offset: 0, span: 6 },
    wrapperCol = { offset: 1, span: 8 },
    modalItemArr
  } = pageModalConfig

  const [form] = Form.useForm()

  const startDateField = useRef('')
  const endDateField = useRef('')
  const rangePickerFormat = useRef('')

  const datePickerField = useRef('')
  const datePickerFormat = useRef('')

  let newModalItemArr = null

  if (modalTitle === '查看') {
    newModalItemArr = _.cloneDeep(modalItemArr)
    newModalItemArr.forEach((item) => {
      item.disabled = true
    })
  }

  const renderItemCallBack = (itemConfig) => {
    if (itemConfig.type === 'rangePicker') {
      startDateField.current = itemConfig.field[0]
      endDateField.current = itemConfig.field[1]
      rangePickerFormat.current = itemConfig.format
    } else if (itemConfig.type === 'datePicker') {
      datePickerField.current = itemConfig.field
      datePickerFormat.current = itemConfig.format
    }
  }

  const preserve = () => {
    let formData = form.getFieldsValue()

    // 是否存在日期区间选择器
    if (startDateField.current && endDateField.current) {
      // 日期区间选择器 是否选择了值
      if (formData[startDateField.current]) {
        const startDate = formData[startDateField.current][0]
        const endDate = formData[startDateField.current][1]

        // 给传给后端的数据 添加开始日期和结束日期的key val
        formData[startDateField.current] = rangePickerFormat.current
          ? moment(startDate).format(rangePickerFormat.current)
          : moment(startDate).valueOf()
        formData[endDateField.current] = rangePickerFormat.current
          ? moment(endDate).format(rangePickerFormat.current)
          : moment(endDate).valueOf()
      }
    }

    // 是否存在日期选择器
    if (datePickerField.current) {
      // 日期选择器 是否选择了值
      if (formData[datePickerField.current]) {
        const datePrickerVal = formData[datePickerField.current]

        formData[datePickerField.current] = datePickerFormat.current
          ? moment(datePrickerVal).format(datePickerFormat.current)
          : moment(datePrickerVal).valueOf()
      }
    }

    if (tableItemId) {
      // 修改
      formData.id = tableItemId
      updateTableDataItemH(curdUrl, formData).then((res) => {
        message.success('修改成功')
        // true：重新请求table表格数据
        closeModal('占位参数', true)
      })
    } else {
      // 新增
      addTableDataItemH(curdUrl, formData).then((res) => {
        message.success('保存成功')
        // true：重新请求table表格数据
        closeModal('占位参数', true)
      })
    }
  }

  useEffect(() => {
    if (tableItemId) {
      getTableDataItemDetailsH(curdUrl, { id: tableItemId }).then((res) => {
        // 是否存在日期区间选择器
        if (startDateField.current && endDateField.current) {
          const startDate = res.data[startDateField.current]
          const endDate = res.data[endDateField.current]
          // 日期区间选择器 是否存在值
          if (startDate && endDate) {
            // 回显的日期是时间戳
            if (!rangePickerFormat.current) {
              res.data[startDateField.current] = [moment(startDate), moment(endDate)]
            } else {
              res.data[startDateField.current] = [
                moment(startDate, rangePickerFormat.current),
                moment(endDate, rangePickerFormat.current)
              ]
            }
          }
        }

        // 是否存在日期选择器
        if (datePickerField.current) {
          const datePickerVal = res.data[datePickerField.current]

          // 日期选择器 是否存在值
          if (datePickerVal) {
            // 回显的是时间戳
            if (!datePickerFormat.current) {
              res.data[datePickerField.current] = moment(datePickerVal)
            } else {
              res.data[datePickerField.current] = moment(datePickerVal, datePickerFormat.current)
            }
          }
        }

        form.setFieldsValue(res.data)
      })
    }
  })
  return (
    <div>
      <Modal
        destroyOnClose
        maskClosable={maskClosable}
        width={width}
        title={modalTitle}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[]}
      >
        <Form
          name="pageModalForm"
          preserve={false}
          form={form}
          layout={layout}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          autoComplete="off"
        >
          {(newModalItemArr || modalItemArr).map((modalItem) => {
            return <div key={modalItem.field}>{renderModalItem(modalItem, renderItemCallBack)}</div>
          })}
        </Form>
        {!newModalItemArr && (
          <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                closeModal()
              }}
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                preserve()
              }}
            >
              {okText}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  )
})

export default PageModal
