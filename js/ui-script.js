let day ="";
let month ="";
let dayShort = "";
let dayDate ="";

setDefaultDate();

function setDefaultDate(){
    var getToday = new Date(); 
                
    month = getToday.getMonth()+1;
    if(month < 10){
        month = "0"+month;
    }
    var date  = getToday.getDate();
    if(date < 10){
        date  = "0"+ date;
    } 
    var hrs  = getToday.getHours();
    if(hrs < 10){
        hrs  = "0"+ hrs;
    } 
    var min  = getToday.getMinutes();
    if(min < 10){
        min  = "0"+ min;
    }
    var sec  = getToday.getSeconds();
    if(sec < 10){
        sec  = "0"+ sec;
    }

    dayToDay = getToday.getDay();

    switch (new Date().getDay()) {
        case 0:
          day = "Sunday";
          dayShort ="SUN"
          break;
        case 1:
          day = "Monday";
          dayShort ="MON"
          break;
        case 2:
           day = "Tuesday";
           dayShort ="TUE"
          break;
        case 3:
          day = "Wednesday";
          dayShort ="WED"
          break;
        case 4:
          day = "Thursday";
          dayShort ="THRS"
          break;
        case 5:
          day = "Friday";
          dayShort ="FRI"
          break;
        case 6:
          day = "Saturday";
          dayShort ="SAT"
      }
    $("#datetimeview").html(day+" "+month+"-"+date);
}