# Routes

## Create 
POST /cart                                 /add a smoothie to cart/    U. sees cart quanity increase 
POST /order                                /submit order/              Server recieves order: cart and user info

## Read
GET /                                      /show home page/             
GET /cart                                  /show shopping cart/        U. sees all itmes in cart
GET /order                                 /helps user nav to order/   U. can input order ID
GET /order/:id                             /show confirmation/         U. sees order confirmation
GET /smoothie                              /show smoothie menu/        U. sees menu

## Update
POST /cart                                 /update quantity/           U. sees quanity of smoothie in cart change

## Delete
GET /cart                                  /remove an item/            U. sees smoothie cart without smoothie


## ...Stretch
POST /smoothie                             /add a smoothie/            U. creates a custom smoothie
GET  /smoothie/:id                         /show smoothie's details/   U. sees a smoothies details