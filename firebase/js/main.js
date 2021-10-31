navigator.serviceWorker.register('notificaciones-sw.js')
.then(function(registration) {
    firebase.messaging().useServiceWorker(registration);
    console.log('Service Worker registrado');
}).catch(function(err) {
    console.error('Error al registrar el Service Worker', err);
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BHKXxCKnZlLqCvxgI7vjIxIoFwGIM36M7PLz82cZoZC_qbIuUZd8ZcwrMLtTw_rnfyyzsmgr2mkqykGu9bWcYYE");

messaging.requestPermission().then(function() {
    console.log('Permiso concedido');
    return messaging.getToken();
}).then(function(token) {
    console.log(token);
    const db = firebase.firestore();
    db.settings({
        timestampsInSnapshots: true
    });
    db.collection('tokens').doc(token).set({
        token: token
    })
    }).catch(function(err) {
    console.log('Error al obtener el permiso', err);
});

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(email);
        console.log(emailVerified);
        console.log(displayName);
        //email verified true or false
        if(emailVerified){
            console.log("Email verificado");
        }else{
            console.log("Email no verificado");
        }

        // ...
    } else {
        // User is signed out.
        console.log('no hay sesiones iniciados');
        
        // ...
    }
});
}

observador();

var db = firebase.firestore();

function insertSimple(){
    var citiesRef = db.collection("cities");

    citiesRef.doc("SF").set({
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    citiesRef.doc("LA").set({
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    citiesRef.doc("DC").set({
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    citiesRef.doc("TOK").set({
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    citiesRef.doc("BJ").set({
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });

}

function ReadData(){
   // Create a reference to the cities collection
var citiesRef = db.collection("cities");

// Create a query against the collection.
var query = citiesRef.where("state", "==", "CA");
}