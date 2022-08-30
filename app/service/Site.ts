import prisma from '../../utils/db'
import { Service } from 'egg'
import { ISiteInfo } from '../../constants/interfaces'

export default class SiteController extends Service {

  public async getConfig() {
    let config = await prisma.site_config.findFirst();
    if (!config) {
      await prisma.site_config.create({
        data: {
          companyName: '长沙丰林信息科技有限公司',
          siteNo: '',
          contactTel: '',
          address: '',
          tag: ["react", "node", "dotnet"],
          theme: '主题1',
          themeList: ["主题1", "主题2", "主题3"],
        }
      });
      return await prisma.site_config.findFirst();
    }
    return config;
  }

  public async setConfig(id: string, siteInfo: ISiteInfo) {
    await prisma.site_config.update({
      where: {
        id: id
      },
      data: {
        companyName: siteInfo.companyName,
        siteNo: siteInfo.siteNo,
        contactTel: siteInfo.contactTel,
        address: siteInfo.address,
        tag: siteInfo.tag,
        theme: siteInfo.theme,
      }
    })
  }
}