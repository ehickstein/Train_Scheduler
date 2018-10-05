$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyDjT0soah5z5xEo9g8dJQ2RboQRVARtFpU",
    authDomain: "inclass-firebase-12.firebaseapp.com",
    databaseURL: "https://inclass-firebase-12.firebaseio.com",
    projectId: "inclass-firebase-12",
    storageBucket: "inclass-firebase-12.appspot.com",
    messagingSenderId: "598568618422"
  };
  firebase.initializeApp(config);
  var data = firebase.database();
	$("#submitButton").on("click", function(){
		var trainName = $("#trainName").val().trim();
		var line = $("#line").val().trim();
		var destination = $("#destination").val().trim();
		var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequency").val().trim();
		var newTrain = {
			name:  trainName,
			line: line,
			destination: destination,
			trainTime: trainTime,
			frequency: frequency,
		}
		data.ref().push(newTrain);
		$("#trainName").val("");
		$("#line").val("");
		$("#destination").val("");
		$("#train").val("");
		$("#frequency").val("");
		return false;
	});

	data.ref().on("child_added", function(childSnapshot){
		console.log(childSnapshot.val());
		var databaseName = childSnapshot.val().name;
		var databaseLine = childSnapshot.val().line;
		var databaseDestination = childSnapshot.val().destination;
		var databaseTrainTime = childSnapshot.val().trainTime;
		var databaseFrequency = childSnapshot.val().frequency;
		var diffTime = moment().diff(moment.unix(databaseTrainTime), "minutes");
		var timeRemaining = moment().diff(moment.unix(databaseTrainTime), "minutes") % databaseFrequency;
		var minutes = databaseFrequency - timeRemaining;
		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
        $("#trainTable > tbody").append("<tr><td>" + 
        databaseName + "</td><td>" + 
        databaseLine + "</td><td>"+ 
        databaseDestination+ "</td><td>"+
        databaseFrequency+ " mins"+ "</td><td>"+
        nextTrainArrival+ "</td><td>"+ 
        minutes+ "</td></tr>");
	});
});