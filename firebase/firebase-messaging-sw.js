importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyD0Ho0FLYlOydziqhRRbNXVDZWRo0eBcpM",
    authDomain: "netflix-fastred.firebaseapp.com",
    projectId: "netflix-fastred",
    storageBucket: "netflix-fastred.appspot.com",
    messagingSenderId: "438656862940",
    appId: "1:438656862940:web:6189966f750ad5d26b8219",
    measurementId: "G-SD8BXDY6BP"
    };
    firebase.initializeApp(firebaseConfig);
    
    const messaging = firebase.messaging();
    messaging.setBackgroundMessageHandler(function(payload) {
    });