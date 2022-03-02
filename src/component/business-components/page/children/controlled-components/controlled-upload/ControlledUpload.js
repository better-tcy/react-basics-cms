import React, { memo, useRef, useState } from 'react'

import axios from 'axios'

import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import './controlledUpladResetAntd.css'

const ControlledUpload = memo((props) => {
  const { onChange } = props

  const id = useRef()

  const [fileList, setFileList] = useState([])

  const beforeUpload = (file) => {
    id.current = file.uid
  }

  const customRequest = async (option) => {
    const formData = new FormData()
    formData.append('attach', option.file)

    const res = await axios.post(
      'http://192.168.1.65:8082/file_upload_service/file/uploading',
      formData
    )

    let fileObj = {
      uid: id.current,
      name: option.file.name,
      status: 'done',
      url: `http://4395n2305f.zicp.vip/file/field_inspection_file/${res.data.data}`
    }

    const newFileList = [...fileList, fileObj]

    setFileList(newFileList)

    onChange(newFileList)
  }

  const removeFile = (file) => {
    let newFileList = [...fileList]

    newFileList = newFileList.filter((item) => {
      return item.uid !== file.uid
    })

    setFileList(newFileList)

    onChange(newFileList)
  }

  return (
    <div className="controlled_upload">
      <Upload
        listType="picture"
        data={{}}
        fileList={fileList}
        beforeUpload={(file) => {
          beforeUpload(file)
        }}
        customRequest={(option) => {
          customRequest(option)
        }}
        onRemove={(file) => {
          removeFile(file)
        }}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </div>
  )
})

// listType  data actionUrl

export default ControlledUpload
