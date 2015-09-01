// https://github.com/contextio/ContextIO-node/blob/master/lib/ContextIO.js
var ContextIO = Npm.require('contextio-temp');

Cio = {
  api: null,
  accountId: null,
  setup: function (key, secret) {
    this.accountId = null;
    return this.api = new ContextIO.Client({
      key: key,
      secret: secret
    });
  },
  // Shared method to choose whether to do an Async o
  // Sync call the the specified function
  callAsyncOrSync: function(func, params, cb) {
    if (!cb) {
      asyncFunc = Meteor.wrapAsync(func)
      return asyncFunc(params);
    }
    return func(params, cb);
  },
  createAccount: function(primaryEmailAddress, firstName, lastName, cb) {
    params = {email: primaryEmailAddress, first_name: firstName, last_name: lastName};
    return this.callAsyncOrSync(
      Cio.api.accounts().post,
      params,
      cb
    );
  },
  addMailbox: function(accountId, cbURL, cb) {
    params = {callback_url: cbURL};
    return this.callAsyncOrSync(
      Cio.api.accounts(accountId).connectTokens().post,
      params,
      cb
    );
  },
  deleteAccount: function(accountId, cb) {
    return this.callAsyncOrSync(
      Cio.api.accounts(accountId).delete,
      {},
      cb
    );
  },
  // https://context.io/docs/lite/users/connect_tokens
  connectTokens: function(accountId, token, cb) {
    return this.callAsyncOrSync(
      Cio.api.accounts(accountId).connectTokens(token).get,
      null,
      cb
    );
  },
  // https://context.io/docs/lite/users/email_accounts/folders
  folders: function(accountId, emailAccountLabel, cb) {
    return this.callAsyncOrSync(
      Cio.api
      .accounts(accountId)
      .sources(emailAccountLabel)
      .folders()
      .get,
      null,
      cb
    );
  },
  // https://context.io/docs/2.0/accounts/messages
  // TODO consider switching this to async ?
  messages: function(accountId, emailAccountLabel, cb) {
    //console.log(accountId, emailAccountLabel);
    return this.callAsyncOrSync(
      Cio.api
      .accounts(accountId)
      .messages()
      .get,
      null,
      cb
    );
  },
  // https://context.io/docs/2.0/accounts/messages
	// get all messages for a folder
  // TODO consider switching this to async ?
  messagesInFolder: function(accountId, emailAccountLabel, folderName, cb) {
    //console.log(accountId, emailAccountLabel);
    return this.callAsyncOrSync(
      Cio.api
      .accounts(accountId)
      .sources(emailAccountLabel)
      .folders(folderName)
      .messages()
      .get,
      null,
      cb
    );
  },
  // https://context.io/docs/2.0/accounts/messages/body
  // TODO consider switching this to async ?
  messageBody: function(accountId, messageId, cb) {
    //console.log(accountId, messageId);
    return this.callAsyncOrSync(
      Cio.api
      .accounts(accountId)
      .messages(messageId)
      .body()
      .get,
      null,
      cb
    );
  }
};
