import { BaseController } from './BaseController'

/**
 * @Controller user
 */
export default class UserController extends BaseController {
  async add() {
    const { ctx } = this
    const { username, email, phone } = ctx.request.body
    if (username) {
      const createUserRes: any = await ctx.service.user.createUser({ username, email, phone })
      if (createUserRes?.meta) {
        ctx.status = 400
        ctx.body = {
          message: '用户已经存在了',
        }
        return
      }
      ctx.body = {
        data: createUserRes,
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '获取失败',
      }
    }
  }

  /**
   * @Router GET /user
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 查找 user
   */

  async find() {
    const { ctx } = this
    const query = ctx.query
    if(await this.needAdmin()) return
    if (query.id) {
      const data = await ctx.service.user.findUserById(query.id)
      ctx.body = {
        data: { list: data ? [ data ] : [], totalCount: data ? 1 : 0 },
      }
      return
    }
    const obj = { ...query, username: { contains: query.username ?? '' }, size: ~~query.size || 10, page: ~~query.page }
    const data = await ctx.service.user.findUser(obj)
    ctx.body = {
      data,
    }
  }

  /**
   * @Router DELETE /user
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 删除 user
   */
  async delete() {
    if(await this.needAdmin()) return
    const { ctx } = this
    const { id } = ctx.request.body
    if (Array.isArray(id)) {
      id.forEach(async (i: string) => await ctx.service.user.deleteUserById(i))
      ctx.body = {
        data: '批量删除成功',
      }
      return
    }
    const data = await ctx.service.user.deleteUserById(id)
    ctx.body = {
      data,
    }
  }

  async updateScore() {
    const { ctx } = this
    const { id, score } = ctx.request.body
    const userData = await ctx.service.user.findUserById(id)
    if (userData && userData.score) {
      ctx.body = {
        err: '已经提交过了',
      }
      return
    }
    const newScore = await ctx.service.user.submit(id, score)
    const scoreMsg = `分数是 ${newScore}`
    ctx.body = {
      data: scoreMsg,
    }
  }

  // 查询当天参加考试题的人数
  async getTodayUser() {
    const { ctx } = this
    const todayTotal = await ctx.service.user.getTodayUser()
    ctx.body = {
      data: todayTotal,
    }
  }

  async getLastSevenDay() {
    const { ctx } = this
    const lastSevenDay = await ctx.service.user.lastSevenDay()
    ctx.body = {
      data: lastSevenDay,
    }
  }
}
