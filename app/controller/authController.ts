import { Controller } from 'egg';
import moment from 'moment';
import NodeKeycloak from 'node-keycloak';
import { keyCloakConfig } from '../../local-config';

export default class AuthController extends Controller {
  async auth(){
    await NodeKeycloak.configure(keyCloakConfig);
    const url = await NodeKeycloak.authorizationUrl();
    this.ctx.body = { data: url };
  }

  async callback(){
    const { session_state, code } = this.ctx.request.query;
    const res = await NodeKeycloak.callback({
      code,
      session_state
    });
    const expireTime = res.expires_at! * 1000;
    if(moment(expireTime).isAfter(moment())){
      this.ctx.body = { data: res };
    } else {
      this.ctx.body = { data: 'token已过期，请重新登录！' };
    }
  }
}