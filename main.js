
const API_KEY = 9f3311a42d6bc9a76aceaf1c65f28d41;


function farenheitToCelcius(temp) {
    return (temp - 32) * 5/9;
}

window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temp;

    // setting up DOM elements
    let unitSec = document.querySelector('#temp-unit');
    let timeZone = document.querySelector('#timezone-location');
    let tempPlaceHolder = document.querySelector('#temp-degree');
    let description = document.querySelector('#temp-description')

    //get the current location of user using geoloaction
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            
            const proxy = ''; // If you are running this in localhost Comment this line and uncomment below commented line
            //const proxy = `https://cors-anywhere.herokuapp.com/`
            const apiUrl = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`;

            // fetching data from the api
            fetch(apiUrl).then(
                response => {
                    return response.json();
                }).then(data => {
        
                    //Extract data from the json response
                    const location = data.timezone;
                    const {temperature, icon, summary} = data.currently;
                    temp = temperature; // For convert tempratures 
            
                    //SVG weathor icon animation configs
                    const skycons = new Skycons({"color": "white"});
                    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
                    console.log(document.getElementById("icon"));
                    skycons.play();
                    skycons.set("icon", Skycons[currentIcon]);
               
                    //Inject data into html
                    timeZone.textContent = location;
                    tempPlaceHolder.textContent = temperature;
                    description.textContent = summary;
                });
            
        });
    } else {
        alert('Location is not enable or not supported');
    }

    document.getElementById('temp-degree-sec').onclick = () => {
        console.log(temp);
        if (unitSec.textContent === 'F') {
            document.querySelector('#temp-degree').textContent = farenheitToCelcius(temp).toFixed(2);
            unitSec.textContent = "C";
        } else {
            document.querySelector('#temp-degree').textContent = temp;
            unitSec.textContent = "F";
        }
    };
});

