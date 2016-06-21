//var provider = new firebase.auth.FacebookAuthProvider();
var database = firebase.database();
var user;
var petId = Request.parameter('petId');
$(CheckLoginState);

//$('input[name="gender"]:checked').val('female');


/*function Start() {
    user = JSON.parse(sessionStorage["user"]);
    if (!user) {
        $('#_petContent').addClass('hide');
        console.log('add');
    }
}*/

$('#_updateButton').click(function () {
  console.log("click");

    var adjustPet =
        {
            PetName: $('#_petNameText').val(),
            Gender: $('#_genderText').val(),
            Birthday: $('#_birthdayText').val(),
            Location: $('#_locationText').val(),
            Category: $('input[name="category"]:checked').val(),
            Introduction: $('#_introductionText').val(),
            ImageURL: $('#_imageURLText').val(),
            YoutubeURL: $('#_youtubeURLText').val().replace("https://www.youtube.com/watch?v=", ""),
            CellPhone: $('#_cellPhoneURLText').val(),
            //Uid: user.uid,
            State: $('input[name="state"]:checked').val()
        };
    database.ref('pets/' + petId).update(adjustPet);
    //database.ref('users/' + user.uid + '/pets/' + petId).set(true);
    console.log(petId);
    //alert(petId);
    location.href = 'IntroducePet.html?petId=' + petId;
});

function CheckLoginState() {
    //$("#_femaleRadio").prop("checked", true);
    //console.log($('input[name="gender"]:checked').val());

    //var loginState = localStorage("loginState");
    $.when(sessionStorage["user"]).done(function (x) {
        if (x) {
            petId = Request.parameter('petId');
            user = JSON.parse(x);
            LoginSuccess();
            RetrieveData();
        }
        else {
            $('#_petContent').addClass('hide');
            console.log('add');
            LoginFail();
        }
    });
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
    $('._loginAnchor').addClass('hidden');
    //$('#_hidden').val(user.providerId);
    $('#_petContent').removeClass('hide');
}

function LoginFail() {
    $('._user').addClass("hide");
    $('#_photoURLImage').addClass("hide");
}

function RetrieveData() {
    var petRef = database.ref('pets/' + petId);
    petRef.once("value").then(function (snapshot) {
        petData = snapshot.val();
        $('#_petNameText').val(petData.PetName);
        $('#_genderText').val(petData.Gender);
        $('#_birthdayText').val(petData.Birthday);
        $('#_locationText').val(petData.Location);
        $('#_categoryText').val(petData.Category);
        $('#_introductionText').val(petData.Introduction);
        $('#_imageURLText').val(petData.ImageURL);
        //$('#_imageURLImage').attr("src", petData.ImageURL);
        $('#_youtubeURLText').val(petData.YoutubeURL);
        //player.cueVideoById(petData.YoutubeURL);
        $('#_cellPhoneURLText').val(petData.CellPhone);
        $("#_activeRadio").prop("checked", petData.State === 'active');
        $("#_doneRadio").prop("checked", petData.State === 'done');
    });
}
