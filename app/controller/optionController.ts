import { Controller } from 'egg'

/**
 * @Controller option
 */
export default class OptionController extends Controller {
  async add() {
    const { ctx } = this
    const { text, questionId } = ctx.request.body
    if (text) {
      const res: any = await ctx.service.option.create({ text, questionId })
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
   * @Router GET /options
   * @Request query string page eg:"?questionId=xxx" 获取选项列表
   */
  async options() {
    const { ctx } = this
    const res: any = await ctx.service.option.getAll()
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
   * @Router POST /option
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 查找 option
   */

  async option() {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.option.findById(id)
    ctx.body = {
      data,
    }
  }

  /**
   * @Router DELETE /option
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 删除 option
   */
  async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (Array.isArray(id)) {
      id.forEach(async (i: string) => await ctx.service.option.deleteById(i))
      ctx.body = {
        data: '批量删除成功',
      }
      return
    }
    const data = await ctx.service.option.deleteById(id)
    ctx.body = {
      data,
    }
  }

  async update() {
    const { ctx } = this
    const { id, text } = ctx.request.body
    const res = await ctx.service.option.updateText(id, text)
    ctx.body = {
      data: res,
    }
  }
}
