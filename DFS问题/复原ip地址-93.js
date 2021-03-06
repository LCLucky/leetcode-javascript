/**
 * @param {string} s
 * @return {string[]}
 */
let restoreIpAddresses = function (s) {
  let res = []
  let findPos = (start, prev, used) => {
    if (used === 3) {
      // 点全部用光后 剩余字符的长度不能超过3 就是一个答案
      let rest = s.substr(start)
      // 最后一位不能为0 且长度在 (0,3] 范围内
      if (isValidChunk(rest)) {
        res.push(prev.concat(rest).join("."))
      }
      return
    }

    for (let i = 1; i <= 3; i++) {
      let end = start + i
      let cur = s.substring(start, end)
      if (isValidChunk(cur)) {
        findPos(end, prev.concat(cur), used + 1)
      }
    }
  }

  findPos(0, [], 0)

  return res
}

function isValidChunk(str) {
  let strLen = str.length
  if (strLen === 0) {
    return false
  }
  // 开头是0的话 只能整个字符串只有一位0才行
  if (str[0] === "0") {
    return strLen === 1
  }
  let num = Number(str)
  return num <= 255
}
