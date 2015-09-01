Package.describe({
    summary: "A super-lightweight toolkit to add support for Context.io to your Meteor App.",
    version: "0.0.1",
    name: "zeroasterisk:contextio-simple",
    git: "https://github.com/zeroasterisk/meteor-contextio-simple.git"
});

Npm.depends({
  // TEMP waiting on contextio to pull in PR
  // https://github.com/contextio/ContextIO-node/pull/20
  // "contextio": "0.4.0"
  "contextio-temp": "0.4.0"
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');
    api.use('reactive-var');
    api.use('underscore');

    // API
    api.export('Cio', 'server');
    api.addFiles('contextio_server.js', 'server');

});

Package.onTest(function (api) {
    api.use('zeroasterisk:contextio-simple');
    api.use('tinytest');
    api.addFiles('contextio_server_test.js', ['client', 'server']);
});
