module.exports = {
  questionPut: {
    id: { type: 'string', required: true, example: '933e6c25-557a-4255-8e6f-92d8ff76683f' },
    title: { type: 'string', required: false, example: '前端开发的基础' },
    choices: { type: 'string', required: false, example: `[
      '前端开发的基础',
      '前端开发的进阶',
      '前端开发的高级',
      '前端开发的实战',
    ]` },
    answer: { type: 'number', required: false, example: 0 },
    tag: { type: 'string', required: false, example: 'frontend' },
  },
}
