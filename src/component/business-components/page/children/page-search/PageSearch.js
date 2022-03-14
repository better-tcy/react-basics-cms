import React, { memo, useRef } from 'react'

import { Form, Button, message } from 'antd'

import moment from 'moment'

import pageSearchCss from './pageSearch.module.css'

import { renderItem as renderSearchItem } from '../../utils'

const PageSearch = memo((props) => {
  const { pageSearchConfig } = props

  const { searchItemMarginRight = '28px', searchItemArr } = pageSearchConfig

  const [form] = Form.useForm()

  const startDateField = useRef('')
  const endDateField = useRef('')
  const rangePickerFormat = useRef('')

  const renderItemCallBack = (itemConfig) => {
    startDateField.current = itemConfig.field[0]
    endDateField.current = itemConfig.field[1]
    rangePickerFormat.current = itemConfig.format
  }

  const search = () => {
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
        const startDate = searchData[startDateField.current][0]
        const endDate = searchData[startDateField.current][1]

        // 给传给后端的数据 添加开始日期和结束日期的key val
        searchData[startDateField.current] = rangePickerFormat.current
          ? moment(startDate).format(rangePickerFormat.current)
          : moment(startDate).valueOf()
        searchData[endDateField.current] = rangePickerFormat.current
          ? moment(endDate).format(rangePickerFormat.current)
          : moment(endDate).valueOf()
      }
    }

    pageSearchConfig.getSearchValues(searchData)
  }

  const reset = () => {
    form.resetFields()
    pageSearchConfig.resetSearchValues()
  }

  return (
    <div className={pageSearchCss.page_search}>
      <div style={{ flex: 1 }}>
        <Form name="pageSearchForm" layout="inline" autoComplete="off" form={form}>
          {searchItemArr.map((searchItem) => {
            return (
              <div
                key={searchItem.field}
                style={{
                  width: '20%',
                  marginRight: searchItemMarginRight,
                  marginBottom: '10px',
                }}
              >
                {renderSearchItem(searchItem, renderItemCallBack)}
              </div>
            )
          })}
        </Form>
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => {
            search()
          }}
        >
          查询
        </Button>
        <Button
          className={pageSearchCss.reset_btn}
          onClick={() => {
            reset()
          }}
        >
          重置
        </Button>
      </div>
    </div >
  )
})

export default PageSearch
