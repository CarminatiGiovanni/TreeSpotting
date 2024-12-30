
document.getElementById('spottingForm').addEventListener('submit', formSubmit);

let SELECTED = 'tree';
let pointLat = 0;
let pointLng = 0;
function openForm(objLat,objLng) {
    document.getElementById('formcontainer').style.display = 'block';
    pointLat = objLat;
    pointLng = objLng;
    switchForm('tree');
}

function switchForm(selectedType) {
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = '';

    switch(selectedType) {
        case 'tree':
            formFields.innerHTML = treeFormHTML(pointLat, pointLng);
            SELECTED = 'tree';
        break;
        case 'pod':
            formFields.innerHTML = podFormHTML(pointLat, pointLng);
            SELECTED = 'pod';
        break;
        case 'ruin':
            formFields.innerHTML = ruinFormHTML(pointLat, pointLng);
            SELECTED = 'ruin';
        break;
        case 'slack':
            formFields.innerHTML = slackFormHTML(pointLat, pointLng);
            SELECTED = 'slack';
            break;
        default:
            formFields.innerHTML = treeFormHTML(pointLat, pointLng);
            SELECTED = 'tree';
    }

    // Update button styles
    document.querySelectorAll('.button-container button').forEach(button => {
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
    });
    document.getElementById(`${selectedType}Button`).style.backgroundColor = '#f9f9f9';
    document.getElementById(`${selectedType}Button`).style.color = 'black';
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
    formData.forEach((value, key) => formObject[key] = value || fields[SELECTED][key]['default']); // fields defined in index.html
    
    fetch(`/add_${SELECTED}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    }).then(res => res.json())
    .then(data => {
        markersInformations[data._id] = {...data,type:SELECTED};
        createMarker(pointLat, pointLng, SELECTED, data.name, data._id);
    }).catch(err => console.log('error',err));

    closeForm();
}