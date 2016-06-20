
var database = firebase.database();
var petId;
var petData;
var player;
var user;
$(Start);

function Start() {
    petId = Request.parameter('petId');
    var x = sessionStorage["user"];
    if (x) {
        user = JSON.parse(x);
        console.log(user);
        LoginSuccess();
    } else {
        LoginFail();
    }
    if (!petId) {
        $('#_petContent').addClass('hide');
        console.log('none petId');
<<<<<<< HEAD
    }
    else {
=======
    } else {
>>>>>>> origin/master
        $('.fb-like').data('href', "https://owen-pokemon.herokuapp.com/IntroducePet.html?petId=" + petId);
        $('.fb-comments').data('href', "https://owen-pokemon.herokuapp.com/IntroducePet.html?petId=" + petId);
        console.log(petId);
        RetrieveData();
    }
}

function RetrieveData() {
    var petRef = database.ref('pets/' + petId);
    petRef.once("value").then(function(snapshot) {
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
        //player.cueVideoById(petData.YoutubeURL);
        $('#_youtubeURL').attr("href", "https://www.youtube.com/watch?v=" + petData.YoutubeURL);
        $('#_youtubeURL').text("Click me watch the introduction video");
        $('#_cellPhoneURLText').val(petData.CellPhone);

        if(player)
        {
            player.cueVideoById(petData.YoutubeURL);
        }
    });
}

function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
        height: '390',
        width: '100%',
        //videoId: petData.YoutubeURL
    });
    if(petData)
    {
        player.cueVideoById(petData.YoutubeURL);
    }
}
<<<<<<< HEAD

function LoginSuccess() {
    $('#_photoURLImage').attr("src", user.photoURL);
    $('._loginAnchor a').text('Logout');
=======

function LoginSuccess() {
    $('#_photoURLImage').attr("src", user.photoURL);
    $('._loginAnchor a').text('登出');
}

function LoginFail() {
    $('._user').addClass("hide");
    $('#_photoURLImage').addClass("hide");
>>>>>>> origin/master
}
