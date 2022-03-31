export function btnAuthorityFun(pageAuthorityArr, btnAuthorityName) {
  if (!pageAuthorityArr || pageAuthorityArr.length === 0) {
    return false
  }

  let isShowBtn = false
  for (let authorityItem of pageAuthorityArr) {
    if (authorityItem.name === btnAuthorityName) {
      isShowBtn = true
      break
    }
  }
  return isShowBtn
}
