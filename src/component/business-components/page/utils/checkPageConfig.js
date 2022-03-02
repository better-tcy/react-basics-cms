const checkFormItemConfig = (arrName, arr) => {
  for (let item of arr) {
    if (!item.type || !item.label || !item.field) {
      console.warn(`${arrName}的每一项配置必须要包含 type label field字段`)
      return false
    }
  }
  return true
}

export function checkPageConfig(pageConfig) {
  if (!pageConfig) {
    console.warn('请给Page组件传入pageConfig配置')
    return false
  }

  if (!pageConfig.pageRequestUrl) {
    console.warn('请传入pageRequestUrl这项配置')
    return false
  }

  if (!pageConfig.pageRequestUrl.curdUrl) {
    console.warn('请传入 pageRequestUrl -> curdUrl这项配置')
    return false
  }

  if (!pageConfig.pageTitleConfig) {
    console.warn('请传入pageTitleConfig这项配置')
    return false
  }

  if (!pageConfig.pageTitleConfig.title) {
    console.warn('请传入pageTitleConfig -> title这项配置')
    return false
  }

  if (pageConfig.pageSearchConfig && !pageConfig.pageSearchConfig.searchItemArr) {
    console.warn('请传入pageSearchConfig -> searchItemArr这项配置')
    return false
  }

  if (pageConfig.pageSearchConfig && pageConfig.pageSearchConfig.searchItemArr) {
    const res = checkFormItemConfig('searchItemArr', pageConfig.pageSearchConfig.searchItemArr)
    if (!res) {
      return false
    }
  }

  if (!pageConfig.pageTableConfig) {
    console.warn('请传入pageTableConfig这项配置')
    return false
  }

  if (!pageConfig.pageTableConfig.columns) {
    console.warn('请传入pageTableConfig -> columns这项配置')
    return false
  }

  if (pageConfig.pageModalConfig && !pageConfig.pageModalConfig.modalItemArr) {
    console.warn('请传入pageModalConfig -> modalItemArr这项配置')
    return false
  }

  if (pageConfig.pageModalConfig && pageConfig.pageModalConfig.modalItemArr) {
    const res = checkFormItemConfig('modalItemArr', pageConfig.pageModalConfig.modalItemArr)
    if (!res) {
      return false
    }
  }

  return pageConfig
}
