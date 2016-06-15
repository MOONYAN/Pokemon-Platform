var database = firebase.database();
var $petsContainer = $('#_petsContainer');
$(RetrieveData);

$('input[name="category"]').change(function ()
{
    $petsContainer.empty();
    RetrieveData();
});


function RetrieveData()
{
    
    var reference = database.ref('pets').orderByChild('State').equalTo('active');
    reference.once("value").then(function (subSnapshot) {
        subSnapshot.ref.orderByChild('Category').equalTo($('input[name="category"]:checked').val()).once("value").then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var data = childSnapshot.val();
                var $petData = $('<div class="col-xs-3 col-sm-3 col-lg-3 bg_blue"></div>');
                var $imageURL = $(String.format('<img class="petImage" id="_imageURLImage" alt="_imageURLImage" src="{0}" /><br />', data.ImageURL));
                var $petId = $(String.format('<label>PetId:{0}</label><br />', childSnapshot.key));
                var $petName = $(String.format('<label>PetName:{0}</label><br />', data.PetName));
                var $birthday = $(String.format('<label>Birthday:{0}</label><br />', data.Birthday));
                var $location = $(String.format('<label>Location:{0}</label><br />', data.Location));
                var $category = $(String.format('<label>Category:{0}</label><br />', data.Category));
                var $view = $('<input type="button" value="view" /><br />');
                $petData.append($imageURL);
                $petData.append($petId);
                $petData.append($petName);
                $petData.append($birthday);
                $petData.append($location);
                $petData.append($category);
                $petData.append($view);
                $petsContainer.append($petData);

                $view.click(function () {
                    location.href = 'IntroducePet.html?petId=' + childSnapshot.key;
                });
                //console.log(childSnapshot.key);
                //console.log(childSnapshot.val());
                //console.log(childSnapshot.ref);
            });
        });        
    });
}