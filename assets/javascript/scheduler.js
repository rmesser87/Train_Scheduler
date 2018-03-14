$(document).ready(function(){
    console.log("Button Pushed1");
    $(document).on("click", "#submit-info", function () {
        event.preventDefault();
        console.log("Button Pushed2");
        var trainName= $("#train-name").val().trim();
        var destinationName= $("#destination-name").val().trim();
        var departureTime= $("#raw-time").val().trim();
        var frequency=$("#frequency-selector").val().trim();
        console.log(trainName);
        console.log(destinationName);
        console.log(departureTime);
        console.log(frequency);
    })
});