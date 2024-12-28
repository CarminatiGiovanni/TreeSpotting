///////////////// Requests ///////////////////////////////////////////////////////////////////////////////////////

function getRuins(){
    fetch('/ruins',{method: 'POST'})
    .then(res => res.json())
    .then(ruins => {
        ruins.forEach(ruin => {
            L.marker([ruin.latitude, ruin.longitude], {icon: ruinIcon}).addTo(map).bindPopup(ruin.name);
        });
    })
    .catch(err => console.log(err));
}
function getTrees() {
    fetch('/trees', { method: 'POST' })
        .then(res => res.json())
        .then(trees => trees.forEach(tree => L.marker([tree.latitude, tree.longitude], {icon: treeiconmapping(tree.name)}).addTo(map).bindPopup(tree.name)))
        .catch(err => console.log(err));
}
function getPods() {
    fetch('/pods', { method: 'POST' })
        .then(res => res.json())
        .then(pods => {
            pods.forEach(pod => {
                L.marker([pod.latitude, pod.longitude], {icon: waterIcon}).addTo(map).bindPopup(pod.name);
            });
        })
        .catch(err => console.log(err));
}