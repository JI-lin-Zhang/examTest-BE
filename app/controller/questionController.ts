import { Controller } from 'egg'
import { questionFace } from '../../constants/interfaces'
import Joi from 'joi'

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
    const { title, answer, tag, choices } = ctx.request.body
    if (title) {
      const res: any = await ctx.service.question.createQuestion({ title, answer, tag, choices })
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
   * @Request body string *tag eg:{"tag":"frontend"} 根据tag查找 question
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
   * @Router GET /question
   * @Request query string page eg:"?id=b4ff9-23rhoa" 获取问题列表
   */

  async get() {
    const { ctx } = this
    const { id } = ctx.request.query
    if (id) {
      const data = await ctx.service.question.findQuestionById(id)
      ctx.body = {
        data,
      }
      return
    }
    ctx.body = {
      err: '请提供题目的 id',
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

  async update() {
    const { ctx } = this
    const { id, data } = ctx.request.body
    const keys = Object.keys(data as Partial<questionFace> ?? {})
    if (!data || keys.length === 0) {
      ctx.body = {
        err: '请提交要更新的字段',
      }
      return
    }
    const schema = Joi.object({
      answer: Joi.number().error(new Error('答案格式不正确')),
      title: Joi.string().error(new Error('问题格式不正确')),
      choices: Joi.string().error(new Error('选项格式不正确')),
      tag: Joi.string().error(new Error('标签格式不正确')),
    })
    try {
      const value = await schema.validateAsync(data)
      const res = await ctx.service.question.update(id, value)
      ctx.body = {
        data: res,
      }
    } catch (err) {
      ctx.body = {
        err: `${err}`,
      }
    }
  }
}
