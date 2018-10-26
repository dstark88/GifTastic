
var animals = ["cats", "dogs", "monkeys"];
var animalCount = 0;

$(document).ready(function() {
  createBtn();

  function createBtn() {
    for (var i = 0; i < animals.length; i++) { 
      console.log(animals.length, "old number");
      // Create a variable equal to $("<button>");
      var animalBtn = $("<button>");
      animalBtn.addClass("animal-button animal");
      animalBtn.attr("data-animal", animals[i]);
      animalBtn.text(animals[i]);
      $("#buttons").append(animalBtn);
    }
  } 

  $(".animal-button").on("click", function() {
    // Create a variable set the variable equal to a new div.
    var setAnimal = $("<div>");
    setAnimal.addClass("animal");
    setAnimal.text($(this).attr("data-animal"));
    $("#display").append(setAnimal);
  })

  $("#animal-form").on("submit", function(event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    console.log(animal, "animal entered");
    animals.push(animal);//where and then what
    console.log(animals, "new number")
    // stop it from making double buttons
    $("#buttons").empty();
    createBtn();
    $("#animal-input").val("");
  });

$(document).on("click", ".animal-button", function() {
  var animal = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=GX0u32dmvgMKXQi7ypczoFKPIXYfs6Xp&limit=10&rating=PG-13"; 
  console.log("ajax call");
  $.ajax({ 
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(".gif-container").empty();
    var results = response.data;  
    for (var i = 0; i < results.length; i++) {
      var animalDiv = $('<div class="gif-container">');
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      animalImage.addClass("animalGif");
      animalDiv.prepend(p); //not perpending to a container but to gifDiv
      animalDiv.prepend(animalImage);//change the left side of .prepend to the right side
      $("#gifs-appear-here").prepend(animalDiv);
    }
  });
});

  $(document).on("click", ".animalGif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $($(this)).attr("data-state");
    console.log(state, "state");
    if (state == "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
      console.log(state, "should be animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
      console.log(state, "should be still");
    }
  });
});
