import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/test', controller.home.index)
  router.post('/invite', controller.examController.invite)
  router.post('/exam', controller.examController.exam)
  router.post('/deleteExam', controller.examController.deleteExam)
  router.get('/exams', controller.examController.exams)
  router.post('/submitExam', controller.examController.submitExam)
  router.post('/register', controller.userController.register)
  router.post('/user', controller.userController.user)
  router.post('/updateUserScore', controller.userController.updateUserScore)
  router.post('/deleteUser', controller.userController.deleteUser)
  router.get('/users', controller.userController.users)
  router.get('/news', controller.news.list)
}
