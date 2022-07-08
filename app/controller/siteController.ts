import { BaseController } from "./BaseController"

/**
 * @Controller Site
 */
export default class SiteController extends BaseController {
  /**
   * @Router GET /site/info
   * @Request query cfgkey * 可选值有：info, tags
   */
  async getInfo() {
    const { ctx } = this
    const data = await this.service.site.getConf(ctx.query.cfgkey || "info")
    ctx.body = { data }
  }

  /**
   * @Router PUT /site/info
   * @Request body string * cfgkey:info|tags, cfgval:{}
   */
  async setInfo() {
    if(await this.needAdmin()) return
    const { ctx } = this
    await ctx.service.site.setConf(ctx.request.body.cfgkey, ctx.request.body.cfgval)
    ctx.body = {
      data: {
        msg: "设置成功"
      }
    }
  }
}