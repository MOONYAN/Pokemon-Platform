var database = firebase.database();
$(Start);

function Start() {
    //InputData();
    //RetrieveData();
    /*var newPostKey = database.ref().child('posts').push().key;
    console.log(newPostKey);
    database.ref().child('posts/' + newPostKey).set({SS:"MM"});*/
    //database.ref().remove();
    //var testref = database.ref("GGYY").update({ GGMail: "YYYMail" });
    //var testref = database.ref("GGYY").remove();
    /*testref.set({
        
            username: "ZZName",
            email: "ZZmail"
               
    });*/

    /*var ref = firebase.database().ref();
    ref.once("value")
      .then(function (snapshot) {
          console.log(snapshot.key);
          console.log(snapshot.val());
          console.log(snapshot);
      });*/
    var ref = firebase.database().ref();
    alert(ref.push("AA").key);
    //console.log(snapshot.ref("first"));
    /*var a = snapshot.exists();  // true
    alert('a=' + a);
    var b = snapshot.child("email").exists(); // true
    alert('b=' + b);
    var c = snapshot.child("username").exists(); // true
    alert('c=' + a);
    var d = snapshot.child("-KJySuO1gUxKhDvneatY").exists(); // false
    alert('d=' + d);
});*/
}

function InputData()
{
    var reference = database.ref();
    for(var i=0;i<10;i++)
    {
        reference.push(i);
    }
}

function RetrieveData()
{
    var reference = database.ref();
    reference.once("value").then(function (snapshot)
    {
        snapshot.forEach(function (childSnapshot)
        {
            console.log(childSnapshot.key);
            console.log(childSnapshot.val());
            console.log(childSnapshot.ref);
        });
    });
}
