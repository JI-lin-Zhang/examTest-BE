import { Controller } from 'egg'

/**
 * @Controller user
 */
export default class UserController extends Controller {
  async register() {
    const { ctx } = this
    const { username, email, phone } = ctx.request.body
    if (username) {
      const createUserRes: any = await ctx.service.user.createUser({ username, email, phone })
      if (createUserRes?.meta?.target) {
        ctx.body = {
          err: `提交失败。 ${createUserRes.meta.target} 已经存在了。`,
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
   * @Router GET /users
   * @Request query string page eg:"?page=1" 获取用户列表
   */
  async users() {
    const { ctx } = this
    const getUsersRes: any = await ctx.service.user.getAllUsers()
    if (getUsersRes.err) {
      ctx.body = {
        err: '查找失败。',
      }
      return
    }
    ctx.body = {
      data: getUsersRes,
    }
  }

  /**
   * @Router POST /user
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 查找 user
   */

  async user() {
    const { ctx } = this
    const { id } = ctx.request.body
    const data = await ctx.service.user.findUserById(id)
    ctx.body = {
      data,
    }
  }

  /**
   * @Router POST /deleteUser
   * @Request body string *id eg:{"id":"933e6c25-557a-4255-8e6f-92d8ff76683f"} 删除 user
   */
  async deleteUser() {
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

  async updateUserScore() {
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
}
