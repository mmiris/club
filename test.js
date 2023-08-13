fetch('http://localhost:1218/moment')
  .then((response) => {
    // 检查响应状态码
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    // // 定义一个响应类型与解析方法的映射关系
    // const responseTypes = new Map([
    //   ['json', () => response.json()],
    //   ['text', () => response.text()],
    //   ['formData', () => response.formData()],
    //   ['blob', () => response.blob()],
    //   ['arrayBuffer', () => response.arrayBuffer()]
    // ])
    // // 根据响应类型选择相应的解析方法
    // const parser = responseTypes.get(response.type)
    // if (parser) {
    //   return parser()
    // } else {
    //   throw new Error('Unsupported response type')
    // }
    return response.json()
  })
  .then((data) => {
    // 处理数据
    console.log(data)
  })
  .catch((error) => {
    // 处理错误情况
    console.error('Error:', error)
  })
