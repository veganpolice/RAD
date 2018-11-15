$(() => {
  $.ajax({
    method: "GET",
    url: "/api/smoothies"
  }).done((smoothies) => {
    for(smoothie of smoothies) {
      $("<div>").text(smoothie.description).appendTo($("body"));
    }
  });;
});
