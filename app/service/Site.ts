import prisma from '../../utils/db'
import { Service } from 'egg'
import { ISiteInfo } from '../../constants/interfaces'

export default class SiteController extends Service {

  public async getConfig() {
    let config = await prisma.siteConfig.findFirst();
    if(!config){
      await prisma.siteConfig.create({
        data: {
          companyName: '',
          siteNo: '',
          contactTel: '',
          address: '',
          tag: [],
        }
      });
      return await prisma.siteConfig.findFirst();
    }
    return config;
  }

  public async setConfig(id: string, siteInfo: ISiteInfo) {
    await prisma.siteConfig.update({
      where: {
        id: id
      },
      data: {
        companyName: siteInfo.companyName,
        siteNo: siteInfo.siteNo,
        contactTel: siteInfo.contactTel,
        address: siteInfo.address,
        tag: siteInfo.tag,
      }
    })
  }
}