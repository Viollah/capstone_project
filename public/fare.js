$("#cal").on("click", function() {
  var fare;
  var origin = $("#pickUp").val();
  var destination = $("#drop").val();
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.METRIC
    },
    callback
  );

  function callback(response, status) {
    if (status == "OK") {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var distance = response.rows[0].elements[0].distance.text;
      dist = parseInt(distance, 10);
      console.log(dist);
      fare = fareCalc(dist);
      $("#fare").attr("value", fare);
      $("#fare").attr("placeholder", fare);
    }
  }
  function fareCalc(distance) {
    console.log("h");
    var cost;

    if (distance < 20) {
      cost = 200;
    } else if (20 < distance < 40) {
      cost = 500;
    } else {
      cost = 700;
    }
    return cost;
  }
});

$("#showorders").on("click", function() {
  var name = $("#name").text();
  $("tbody").html("");
  $.ajax({
    url: "/clientdashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].Clientname == name) {
          console.log(data[i]);
          console.log(data[i].Clientname);
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].status +
              "</td></tr>"
          );
        }
      }
    }
  });
});

function validation(){
  var locality = document.getElementById('locality').value;
  var city = document.getElementById('city').value;
  var pass = document.getElementById('pass').value;
  var confirmpass = document.getElementById('conpass').value;
  var mobileNumber = document.getElementById('mobileNumber').value;

  if(locality == ""){
    document.getElementById('local').innerHTML =" ** Please fill the locality field";
    return false;
  }
  if((locality.length <= 2) || (locality.length > 15)) {
    document.getElementById('local').innerHTML =" ** Locality lenght must be between 2 and 255";
    return false;	
  }
  if(!isNaN(locality)){
    document.getElementById('local').innerHTML =" ** only characters are allowed";
    return false;
  }
  if(city == ""){
    document.getElementById('town').innerHTML =" ** Please fill the City field";
    return false;
  }
  if((city.length <= 2) || (city.length > 15)) {
    document.getElementById('town').innerHTML =" ** City lenght must be between 2 and 255";
    return false;	
  }
  if(!isNaN(city)){
    document.getElementById('town').innerHTML =" ** only characters are allowed";
    return false;
  }

  if(pass == ""){
    document.getElementById('passwords').innerHTML =" ** Please fill the password field";
    return false;
  }
  if((pass.length <= 5) || (pass.length > 20)) {
    document.getElementById('passwords').innerHTML =" ** Passwords lenght must be between  5 and 20";
    return false;	
  }


  if(pass!=confirmpass){
    document.getElementById('confrmpass').innerHTML =" ** Password does not match the confirm password";
    return false;
  }



  if(confirmpass == ""){
    document.getElementById('confrmpass').innerHTML =" ** Please fill the confirmpassword field";
    return false;
  }

  if(mobileNumber == ""){
    document.getElementById('mobileno').innerHTML =" ** Please fill the mobile NUmber field";
    return false;
  }
  if(isNaN(mobileNumber)){
    document.getElementById('mobileno').innerHTML =" ** user must write digits only not characters";
    return false;
  }
  if(mobileNumber.length!=10){
    document.getElementById('mobileno').innerHTML =" ** Mobile Number must be 10 digits only";
    return false;
  }

}

