# RAD
**R**achel, **A**aron and **D**avid's project


For our Midterm Group Project, we've chosen to go with the Food Pick-up Ordering option. RAD is a smoothie pick-up mobile first full stack appplication. Thirsty clients can visit our smoothie store and place an order. Using Twilio's API, customers will receive an SMS notification confirming their order and also a notification when their order is ready. 

Our stack: 
- Node
- Express
- jQuery
- SASS
- AJAX
- Bootstrap
- PostgreSQL
- Knex.js
- git 
- Heroku

## Final Product 
!["About me page (pt.1)"](https://github.com/aaronrbg/RAD/blob/master/screenshots/radsmoothies%20homepage.png)
!["Menu page"](https://github.com/aaronrbg/RAD/blob/master/screenshots/menu.png)
!["Cart page"](https://github.com/aaronrbg/RAD/blob/master/screenshots/cart.png)
!["Checkout modal"](https://github.com/aaronrbg/RAD/blob/master/screenshots/checkout-modal.png)
!["Confirmation page"](https://github.com/aaronrbg/RAD/blob/master/screenshots/order-confirmation.png)

## Getting Started in Dev Mode

1. Clone this repository.
2. Install dependencies using the `npm install` command.
3. Run:
  - `npm rebuild node-sass`
  - `npm run knex migrate:latest`
  - `npm run knex seed:run`
4. Check .env_example and fill TWILIO fields with authentication keys from https://twilio.com
5. Start the web server using the `npm run local` command
5. Go to http://localhost:8080/ in your browser.

## Dependencies

- Express 
- EJS
- jQuery
- Node-sass middleware
- PostgreSQL
- Twilio API 
- Knex
- Moment
- DOTenv
- Cookie parser
- Cookie session
- Morgan
- Google libphonenumber 