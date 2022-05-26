import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/test', controller.home.index)
  router.get('/exams', controller.examController.exams)
  router.post('/exam', controller.examController.add) // 之前的 invite
  router.post('/exam/find', controller.examController.find)
  router.delete('/exam', controller.examController.delete)
  router.post('/submitExam', controller.examController.submitExam) // 前端校验答卷
  router.post('/exam/submit', controller.examController.submit) // 后端校验答卷
  router.post('/user', controller.userController.add) // 之前的 register
  router.get('/user', controller.userController.find)
  router.post('/user/updateScore', controller.userController.updateScore)
  router.delete('/user', controller.userController.delete)
  router.get('/users', controller.userController.users)
  router.get('/questions', controller.questionController.questions)
  router.post('/question/find', controller.questionController.find)
  router.delete('/question', controller.questionController.delete)
  router.post('/question', controller.questionController.add)
  router.get('/question', controller.questionController.get)
  router.post('/option', controller.optionController.add)
  // 查询当天参加考试题的人数
  router.get('/user/today', controller.userController.getTodayUser)
  // 查询最近7天的参加考试的人数
  router.get('/user/week', controller.userController.getLastSevenDay)
}
