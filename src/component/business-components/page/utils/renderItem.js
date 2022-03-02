import { Form, Input, Select, DatePicker, Radio, Checkbox } from 'antd'

import ControlledTree from 'page/children/controlled-components/controlled-tree/ControlledTree'
import ControlledUpload from 'page/children/controlled-components/controlled-upload/ControlledUpload'

const { Option } = Select
const { RangePicker } = DatePicker

export function renderItem(itemConfig, renderItemCallBack) {
  switch (itemConfig.type) {
    case 'input':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <Input
            disabled={itemConfig.disabled}
            style={{ width: itemConfig.width || '200px' }}
            placeholder={itemConfig.placeholder || '请输入内容'}
          />
        </Form.Item>
      )
    case 'password':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <Input.Password
            disabled={itemConfig.disabled}
            style={{ width: itemConfig.width || '200px' }}
            placeholder={itemConfig.placeholder || '请输入内容'}
          />
        </Form.Item>
      )
    case 'select':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <Select
            showSearch
            disabled={itemConfig.disabled}
            style={{ width: itemConfig.width || '200px' }}
            placeholder={itemConfig.placeholder || '请选择内容'}
            optionFilterProp="children"
          >
            {itemConfig.options &&
              itemConfig.options.map((option) => {
                return (
                  <Option
                    key={option[itemConfig.customizeOptionsValueKey || 'value']}
                    value={
                      option[itemConfig.customizeOptionsValueKey || 'value']
                    }
                  >
                    {option[itemConfig.customizeOptionsLabelKey || 'label']}
                  </Option>
                )
              })}
          </Select>
        </Form.Item>
      )
    case 'datePicker':
      renderItemCallBack(itemConfig)
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <DatePicker
            disabled={itemConfig.disabled}
            placeholder={itemConfig.placeholder || '请选择日期'}
            style={{ width: itemConfig.width || '260px' }}
          />
        </Form.Item>
      )

    case 'rangePicker':
      renderItemCallBack(itemConfig)
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field[0]}
          rules={itemConfig.rules}
        >
          <RangePicker
            disabled={itemConfig.disabled}
            showTime={itemConfig.showTime}
            placeholder={itemConfig.placeholder || ['开始日期', '结束日期']}
            style={{ width: itemConfig.width || '260px' }}
          />
        </Form.Item>
      )
    case 'radio':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <Radio.Group disabled={itemConfig.disabled}>
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
          value: item[itemConfig.customizeOptionsValueKey || 'value']
        }
      })
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <Checkbox.Group disabled={itemConfig.disabled} options={newOptions} />
        </Form.Item>
      )

    case 'tree':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <ControlledTree
            disabled={itemConfig.disabled}
            halfCheckedKeys={itemConfig.halfCheckedKeys}
            treeData={itemConfig.options}
            fieldNames={{
              title: itemConfig.customizeOptionsLabelKey || 'label',
              key: itemConfig.customizeOptionsValueKey || 'value',
              children: itemConfig.customizeOptionsChildrenKey || 'children'
            }}
          ></ControlledTree>
        </Form.Item>
      )

    case 'upload':
      return (
        <Form.Item
          label={itemConfig.label}
          name={itemConfig.field}
          rules={itemConfig.rules}
        >
          <ControlledUpload disabled={itemConfig.disabled}></ControlledUpload>
        </Form.Item>
      )
    default:
      console.warn('未找到对应组件')
  }
}
