var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var user;

$(Start);
function Start() {
    if (!user) {
        $('#_petContent').addClass('hide');
        console.log('add');
    }
}

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
        };
    var petId = database.ref('pets').push(newPet).key;
    database.ref('users/' + user.uid + '/pets/' + petId).set(true);
    console.log(petId);
    //alert(petId);
    location.href = 'IntroducePet.html?petId=' + petId;
});

$('#_loginButton').click(function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.        
        var token = result.credential.accessToken;
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
});

function LoginSuccess() {
    //localStorage.setItem('user', user);
    $('#_displayNameLabel').text(user.displayName);
    $('#_emailLabel').text(user.email);
    //$('#_photoURLLabel').text(user.photoURL);
    $('#_photoURLImage').attr("src", user.photoURL);
    $('#_uidLabel').text(user.uid);
    $('#_loginButton').addClass('hide');
    $('#_petContent').removeClass('hide');
    console.log('remove');
    //$('#_hidden').val(user.providerId);        
    //console.log(user);
}