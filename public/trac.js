console.log('ajax running')
const orderId = document.querySelector('.trackId');

$("#track").on("click", function () {
  var id = $("#trackId").val();
  var status;
  $.ajax({
    url: `/track/package/${orderId.value}`,
    method: "get",
    datatype: "json",
    success: function (data) {
      const order = data.order;
      $("#status").text("your parcel with id   " + order[0].order_id + "  is " + order[0].status);
    }
  });
  $("#exampleModal").modal("show");
});