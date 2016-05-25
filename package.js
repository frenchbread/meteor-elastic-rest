Package.describe({
    name: 'frenchbread:elastic-rest',
    version: '2.0.2',
    summary: "Wrapper for Elastic REST API.",
    git: 'https://github.com/frenchbread/meteor-elastic-rest',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use(['ecmascript'])
    api.mainModule('server/elastic-rest.js', 'server');
});

Npm.depends({
  elasticsearch : '11.0.1'
});
