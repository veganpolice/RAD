const Twilio = require('twilio');

const {
  MessagingResponse,
} = Twilio.twiml;

const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const client = new Twilio(accountSid, authToken);
module.exports = TextEngine = () => {
  return {
    sendText: (body, to, callback) => {
      console.log(body, to);
      client.messages.create({
          to, // Text this number
          from: fromNumber, // From a valid Twilio number
          body, //Text of body of text
        })
        .then((message) => {
          callback(null, message.sid);
        })
        .catch((err) => {
          console.log('error', err);
          callback(err);
        });
    }
  }
};
