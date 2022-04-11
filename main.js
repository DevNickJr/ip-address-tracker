document.querySelector('.search-btn').addEventListener('click', ipSearch);


let latitude;
let longitude;

function ipSearch() {
    ip = document.getElementById('search').value
    address('&ipAddress='+ip)
}



async function address(searchObj) {
    let myAddress = await fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_z8fZknQtvNO5df1jpFoh8GLrqVRQ0'+searchObj)
    let text = await myAddress.text()
    let data = JSON.parse(text)
    document.getElementById('ip').innerHTML = data.ip
    document.getElementById('location').innerHTML =`${data.location.region}, ${data.location.country} ${data.location.postalCode}`
    document.getElementById('time').innerHTML ='UTC '+ data.location.timezone
    document.getElementById('isp').innerHTML = data.isp
    latitude = data.location.lat
    longitude = data.location.lng
    mapp()
}

function mapp() {
    var map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });
    
    var marker = L.marker([latitude, longitude], {icon: myIcon}).addTo(map);

}


// function address() {
//     fetch('https://geo.ipify.org/api/v2/country?apiKey=at_z8fZknQtvNO5df1jpFoh8GLrqVRQ0&ipAddress=8.8.8.8')
//     .then(x => x.text())
//     .then(y => document.write(y))
// }

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibmljaG9sYXNkdWFkZWk3IiwiYSI6ImNsMXUxd2UzZzBiY2wzb21ydWl4YW5qN20ifQ.85V8vADaNtY48f-EYZ7CnA'
// }).addTo(map);
