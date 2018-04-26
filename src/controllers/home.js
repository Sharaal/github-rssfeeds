module.exports = () => [
  'get',
  [
    '/',
    async (req, res) => {
      const host = req.get('host');
      let url = '';
      if (req.originalUrl !== '/') {
        url = req.originalUrl;
      }
      res.render('home', { host, url });
    },
  ],
];
