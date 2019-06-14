const RSS = require('rss');
const trending = require('../lib/trending-github');

module.exports = ({ feedTtl }) => [
  'get',
  [
    '/trending',
    async (req, res) => {

      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }

      const feed = new RSS({
        title: 'GitHub trending',
        description: 'The trending repositories on GitHub sort by stars on daily base',
        feed_url: 'http://' + host + url,
        image_url: 'http://' + host + '/img/github-logo.png',
        site_url: 'http://github.com/trending',
        ttl: feedTtl.asMinutes(),
      });

      const repos = await trending();
      for (const repo of repos) {
        feed.item({
          title: repo.name,
          description: repo.description,
          url: repo.href,
          categories: [repo.language],
          author: repo.author,
        });
      }

      res.set('Content-Type', 'application/rss+xml');
      res.send(feed.xml({ indent: true }));
    },
  ],
];
