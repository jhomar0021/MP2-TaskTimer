var fileUpload = document.getElementById("file");

fileUpload.addEventListener("change", function (event) {

  let loading = '<div class="spinner-border" role="status">'+
  '<span class="visually-hidden">Loading...</span></div>';
  $('#uploader').html(loading);
  var file = event.target.files[0];

  let form_data = new FormData();

  form_data.append("my_image", file);
  $.ajax({
    url: PROFILE_API, //URL of the API
    type: "POST", //GET and POST
    data: form_data,
    contentType: false,
    processData: false,
    success: function (response) {
      //success yung response
      console.log(response);
      let imagePath = "../../upload/" + JSON.parse(response).data;
      console.log(imagePath);

      location.reload();
        
    },
    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
});

function update() {
  let updateRequest = {
    id: $("#userID").text(),
    fname: $("#fname").val(),
    lname: $("#lname").val(),
    username: $("#username").val(),
  };

  $.ajax({
    url: PROFILE_API, //URL of the API
    type: "POST", //GET and POST
    data: "update=" + JSON.stringify(updateRequest), //auth will be our php variable $_POST['auth']
    success: function (response) {
      //success yung response
      console.log(response);
      getProfile();
    },
    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
}
