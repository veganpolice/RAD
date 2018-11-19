'use strict';

$(function () {
  $('.add-to-cart').click(function (event) {
    var smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: {
        smoothieId: smoothieId
      }
    });
  });

  $('.increase-quantity').click(function (event) {
    var smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/addToCart",
      data: {
        smoothieId: smoothieId
      }
    }).then(function (results) {
      // We're going to update some fields!
      $(event.target.parentElement).children('.smoothie-quantity').text(results);
      var priceElement = $(event.target.parentElement).parent().children('span.price');
      var oldPrice = parseFloat(priceElement.text().match(/[\d\.]+/));
      var pricePerUnit = oldPrice / (results - 1);
      var newPrice = pricePerUnit * results;
      priceElement.text(new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(newPrice));
      calculateTotalPrice();
    });
  });

  $('.decrease-quantity').click(function (event) {
    var smoothieId = $(event.target).data('smoothieid');
    $.ajax({
      method: "POST",
      url: "/api/smoothies/rmvFromCart",
      data: {
        smoothieId: smoothieId
      }
    }).then(function (results) {
      // We're going to update some fields!
      // results -1 means there are no items in the cart:
      if (results === -1) {
        $('button.checkout-btn').remove();
      }
      if (results <= 0) {
        $(event.target.parentElement).parent().parent().remove();
      } else {
        $(event.target.parentElement).children('.smoothie-quantity').text(results);
        var priceElement = $(event.target.parentElement).parent().children('span.price');
        var oldPrice = parseFloat(priceElement.text().match(/[\d\.]+/));
        var pricePerUnit = oldPrice / (results + 1);
        var newPrice = pricePerUnit * results;
        priceElement.text(new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD'
        }).format(newPrice));
      }
      calculateTotalPrice();
    });
  });

  $('.order').click(function (event) {
    // Probably prevent default
    console.log('button clicked');
    $.ajax({
      method: "POST",
      url: "/orders"
    });
  });

  var calculateTotalPrice = function calculateTotalPrice() {
    var prices = $('span.price');
    var totalPrice = 0;
    for (var i = 0; i < prices.length; i++) {
      totalPrice += parseFloat($(prices[i]).text().match(/[\d\.]+/));
    }
    var formatedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(totalPrice);
    $('span.total-price').text(formatedPrice);
  };
  calculateTotalPrice();
});

/*
Add to cart fly effect with jQuery. - May 05, 2013
(c) 2013 @ElmahdiMahmoud - fikra-masri.by
license: https://www.opensource.org/licenses/mit-license.php
*/
$('.add-to-cart').on('click', function () {
  var cart = $('.shopping-cart');
  console.log('!!!', cart);
  var imgtodrag = $(event.target).parent().parent().find("img").eq(0);
  console.log('!!!!!!', imgtodrag);
  if (imgtodrag) {
    var shake = function shake(div) {
      var interval = 100;
      var distance = 10;
      var times = 3;

      $(div).css('position', 'relative');

      for (var iter = 0; iter < times + 1; iter++) {
        $(div).animate({
          top: iter % 2 == 0 ? distance : distance * -1
        }, interval);
      }
      $(div).animate({ top: 0 }, interval);
    };

    var imgclone = imgtodrag.clone().offset({
      top: imgtodrag.offset().top,
      left: imgtodrag.offset().left
    }).css({
      // 'opacity': '0.5',
      'position': 'absolute',
      // 'height': '25%',
      // 'width': '25%',
      'z-index': '100'
    }).appendTo($('body')).animate({
      'top': cart.offset().top + 10,
      'left': cart.offset().left + 10,
      'width': 30,
      'height': 40
    }, 1000, 'easeOutExpo');

    setTimeout(function () {
      console.log(cart);
      shake(cart);

      // effect("shake", {
      //     times: 2
      // }, 200);
    }, 1000);

    imgclone.animate({
      'width': 0,
      'height': 0
    }, function () {
      $(this).detach();
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
