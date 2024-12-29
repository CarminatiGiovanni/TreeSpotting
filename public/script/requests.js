///////////////// Requests ///////////////////////////////////////////////////////////////////////////////////////

function getRuins() {
    fetch('/ruins', { method: 'POST' })
        .then(res => res.json())
        .then(ruins => {
            ruins.forEach(ruin => createMarker(ruin.latitude, ruin.longitude, 'ruin', ruin.name, ruin._id));
            ruins.forEach(ruin => markersInformations[ruin._id] = {...ruin, type: 'ruin'});
        })
        .catch(err => console.log(err));
}

function getTrees() {
    fetch('/trees', { method: 'POST' })
        .then(res => res.json())
        .then(trees => {
            trees.forEach(tree => createMarker(tree.latitude, tree.longitude, 'tree', tree.name, tree._id));
            trees.forEach(tree => markersInformations[tree._id] = {...tree, type: 'tree'});
        })
        .catch(err => console.log(err));
}

function getPods() {
    fetch('/pods', { method: 'POST' })
        .then(res => res.json())
        .then(pods => {
            pods.forEach(pod => createMarker(pod.latitude, pod.longitude, 'pod', pod.name, pod._id));
            pods.forEach(pod => markersInformations[pod._id] = {...pod, type: 'pod'});
        })
        .catch(err => console.log(err));
}
function getSlack() {
    fetch('/slack', { method: 'POST' })
        .then(res => res.json())
        .then(slacks => {
            slacks.forEach(slack => createMarker(slack.latitude, slack.longitude, 'slack', slack.name, slack._id));
            slacks.forEach(slack => markersInformations[slack._id] = {...slack, type: 'slack'});
        })
        .catch(err => console.log(err));
}