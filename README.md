# RAD Smoothies

See RAD smoothies live on [Heroku](http://radsmoothies.herokuapp.com).
## Authors

* Rachel [@rachwongrw](https://github.com/rachwongrw/)
* Aaron [@aaronrbg](https://github.com/aaronrbg/)
* David [@fiveache](https://github.com/fiveache/)

**RAD** is an acronym of **R**achel, **A**aron and **D**avid

## Description
RAD Smoothies was built for a midterm full-stack group project. We chose to build a food pick-up ordering interface for a smoothie shop. RAD Smoothies is mobile-first in its design. Thirsty clients can visit our smoothie store and place an order. RAD smoothies communicates with [Twilio](https://www.twilio.com/)'s REST API. Our customers interact with the web app, whereas the restaurant interface strictly through SMS.

We built a chatbot around researched user stories and prototyped user and restaurant interactions using SMS as an interface (a tech both end-users have). Our chatbot is built to communicate with RAD Smoothie's POST routes in order to retrieve order data from a psql database and serve them back to [Twilio](https://www.twilio.com/)’s REST API. tl;dr it is returning some feedback to the user and restaurant based on parsed JSON data.

## Tech Stack:
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

## APIs
- [Twilio](https://www.twilio.com/)

## Screenshots
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
