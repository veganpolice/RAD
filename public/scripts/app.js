$(() => {
  $('.add-to-cart').click((event) => {
    const smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: {
        smoothieId
      },
    });
  });

  $('.increase-quantity').click((event) => {
    const smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: {
        smoothieId
      },
    }).then((results) => {
      // We're going to update some fields!
      console.log(results);
    });
  });

  $('.decrease-quantity').click((event) => {
    const smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: {
        smoothieId
      },
    }).then((results) => {
      // We're going to update some fields!
      console.log(results);
    });
  });

  $('.order').click((event) => {
    // Probably prevent default
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
