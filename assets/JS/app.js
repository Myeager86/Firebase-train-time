$(document).ready(function () {
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDm8gRU8OwVlnZUfBJrEVQddxTL2GUoPm8",
    authDomain: "train-times-32310.firebaseapp.com",
    databaseURL: "https://train-times-32310.firebaseio.com",
    projectId: "train-times-32310",
    storageBucket: "train-times-32310.appspot.com",
    messagingSenderId: "151030342292"
  };
  firebase.initializeApp(config);

    // variable reference to the database
    var database = firebase.database();

    // initial variables
    var name = '';
    var destination = '';
    var firstTime = '';
    var frequency = 0;
    // var CurrentDate = moment().format();
    // var totalBilled = 0;
    // var monthsWorked = 0;

    // submit button
    $('#submit-button').on('click', function (event) {
        //prevent page from refreshing
        event.preventDefault();
        // changing variables to what is inputted by user
        name = $('#name').val().trim();
        destination = $('#destination').val().trim();
        firstTime = $('#firstTime').val().trim();
        frequency = $('#frequency').val().trim();

        
        // var newDate = $('#start-date').val().trim();
        // newDate = new Date(newDate);
        // var today = new Date();
        // var dif = today - newDate;
        // //2629743 seconds in a month(on average), divided by 1000 ms in a second
        // var monthsWorked = Math.floor((dif / 2629743) / 1000);

        // totalBilled = Math.round(monthsWorked * frequency);

        database.ref().push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            // monthsWorked: monthsWorked,
            // totalBilled: totalBilled,
            // dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        name = $('#name').val("");
        destination = $('#destination').val("");
        firstTime = $('#firstTime').val("");
        frequency = $('#frequency').val("");

    });
    

    database.ref().on("child_added", function (snapshot) {

        var sv = snapshot.val();

        var newRow = $('<tr>');

        var trainTime = moment().format($('#firstTime').val().trim());

        // trainTime = $('#firstTime').val().trim();

        newRow.append('<td>' + sv.name + '</td>');
        newRow.append('<td>' + sv.destination + '</td>');
        newRow.append('<td>' + sv.frequency + '</td>');
        // newRow.append('<td>' + sv.firstTime + '</td>');
        // newRow.append('<td>' + sv.monthsWorked + '</td>');
        // newRow.append('<td>' + sv.totalBilled + '</td>');

        $('.table-data').append(newRow);

        console.log(sv.name);
        console.log(sv.destination);
        console.log(sv.firstTime);
        console.log(sv.frequency);
        // console.log(CurrentDate);
        console.log(moment(trainTime, "HH:mm").format());
        // console.log(trainTime);
    });


});