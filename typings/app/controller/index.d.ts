// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthController from '../../../app/controller/authController';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportExamController from '../../../app/controller/examController';
import ExportHome from '../../../app/controller/home';
import ExportOptionController from '../../../app/controller/optionController';
import ExportQuestionController from '../../../app/controller/questionController';
import ExportUserController from '../../../app/controller/userController';

declare module 'egg' {
  interface IController {
    authController: ExportAuthController;
    baseController: ExportBaseController;
    examController: ExportExamController;
    home: ExportHome;
    optionController: ExportOptionController;
    questionController: ExportQuestionController;
    userController: ExportUserController;
  }
}
