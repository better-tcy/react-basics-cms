import React, { memo, useEffect, useRef } from 'react'

import { Form, Button, message, Modal } from 'antd'

import moment from 'moment'

import _ from 'lodash'

import { renderItemFun as renderModalItemFun } from '../../utils'

import { post, getParams, put } from '@/request/http'

const PageModal = memo((props) => {
  const { isModalVisible, pageModalConfig, onCloseModal } = props
  const {
    saveUrl,
    postMoreParams,
    putMoreParams,
    itemId,
    formData,
    modalTitle,
    modalItemArr,
    width = 560,
    maskClosable = true,
    okText = '确定',
    cancelText = '取消',
    layout = 'horizontal',
    labelCol = { offset: 0, span: 6 },
    wrapperCol = { offset: 1, span: 12 },
    getFormDataFun,
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

  const renderItemCallBackFun = (itemConfig) => {
    if (itemConfig.type === 'rangePicker') {
      startDateField.current = itemConfig.field[0]
      endDateField.current = itemConfig.field[1]
      rangePickerFormat.current = itemConfig.format
    } else if (itemConfig.type === 'datePicker') {
      datePickerField.current = itemConfig.field
      datePickerFormat.current = itemConfig.format
    }
  }

  const preserveFun = async () => {
    await form.validateFields()

    let formData = form.getFieldsValue()

    // 是否存在日期区间选择器
    if (startDateField.current && endDateField.current) {
      // 日期区间选择器 是否选择了值
      if (formData[startDateField.current]) {
        const [startDate, endDate] = formData[startDateField.current]

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

    if (saveUrl) {
      if (itemId) {
        // 修改
        formData.id = itemId
        formData = Object.assign(formData, putMoreParams)
        put(saveUrl, formData).then((_) => {
          message.success('修改成功')
          // true：重新请求table表格数据
          onCloseModal('占位参数', true)
        })
      } else {
        // 新增
        formData = Object.assign(formData, postMoreParams)
        post(saveUrl, formData).then((_) => {
          message.success('保存成功')
          // true：重新请求table表格数据
          onCloseModal('占位参数', true)
        })
      }
    } else {
      if (getFormDataFun) {
        getFormDataFun(formData)
      } else {
        console.warn('缺少getFormDataFun函数')
      }
    }
  }
  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
      return
    }

    if (itemId) {
      getParams(saveUrl, { id: itemId }).then((res) => {
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
                moment(endDate, rangePickerFormat.current),
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
        onCancel={onCloseModal}
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
            return (
              <div key={modalItem.field}>
                {renderModalItemFun(modalItem, renderItemCallBackFun)}
              </div>
            )
          })}
        </Form>
        {!newModalItemArr && (
          <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                onCloseModal()
              }}
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                preserveFun()
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
