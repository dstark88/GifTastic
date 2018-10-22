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
    var animal = $(this).attr("data-animal");//this button that was clicked on. looking for the attr of data-animal
    //gif api GX0u32dmvgMKXQi7ypczoFKPIXYfs6Xp
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit&limit=10"; //where to find the imformation

    $.ajax({ //ajax call
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.lentght; i++) {
            var animalDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalDiv.prepend(p);
            animalDiv.prepend(animalImage);
            $("#gif-appear-here").prepend(animalDiv);
        }



//on click
$(".gif").on("click", function() {
    var state = $(this).attr("data-state");//get the current running state
    console.log(state, "state");
    

    // make the images still unless clicked then they move
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state")
      }
});