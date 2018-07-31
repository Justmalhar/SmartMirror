window.onload = function() {
  getTime();
  getBusSchedule();
  getWeather();
  //getForecast();
}

function getTime() {
  timer();
  var today = new Date();
  var todayDate =  dayName() + ', ' + monthName() + ' ' + today.getDate();
  document.getElementById("dateTime").innerHTML= todayDate;
}

function timer(){
 var now     = new Date,
     hours   = now.getHours(),
     ampm    = hours<12 ? ' AM' : ' PM',
     minutes = now.getMinutes(),
     seconds = now.getSeconds(),
     t_str   = [hours-12, //otherwise: what's the use of AM/PM?
                (minutes < 10 ? "0" + minutes : minutes)]
                 .join(':') + ampm;
 document.getElementById('currentTime').innerHTML = t_str;
 setTimeout(timer,1000);
}

function dayName() {
  var day;
  switch (new Date().getDay()) {
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case 6:
          day = "Saturday";
  }
  return day;
}

function monthName(){
  switch (new Date().getMonth()) {
      case 0:
          month = "January";
          break;
      case 1:
          month = "February";
          break;
      case 2:
          month = "March";
          break;
      case 3:
          month = "April";
          break;
      case 4:
          month = "May";
          break;
      case 5:
          month = "June";
          break;
      case 6:
          month = "July";
          break;
      case 7:
          month = "August";
          break;
      case 8:
          month = "September";
          break;
      case 9:
          month = "October";
          break;
      case 10:
          month = "November";
          break;
      case 11:
          month = "December";
          break;
  }
  return month;
}

function getWeather(){
  let apiKey = 'a29a1c7dcc6cc5c2925327fda4b18f63';
  let city = 'Syracuse';
  let url = `http://api.openweathermap.org/data/2.5/weather?q=Syracuse&appid=a29a1c7dcc6cc5c2925327fda4b18f63`;
  var request = new XMLHttpRequest();
  request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Syracuse&appid=a29a1c7dcc6cc5c2925327fda4b18f63&units=metric', true);
  request.onload = function(){
    var weatherData = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        document.getElementById('currentTemperature').innerHTML=weatherData.main.temp;
        //document.write(weatherData.weather[3]);
        var condition=weatherData.weather[0].description;
        document.getElementById('weatherCondition').innerHTML=titleCase(condition);
        console.log("http://openweathermap.org/img/w/" + weatherData.weather[0].icon);
        document.getElementById('weatherIcon').src= "http://openweathermap.org/img/w/" + weatherData.weather[0].icon +".png";
    } else {
      console.log('error');
    }
  }
  request.send();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}



function getBusSchedule(){
  busJSON = {
      "1":{
        "bus" : "westcott",
        "route": "SY30",
        "time":["05:37","06:52","07:22","07:57","08:12","09:17","09:57","11:17","12:22","13:47","14:52","16:12","17:17","23:11"]
      },
      "2":{
        "bus" : "drumlins",
        "route": "SY40",
        "time":["05:47","06:17","07:07","07:45","08:41","09:25","10:05","10:44","11:25","11:49","12:30","13:09","13:55","14:19","15:00","15:45","16:25","16:52","17:17","17:53","18:09","19:14"]
      },
      "3":{
        "bus" : "east campus",
        "route": "35",
        "time":["17:33","18:13","18:53","19:33","20:13","20:53","21:33","22:13","22:53","23:33","0:13","0:53","1:33","2:13"]
      },
      "4":{
        "bus" : "james st",
        "route": "33",
        "time":["07:15","07:55","08:35","09:10","09:55","11:10","12:40","14:10","15:35","16:25","17:10","17:55","18:35","19:25","20:00","20:35"]
      }
    };
    var now     = new Date,
        hours   = now.getHours(),
        minutes = now.getMinutes(),
        seconds = now.getSeconds(),
        t_str   = [hours,
                   (minutes < 10 ? "0" + minutes : minutes)]
                    .join(':');
    console.log(t_str);
    for(i=1;i<5;i++){
      searchBus(t_str,i);
    }
    console.log(busJSON[1].route);
    function searchBus(t,n) {
      var times = [], i;
      for(i=0; i < busJSON[n].time.length; i++){
        var time1 = t.split(':');
        var time2 = busJSON[n].time[i].split(':');
        if(eval(time1[0]) < eval(time2[0])){
          times.push(busJSON[n].time[i])
        } else if(eval(time1[0]) == eval(time2[0]) && eval(time1[1]) < eval(time2[1])) {
          times.push(busJSON[n].time[i])
        }
      }
      console.log(times);
      if(times.length>0){
        var currentBus=times[0];
        times.shift();
        var table = document.getElementById('busTable');
        var row1 = document.createElement('tr');
        var col1 = document.createElement('td');
        var col2=document.createElement('td'),col3=document.createElement('td'), col22=document.createElement('td');
        //col1.setAttribute("rowspan","2");
        //col3.setAttribute("rowspan","2");
        var col1Text = document.createTextNode(busJSON[n].route);
        col1.appendChild(col1Text);
        var col2Text = document.createTextNode(titleCase(busJSON[n].bus));
        col2.appendChild(col2Text);
        var col3Text = document.createTextNode((currentBus) + " min");
        col3.appendChild(col3Text);
        row1.appendChild(col1);
        row1.appendChild(col2);
        row1.appendChild(col3);
        var row2 = document.createElement('tr');
        var col22Text = document.createTextNode("Next bus is at: " + times);
        col22.appendChild(col22Text);
        row2.appendChild(col22);
        table.appendChild(row1);
        table.appendChild(row2);
      }
    }
    }
