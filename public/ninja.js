$("#available").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/statusAvail", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: "Available"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#availability").text("Available");
    }
  });
});
$("#not_available").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/statusAvail", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      status: "Not Available"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#availability").text(" Not Available");
    }
  });
});
//duty status
$("#Onduty").click(function() {
  var id = $("#id").val();
  $.ajax({
    url: "/ninjadashboard/statusDuty", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      duty: "On Duty"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#duty").text("On Duty");
    }
  });
});
$("#Offduty").click(function() {
  var id = $("#id").val();

  $.ajax({
    url: "/ninjadashboard/statusDuty", //Your api url
    type: "post", //type is any HTTP method
    data: {
      nid: id,
      duty: "Off Duty"
    }, //Data as js object
    success: function() {
      console.log("availbility Changed succesfully");
      $("#duty").text("Off Duty");
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


// $(document).ready(function() {
//   var id = $("#book").val();

//   $("#clienttable").DataTable({
//     processing: true,
//     serverSide: true,
//     bInfo: false,
//     ajax: { url: "/ninjadashboard/orders", dataSrc: "" },
//     columns: [
//       { data: "_id" },
//       { data: "Clientname" },
//       { data: "deliveryaddress" },
//       { data: "mobilenumber" },
//       { data: "pickupaddress" },
//       { data: "status" }
//     ]
//   });

//   $("#clienttable tbody").on("click", "tr", function() {
//     $(this).toggleClass("selected");
//   });
//   $("#inTransit").click(function() {
//     var table = $("#clienttable").DataTable();
//     var ids = table.rows(".selected").data()[0]._id;

//     $.ajax({
//       url: "/ninjadashboard/orderUpdate", //Your api url
//       type: "post", //type is any HTTP method
//       data: {
//         nid: ids,
//         status: "in transit"
//       }, //Data as js object
//       success: function() {
//         console.log("inTransit Changed succesfully");
//       }
//     });
//     console.log(ids);
//   });
// });

// $("#Delieverd").click(function() {
//   var table = $("#clienttable").DataTable();
//   var ids = table.rows(".selected").data()[0]._id;

//   $.ajax({
//     url: "/ninjadashboard/orderUpdate", //Your api url
//     type: "post", //type is any HTTP method
//     data: {
//       nid: ids,
//       status: "Delieverd"
//     }, //Data as js object
//     success: function() {
//       console.log("Delieverd Changed succesfully");
//     }
//   });
//   console.log(ids);
// });
/* 
$("#newOrder").on("click", function() {
  console.log("k");
  var id = $("#id").val();
  $("tbody").html("");
  $.ajax({
    url: "/ninjadashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].status);
        if (data[i].ninjaid == id && data[i].status == "yet to be picked") {
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].Clientname +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].mobilenumber +
              "</td><td>" +
              data[i].locality +
              "</td><td>" +
              data[i].Pincode +
              "</td></tr>"
          );
        }
      }
    }
  });
});
$("#delieverdOrders").on("click", function() {
  console.log("ki");
  var id = $("#id").val();
  $("tbody").html("");
  $.ajax({
    url: "/ninjadashboard/orders",
    method: "get",
    datatype: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].status);
        if (data[i].ninjaid == id && data[i].status == "delieverd") {
          $("tbody").append(
            "<tr><td>" +
              data[i]._id +
              "</td><td>" +
              data[i].Clientname +
              "</td><td>" +
              data[i].deliveryaddress +
              "</td><td>" +
              data[i].pickupaddress +
              "</td><td>" +
              data[i].mobilenumber +
              "</td><td>" +
              data[i].locality +
              "</td><td>" +
              data[i].Pincode +
              "</td></tr>"
          );
        }
      }
    }
  });
});
 */
