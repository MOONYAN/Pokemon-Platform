var pageNow;
var pageTotal;
$( document ).ready( function() {
  CheckPictureHeight();
  pageNow=1;
  $(".left").click(function(){
    if(pageNow>1){
      pageNow--;
      $(".page").val(pageNow);
      $petsContainer.empty();
      RetrieveData();
    }
  });
  $(".right").click(function(){
    if(pageNow<pageTotal){
      pageNow++;
      $(".page").val(pageNow);
      $petsContainer.empty();
      RetrieveData();
    }
  });
/*  $(".left").focus(function(){
    $('.left').css({cursor:pointer});
    if(pageNow==1){
      $('.left').css({cursor:no-drop});
    }
  });
  $(".right").focus(function(){
    $('.right').css({cursor:pointer});
    if(pageNow==pageTotal){
      $('.right').css({cursor:no-drop});
    }
  });*/
  $('#_pg').keypress(function (e) {
    var temp;
    if (e.which == 13) {
        temp=$("#_pg").val();
        alert(temp);
        if(temp>=1 && temp<=pageTotal && temp!=pageNow){
          pageNow=temp;
          $petsContainer.empty();
          RetrieveData();
        }
        else {
          $(".page").val(pageNow);
        }
    }
  });
});

$(window).resize(function() {
  CheckPictureHeight();
});

function CheckPictureHeight()
{
    $('.petPicture').css({height:$('.petPicture').width()});
    var screenWidth = screen.width;
    console.log(screenWidth);
    if (screenWidth<768) {
      $('.petContext').css('min-height',$('.petPicture').height());
    }
    else {
      $('.petContext').css('min-height','0px');
    }
}

var database = firebase.database();
var $petsContainer = $('#_petsContainer');
var isAdmin;
var user;
var temp;

function CulculatePage() {
  pageTotal=Math.ceil(temp/9);
  if(pageTotal<pageNow){
    pageNow=pageTotal;
  }
  $(".page").val(pageNow);
  $("#_pT").text(pageTotal);
}

$('input[name="category"]').change(function () {
    $petsContainer.empty();
    RetrieveData();
});

$(function ()
{
    CheckAdmin();
    RetrieveData();
});

function CheckAdmin()
{
    var x = sessionStorage["user"];
    if (x) {
        user = JSON.parse(x);
        $('#_photoURLImage').attr("src", user.photoURL);
        $('._loginAnchor a').text('Logout');
        isAdmin = user.admin;
    }
    console.log(isAdmin);
}

function RetrieveData()
{
    //$('input[name="category"]:checked').val()
    var reference = database.ref('pets').orderByChild('State').equalTo('active');
    var start;
    var end;
    var counter=0;
    reference.once("value").then(function (subSnapshot) {
        subSnapshot.ref.orderByChild('Category').equalTo('Rabbit').once("value").then(function (snapshot) {
//            console.log(snapshot.numChildren()+'-----------------------');
            temp=snapshot.numChildren();
            CulculatePage();
            start=9*(pageNow-1);
            end=9*pageNow-1;
            snapshot.forEach(function (childSnapshot) {
                if(counter>=start && counter<=end){
                    var data = childSnapshot.val();
                    var $petData = $('<div class="col-lg-4 col-sm-4 col-xs-12 pet"></div>');
                    var $imageURL = $(String.format('<div class="col-lg-12 col-sm-12 col-xs-3 petPicture" style="background-image: url({0});"></div>' , data.ImageURL));
                    var $petFrame = $('<div class="col-lg-12 col-sm-12 col-xs-9 petContext"></div>');
                    var $petId = $(String.format('<div class="number">寵物ID:{0}</div>', childSnapshot.key));
                    var $petName = $(String.format('<div class="number">寵物名字:{0}</div>', data.PetName));
                    var $birthday = $(String.format('<div class="number">生日:{0}</div>', data.Birthday));
                    var $location = $(String.format('<div class="number">地址:{0}</div>', data.Location));
//                var $category = $(String.format('<div class="number">Category:{0}</div>', data.Category));
//                var $view = $('<input type="button" value="view" />');
                    var $remove = $('<span class="glyphicon glyphicon-remove-circle but"></span>');

                    $petData.append($imageURL);

                    $petFrame.append($petId);
                    $petFrame.append($petName);
                    $petFrame.append($birthday);
                    $petFrame.append($location);
//                    $petData.append($remove);
//                $petFrame.append($category);

                    $petData.append($petFrame);
                    $petsContainer.append($petData);

                    $imageURL.click(function () {
                      location.href = 'IntroducePet.html?petId=' + childSnapshot.key;
                    });
                    $remove.click(function () {
                      database.ref('pets/' + childSnapshot.key).remove();
                      $petData.remove();
                      temp=snapshot.numChildren();
                      CulculatePage();
                      $petsContainer.empty();
                      RetrieveData();
                    });

                    if(isAdmin)
                    {
                        $petData.append($remove);
                    }

                //console.log(childSnapshot.key);
                //console.log(childSnapshot.val());
                //console.log(childSnapshot.ref);
                }
                counter++;
            });
            CheckPictureHeight();
        });
    });
}
