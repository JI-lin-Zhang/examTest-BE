import { Controller } from "egg";
import NodeKeycloak from "node-keycloak";

export class BaseController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  public async isAdmin() {
    const { ctx } = this;
    const { authorization } = ctx.request.headers;
    const { active } = await NodeKeycloak.introspect((authorization as string ?? "").slice(7));
    return active
  }

  public async needAdmin() {
    const isAdmin = await this.isAdmin()
    if(isAdmin) return false
    this.ctx.status = 401
    this.ctx.body = { url: await NodeKeycloak.authorizationUrl() }
    return true
  }
}