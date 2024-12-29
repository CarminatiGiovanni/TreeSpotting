///////////////// Requests ///////////////////////////////////////////////////////////////////////////////////////

function getRuins() {
    fetch('/ruins', { method: 'POST' })
        .then(res => res.json())
        .then(ruins => {
            ruins.forEach(ruin => createMarker(ruin.latitude, ruin.longitude, 'ruin', ruin.name, ruin._id));
            ruins.forEach(ruin => markersInformations[ruin._id] = ruin);
        })
        .catch(err => console.log(err));
}

function getTrees() {
    fetch('/trees', { method: 'POST' })
        .then(res => res.json())
        .then(trees => {
            trees.forEach(tree => createMarker(tree.latitude, tree.longitude, 'tree', tree.name, tree._id));
            trees.forEach(tree => markersInformations[tree._id] = tree);
        })
        .catch(err => console.log(err));
}

function getPods() {
    fetch('/pods', { method: 'POST' })
        .then(res => res.json())
        .then(pods => {
            pods.forEach(pod => createMarker(pod.latitude, pod.longitude, 'pod', pod.name, pod._id));
            pods.forEach(pod => markersInformations[pod._id] = pod);
        })
        .catch(err => console.log(err));
}