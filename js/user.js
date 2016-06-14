var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var $usersContainer = $('#_usersContainer');
var user;
//var testObject;
$(CheckLoginState);
$('#_loginButton').click(Login);
/*$('#_adminCheckbox').change(function () {
    if ($(this).prop("checked")) {
        alert('有勾選');

    } else {
        alert('無勾選');
    }
});*/

//$("#_adminCheckbox").prop("checked", true);
//$.when(provider).done(CheckLoginState);

function CheckLoginState() {
    //var loginState = localStorage("loginState");
    $.when(sessionStorage["user"]).done(function (x) {
        if (x) {
            user = JSON.parse(x);
            LoginSuccess();
        }
    });
}

function Login() {
    console.log('enter auto login');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        console.log('success');
        var token = result.credential.accessToken;
        //user = result.user;
        //localStorage["user"] = user;
        // The signed-in user info.
        //user = result.user;
        user =
            {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                providerId: result.user.providerId
            };
        sessionStorage["user"] = JSON.stringify(user);
        setTimeout(LoginSuccess, 100);
        var updates = {};
        updates['users/' + user.uid + '/displayName'] = user.displayName;
        updates['users/' + user.uid + '/email'] = user.email;
        //database.ref('users/' + user.uid).update({ displayName: user.displayName, email: user.email });
        firebase.database.ref().update(updates);
    }).catch(function (error) {
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
    //localStorage.setItem('user', user);
    //localStorage.setItem("loginState", "login");
    //sessionStorage["loginState"] = "login";
    $('#_displayNameLabel').text(user.displayName);
    $('#_emailLabel').text(user.email);
    //$('#_photoURLLabel').text(user.photoURL);
    $('#_photoURLImage').attr("src", user.photoURL);
    $('#_uidLabel').text(user.uid);
    $('#_loginButton').addClass('hide');
    database.ref('admins/' + user.uid).on("value", function (adminSnapshot) {
        if(adminSnapshot.exists())
        {
            LoadUsers();
        }
    });
}

function LoadUsers() {
    var reference = database.ref('users');
    reference.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            var $userData = $("<div></div>");
            var $photoURL = $(String.format('<img alt="photoURL" src="{0}" /><br />', data.photoURL));
            var $uid = $(String.format('<label>PetId:{0}</label><br />', data.uid));
            var $displayName = $(String.format('<label>PetName:{0}</label><br />', data.displayName));
            var $email = $(String.format('<label>Birthday:{0}</label><br />', data.email));
            var $adminCheckbox = $('<input type="checkbox" /><br />');

            database.ref('admins/' + data.uid).on("value", function (adminSnapshot) {
                $adminCheckbox.prop("checked", adminSnapshot.exists());
                console.log("admin" + data.displayName + adminSnapshot.exists());
            });

            $adminCheckbox.change(function () {
                if ($(this).prop("checked")) {
                    console.log("check");
                    database.ref('admins/' + data.uid).set(true);
                } else {
                    console.log("none check");
                    database.ref('admins/' + data.uid).remove();
                }
            });

            $userData.append($photoURL);
            $userData.append($uid);
            $userData.append($displayName);
            $userData.append($email);
            $userData.append($adminCheckbox);
            $usersContainer.append($userData);

            /*database.ref('admins/' + data.uid).on('value', function (adminSnapshot) {
                $adminCheckbox.prop("checked", adminSnapshot.exists());
            });*/



            /*$petData.click(function () {
                location.href = 'IntroducePet.html?petId=' + childSnapshot.key;
            });*/
            //console.log(childSnapshot.key);
            //console.log(childSnapshot.val());
            //console.log(childSnapshot.ref);
        });
    });
}