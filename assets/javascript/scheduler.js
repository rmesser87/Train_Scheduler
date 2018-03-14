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
        var dateUnix = moment(convertedDate).format("X");
        var dateFormat = "MMMM Do YYYY, h:mm:ss a";
        var convertedDate = moment(date, dateFormat);

        console.log(snap.TrainName);

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
        var rateCell = $("<td>").attr({
            class: "info-cell"
        });
        var etaCell = $("<td>").attr({
            class: "info-cell"
        });
        $(nameCell).text(snap.TrainName);
        $(destinationCell).text(snap.Destination);
        $(frequencyCell).text(snap.Frequency);
        // $(monthsCell).text(monthsWorked);
        // $(rateCell).text(snap.MonthlyRate);
        // $(billedCell).text(totalBilled);
        $(row).append(nameCell, destinationCell, frequencyCell);
        $("#table-body").append(row);



    });



    $(document).ready(function () {
        console.log("Button Pushed1");
        $(document).on("click", "#submit-info", function () {
            event.preventDefault();
            console.log("Button Pushed2");
            var trainName = $("#train-name").val().trim();
            var destinationName = $("#destination-name").val().trim();
            var departureTimeRaw = $("#raw-time").val().trim();
            var departureTimeAmpm = $("#ampm-time").val().trim().toLowerCase();
            var trainFrequency = $("#frequency-selector").val().trim();
            var currentDay = moment().format('LL');
            var departureTime = currentDay + ", " + departureTimeRaw + " " + departureTimeAmpm


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
        })
    });
})