const exam = {
  examineeId: { type: 'string', required: true, example: '7b6b0aec-b020-4073-973b-555134435a21' },
}
const examSubmition = {
  examineeId: { type: 'string', required: true, example: '7b6b0aec-b020-4073-973b-555134435a21' },
  tag: { type: 'string', required: true, example: 'frontend' },
  answers: { type: 'Array[Object]', required: true, example: [{ questionId: 'a76b0aec-b020-4073-973b-555134435add', answer: 1 }] },
}
module.exports = {
  exam,
  examSubmition,
}
