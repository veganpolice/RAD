const Twilio = require('twilio');

const {
  MessagingResponse,
} = Twilio.twiml;

const client = new Twilio(accountSid, authToken);

const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

module.exports = TextEngine = () => {
  return {
    sendText: (body, to, callback) => {
      client.messages.create({
          body, //Text of body of text
          to, // Text this number
          from: '+17787159119' // From a valid Twilio number
        })
        .then((message) => {
          callback(null, message.sid);
        })
        .catch((err) => {
          callback(err);
        });
    },
    TextReceiver: (message, callback) => {
      const twiml = new MessagingResponse();
      twiml.message(message);
      callback(null, req.body.Body);
    },
  }
};
