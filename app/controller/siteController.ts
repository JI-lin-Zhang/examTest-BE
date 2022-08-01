import { BaseController } from "./BaseController"

/**
 * @Controller Site 站点管理
 */
export default class SiteController extends BaseController {

  async getSiteInfo() {
    const { ctx } = this
    const data = await this.service.site.getConfig()
    ctx.body = { data }
  }

  async setSiteInfo() {
    if(await this.needAdmin()) return
    const { ctx } = this
    const { id, ...data } = ctx.request.body;

    try {
      await this.service.site.setConfig(id, data);
      ctx.body = {
        data: {
          msg: "更新成功"
        }
      };
    } catch (err) {
      ctx.body = {
        data: {
          msg: "err"
        }
      };
    }
  }
}