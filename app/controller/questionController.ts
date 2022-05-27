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
   * @Router GET /question
   * @Request query string tag eg:"?id=b4ff9-23rhoa ?tag=frontend" 获取一个问题或问题列表
   */

  async get() {
    const { ctx } = this
    const { id, tag } = ctx.request.query
    if (id) {
      const data = await ctx.service.question.findQuestionById(id)
      ctx.body = {
        data,
      }
      return
    }
    if (tag) {
      const data = await ctx.service.question.getQuestionsByTag(tag)
      if (data.err) {
        ctx.body = {
          err: data.err,
        }
        return
      }
      ctx.body = {
        data,
      }
      return
    }
    const data = await ctx.service.question.getAllQuestions()
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

  /**
   * @Router PUT /question
   * @Request body questionPut *desc title, tag, answer, choices至少提供一项
   */
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
      choices: Joi.array().items(Joi.string()).error(new Error('选项格式不正确')),
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
