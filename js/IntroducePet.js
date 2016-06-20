
var database = firebase.database();
var petId;
var petData;
var player;
$(Start);
function Start() {
    petId = Request.parameter('petId');
    if (!petId)
    {
        $('#_petContent').addClass('hide');
        console.log('none petId');
    }
    else
    {
        $('.fb-like').data('href', "https://owen-pokemon.herokuapp.com/?petId=" + petId);
        $('.fb-comments').data('href', "https://owen-pokemon.herokuapp.com/?petId=" + petId);
        console.log(petId);
        RetrieveData();
    }
    LoginSuccess();
}

function RetrieveData() {
    var petRef = database.ref('pets/' + petId);
    petRef.once("value").then(function (snapshot) {
        petData = snapshot.val();
        $('#_petNameText').text(petData.PetName);
        $('#_genderText').text(petData.Gender);
        $('#_birthdayText').text(petData.Birthday);
        $('#_locationText').text(petData.Location);
        $('#_categoryText').text(petData.Category);
        $('#_introductionText').text(petData.Introduction);
        var _imageURL = "url(" + petData.ImageURL + ")";
        $('#_imageURLImage').css("background-image", _imageURL);
        //$('#_youtubeURLText').val(petData.YoutubeURL);
        player.cueVideoById(petData.YoutubeURL);
        $('#_cellPhoneURLText').val(petData.CellPhone);
    });
}

function onYouTubeIframeAPIReady()
{
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        //videoId: petData.YoutubeURL
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
    //$('._loginAnchor').addClass('hidden');
    $('._loginAnchor a').text('Logout');
    //$('._logoutAnchor').removeClass('hidden');
    //$('#_hidden').val(user.providerId);
}
