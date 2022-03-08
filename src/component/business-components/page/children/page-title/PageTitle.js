import React, { memo } from 'react'
import pageTitleCss from './pageTitle.module.css'
const PageTitle = memo((props) => {
	const { pageTitleConfig } = props
	const { title } = pageTitleConfig
	return <div className={pageTitleCss.page_title}>{title}</div>
})

export default PageTitle
