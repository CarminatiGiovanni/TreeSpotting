let objLat = 0; //TODO: remove as global variables
let objLng = 0;

///// ONLOAD ///////////////////////////////////////////////////////////////////////////////////////

function onLoadCycle(){
    // getting location
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position) => {
        userLat = position.coords.latitude; // set lat e lng
        userLng = position.coords.longitude;
        backToYourPos();
        L.marker([userLat,userLng], {icon: feetIcon}).addTo(map).bindPopup('You are here!') // puts marker 
    });
    else {
        console.log('error, impossible get the location');
        return;
    }

    getPods();
    getTrees();
    getRuins();
}

///// FORM ///////////////////////////////////////////////////////////////////////////////////////

let formitem = document.getElementById('spottingForm');
formitem.addEventListener('submit', formSubmit);

function openForm(latlng) {
    document.getElementById('formcontainer').style.display = 'block';
    objLat = latlng.lat;
    objLng = latlng.lng;
}

function closeForm() {
    document.getElementById('formcontainer').style.display = 'none';
    const formFields = document.getElementById('formFields');
    formFields.querySelectorAll('input').forEach(field => field.value = '');
}

function formSubmit(e){
    // console.log(SELECTED); // global variable defined in index.html
    e.preventDefault();
    const formData = new FormData(document.getElementById('spottingForm'));
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value || fields[SELECTED][key]['default'] // fields defined in index.html
    });
    formObject['latitude'] = objLat;
    formObject['longitude'] = objLng;
    
    fetch(`/add_${SELECTED}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    }).then(res => res.json())
    .then(data => {
        if (SELECTED === 'tree') L.marker([objLat, objLng], {icon: treeiconmapping(formObject.name)}).addTo(map).bindPopup(formObject.name);
        else if (SELECTED === 'pod') L.marker([objLat, objLng], {icon: waterIcon}).addTo(map).bindPopup(formObject.name);
        else if (SELECTED === 'ruin') L.marker([objLat, objLng], {icon: ruinIcon}).addTo(map).bindPopup(formObject.name);
    }).catch(err => console.log('error',err));

    closeForm();
}

let SELECTED = 'tree'; // tree pod or ruin

function showForm(selectedType) {
  SELECTED = selectedType;
  const formFields = document.getElementById('formFields');
  formFields.innerHTML = '';

  let formContent = '';
  for (const [key,value] of Object.entries(fields[selectedType])) {
    formContent += `
      <input type="${value['type']} " id="${key}" name="${key}" placeholder="${key}" defaultvalue="${value['default']}"><br/>
    `;
  }
  formFields.innerHTML = formContent;

  // Update button styles
  document.querySelectorAll('.button-container button').forEach(button => {
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
  });
  document.getElementById(`${selectedType}Button`).style.backgroundColor = '#f9f9f9';
  document.getElementById(`${selectedType}Button`).style.color = 'black';
  }

document.addEventListener('DOMContentLoaded', () => showForm('tree'));