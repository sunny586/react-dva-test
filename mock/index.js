const url = require('url')
// 列表数据
const appListData = require('../json/appListData.json')
// 推荐数据
const recomendData = require('../json/recomendData.json')

// 常量定义
const SUCCESS_CODE = 200
const SUCCESS_MSG = '成功'

module.exports = {
  // appListData
  [`GET /api/list`](req, res) {
    setTimeout(() => {
      // 获取请求参数
      const { page, pageSize, keywords } = url.parse(req.url, true).query
      // 分页下标
      const idx = (page - 1) * pageSize
      // 取mock数据
      let data = appListData.feed.entry
      // 通过关键字过滤数据
      if (keywords) {
        data = data && data.length > 0 ? data.filter(item => item['im:name'].label.indexOf(keywords) !== -1) : []
      }
      // format数据并返回
      res.status(200).json({
        code: SUCCESS_CODE,
        msg: SUCCESS_MSG,
        total: data.length,
        data: data.slice(idx, idx + Number(pageSize))
      })
    }, 1000)
  },
  // recomendData
  [`GET /api/recomend`](req, res) {
    setTimeout(() => {
      // 获取请求参数
      const { keywords } = url.parse(req.url, true).query
      // 取mock数据
      let data = recomendData.feed.entry
      // 通过关键字过滤数据
      if (keywords) {
        data = data && data.length > 0 ? data.filter(item => item['im:name'].label.indexOf(keywords) !== -1) : []
      }
      // format数据并返回
      res.status(200).json({
        code: SUCCESS_CODE,
        msg: SUCCESS_MSG,
        data
      })
    }, 1000)
  }
}
