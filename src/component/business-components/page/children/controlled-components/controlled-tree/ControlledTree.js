import React, { memo } from 'react'

import { Tree } from 'antd'

const ControlledTree = memo((props) => {
  const { disabled, treeData, fieldNames, value, onChange } = props

  if (treeData[0] && !treeData[0].key) {
    console.warn(
      '请给options的每一项 添加一个key（唯一），来提升渲染速度，出于性能考虑 组件内部不会自动添加key'
    )
  }

  const checkFun = (checkedKeys) => {
    onChange(checkedKeys)
  }

  return (
    <div>
      <Tree
        checkable
        disabled={disabled}
        checkedKeys={value}
        treeData={treeData}
        fieldNames={fieldNames}
        onCheck={(checkedKeys) => {
          checkFun(checkedKeys)
        }}
      ></Tree>
    </div>
  )
})

export default ControlledTree
