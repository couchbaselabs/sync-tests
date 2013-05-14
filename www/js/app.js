$(function() {
  var coax = require("coax"),
    test = require("tape");

  var syncGateway = "http://localhost:4984/test"
      testServer = coax("http://lite.couchbase./"),
      testDb = testServer("testdb"),
      syncCopy = testServer("testcopy");

  test("couchbase lite is reachable", function(t) {
    console.log("tappin", t)
    testServer.get(function(err, info) {
      t.ok(!err)
      t.equal(info.couchdb, "Welcome")
      t.end()
    });
  });

  test("create database for sync", function(t) {
    // testDb.del(function(err, ok) {
    //   if (err) {
    //     t.equal(err.status, 404)
    //   }
      testDb.put(function(err, ok) {
        if (err) {
          t.equal(err.error, "file_exists")
        }
        t.end()
      });
    // })

  });

  test("load data", function(t) {
    var docs = [];
    for (var i = 35; i >= 0; i--) {
      docs.push({_id:i.toString(36), i:i});
    };
    testDb.post("_bulk_docs", {docs:docs}, function(err, ok) {
      console.log("_bulk_docs", err, ok)
      t.end()
    });
  });

  test("sync to sync_gateway", function(t) {
    testServer.post("_replicate", {
      source : "testdb",
      target : syncGateway,
      continuous : true
    }, function(err, sync) {
      t.ok(!err)
      var pollStatus = setInterval(function() {
        testServer.get("_active_tasks", function(err, ok) {
          var task;
          for (var i = ok.length - 1; i >= 0; i--) {
            if (ok[i].task == sync.session_id) {
              task = ok[i];
            }
          };
          if (task.status == "Idle") {
            clearInterval(pollStatus);
            t.end();
          }
        })
      },200);
    })
  })

  test("create empty database for copying", function(t) {
    // testDb.del(function(err, ok) {
    //   if (err) {
    //     t.equal(err.status, 404)
    //   }
      syncCopy.put(function(err, ok) {
        if (err) {
          t.equal(err.error, "file_exists")
        }
        t.end()
      });
    // })

  });


  test("sync from sync_gateway", function(t) {
    t.end()
  })

  test("verify data", function(t) {
    t.end()
  })

});
