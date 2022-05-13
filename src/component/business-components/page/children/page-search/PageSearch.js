import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { Form, Button, message, Select } from 'antd'

import moment from 'moment'

import { getQuery } from '@/request/http'

import pageSearchCss from './pageSearch.module.css'

import { renderItemFun as renderSearchItemFun } from '../../utils'

const { Option } = Select

const PageSearch = memo((props) => {
  const { pageSearchConfig } = props

  const {
    searchItemArr,
    connectedSelectArr,
    getSearchValuesFun,
    resetSearchValuesFun,
    searchItemMarginRight = '28px'
  } = pageSearchConfig

  // 设置重新渲染
  const [againRender, setAgainRender] = useState([])

  const [form] = Form.useForm()

  const startDateField = useRef('')
  const endDateField = useRef('')
  const rangePickerFormat = useRef('')

  // 二维数组 每一项元素为一个联动下拉框的数据源
  const connectedDataSource = useRef([])

  const renderItemCallBackFun = (itemConfig) => {
    startDateField.current = itemConfig.field[0]
    endDateField.current = itemConfig.field[1]
    rangePickerFormat.current = itemConfig.format
  }

  const getFirstSelectData = useCallback(() => {
    getQuery(connectedSelectArr[0].url).then((res) => {
      connectedDataSource.current[0] = res.data
      setAgainRender([])
    })
  }, [connectedSelectArr])

  const changeConnectedSelectFun = (selectedValue, index) => {
    // 触发的是删除
    if (!selectedValue) {
      return
    }

    // 点击的最后一个联动输入框
    if (index === connectedSelectArr.length - 1) {
      return
    }

    // 1.根据当前触发输入框 获取下一个联动输入框的配置项
    const nextConfig = connectedSelectArr[index + 1]
    // 2.获取数据
    getQuery(nextConfig.url, { [nextConfig.requestKey]: selectedValue }).then((res) => {
      connectedDataSource.current[index + 1] = res.data
      setAgainRender([])
    })
  }

  const clearConnectedSelectFun = (index) => {
    // 删除子联动框数据源
    for (let i = index + 1; i < connectedDataSource.current.length; i++) {
      connectedDataSource.current[i] = []
    }

    // 删除当前及子联动框的默认值
    for (let i = index; i < connectedSelectArr.length; i++) {
      form.setFieldsValue({
        [connectedSelectArr[i].field]: undefined
      })
    }

    setAgainRender([])
  }

  const searchFun = () => {
    let searchData = form.getFieldsValue()

    let isRequestData = false

    Object.values(searchData).forEach((item) => {
      if (item || item === 0) {
        isRequestData = true
      }
    })

    if (!isRequestData) {
      message.warning('请选择至少一项查询条件')
      return
    }

    // 是否存在日期选择器
    if (startDateField.current && endDateField.current) {
      // 日期选择器 是否选择了值
      if (searchData[startDateField.current]) {
        const [startDate, endDate] = searchData[startDateField.current]

        // 给传给后端的数据 添加开始日期和结束日期的key val
        searchData[startDateField.current] = rangePickerFormat.current
          ? moment(startDate).format(rangePickerFormat.current)
          : moment(startDate).valueOf()
        searchData[endDateField.current] = rangePickerFormat.current
          ? moment(endDate).format(rangePickerFormat.current)
          : moment(endDate).valueOf()
      }
    }

    getSearchValuesFun(searchData)
  }

  const resetFun = () => {
    form.resetFields()
    resetSearchValuesFun()
  }

  useEffect(() => {
    connectedSelectArr && getFirstSelectData()
  }, [connectedSelectArr, getFirstSelectData])

  return (
    <div className={pageSearchCss.page_search}>
      {againRender}
      <div style={{ flex: 1 }}>
        <Form name="pageSearchForm" layout="inline" autoComplete="off" form={form}>
          {searchItemArr.map((searchItem) => {
            return (
              <div
                key={searchItem.field}
                style={{
                  width: '20%',
                  marginRight: searchItemMarginRight,
                  marginBottom: '10px'
                }}
              >
                {renderSearchItemFun(searchItem, renderItemCallBackFun)}
              </div>
            )
          })}

          {connectedSelectArr &&
            connectedSelectArr.map((itemConfig, index) => {
              return (
                <div
                  key={itemConfig.field}
                  style={{
                    width: '20%',
                    marginRight: searchItemMarginRight,
                    marginBottom: '10px'
                  }}
                >
                  <Form.Item
                    label={itemConfig.label}
                    name={itemConfig.field}
                    rules={itemConfig.rules}
                  >
                    <Select
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={itemConfig.placeholder || '请选择内容'}
                      onChange={(selectedValue) => {
                        changeConnectedSelectFun(selectedValue, index)
                      }}
                      onClear={() => {
                        clearConnectedSelectFun(index)
                      }}
                    >
                      {connectedDataSource.current[index]?.map((option) => {
                        return (
                          <Option
                            key={option[itemConfig.customizeOptionsValueKey || 'value']}
                            value={option[itemConfig.customizeOptionsValueKey || 'value']}
                          >
                            {option[itemConfig.customizeOptionsLabelKey || 'label']}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </div>
              )
            })}
        </Form>
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => {
            searchFun()
          }}
        >
          查询
        </Button>
        <Button
          className={pageSearchCss.reset_btn}
          onClick={() => {
            resetFun()
          }}
        >
          重置
        </Button>
      </div>
    </div>
  )
})

export default PageSearch
