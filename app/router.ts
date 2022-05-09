import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/test', controller.home.index);
  router.post('/register', controller.home.register);
  router.post('/invite', controller.examController.invite);
  router.get('/exams', controller.examController.exams);
  router.post('/submitExam', controller.examController.submitExam);
  router.get('/users', controller.home.users);
  router.get('/news', controller.news.list);
};
