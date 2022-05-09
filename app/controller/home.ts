import { Controller } from 'egg';
import { createUser, getAllUsers } from './userController';


/**
 * @Controller home
 */
export default class HomeController extends Controller {
  /**
   * #swagger-api
   *
   * @function index
   */
  public async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      title: '开发知识测试'
    });
    //ctx.body = await ctx.service.test.home();
  }
  async register() {
    const { ctx } = this;
    const { username, email, phone } = ctx.request.body;
    if (username) {
      const createUserRes: any = await createUser({username, email, phone});
      if (createUserRes) {
        ctx.body = {
          err: `提交失败。 ${createUserRes.meta.target} 已经存在了。`,
        };
        return;
      }
      ctx.body = {
        data: `提交成功。 ${username} ${email} ${phone}`,
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      };
    }
  }

  async users() {
    const { ctx } = this;
    const getUsersRes: any = await getAllUsers();
    if (getUsersRes.err) {
      ctx.body = {
        err: `查找失败。`,
      };
      return;
    }
    ctx.body = {
      data: getUsersRes,
    };
  }
}
