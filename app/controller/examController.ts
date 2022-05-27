import { Controller } from 'egg'

/**
 * @Controller exam
 */
export default class ExamsController extends Controller {
  /**
   * @Router POST /exam
   * @Request body exam *examineeId eg:{"examineeId":"7b6b0aec-b020-4073-973b-555134435a21"} 邀请候选人参加测试
   */
  async add() {
    const { ctx } = this
    const { examineeId } = ctx.request.body
    const createExamRes = await ctx.service.exam.createExam(examineeId)
    if (createExamRes) {
      ctx.body = {
        data: createExamRes.id,
      }
    }
  }
  /**
   * @Router GET /exam
   * @Request query string tag eg:"?id=93ed1626-0de8-4d51-8ffd-3fdb3b8d8412 ?tag=frontend" 获取一个exam或exam列表
   */
  async get() {
    const { ctx } = this
    const { id, tag } = ctx.request.query
    if (id) {
      const data = await ctx.service.exam.findExamById(id)
      ctx.body = {
        data,
      }
      return
    }
    if (tag) {
      const data = await ctx.service.exam.findExamByTag(tag)
      ctx.body = {
        data,
      }
      return
    }
    const data = await ctx.service.exam.getAllExams()
    ctx.body = {
      data,
    }
  }
  /**
   * @Router DELETE /exam
   * @Request body string *id eg:{"id":"05db79b7-5d4c-453c-b635-e353db0f3f1f"} 删除 exam
   */
  async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.exam.deleteExamById(id)
    ctx.body = {
      data,
    }
  }
  async submitExam() {
    const { ctx } = this
    const { id, score } = ctx.request.body
    const examData = await ctx.service.exam.findExamById(id)
    if (examData && examData.score) {
      ctx.body = {
        err: '已经提交过了',
      }
      return
    }
    await ctx.service.user.submit(examData!.examineeId, score)
    const { score: examScore } = await ctx.service.exam.submitQuestionnaire(id, score)
    const scoreMsg = `分数是 ${examScore}`
    ctx.body = {
      data: scoreMsg,
    }
  }

  /**
   * @Router POST /exam/submit
   * @Request body examSubmition *data 考生答卷
   */
  async submit() {
    const { ctx } = this
    const { examineeId, tag, answers } = ctx.request.body
    const data = await ctx.service.exam.submit(tag, answers, examineeId)
    if (data.err) {
      ctx.body = { err: data.err }
      return
    }
    await ctx.service.user.submitQuestionnaire(examineeId, data.score ?? 0)
    ctx.body = {
      data,
    }
  }
}
