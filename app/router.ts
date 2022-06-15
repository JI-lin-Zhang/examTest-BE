import { Application } from 'egg'
import NodeKeycloak from 'node-keycloak';
import { keyCloakConfig } from '../local-config';

export default async (app: Application) => {
  const { controller, router } = app;

  await NodeKeycloak.configure(keyCloakConfig);

  // 用来 render html 的，备用
  router.get('/', controller.home.index)
  router.get('/test', controller.home.index)

  // exam
  router.post('/exam', controller.examController.add) // 之前的 invite
  router.get('/exam', controller.examController.get)
  router.delete('/exam', controller.examController.delete)
  router.post('/submitExam', controller.examController.submitExam) // 前端校验答卷
  router.post('/exam/submit', controller.examController.submit) // 后端校验答卷

  // user
  router.post('/user', controller.userController.add) // 之前的 register
  router.get('/user', controller.userController.find)
  router.post('/user/updateScore', controller.userController.updateScore)
  router.delete('/user', controller.userController.delete)

  // question
  router.delete('/question', controller.questionController.delete)
  router.post('/question', controller.questionController.add)
  router.get('/question', controller.questionController.get)
  router.put('/question', controller.questionController.put)

  // option
  router.post('/option', controller.optionController.add)
  // 查询当天参加考试题的人数
  router.get('/user/today', controller.userController.getTodayUser)
  // 查询最近7天的参加考试的人数
  router.get('/user/week', controller.userController.getLastSevenDay)

  /**
   *  keyCloak
   */
  router.get('/auth', controller.authController.auth)

  router.get('/callback', controller.authController.callback)
}
