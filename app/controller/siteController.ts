import { BaseController } from "./BaseController"

/**
 * @Controller Site 站点管理
 */
export default class SiteController extends BaseController {
  /**
   * @Router GET /site/info
   * @Summary 获取网站相关配置
   * @Request query string *cfgkey 可选值：info|tags
   */
  async getInfo() {
    const { ctx } = this
    const data = await this.service.site.getConf(ctx.query.cfgkey || "info")
    ctx.body = { data }
  }

  /**
   * @Router PUT /site/info
   * @Summary 更新网站相关配置
   * @Request body SiteSetInfo *cfgkey cfgkey: info|tags, cfgval: {}
   * @Description cfgkey: 需要更新的键名，可选值：info|tags<br />cfgval: 需要提供与 cfgkey 匹配的 JSON 配置内容。
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