const duration = require('@dnode/duration');

require('@dnode/env');
require('@dnode/express')((app, express) => {
  app.engine('handlebars', require('express-handlebars').create({
    defaultLayout: 'main',
  }).engine);
  app.set('view engine', 'handlebars');

  require('@dnode/middlewares')(app, [
    express.static('www'),
  ]);

  require('@dnode/controllers')(app, [
    require('./controllers/home')(),
    require('./controllers/rssfeed')({
      feedTtl: duration(process.env.FEED_TTL || '1 hour'),
    }),
  ]);
});
