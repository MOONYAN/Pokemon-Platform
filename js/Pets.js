var database = firebase.database();
var $petsContainer = $('#_petsContainer');
$(RetrieveData);

function RetrieveData()
{
    var reference = database.ref('pets');
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
            $petData.click(function ()
            {
                location.href = 'IntroducePet.html?petId=' + childSnapshot.key;
            });
            //console.log(childSnapshot.key);
            //console.log(childSnapshot.val());
            //console.log(childSnapshot.ref);
        });
    });
}