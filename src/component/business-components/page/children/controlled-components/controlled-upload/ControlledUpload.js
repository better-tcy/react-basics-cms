import React, { memo, useEffect, useRef, useState } from 'react'

import axios from 'axios'

import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import './controlledUpladResetAntd.css'

const ControlledUpload = memo((props) => {
  const { onChange, value, actionUrl, accept, data, listType, headers } = props

  const id = useRef()

  const [fileList, setFileList] = useState([])

  const beforeUploadFun = (file) => {
    id.current = file.uid
  }

  const customRequestFun = async (option) => {
    const formData = new FormData()
    formData.append('attach', option.file)

    const res = await axios.post(actionUrl, formData)

    let fileObj = {
      uid: id.current,
      name: option.file.name,
      status: 'done',
      url: res.data.data
    }

    const newFileList = [...fileList, fileObj]

    setFileList(newFileList)

    onChange(newFileList)
  }

  const removeFileFun = (file) => {
    let newFileList = [...fileList]

    newFileList = newFileList.filter((item) => {
      return item.uid !== file.uid
    })

    setFileList(newFileList)

    onChange(newFileList)
  }

  useEffect(() => {
    value && setFileList(value)
  }, [value])

  return (
    <div className="controlled_upload">
      <Upload
        listType={listType}
        headers={headers}
        data={data}
        accept={accept}
        fileList={fileList}
        beforeUpload={(file) => {
          beforeUploadFun(file)
        }}
        customRequest={(option) => {
          customRequestFun(option)
        }}
        onRemove={(file) => {
          removeFileFun(file)
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
})

export default ControlledUpload
