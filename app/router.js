'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/_eggnest/config', controller.config.post);
  router.get('/api/_eggnest/query/:database', controller.query.query);
  // router.get('/write',controller.home.write);
  //===============================================================
  router.get('/api/v1/:database/:schema/:table', controller.table.get);
  router.post('/api/v1/:database/:schema/:table', controller.table.post);
  router.put('/api/v1/:database/:schema/:table', controller.table.put);
  router.delete('/api/v1/:database/:schema/:table', controller.table.delete);
  //===============================================================
};
