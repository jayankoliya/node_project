(function ($, document, window) {

	$(document).ready(function () {

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function () {
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if (map.length) {

			map.gmap3({
				map: {
					options: {
						center: [latitude, longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker: {
					latLng: [latitude, longitude],
				}
			});

		}
	});

	$(window).load(function () {

	});

})(jQuery, document, window);

// weather api use 

// id
const cityName = document.getElementById("cityName");
const searchBtn = document.getElementById('searchBtn');
let city = document.getElementById('city');

// class
let weatherIcon = document.querySelector('.weather-icon');
let hide = document.querySelector('.forecast-content');
const East = 'East'

const getInfo = async () => {

	if (cityName.value === '') {

		city.innerHTML = `please write the name before search`;
		hide.style.display = 'none';

	} else {
		try {
			const apiKey = "2125483f4b58323513341c6ef6924b72";
			const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

			const responce = await fetch(`${apiUrl}&q=${cityName.value}&appid=${apiKey}`)
			let data = await responce.json();

			city.innerHTML = `${data.name}, ${data.sys.country}`;
			document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
			document.querySelector('.humidity').innerHTML = `<img src="images/icon-umberella.png">${data.main.humidity}%`;
			document.querySelector('.wind').innerHTML = `<img src="images/icon-wind.png" alt="">${ data.wind.speed}km/h`;
			document.querySelector('.compass').innerHTML = `<img src="images/icon-compass.png">`+ East;

			if (data.weather[0].main == 'Clouds') {
                weatherIcon.src = "images/icons/icon-6.svg"
            }
            else if (data.weather[0].main == 'Clear') {
                weatherIcon.src = "images/icons/icon-3.svg"
            }
            else if (data.weather[0].main == 'Rain') {
                weatherIcon.src = "images/icons/icon-11.svg"
            }
            else if (data.weather[0].main == 'Drizzle') {
                weatherIcon.src = "images/icons/icon-2.svg"
            }
            else if (data.weather[0].main == 'Mist') {
                weatherIcon.src = "images/icons/icon-8.svg"
            }

			hide.style.display = 'block';

		} catch (error) {
			city.innerHTML = `please write the name before search`;
			// hide.style.display = 'none';
		}
	}

}

searchBtn.addEventListener('click', getInfo);

//	daily date and weekday
const date = document.querySelector('.date');
const day = document.querySelector('.day');
const month = document.getElementById('month');

const today = new Date();

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Allmonth = [" Jan"," Feb"," March"," April"," May"," June"," July"," August"," Sept"," Oct"," Nov","  Dec"];

date.innerHTML = (today.getDate() < 10 ? "0" : "") + today.getDate() + Allmonth[today.getMonth()];
day.innerHTML = weekday[today.getDay()];