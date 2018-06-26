//const firebase = require("firebase-admin");
const firebase = require("firebase");

const Q = require('q');
//const serviceAccount = require("../barsys-7fc95-firebase-adminsdk-8uxju-92284c4d40.json");
firebase.initializeApp({
  //credential: firebase.credential.cert(serviceAccount),
  apiKey: "AIzaSyA4-kIvkgyh7pJ3i3lz5wA9Jznh-pBlVDo",
  databaseURL: "https://barsys-7fc95.firebaseio.com"
});
var db = firebase.database();
//var auth = null;
var service = {};
service.create = create;
service.authenticate = authenticate;
service.addnote = addnote;
service.getallnotes = getallnotes

module.exports = service;

function create(userparam) {
    var deffered = Q.defer();
    firebase.auth().createUserWithEmailAndPassword(userparam.username, userparam.password).then(function(user) {
        //var user = firebase.auth().currentUser;
        deffered.resolve({ success: true, message: 'Account registered successfully' });
    }, function(error) {
        deffered.reject(error.code + ' ' + error.message);
    });
    return deffered.promise;
}

function authenticate(username, password) {
    var deffered = Q.defer();
    firebase.auth().signInWithEmailAndPassword(username, password).then((user)=>{
       //auth = user;
       deffered.resolve(user);
    }, function(error) {
       deffered.reject(error.code + ' ' + error.message);
    });
    return deffered.promise;
}

function addnote(note){
  var currentUser = firebase.auth().currentUser;
  var postData = {
        title: note.title,
        description: note.description
        };
  var newPostKey = firebase.database().ref().child('notes').push().key;
  var updates = {};
  updates['/notes/' + currentUser.uid + '/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
}

function getallnotes(){
  var defer = Q.defer();
  var currentUser = firebase.auth().currentUser;
  var all_notes = [];
   var details =  firebase.database().ref().child('notes').child(currentUser.uid);
   details.once('value', function(snapshot){
     if(snapshot.val() == null){
         defer.resolve(null);
     }else{
        snapshot.forEach(function(item) {
            var itemVal = item.val();
            all_notes.push(itemVal);
        });
         defer.resolve(all_notes);
     }
   });
   return defer.promise;
}
