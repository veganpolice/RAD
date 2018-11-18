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
    const formatedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(totalPrice);
    $('span.total-price').text(formatedPrice);
  }
  calculateTotalPrice();

  });



  /*
	Add to cart fly effect with jQuery. - May 05, 2013
	(c) 2013 @ElmahdiMahmoud - fikra-masri.by
	license: https://www.opensource.org/licenses/mit-license.php
  */ 
  $('.add-to-cart').on('click', function () {
    const cart = $('.shopping-cart');
    console.log('!!!', cart);
    const imgtodrag = $(event.target).parent().parent().find("img").eq(0);
    console.log('!!!!!!', imgtodrag);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
            .css({
            // 'opacity': '0.5',
                'position': 'absolute',
                // 'height': '25%',
                // 'width': '25%',
                'z-index': '100'
        })
            .appendTo($('body'))
            .animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
                'width': 25,
                'height': 50
        }, 1000, 'easeOutExpo');

        function shake(div) {
          var interval = 100;
          var distance = 10;
          var times = 3;
  
          $(div).css('position', 'relative');
  
          for (var iter = 0; iter < (times + 1) ; iter++) {
              $(div).animate({
                  top: ((iter % 2 == 0 ? distance : distance * -1))
              }, interval);
          }                                                                                                          
          $(div).animate({ top: 0 }, interval);
      }
        
        setTimeout(function () {
            console.log(cart)
            shake(cart);
            
            // effect("shake", {
            //     times: 2
            // }, 200);
        }, 1000);

        imgclone.animate({
            'width': 0,
                'height': 0
        }, function () {
            $(this).detach()
        });
    }


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
