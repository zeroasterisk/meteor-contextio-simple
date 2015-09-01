Context.IO API NPM Wrapper for Meteor

* https://github.com/meteor/meteor
* https://github.com/contextio/ContextIO-node
* https://github.com/contextio/ContextIO-node/blob/master/lib/ContextIO.js

Inspired heavily by

* https://github.com/rapito/meteor-contextio/


## Installation

- Simply add via console

 ```
 meteor add zeroasterisk:contextio-simple
 ```
- Setup **cio** credentials on your meteor project ```settings.json``` file.

## Usage

  ```js
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
  ```

#### Usage Advanced

Want more control?  More Power?  Less of my intent?

Use the package this is a derivitive of:
https://raw.githubusercontent.com/rapito/meteor-contextio/
