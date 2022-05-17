import { Form, Input, Select, DatePicker, Radio, Checkbox, Cascader } from 'antd'

import ControlledTree from 'page/children/controlled-components/controlled-tree/ControlledTree'
import ControlledUpload from 'page/children/controlled-components/controlled-upload/ControlledUpload'

const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

export function renderItemFun(itemConfig, renderItemCallBackFun) {
  switch (itemConfig.type) {
    case 'input':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Input
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            type={itemConfig.isNumber ? 'number' : 'string'}
            placeholder={itemConfig.placeholder || '请输入内容'}
          />
        </Form.Item>
      )

    case 'textArea':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <TextArea
            style={{ width: '100%', maxWidth: '1000px' }}
            disabled={itemConfig.disabled}
            rows={itemConfig.rows || 2}
            maxLength={itemConfig.maxLength || 100}
            placeholder={itemConfig.placeholder || '请输入内容'}
          />
        </Form.Item>
      )

    case 'password':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Input.Password
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            type={itemConfig.isNumber ? 'number' : 'string'}
            placeholder={itemConfig.placeholder || '请输入内容'}
          />
        </Form.Item>
      )
    case 'select':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Select
            showSearch
            optionFilterProp="children"
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            mode={itemConfig.mode || ''}
            placeholder={itemConfig.placeholder || '请选择内容'}
          >
            {itemConfig.options &&
              itemConfig.options.map((option) => {
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
      )
    case 'datePicker':
      renderItemCallBackFun(itemConfig)
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <DatePicker
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            showTime={itemConfig.showTime}
            placeholder={itemConfig.placeholder || '请选择日期'}
          />
        </Form.Item>
      )

    case 'rangePicker':
      renderItemCallBackFun(itemConfig)
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field[0]} rules={itemConfig.rules}>
          <RangePicker
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            showTime={itemConfig.showTime}
            placeholder={itemConfig.placeholder || ['开始日期', '结束日期']}
          />
        </Form.Item>
      )
    case 'radio':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Radio.Group style={{ width: '100%' }} disabled={itemConfig.disabled}>
            {itemConfig.options.map((option) => {
              return (
                <Radio
                  key={option[itemConfig.customizeOptionsValueKey || 'value']}
                  value={option[itemConfig.customizeOptionsValueKey || 'value']}
                >
                  {option[itemConfig.customizeOptionsLabelKey || 'label']}
                </Radio>
              )
            })}
          </Radio.Group>
        </Form.Item>
      )
    case 'checkbox':
      const newOptions = itemConfig.options.map((item) => {
        return {
          label: item[itemConfig.customizeOptionsLabelKey || 'label'],
          value: item[itemConfig.customizeOptionsValueKey || 'value'],
        }
      })
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Checkbox.Group
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            options={newOptions}
          />
        </Form.Item>
      )

    case 'tree':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <ControlledTree
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            treeData={itemConfig.options}
            fieldNames={{
              title: itemConfig.customizeOptionsLabelKey || 'label',
              key: itemConfig.customizeOptionsValueKey || 'value',
              children: itemConfig.customizeOptionsChildrenKey || 'children',
            }}
          ></ControlledTree>
        </Form.Item>
      )

    case 'upload':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <ControlledUpload
            disabled={itemConfig.disabled}
            actionUrl={itemConfig.actionUrl}
            headers={itemConfig.headers}
            accept={itemConfig.accept}
            data={itemConfig.data}
            listType={itemConfig.listType || 'picture'}
          ></ControlledUpload>
        </Form.Item>
      )

    case 'cascader':
      return (
        <Form.Item label={itemConfig.label} name={itemConfig.field} rules={itemConfig.rules}>
          <Cascader
            style={{ width: '100%' }}
            disabled={itemConfig.disabled}
            multiple={itemConfig.multiple}
            options={itemConfig.options}
            changeOnSelect={itemConfig.changeOnSelect}
            expandTrigger={itemConfig.expandTrigger || 'click'}
            placeholder={itemConfig.placeholder || '请选择内容'}
            fieldNames={{
              label: itemConfig.customizeOptionsLabelKey || 'label',
              value: itemConfig.customizeOptionsValueKey || 'value',
              children: itemConfig.customizeOptionsChildrenKey || 'children',
            }}
          ></Cascader>
        </Form.Item>
      )

    default:
      console.warn('未找到对应组件')
  }
}
