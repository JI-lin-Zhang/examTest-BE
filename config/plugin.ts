import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc'
  },
  /* swaggerEgg: {
    enable: true,
    package: 'swagger-egg'
  }, */
  validate: {
    enable: true,
    package: 'egg-validate'
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  }
};

export default plugin;
