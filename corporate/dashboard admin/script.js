/**
 * @var change url
 */


let activityBtn = document.getElementById("activity-btn")
let timersBtn = document.getElementById("timers-btn");
let timersTab = document.getElementById("timer-item-tab");
let activeTab = document.getElementById("active-info-tab");


function switchToActivityTab(){
    timersBtn.classList.remove("hm-btn-on");
    timersBtn.classList.add("hm-btn-off");
    activityBtn.classList.remove("hm-btn-off");
    activityBtn.classList.add("hm-btn-on");
    timersTab.classList.add("d-none");
    activeTab.classList.remove("d-none");
}

function switchToTimerTab(){
    activityBtn.classList.remove("hm-btn-on");
    activityBtn.classList.add("hm-btn-off");
    timersBtn.classList.remove("hm-btn-off");
    timersBtn.classList.add("hm-btn-on");
    timersTab.classList.remove("d-none")
    activeTab.classList.add("d-none");
}



function viewRejected(){
	myTable.ajax.url(API + '?get&status=REJECTED').load()
}