$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDeBH6FraH6lQFQW9r95vx-5p0cXO-qgTw",
        authDomain: "train-scheduler-54c76.firebaseapp.com",
        databaseURL: "https://train-scheduler-54c76.firebaseio.com",
        projectId: "train-scheduler-54c76",
        storageBucket: "",
        messagingSenderId: "624877550022"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var dbRef = database.ref('Trains/');
    var trains;

    dbRef.on('child_added', function (childSnapshot) {
        var snap = childSnapshot.val();
        var date = snap.FirstDeparture;

        var dateFormat = "h:mm a";
        
        var tFrequency = snap.Frequency;
        var firstDeparture = snap.FirstDeparture;
        var firstDepartureConverted = moment(firstDeparture, dateFormat).subtract(1, "years");
        console.log(firstDepartureConverted);
        var currentTime = moment().format(dateFormat);
        console.log(currentTime);
        var diffTime = moment(currentTime, dateFormat).diff(moment(firstDepartureConverted), "minutes");
        console.log(diffTime);
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder)
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log(tMinutesTillTrain);
        var nextTrainRaw = moment().add(tMinutesTillTrain, "minutes");
        console.log(nextTrainRaw);
        var nextTrain = moment(nextTrainRaw).format("LT");
        console.log(nextTrain);


        var row = $("<tr>").attr({
            class: "info-row"
        });
        var nameCell = $("<td>").attr({
            class: "info-cell"
        });
        var destinationCell = $("<td>").attr({
            class: "info-cell"
        });
        var frequencyCell = $("<td>").attr({
            class: "info-cell"
        });
        var arrivalCell = $("<td>").attr({
            class: "info-cell"
        });
        var etaCell = $("<td>").attr({
            class: "info-cell"
        });
        $(nameCell).text(snap.TrainName);
        $(destinationCell).text(snap.Destination);
        $(frequencyCell).text(snap.Frequency);
        $(arrivalCell).text(nextTrain);
        $(etaCell).text(tMinutesTillTrain);
        $(row).append(nameCell, destinationCell, frequencyCell, arrivalCell, etaCell);
        $("#table-body").append(row);



    });


    // dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {}


    $(document).on("click", "#submit-info", function () {
        event.preventDefault();
        console.log("Button Pushed2");
        var trainName = $("#train-name").val().trim();
        var destinationName = $("#destination-name").val().trim();
        var departureTimeRaw = $("#raw-time").val().trim();
        var departureTimeAmpm = $("#ampm-time").val().trim().toLowerCase();
        var trainFrequency = $("#frequency-selector").val().trim();
        // var currentDay = moment().format('LT');
        var departureTime = departureTimeRaw + " " + departureTimeAmpm


        // console.log(trainName);
        // console.log(destinationName);
        // console.log(departureTime);
        // console.log(trainFrequency);
        // console.log(currentDay);

        database.ref('Trains/').push({
            TrainName: trainName,
            Destination: destinationName,
            FirstDeparture: departureTime,
            Frequency: trainFrequency
        });

        $("#train-name").val(" ");
        $("#destination-name").val(" ");
        $("#raw-time").val(" ");
        $("#ampm-time").val(" ");
        $("#frequency-selector").val(" ");
        
        
        
    });

})