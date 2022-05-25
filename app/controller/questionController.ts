import { Controller } from 'egg'

/**
 * @Controller question
 */
export default class QuestionController extends Controller {
  /**
   * @Router POST /question
   * @Request body string *title eg:{"title":"在 css 选择器当中，优先级排序正确的是","answer":3} add question
   */
  async add() {
    const { ctx } = this
    const { title, answer } = ctx.request.body
    if (title) {
      const res: any = await ctx.service.question.createQuestion({ title, answer })
      if (res?.meta?.target) {
        ctx.body = {
          err: `提交失败。 ${res.meta.target} 已经存在了。`,
        }
        return
      }
      ctx.body = {
        data: res,
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      }
    }
  }

  /**
   * @Router GET /questions
   * @Request query string page eg:"?tag=frontend" 获取问题列表
   */
  async questions() {
    const { ctx } = this
    const res: any = await ctx.service.question.getAllQuestions()
    if (res.err) {
      ctx.body = {
        err: '查找失败。',
      }
      return
    }
    ctx.body = {
      data: res,
    }
  }

  /**
   * @Router POST /question/find
   * @Request body string *tag eg:{"tag":"frontend"} 查找 question
   */
  async find() {
    const { ctx } = this
    const { tag } = ctx.request.body
    const res: any = await ctx.service.question.getQuestionsByTag(tag)
    if (res.err) {
      ctx.body = {
        err: '查找失败。',
      }
      return
    }
    ctx.body = {
      data: res,
    }
  }

  /**
   * @Router POST /question
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 查找 question
   */

  async question() {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.question.findQuestionById(id)
    ctx.body = {
      data,
    }
  }

  /**
   * @Router DELETE /question
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 删除 question
   */
  async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (Array.isArray(id)) {
      id.forEach(async (i: string) => await ctx.service.question.deleteQuestionById(i))
      ctx.body = {
        data: '批量删除成功',
      }
      return
    }
    const data = await ctx.service.question.deleteQuestionById(id)
    ctx.body = {
      data,
    }
  }

  async updateQuestion() {
    const { ctx } = this
    const { id, answer } = ctx.request.body
    const res = await ctx.service.question.updateAnswer(id, answer)
    ctx.body = {
      data: res,
    }
  }
}
