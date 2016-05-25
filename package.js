Package.describe({
    name: 'frenchbread:elastic-rest',
    version: '2.1.0',
    // Brief, one-line summary of the package.
    summary: "Wrapper for Elastic REST API.",
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/frenchbread/meteor-elastic-rest',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(["meteorhacks:npm@1.5.0"]);
    api.addFiles('server/elastic-rest.js');
    api.export("ElasticRest", ['server']);
});

Npm.depends({
    "elasticsearch" : "10.0.1"
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('frenchbread:elastic-rest');
    api.addFiles('tests/elastic-rest-tests.js');
});
