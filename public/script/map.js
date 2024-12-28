///// MAP ///////////////////////////////////////////////////////////////////////////////////////

let map = L.map('map').fitWorld(); //setView([userLat, longitude], defaultZoom);
map.doubleClickZoom.disable(); 
map.on('dblclick', function(e) {
    let latlng = map.mouseEventToLatLng(e.originalEvent);
    // L.marker(latlng, {icon: yourPosIcon}).addTo(map).bindPopup('You are here!').openPopup();
    openForm(latlng);
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    maxZoom: 20,
}).addTo(map);

function backToYourPos() { // button on the navbar on top left
    map.setView([userLat, userLng], defaultZoom);
}
