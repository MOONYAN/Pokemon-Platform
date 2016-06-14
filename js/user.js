var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var $petsContainer = $('#_petsContainer');
var user;
//var testObject;
$(CheckLoginState);
$('#_loginButton').click(Login);

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
    LoadOnesPets();
    //$('#_petContent').removeClass('hide');
    //$('#_hidden').val(user.providerId);
}

function LoadOnesPets() {
    var reference = database.ref('pets').orderByChild('Uid').equalTo(user.uid);
    reference.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            var $petData = $("<div></div>");
            var $imageURL = $(String.format('<img class="petImage" id="_imageURLImage" alt="_imageURLImage" src="{0}" /><br />', data.ImageURL));
            var $petId = $(String.format('<label>PetId:{0}</label><br />', childSnapshot.key));
            var $petName = $(String.format('<label>PetName:{0}</label><br />', data.PetName));
            var $birthday = $(String.format('<label>Birthday:{0}</label><br />', data.Birthday));
            var $location = $(String.format('<label>Location:{0}</label><br />', data.Location));
            var $category = $(String.format('<label>Category:{0}</label><br />', data.Category));
            $petData.append($imageURL);
            $petData.append($petId);
            $petData.append($petName);
            $petData.append($birthday);
            $petData.append($location);
            $petData.append($category);
            $petsContainer.append($petData);
            $petData.click(function () {
                location.href = 'IntroducePet.html?petId=' + childSnapshot.key;
            });
            //console.log(childSnapshot.key);
            //console.log(childSnapshot.val());
            //console.log(childSnapshot.ref);
        });
    });
}