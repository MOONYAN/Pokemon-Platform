
var database = firebase.database();
var petId;
var petData;
var player;
$(Start);
function Start() {
    petId = Request.parameter('petId');
    LoginSuccess();
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

function LoginSuccess()
{
    $('#_photoURLImage').attr("src", user.photoURL);
    $('._loginAnchor a').text('Logout');
}
