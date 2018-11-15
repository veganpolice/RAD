$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((smoothies) => {
    for(smoothie of smoothies) {
      $("<div>").text(smoothie.description).appendTo($("body"));
    }
  });;
});
