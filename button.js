var five = require("johnny-five"),
  board;
var firebase = require("firebase");
//var myFirebaseRef = new Firebase("https://iothelloworld-ffb54.firebaseio.com/");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyAgmgGEgw5XbbdGnOfJirGWmeEbOZRjZM8",
  authDomain: "iothelloworld-ffb54.firebaseapp.com",
  databaseURL: "https://iothelloworld-ffb54.firebaseio.com",
  storageBucket: "iothelloworld-ffb54.appspot.com",
  messagingSenderId: "1027433377969"
};
firebase.initializeApp(config);


board = new five.Board();

var firebaseRef = firebase.database().ref();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  var button = new five.Button(2);
  var led = new five.Led(12);


  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
    console.log("in the future there is only war, down");
    firebaseRef.child("button").set("down");
    firebaseRef.child("johnny").set("hello");
  });



  // "up" the button is released
  button.on("up", function() {
    firebaseRef.child("button").set("up");
    firebaseRef.child("johnny").set("bye");
    led.off();
  });

  led.on();
  firebaseRef.child("button").on("value", function(snap) {
    if(snap.val() == "down") {
      led.on();
    } else {
      led.off();
    }
  });
});
