const checkFormItemConfigFun = (arrName, arr) => {
  for (let item of arr) {
    if (!item.type || !item.label || !item.field) {
      console.warn(`${arrName}的每一项配置必须要包含 type label field字段`)
      return false
    }
  }
  return true
}

const checkIsObjectFun = (obj) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    return true
  } else {
    return false
  }
}

const checkIsStringFun = (str) => {
  if (Object.prototype.toString.call(str) === '[object String]') {
    return true
  } else {
    return false
  }
}

const checkIsArrayFun = (arr) => {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return true
  } else {
    return false
  }
}

export function checkPageConfigFun(pageConfig) {
  if (!pageConfig) {
    console.warn('请给Page组件传入pageConfig配置')
    return false
  }

  if (!checkIsObjectFun(pageConfig)) {
    console.warn('pageConfig必须为Object类型')
    return false
  }

  if (!pageConfig.pageRequestUrl) {
    console.warn('请传入pageConfig -> pageRequestUrl这项配置')
    return false
  }

  if (!checkIsObjectFun(pageConfig.pageRequestUrl)) {
    console.warn('pageConfig -> pageRequestUrl必须为Object类型')
    return false
  }

  if (!pageConfig.pageRequestUrl.curdUrl) {
    console.warn('请传入 pageRequestUrl -> curdUrl这项配置')
    return false
  }

  if (!checkIsStringFun(pageConfig.pageRequestUrl.curdUrl)) {
    console.warn('pageRequestUrl -> curdUrl这项配置必须为String类型')
    return false
  }

  const { getMoreParams, postMoreParams, putMoreParams } = pageConfig.pageRequestUrl

  if (getMoreParams) {
    if (!checkIsObjectFun(getMoreParams)) {
      console.warn('pageRequestUrl -> getMoreParams这项配置必须为Object类型')
      return
    }
  }

  if (postMoreParams) {
    if (!checkIsObjectFun(postMoreParams)) {
      console.warn('pageRequestUrl -> postMoreParams这项配置必须为Object类型')
      return
    }
  }

  if (putMoreParams) {
    if (!checkIsObjectFun(putMoreParams)) {
      console.warn('pageRequestUrl -> putMoreParams这项配置必须为Object类型')
      return
    }
  }

  if (!pageConfig.pageTitleConfig) {
    console.warn('请传入 pageConfig -> pageTitleConfig这项配置')
    return false
  }

  if (!checkIsObjectFun(pageConfig.pageTitleConfig)) {
    console.warn('pageConfig -> pageTitleConfig必须为Object类型')
    return false
  }

  if (!pageConfig.pageTitleConfig.title) {
    console.warn('请传入pageTitleConfig -> title这项配置')
    return false
  }

  if (!checkIsStringFun(pageConfig.pageTitleConfig.title)) {
    console.warn('pageTitleConfig -> title这项配置必须为String类型')
    return false
  }

  if (pageConfig.pageSearchConfig) {
    if (!checkIsObjectFun(pageConfig.pageSearchConfig)) {
      console.warn('pageConfig -> pageSearchConfig必须为Object类型')
      return false
    }

    if (!pageConfig.pageSearchConfig.searchItemArr) {
      console.warn('请传入pageSearchConfig -> searchItemArr这项配置')
      return false
    }

    if (!checkIsArrayFun(pageConfig.pageSearchConfig.searchItemArr)) {
      console.warn('pageSearchConfig -> searchItemArr这项配置必须为Array类型')
      return false
    }

    if (pageConfig.pageSearchConfig.searchItemArr.length === 0) {
      console.warn('pageSearchConfig -> searchItemArr中至少包含一个元素')
      return false
    }

    const res = checkFormItemConfigFun('searchItemArr', pageConfig.pageSearchConfig.searchItemArr)
    if (!res) {
      return false
    }
  }

  if (!pageConfig.pageTableConfig) {
    console.warn('请传入pageTableConfig这项配置')
    return false
  }

  if (!checkIsObjectFun(pageConfig.pageTableConfig)) {
    console.warn('pageConfig -> pageTableConfig必须为Object类型')
    return false
  }

  if (!pageConfig.pageTableConfig.columns) {
    console.warn('请传入pageTableConfig -> columns这项配置')
    return false
  }

  if (!checkIsArrayFun(pageConfig.pageTableConfig.columns)) {
    console.warn('pageTableConfig -> columns这项必须为Array类型')
    return false
  }

  if (pageConfig.pageModalConfig) {
    if (!checkIsObjectFun(pageConfig.pageModalConfig)) {
      console.warn('pageConfig -> pageModalConfig必须为Object类型')
      return false
    }

    if (!pageConfig.pageModalConfig.modalItemArr) {
      console.warn('请传入pageModalConfig -> modalItemArr这项配置')
      return false
    }

    if (!checkIsArrayFun(pageConfig.pageModalConfig.modalItemArr)) {
      console.warn('pageModalConfig -> modalItemArr这项配置必须为Array类型')
      return false
    }

    if (pageConfig.pageModalConfig.modalItemArr.length === 0) {
      console.warn('pageModalConfig -> modalItemArr中至少包含一个元素')
      return false
    }

    const res = checkFormItemConfigFun('modalItemArr', pageConfig.pageModalConfig.modalItemArr)
    if (!res) {
      return false
    }
  }

  return pageConfig
}
