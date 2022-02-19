const nunjucks = require('nunjucks');
const WithExtension = require('@allmarkedup/nunjucks-with');
const { readFile } = require('fs').promises;
const Util = require('./util.cjs');

module.exports = {
  async modifyData(payload = {}, filePath) {
    let data = {
      errors: [],
      ...payload
    };

    try {
      const handleData = await readFile(filePath, 'utf-8');
      data = {
        ...data,
        ...Util.applyDataWithFn(handleData, data)
      };
    } catch (err) {
      data.errors.push(err);
    } finally {
      return data;
    }
  },
  renderNjk(template = '', data = {}) {
    const env = nunjucks.configure('source', { autoescape: false });
    env.addExtension('WithExtension', new WithExtension());
    env.addGlobal('getContext', function () {
      return this.ctx;
    });
    env.addGlobal('getGlobal', (key) => data[key]);
    env.addFilter('keys', Object.keys);
    for (const utilName of Object.keys(Util)) {
      env.addFilter(utilName, Util[utilName]);
    }

    return nunjucks.renderString(template, data);
  }
};