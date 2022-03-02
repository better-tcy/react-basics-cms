import React, { memo } from 'react'

import { Tree } from 'antd'

const ControlledTree = memo((props) => {
  const { disabled, halfCheckedKeys, treeData, fieldNames, onChange, value } =
    props

  if (!treeData[0].key) {
    console.warn(
      '请给options的每一项 添加一个key（唯一），来提升渲染速度，出于性能考虑 组件内部不会自动添加key'
    )
  }

  const onCheck = (checkedKeys, info) => {
    if (halfCheckedKeys) {
      // 携带选中节点父节点的value
      onChange(checkedKeys.concat(info.halfCheckedKeys))
    } else {
      onChange(checkedKeys)
    }
  }

  return (
    <div>
      <Tree
        checkable
        disabled={disabled}
        checkedKeys={value}
        treeData={treeData}
        fieldNames={fieldNames}
        onCheck={(checkedKeys, info) => {
          onCheck(checkedKeys, info)
        }}
      ></Tree>
    </div>
  )
})

export default ControlledTree
