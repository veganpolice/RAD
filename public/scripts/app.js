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