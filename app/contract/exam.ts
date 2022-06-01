const exam = {
  examineeId: { type: 'string', required: true, example: '7b6b0aec-b020-4073-973b-555134435a21' },
}
const examSubmition = {
  inviteId: { type: 'string', require: true, example: 'c6a32e96-86fc-402d-9a18-a507710010a3' },
  examineeId: { type: 'string', required: true, example: '7b6b0aec-b020-4073-973b-555134435a21' },
  tag: { type: 'string', required: true, example: 'frontend' },
  answers: { type: 'string', required: true, example: [{ questionId: 'a76b0aec-b020-4073-973b-555134435add', answer: 1 }] },
}
module.exports = {
  exam,
  examSubmition,
}
