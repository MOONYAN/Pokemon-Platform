var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var user;

$(CheckLoginState);
$('#_loginButton').click(Login);
/*function Start() {
    user = JSON.parse(sessionStorage["user"]);
    if (!user) {
        $('#_petContent').addClass('hide');
        console.log('add');
    }
}*/

$('#_postButton').click(function () {
    var newPet =
        {
            PetName: $('#_petNameText').val(),
            Gender: $('#_genderText').val(),
            Birthday: $('#_birthdayText').val(),
            Location: $('#_locationText').val(),
            Category: $('#_categoryText').val(),
            Introduction: $('#_introductionText').val(),
            ImageURL: $('#_imageURLText').val(),
            YoutubeURL: $('#_youtubeURLText').val().replace("https://www.youtube.com/watch?v=", ""),
            CellPhone: $('#_cellPhoneURLText').val(),
            uid:user.uid
        };
    var petId = database.ref('pets').push(newPet).key;
    database.ref('users/' + user.uid + '/pets/' + petId).set(true);
    console.log(petId);
    //alert(petId);
    location.href = 'IntroducePet.html?petId=' + petId;
});

function CheckLoginState() {
    //var loginState = localStorage("loginState");
    $.when(sessionStorage["user"]).done(function (x) {
        if (x) {
            user = JSON.parse(x);
            LoginSuccess();
        }
        else
        {
            $('#_petContent').addClass('hide');
            console.log('add');
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
    $('#_petContent').removeClass('hide');
    //$('#_hidden').val(user.providerId);
}