// This file is created by egg-ts-helper@1.30.3
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExamController from '../../../app/controller/examController';
import ExportHome from '../../../app/controller/home';
import ExportNews from '../../../app/controller/news';
import ExportOptionController from '../../../app/controller/optionController';
import ExportQuestionController from '../../../app/controller/questionController';
import ExportUserController from '../../../app/controller/userController';

declare module 'egg' {
  interface IController {
    examController: ExportExamController;
    home: ExportHome;
    news: ExportNews;
    optionController: ExportOptionController;
    questionController: ExportQuestionController;
    userController: ExportUserController;
  }
}
