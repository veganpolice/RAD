# Routes

## Create 
POST /orders/new                           /submit order with form body data, redirect to .orders/:id

## Read
GET /                                      /show home page/             
GET /orders/new                            /show order, populated from user cookie session menu
GET /orders/:id                            /show confirmation/         U. sees order confirmation
GET /smoothies                             /show smoothie menu/        U. sees menu

## Update
PUT /orders/:id                            /update quantity of items in cart

## Delete
DELETE /orders/:id                         /cancels order

## ...Stretch
POST /smoothies                            /add a smoothie/            U. creates a custom smoothie
GET  /smoothies/:id                         /show smoothie's details/   U. sees a smoothies details