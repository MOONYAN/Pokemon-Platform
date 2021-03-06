var database = firebase.database();
var provider = new firebase.auth.FacebookAuthProvider();
var user;
//var testObject;
$(function() {
    firebase.auth().signOut();
    sessionStorage.clear();
    var x = sessionStorage["user"];
    if (x) {
        user = JSON.parse(x);
        console.log(user);
        LoginSuccess();
    } else {
        LoginFail();
    }
});




$('#_loginButton').click(Login);

//$.when(provider).done(CheckLoginState);
/*
function CheckLoginState() {
    //var loginState = localStorage("loginState");
    $.when(sessionStorage["user"]).done(function (x) {
        if (x) {
            user = JSON.parse(x);
            LoginSuccess();
        }
    });
}
*/

function Login() {
    console.log('enter auto login');
    //database.ref().push("YY");
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //database.ref().push("GG");
        console.log('success');
        var token = result.credential.accessToken;
        //user = result.user;
        //localStorage["user"] = user;
        // The signed-in user info.
        //user = result.user;
        user = {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
            providerId: result.user.providerId,
        };
        //database.ref().push(user.uid);
        //database.ref('users/' + user.uid).update({ displayName: user.displayName, email: user.email });

        //setTimeout(LoginSuccess, 100);
        /*var updates = {};
        updates['users/' + user.uid + '/displayName'] = user.displayName;
        updates['users/' + user.uid + '/email'] = user.email;
        database.ref().update(updates);*/
        database.ref('users/' + user.uid).update(user);
        database.ref('admins/' + user.uid).once("value").then(function(adminSnapshot) {
            user["admin"] = adminSnapshot.exists();
            sessionStorage["user"] = JSON.stringify(user);
            console.log(user);
            location.href = 'index.html';
        });

        //location.href = 'index.html';
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function LoginSuccess() {
    $('#_photoURLImage').attr("src", user.photoURL);
    $('._loginAnchor a').text('登出');
}

function LoginFail() {
    $('._user').addClass("hide");
    $('#_photoURLImage').addClass("hide");
}
/*
function LoginSuccess() {
    //localStorage.setItem('user', user);
    //localStorage.setItem("loginState", "login");
    //sessionStorage["loginState"] = "login";
    $('#_displayNameLabel').text(user.displayName);
    $('#_emailLabel').text(user.email);
    //$('#_photoURLLabel').text(user.photoURL);
    $('#_photoURLImage').attr("src", user.photoURL);
    $('#_uidLabel').text(user.uid);
    $('#_loginButton').addClass('hide');
    //$('#_hidden').val(user.providerId);
}
*/
