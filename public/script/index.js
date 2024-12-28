const defaultZoom = 15
let zoom = defaultZoom;
let latitude = 45.794284064900566;
let longitude = 9.704325503425144;

let yourPosIcon = L.icon({
    iconUrl: '../icon/feet.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let chestnutIcon = L.icon({
    iconUrl: '../icon/chestnut.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let walnutIcon = L.icon({
    iconUrl: '../icon/walnut.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let treeIcon = L.icon({
    iconUrl: '../icon/tree.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let waterIcon = L.icon({
    iconUrl: '../icon/drop.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let ruinIcon = L.icon({
    iconUrl: '../icon/ruin.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

let map = L.map('map').fitWorld(); //setView([latitude, longitude], defaultZoom);
fetch('/trees',{method: 'POST'} )
    .then(res => res.json())
    .then(trees => {
        trees.forEach(tree => {
            if (tree.name === 'Castagno') L.marker([tree.latitude, tree.longitude], {icon: chestnutIcon}).addTo(map).bindPopup(tree.name);
            else if (tree.name === 'Noce') L.marker([tree.latitude, tree.longitude], {icon: walnutIcon}).addTo(map).bindPopup(tree.name);
            else L.marker([tree.latitude, tree.longitude], {icon: treeIcon}).addTo(map).bindPopup(tree.name);
        })
    })
    .catch(err => console.log(err));

fetch('/pods',{method: 'POST'})
    .then(res => res.json())
    .then(pods => {
        pods.forEach(pod => {
            L.marker([pod.latitude, pod.longitude], {icon: waterIcon}).addTo(map).bindPopup(pod.name);
        });
    })
    .catch(err => console.log(err));

fetch('/ruins',{method: 'POST'})
    .then(res => res.json())
    .then(ruins => {
        ruins.forEach(ruin => {
            L.marker([ruin.latitude, ruin.longitude], {icon: ruinIcon}).addTo(map).bindPopup(ruin.name);
        });
    })
    .catch(err => console.log(err));

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    maxZoom: 20,
}).addTo(map);

///// TOUCH SISTEM ///////////////////////////////////////////////////////////////////////////////////////

let mapTapHoldTimeout ;

map.doubleClickZoom.disable(); 
map.on('dblclick', function(e) {
    let latlng = map.mouseEventToLatLng(e.originalEvent);
    // L.marker(latlng, {icon: yourPosIcon}).addTo(map).bindPopup('You are here!').openPopup();
    openForm(latlng);
});

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    map.setView([latitude, longitude], defaultZoom);
    L.marker([latitude,longitude], {icon: yourPosIcon}).addTo(map).bindPopup('You are here!') // .openPopup();
}

function getLocation() { // called onload
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(showPosition);
    else console.log('error');
}

function backToYourPos() {
    map.setView([latitude, longitude], defaultZoom);
}

let formitem = document.getElementById('spottingForm');
formitem.addEventListener('submit', formSubmit);

function openForm(latlng) {
    document.getElementById('spottingForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('spottingForm').style.display = 'none';
}

function formSubmit(e){
    // console.log(SELECTED); // global variable defined in index.html
    e.preventDefault();
    const formData = new FormData(document.getElementById('spottingForm'));
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value || fields[SELECTED][key]['default'] // fields defined in index.html
    });
    formObject['latitude'] = latitude;
    formObject['longitude'] = longitude;
    
    fetch(`/add_${SELECTED}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    }).then(res => res.json())
    .then(data => {
        if (data.error) alert(data.error);
        else {
            if (SELECTED === 'tree') {
                if (data.name === 'Castagno') L.marker([data.latitude, data.longitude], {icon: chestnutIcon}).addTo(map).bindPopup(data.name);
                else if (data.name === 'Noce') L.marker([data.latitude, data.longitude], {icon: walnutIcon}).addTo(map).bindPopup(data.name);
                else L.marker([data.latitude, data.longitude], {icon: treeIcon}).addTo(map).bindPopup(data.name);
            }
            else if (SELECTED === 'pod') L.marker([data.latitude, data.longitude], {icon: waterIcon}).addTo(map).bindPopup(data.name);
            else if (SELECTED === 'ruin') L.marker([data.latitude, data.longitude], {icon: ruinIcon}).addTo(map).bindPopup(data.name);
        }
    }).catch(err => console.log(err));

    closeForm();
}