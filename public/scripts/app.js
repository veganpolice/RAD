$(() => {
  $.ajax({
    method: "GET",
    url: "/api/smoothies"
  }).done((smoothies) => {
    for(smoothie of smoothies) {
      $("<div>").text(smoothie.description).appendTo($("body"));
    }
  });;

  $('button').click( () => {
   console.log('button clicked');
    $.ajax({
    method: "POST",
    url: "/api/smoothies/addToCart",
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

