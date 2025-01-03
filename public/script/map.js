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
    let marker;
    switch(type){ // .bindPopup(name)
        case 'ruin':    marker = new  L.marker([lat, lng], {icon: getIcon(type,name), id:id}); break;
        case 'pod':     marker = new  L.marker([lat, lng], {icon: getIcon(type,name), id:id}); break;
        case 'tree':    marker = new  L.marker([lat, lng], {icon:  getIcon(type,name), id:id}); break;
        case 'slack':   marker = new  L.marker([lat, lng], {icon: getIcon(type,name), id:id}); break;
        case 'mushroom':   marker = new  L.marker([lat, lng], {icon: getIcon(type,name), id:id}); break;
        default: console.log('Error: invalid name');
    }
    map.addLayer(marker);
    marker.on('click',getMarkerInfo);

    markersInformations[id] = {marker:marker, ...markersInformations[id]};
    // .on('click',getMarkerInfo)
    //    .on('mouseover', onClick);
}

function getMarkerInfo(e){
    id = this.options.id;
    // console.log(markersInformations[id]);
    openPopup(markersInformations[id].type,markersInformations[id].name, markersInformations[id].description, markersInformations[id].discoveredBy, markersInformations[id].size);
}

function deleteElement(){
    idToDelete = document.getElementById('elementId').innerHTML;
    type = document.getElementById('elementType').innerHTML;
    if (confirm('Casal \'ndela rometa?')) {
        if (confirm('Te set sigur? ada che po\' dopo \'lghe pio')){
            fetch('/delete_'+type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({_id: idToDelete}),
            });

            markerDelete = markersInformations[idToDelete].marker;
            map = map.removeLayer(markerDelete);
            delete markersInformations[idToDelete];
            closePopup();
        }
    }
}