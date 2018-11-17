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
      $(event.target.parentElement).children('.smoothie-quantity').text(results);
      const priceElement = $(event.target.parentElement).parent().parent().children('span.item-row').children('span.price');
      const oldPrice = parseFloat(priceElement.text().match(/[\d\.]+/));
      const pricePerUnit = oldPrice / (results - 1);
      const newPrice = pricePerUnit * results;
      priceElement.text(new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(newPrice));
      calculateTotalPrice();
    });
  });

  $('.decrease-quantity').click((event) => {
    const smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/rmvFromCart",
      data: {
        smoothieId
      },
    }).then((results) => {
      // We're going to update some fields!
      // results -1 means there are no items in the cart:
      if (results === -1) {
        $('button.checkout-btn').remove();
      }
      if (results <= 0) {
        $(event.target.parentElement).parent().parent().remove();
      } else {
        $(event.target.parentElement).children('.smoothie-quantity').text(results);
        const priceElement = $(event.target.parentElement).parent().parent().children('span.item-row').children('span.price');
        const oldPrice = parseFloat(priceElement.text().match(/[\d\.]+/));
        const pricePerUnit = oldPrice / (results + 1);
        const newPrice = pricePerUnit * results;
        priceElement.text(new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD'
        }).format(newPrice));
      }
      calculateTotalPrice();
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


  const calculateTotalPrice = () => {
    const prices = $('span.price');
    let totalPrice = 0;
    for (let i = 0; i < prices.length; i++) {
      totalPrice += parseFloat($(prices[i]).text().match(/[\d\.]+/));
    }
    const formatedPrice = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(totalPrice);
    $('span.total-price').text(formatedPrice);
  }
  calculateTotalPrice();

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
