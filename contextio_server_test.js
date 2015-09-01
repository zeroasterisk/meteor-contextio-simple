
Tinytest.add('Cio - setup', function(test) {
  if (Meteor.isClient) {
    test.equal(typeof Cio, "undefined", "Cio export not there");
  }
  if (Meteor.isServer) {
    test.equal(typeof Cio, "object", "Cio export");
    test.equal(typeof Cio.setup, "function", "Cio export setup function");
  }
});

if (Meteor.isServer) {
  Cio.setup(
    "xxxxx",
    "xxxxx"
  );

  var user = {
    mail: "bob.gut@hotmail.com",
    name: "Bob",
    lastname: "Gut"
  };

  console.log('Cio');
  console.log(Cio);
  Tinytest.add('Cio - add account and mailbox', function(test) {
    var res = Cio.createAccount(user.mail, user.name, user.lastname);

    console.log(res);
    test.equal(typeof err, "undefined");
    test.equal(typeof res, "object");
    test.equal(typeof res.body, "object");
    test.isTrue(res.body.success);
    test.equal(typeof res.body.id, "string");

    var accountId = res.body.id;

    var res = Cio.addMailbox(accountId, 'http://localhost/');
    console.log(res);
    test.equal(typeof err, "undefined");
    test.equal(typeof res, "object");
    test.equal(typeof res.body, "object");
    test.isTrue(res.body.success);
    test.equal(typeof res.body.browser_redirect_url, "string");

    Cio.deleteAccount(accountId);

  });
}

