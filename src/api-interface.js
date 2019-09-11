import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function() {
  console.log("tacos");
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    console.log(city);
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2fac426a0748590b45212a8c8e046aed`;

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      console.log(body.weather);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
