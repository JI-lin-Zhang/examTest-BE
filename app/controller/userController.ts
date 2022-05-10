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
      if (createUserRes) {
        ctx.body = {
          err: `提交失败。 ${createUserRes.meta.target} 已经存在了。`,
        }
        return
      }
      ctx.body = {
        data: `提交成功。 ${username} ${email} ${phone}`,
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
}
