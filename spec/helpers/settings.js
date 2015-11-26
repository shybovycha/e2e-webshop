var webdriverio = require('webdriverio');

var timeout = 10 * 1000;
var config = {
  "desiredCapabilities": {
    "browserName": "chrome",
    "host": "localhost",
    "port": 9876
  },
  "baseUrl": "http://localhost:8000"
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 2 * timeout;

beforeAll(function (done) {
    this.client = webdriverio
        .remote(config)
        .init()
        .url('/')
        .call(done);
});

afterAll(function (done) {
    this.client.end(done);
});

exports.webdriverio = webdriverio;
exports.config = config;
exports.timeout = timeout;
exports.baseUrl = config.baseUrl;