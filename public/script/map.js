///// MAP ///////////////////////////////////////////////////////////////////////////////////////

let map = L.map('map').fitWorld(); //setView([userLat, longitude], defaultZoom);
map.doubleClickZoom.disable(); 
map.on('dblclick', function(e) {
    let latlng = map.mouseEventToLatLng(e.originalEvent);
    // L.marker(latlng, {icon: yourPosIcon}).addTo(map).bindPopup('You are here!').openPopup();
    openForm(latlng.lat, latlng.lng);
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    maxZoom: 20,
}).addTo(map);

function backToYourPos() { // button on the navbar on top left
    map.setView([userLat, userLng], defaultZoom);
}

function createMarker(lat,lng,type,name,id){
    switch(type){
        case 'ruin': L.marker([lat, lng], {icon: ruinIcon, id:id}).addTo(map).bindPopup(name).on('click',getMarkerInfo); break;
        case 'pod': L.marker([lat, lng], {icon: podIcon, id:id}).addTo(map).bindPopup(name).on('click',getMarkerInfo); break;
        case 'tree': L.marker([lat, lng], {icon:  treeiconmapping(name), id:id}).addTo(map).bindPopup(name).on('click',getMarkerInfo); break;
        default: console.log('Error: invalid name');
    }
    // .on('click',getMarkerInfo)
    //    .on('mouseover', onClick);
}

function getMarkerInfo(e){
    id = this.options.id;
    console.log(markersInformations[id]);
}