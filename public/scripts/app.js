$(() => {
  $.ajax({
    method: "GET",
    url: "/api/smoothies"
  }).done((smoothies) => {
    for(smoothie of smoothies) {
      $("<div>").text(smoothie.description).appendTo($("body"));
    }
  });;

  $('.add-to-cart').click( () => {
    console.log('button clicked');
    const smoothieId = $(this).data('smoothieId');
    //populating body of request with smoothie id from html data attribute
      $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: smoothieId
    })
  });

  $('.rmv-from-cart').click( () => {
    console.log('button clicked');
    const smoothieId = $(this).data('smoothieId');
    //populating body of request with smoothie id from html data attribute
     $.ajax({
     method: "POST",
     url: "/api/smoothies/rmvFromCart",
     data: smoothieId
   })
  });

  $('.order').click( () => {
    //prevent default behaviour
    console.log('button clicked');
     $.ajax({
     method: "POST",
     url: "/orders"
   })
  });

});

      //on cart submit
//FUNCTION createOrderObject
//-declaire object
//-assign form values to object keys

      //on car page load
//FUNCTION fillInCartForm
//on page load
//-parse cookie as json
//-for each key, fill in form data

