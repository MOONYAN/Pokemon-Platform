//var database = firebase.database();
//var provider = new firebase.auth.FacebookAuthProvider();
var user;
$(CheckLoginState);
//$('#_loginButton').click(Login);
//$.when(provider).done(CheckLoginState);

function CheckLoginState() {
    //$('._loginAnchor a').text('Logout');
    //var loginState = localStorage("loginState");
    var x = sessionStorage["user"];
    if (x) {
        user = JSON.parse(x);
        console.log(user);
        LoginSuccess();
    }

    if(sessionStorage["isAdmin"])
    {
        console.log('isAdmin');
    }
    /*$.when(sessionStorage["user"]).done(function (x) {
        if (x) {
            user = JSON.parse(x);
            LoginSuccess();
        }
    });*/
}

function LoginSuccess() {
    //localStorage.setItem('user', user);
    //localStorage.setItem("loginState", "login");
    //sessionStorage["loginState"] = "login";

    //$('#_displayNameLabel').text(user.displayName);
    //$('#_emailLabel').text(user.email);
    //$('#_photoURLLabel').text(user.photoURL);
    $('#_photoURLImage').attr("src", user.photoURL);

    //$('#_uidLabel').text(user.uid);
    //$('#_loginButton').addClass('hide');
    //$('._loginAnchor').addClass('hidden');
    $('._loginAnchor a').text('Logout');
    //$('._logoutAnchor').removeClass('hidden');
    //$('#_hidden').val(user.providerId);
}