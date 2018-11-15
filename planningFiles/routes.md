# Routes

## Create 
POST /orders/new            INSERT into databse orders 

## Read
GET /                       static html                      
GET /orders/new             get shopping cart json object data from /smoothies and populate form   
GET /orders/:id             SELECT database orders      
GET /smoothies              SELECT database smoothies   

## Update

## Delete
DELETE /orders/:id          updates order status in DB to cancelled 

## ...Stretch
POST /smoothies                           
GET  /smoothies/:id                        


# Full-page

## /smoothies

GET     /               [ ?json=true ]
GET     /:id
POST    /

## /orders

GET     /
GET     /new
POST    /
DELETE  /:id


# API / JSON / AJAX / you know what I mean

## /api/smoothies

GET /

##/api/orders

GET /

