import prisma from '../../utils/db'
import { Service } from 'egg'

export default class SiteController extends Service {

  public async getConf(cfgkey: string) {
    let data = await prisma.siteconf.findUnique({
      where: { cfgkey },
      select: { cfgval: true }
    })
    if(data !== null) return JSON.parse(data.cfgval)
    // 生成默认值
    switch(cfgkey) {
      case "info": return {
        corpName: "长沙丰林信息科技有限公司",
        siteNo: "湘ICP备05009306号",
        contactTel: "",
        contactAddr: "长沙高新开发区谷苑路229号海凭园2栋D座1001",
      }
      case "tags": return [
        { tag: "react", name: "React" },
        { tag: "nodejs", name: "NodeJS" },
        { tag: "dotnet", name: ".NET" },
      ]
    }
    return {}
  }

  public async setConf<T>(cfgkey: string, data: T) {
    const cfgval = JSON.stringify(data)
    const info = await prisma.siteconf.findUnique({
      select: { cfgval: true },
      where: { cfgkey },
    })
    if(info !== null) await prisma.siteconf.update({
      where: { cfgkey }, data: { cfgval }
    })
    // 没有数据时初始化
    else await prisma.siteconf.create({
      data: { cfgkey, cfgval }
    })
  }
}