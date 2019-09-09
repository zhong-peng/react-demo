const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()
const users = () => {
  return Mock.mock({
    code: 200,
    title: '近6月用户数量',
    "data|6": [
      {
        "month|+1": [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
        ],
        count: "@integer(100, 300)"
      }
    ]
  })
}

router
  .post('/api/v1/statistics/users', (req, res) => {
    res.json(users())
  })

module.exports = router