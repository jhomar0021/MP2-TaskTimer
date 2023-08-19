'<div class="accordion mb-3" id="'+id+'">'+
'<div class="accordion-item container-fluid">'+
'<div class="accordion-header row text-center">'+
'<div class="col-12 project-name">'+
'<h3>'+ name+'</h3></div>'+
'<div class="col-6 h-100 mt-2 mt-md-0 col-md-4">'+
'<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
'data-bs-target="#'+id+'a" aria-expanded="false" aria-controls="'+id+'a">'+
'<div class="col-12 text-center"><i class="fa-solid fa-user-group"></i>'+
'</div><div class="col-12 text-center"><h4>Users</h4></div></button></div>'+
'<div class="col-6 h-100 mt-2 mt-md-0 col-md-4">'+
'<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
'data-bs-target="#'+id+'b" aria-expanded="false" aria-controls="'+id+'b">'+
'<div class="col-12 text-center">'+
'<i class="fa-solid fa-chart-line"></i></div>'+
'<div class="col-12 text-center"><h4>Metrics</h4></div></button></div>'+
'<div class="col-12 h-100 col-md-4 my-2 my-md-0">'+
'<button class="project-btn my-md-3 py-2" type="button" data-bs-toggle="collapse"'+
'data-bs-target="#'+id+'c" aria-expanded="false" aria-controls="'+id+'c">'+
'<div class="col-12 text-center">'+
'<i class="fas fa-duotone fa-gear"></i></div><div class="col-12 text-center">'+
'<h4>Project Settings</h4></div></button></div></div>'+
'<div id="'+id+'a" class="collapse" data-bs-parent="#projectlist"><div class="row">'+
'<div class="col-12 my-2  col-md-8 mx-2 stats-box row">'+
'<div class="col-12 text-center"><h4>Active Users</h4></div>'+
'<div class="col-12"><h2> '+id+' </h2></div>'+
'</div><div class="col-12 my-2  col-md-3 mx-2 row">'+
'<button class="add-task col-6 ms-5" data-bs-toggle="modal"'+
'data-bs-target="#AddTimerPopup">Manage Users</button></div></div></div>'+
'<div id="'+id+'b" class="collapse" data-bs-parent="#projectlist">'+
'<div class="container-fluid my-3 py-3 "><div class="row">'+
'<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
'<div class="col-12 col-lg-6 text-center"><h4>Total Project Hours</h4></div>'+
'<div class="col-12 col-lg-6 text-center"><h3>'+activeHoursMins+'</h3></div></div>'+
'<div class="col-12 my-2  col-md-4 mx-2 stats-box row">'+
'<div class="col-12 col-lg-6 text-center"><h4>Total Submitted</h4></div>'+
'<div class="col-12 col-lg-6 text-center"><h3>'+submitDisplay+'</h3></div></div>'+
'<div class="col-12 my-2  col-md-3 mx-2 row">'+
'<button>VIEW DETAILED</button></div></div></div></div>'+
'<div id="'+id+'c" class="collapse" data-bs-parent="#projectlist">'+
'<div class="row justify-content-evenly">'+
'<div class="col-3"></div><div class="col-12 col-md-6">'+
'<form id="project-update"><div class="my-4 col">'+
'<label for="timer-name" class="form-label">Project Name</label>'+
'<input type="text" required class="form-control" id="timer-name"'+
'aria-describedby="emailHelp"></div>'+
'<div class="my-4 col row text-center align-items-bottom">'+
'<div class="vstack gap-2 col-md-5 mx-auto">'+
'<button type="button" onclick="update('+id+')" class="project-btn py-3">Update</button>'+
'<button type="button" onclick="destroy('+id+')" class="project-btn py-3">Delete</button>'+
'</div></div></form></div><div class="col-3"></div></div></div></div></div>';