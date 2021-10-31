
var UserName = "Ricardo gonzalez";
function registrar(UserName){
    var email = "rg4340626@gmail.com";
    var password = "12345678";
    observador();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result){
        result.user.updateProfile({
            displayName: 'ricardogonza1'
        }).then(function(){
            console.log("Nombre de usuario añadido");
            observador();
        }).catch(function(error){
            console.log("error con el nombre de usuario");
            observador();
        });
        verify();
        console.log("Registrado");
    })
    .catch(function(error) {
        console.log("Error este email esta en uso");
    });
    
}

//create function to login
function login(){
    var email = "rg4340626@gmail.com";
    var password = "12345678";
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result){
        console.log("contraseña correcta");
        observador();
    })
    .catch(function(error) {
        console.log("contraseña incorrecta");
        observador();
    });
    
}




function logout(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Saliendo");
        observador();
    }).catch(function(error) {
        // An error happened.
        console.log("Error");
    });
}

//create function verify
function verify(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log("Email enviado");
    }).catch(function(error) {
        // An error happened.
        console.log("Error");
    });
}

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