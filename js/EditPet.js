var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var user;

$(CheckLoginState);

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
            Uid: user.uid,
            State: active
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
        else {
            $('#_petContent').addClass('hide');
            console.log('add');
        }
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