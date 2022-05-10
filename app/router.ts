import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  router.get('/test', controller.home.index)
  router.post('/register', controller.userController.register)
  router.post('/invite', controller.examController.invite)
  router.post('/exam', controller.examController.exam)
  router.get('/exams', controller.examController.exams)
  router.post('/submitExam', controller.examController.submitExam)
  router.get('/users', controller.userController.users)
  router.get('/news', controller.news.list)
}
