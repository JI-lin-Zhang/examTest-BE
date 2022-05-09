import { Controller } from 'egg';

export default class ExamsController extends Controller {
  async invite() {
    const { ctx } = this;
    const { examineeId } = ctx.request.body;
    const inviteLink = await ctx.service.exam.generateInviteLink(examineeId);
    const inviteMsg = `邀请链接是 ${inviteLink}`;
    ctx.body = {
      data: inviteMsg,
    }
  }
  async submitExam() {
    const { ctx } = this;
    const { id, score } = ctx.request.body;
    const newScore = await ctx.service.exam.submit(id, score);
    const scoreMsg = `分数是 ${newScore}`;
    ctx.body = {
      data: scoreMsg,
    }
  }
  async exams() {
    const { ctx } = this;
    const getExamsRes: any = await ctx.service.exam.getAllExams();
    if (getExamsRes.err) {
      ctx.body = {
        err: `查找失败。`,
      };
      return;
    }
    ctx.body = {
      data: getExamsRes,
    };
  }
}