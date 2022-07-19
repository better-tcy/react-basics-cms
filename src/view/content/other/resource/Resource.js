import React, { memo } from 'react'

const Resource = memo(() => {
  return (
    <div>
      <h2>
        项目github地址：
        <a
          href="https://github.com/Betteryourself-tcy/react-basics-cms"
          rel="noreferrer"
          target="_blank"
        >
          https://github.com/Betteryourself-tcy/react-basics-cms
        </a>
      </h2>
      <h2>
        JS配置生成页面文档地址：
        <a
          href="https://betteryourself-tcy.github.io/json-page-markdown/"
          rel="noreferrer"
          target="_blank"
        >
          https://betteryourself-tcy.github.io/json-page-markdown/
        </a>
      </h2>
    </div>
  )
})

export default Resource
