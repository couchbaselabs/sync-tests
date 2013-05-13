$(function() {
  var config = require('./app/config'),
    controller = require("./app/controller"),
    sync = require('./app/sync'),
    // libraries
    coax = require("coax"),
    touchlink = require("./touchlink"),
    fastclick = require("fastclick"),
    router = require("./routes-element");

  new fastclick.FastClick(document.body);

  var testServer = "http://lite.couchbase./",
      testDb = "testdb";

  describe('couchbase lite', function() {
      it('should be reachable', function() {
          coax.get(testServer, function(err, ok) {
              console.log(err, ok)
          })
      })
  })

});
