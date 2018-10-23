//psuedocode
//empty form to add animals
//on submit button click
//fill with 10 random gif images of those animals
//add an new button at top with that new animal
//clear the old animal as the new one is added
//do not refresh the screen but append the new button
//on click of the animal buttons
//fill with 10 random gif images of that animal

$("button").on("click", function() {
  var animal = $(this).attr("data-animal");
  //https://api.giphy.com/v1/gifs/search?api_key=GX0u32dmvgMKXQi7ypczoFKPIXYfs6Xp&q=&limit=25&offset=0&rating=G&lang=en
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=GX0u32dmvgMKXQi7ypczoFKPIXYfs6Xp&limit=10&rating=PG-13"; 

  $.ajax({ 
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var results = response.data; //we want response.data from the 
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $('<div class="gif-container">');
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animalImage = $("<img>");//adding an image tag
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.prepend(p); //not perpending to a container but to gifDiv
        animalDiv.prepend(animalImage);//change the left side of .prepend to the right side
        $("#gifs-appear-here").prepend(animalDiv);//put that div inside the container. run for all the divs
      }
  });
});

$(".gif").on("click", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log(state, "state");
  if (state == "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    console.log(state, "should be still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log(state, "should be animate");
  }
});
// //on click
// $(".gif").on("click", function() {
//     var state = $(this).attr("data-state");//get the current running state
//     console.log(state, "state");
    

//     // make the images still unless clicked then they move
//     if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state")
//       }