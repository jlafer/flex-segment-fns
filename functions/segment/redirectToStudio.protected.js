exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  console.log(event);
  accountSID = context.ACCOUNT_SID;
  flowSID = event.flowSID;

  const url = `https://webhooks.twilio.com/v1/Accounts/${accountSID}/Flows/${flowSID}`;

  twiml.redirect({
      method: 'POST'
  }, url);
  callback(null, twiml);
}

