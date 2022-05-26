const register = {
  username: { type: 'string', required: true, example: 'abc' },
  email: { type: 'string', required: true, example: 'abc@qq.com' },
  phone: { type: 'string', required: true, example: '13312345678' },
}
const invite = {
  examineeId: { type: 'string', required: true, example: '5a3b912e-e252-451c-9127-0d34c93bc9a2' },
}
module.exports = {
  register,
  invite,
}
