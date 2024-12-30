let objLat = 0; //TODO: remove as global variables
let objLng = 0;

///// ONLOAD ///////////////////////////////////////////////////////////////////////////////////////

function onLoadCycle(){
    // getting location
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude; // set lat e lng
        userLng = position.coords.longitude;
        backToYourPos();
        L.marker([userLat,userLng], {icon: feetIcon}).addTo(map).bindPopup('Te set che!') // puts marker 
    });
    else {
        console.log('error, impossible get the location');
        return;
    }

    getPods();
    getTrees();
    getRuins();
    getSlack();
}