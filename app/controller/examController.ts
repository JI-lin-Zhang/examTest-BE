import { Controller } from 'egg';

/**
 * @Controller exam
 */
export default class ExamsController extends Controller {
  /**
   * @Router POST /invite
   * @Request body exam *examineeId eg:{"examineeId":"7b6b0aec-b020-4073-973b-555134435a21"} 邀请候选人参加测试
   */
  async invite() {
    const { ctx } = this;
    const { examineeId } = ctx.request.body;
    const inviteLink = await ctx.service.exam.generateInviteLink(examineeId);
    const inviteMsg = `邀请链接是 ${inviteLink}`;
    ctx.body = {
      data: inviteMsg,
    }
  }
  async exam() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const data = await ctx.service.exam.findExamById(id)
    ctx.body =  {
      data
    };
  }
  async submitExam() {
    const { ctx } = this;
    const { id, score } = ctx.request.body;
    const examData = await ctx.service.exam.findExamById(id);
    if (examData && examData.score) {
      ctx.body = {
        err: '已经提交过了',
      }
      return;
    }
    const newScore = await ctx.service.exam.submit(id, score);
    const scoreMsg = `分数是 ${newScore}`;
    ctx.body = {
      data: scoreMsg,
    }
  }
  /**
   * @Router GET /exams
   */
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