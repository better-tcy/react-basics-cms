import React, { memo, useState } from 'react'

import { Button } from 'antd'

import { PageModal } from 'page/children'

const OneTwo = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  /**
   *  两种使用方法
   *  一.自动交互
   *    1.新增：传入saveUrl即可
   *    2.修改：传入saveurl和itemId（行id）即可
   *    3.查看：传入itemId modalTitle为查看即可
   *
   *  二.手动交互
   *   1.新增：传入getFormDataFun函数 点击确定时回调 参数为表单获取数据
   *   2.修改：传入getFormDataFun函数 传入formData回显数据
   *   3.传入formData回显数据 modalTitle修改为查看
   **/

  const pageModalConfig = {
    saveUrl: '/oneOne/',
    itemId: 1,
    modalTitle: '新增',
    modalItemArr: [
      {
        type: 'input',
        label: '姓名',
        field: 'name',
        placeholder: '请输入姓名',
      },
    ],
    formData: {
      name: '哈哈哈',
    },
    getFormDataFun(formData) {
      console.log(formData)
    },
  }

  const showModalFun = () => {
    setIsModalVisible(true)
  }

  const closeModalFun = (_, isRequestTableData) => {
    setIsModalVisible(false)
    // isRequestTableData 是否更新表格数据
  }

  return (
    <div>
      <Button type="primary" onClick={showModalFun}>
        打开弹窗
      </Button>
      {isModalVisible && (
        <PageModal
          isModalVisible={isModalVisible}
          pageModalConfig={pageModalConfig}
          onCloseModal={closeModalFun}
        ></PageModal>
      )}
    </div>
  )
})

export default OneTwo
