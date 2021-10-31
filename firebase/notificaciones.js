
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
    function suscribeUser(){
        console.log("function suscribe user is redy");
        Notification.requestPermission().then(function(permission){
            if(permission == "granted"){
                console.log("granted");
                messaging.getToken({vapidKey:"BHKXxCKnZlLqCvxgI7vjIxIoFwGIM36M7PLz82cZoZC_qbIuUZd8ZcwrMLtTw_rnfyyzsmgr2mkqykGu9bWcYYE"}).then(function(currentToken){
                    if(currentToken){
                        console.log(currentToken);
                        document.getElementById("tokenId").innerHTML = currentToken;
                        firebase.firestore().collection("notification-tokens").doc(currentToken).set({
                            token:currentToken,
                            uid:currentUser.uid,
                            email:currentUser.email
                        })
                        //si existe token en la base de datos desactivar el boton
                                            messaging.onTokenRefresh(function(){
                        messaging.getToken().then(function(refreshedToken){
                            console.log("refreshedToken",refreshedToken);
                            firebase.firestore().collection("notification-tokens").doc(refreshedToken).set({
                                token:refreshedToken,
                                uid:currentUser.uid,
                                email:currentUser.email
                            })
                        })
                    })
                    }else{
                        console.log("No hay token");
                    }
                }).catch(function(err){
                    console.log("Error",err);
                }

                );
            }   
        })
    }

    messaging.onMessage(function(payload){
        console.log("Message received",payload);
    });

    function sendNotification(){
        const token = "BHKXxCKnZlLqCvxgI7vjIxIoFwGIM36M7PLz82cZoZC_qbIuUZd8ZcwrMLtTw_rnfyyzsmgr2mkqykGu9bWcYYE";
        const title = "FastRed ";
        const msg = "Nueva factura disponible";

        let body = {
            to:token,
            notification:{
                title:title,
                body:msg
            }
        }

    let options = {
        method:"POST",
        headers: new Headers({
            Authorization:"key=AAAAZiH8itw:APA91bFgoNGdBUISC8sexr19vvenHHCr6katwu5p3kVHup6bLLWR7m75SElLTrOL9lTZJXi2mUIso3FUFy7YT8WsupAUfjRtHdg12vSLbZTiarfPolcgwVh7Oge1Wlq_BRzQqPPr_r1y",
            "Content-Type":"application/json"
        }),
        body:JSON.stringify(body)
    }

    fetch("https://fcm.googleapis.com/fcm/send",options)
    .then(function(response){
        console.log(response);
    }
    )
}