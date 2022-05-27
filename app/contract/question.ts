module.exports = {
  questionPut: {
    id: { type: 'string', required: true, example: '933e6c25-557a-4255-8e6f-92d8ff76683f' },
    data: {
      type: 'string', required: true, example: {
        title: '前端开发的基础',
        choices: [
          '前端开发的基础',
          '前端开发的进阶',
          '前端开发的高级',
          '前端开发的实战',
        ],
        answer: 0,
        tag: 'frontend',
      },
    },
  },
}
