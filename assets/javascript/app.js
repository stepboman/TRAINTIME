// Initialize Firebase

var config = {

  apiKey: "AIzaSyDRVjzWfROakHOevL4yOeH-0a701MFKET4",
    authDomain: "traintime-83ac8.firebaseapp.com",
    databaseURL: "https://traintime-83ac8.firebaseio.com",
    projectId: "traintime-83ac8",
    storageBucket: "traintime-83ac8.appspot.com",
    messagingSenderId: "827808487045"

  };

firebase.initializeApp(config);

// variables 

var database = firebase.database();

var name = "";

var destination = "";

var time = "";

var frequency = "";

var nextTrain = "";

var minutesLeft = "";

//when a child is added to the database, add to the table 

database.ref().on("child_added", function(snap){

  var trainDifference = 0;

  var remainder = 0;

  var minutesLeft= "";

  var nextTrain = "";

  var frequency = snap.val().frequency;

  trainDifference = moment().diff(moment.unix(snap.val().time), "minutes");

  remainder = trainDifference % frequency;

  minutesLeft = frequency - remainder;

  nextTrain = moment().add(minutesLeft, "m").format("hh:mm A");

  name = snap.val().name;

  destination = snap.val().destination;

  $("#table-body").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency +

  "</td><td>" + nextTrain + "</td><td>" + minutesLeft + "</td></tr>");

}, function(errorObject) {

  console.log("Errors handled: " + errorObject.code);

});

//On-click for submit

$("#submit-button").on("click", function(event){

  event.preventDefault();  

  name = $("#name-input").val().trim();

  destination = $("#destination-input").val().trim();

  time = moment($("#time-input").val().trim() ,"HH:mm").subtract(1, "years").format("X");

  frequency = $("#frequency-input").val().trim();

  database.ref().push({

    name: name,

    destination: destination,

    time: time,

    frequency: frequency,

    nextTrain: nextTrain,

    minutesLeft: minutesLeft

  });  

  $("#name-input").val("");

  $("#destination-input").val("");

  $("#time-input").val("");

  $("#frequency-input").val(""); 

});