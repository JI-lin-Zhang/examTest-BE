import { Controller } from 'egg';
import { createUser } from './userController';

export default class HomeController extends Controller {
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
  async invite() {
    const { ctx } = this;
    const { examineeId } = ctx.request.body;
    const inviteLink = await ctx.service.exam.generateInviteLink(examineeId);
    const inviteMsg = `邀请链接是 ${inviteLink}`;
    ctx.body = {
      data: inviteMsg,
    }
  }
  async submit() {
    const { ctx } = this;
    const { examineeId, score } = ctx.request.body;
    const newScore = await ctx.service.exam.submit(examineeId, score);
    const scoreMsg = `新分数是 ${newScore}`;
    ctx.body = {
      data: scoreMsg,
    }
  }
}
