import { Controller } from 'egg'

/**
 * @Controller home
 */
export default class HomeController extends Controller {
  /**
   * #swagger-api
   *
   * @function index
   */
  public async index() {
    const { ctx } = this
    await ctx.render('index.html')
    // ctx.body = await ctx.service.test.home();
  }

}
