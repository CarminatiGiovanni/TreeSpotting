///////////////// Requests ///////////////////////////////////////////////////////////////////////////////////////

function getRuins() {
    fetch('/ruins', { method: 'POST' })
        .then(res => res.json())
        .then(ruins => {
            ruins.forEach(ruin => markersInformations[ruin._id] = {...ruin, type: 'ruin'});
            ruins.forEach(ruin => createMarker(ruin.latitude, ruin.longitude, 'ruin', ruin.name, ruin._id));
        })
        .catch(err => console.log(err));
}

function getTrees() {
    fetch('/trees', { method: 'POST' })
        .then(res => res.json())
        .then(trees => {
            trees.forEach(tree => markersInformations[tree._id] = {...tree, type: 'tree'});
            trees.forEach(tree => createMarker(tree.latitude, tree.longitude, 'tree', tree.name, tree._id));
        })
        .catch(err => console.log(err));
}

function getPods() {
    fetch('/pods', { method: 'POST' })
        .then(res => res.json())
        .then(pods => {
            pods.forEach(pod => markersInformations[pod._id] = {...pod, type: 'pod'}); // order matters
            pods.forEach(pod => createMarker(pod.latitude, pod.longitude, 'pod', pod.name, pod._id));
        })
        .catch(err => console.log(err));
}
function getSlack() {
    fetch('/slack', { method: 'POST' })
        .then(res => res.json())
        .then(slacks => {
            slacks.forEach(slack => markersInformations[slack._id] = {...slack, type: 'slack'});
            slacks.forEach(slack => createMarker(slack.latitude, slack.longitude, 'slack', slack.name, slack._id));
        })
        .catch(err => console.log(err));
}