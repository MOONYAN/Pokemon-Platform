
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
        //$('#_imageURLText').val(petData.ImageURL);
        $('#_imageURLImage').attr("src", petData.ImageURL);
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
