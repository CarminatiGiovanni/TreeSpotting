const fields = {
    'tree':{
      'name': { "type": "text", "required": "false", "default": "Unknown Tree" },
      //'latitude': { "type": "Number", "required": "true" },
      //'longitude': { "type": "Number", "required": "true" },
      'size': { "type": "text", "required": "false", "default": "Unknown Size" },
      'description': { "type": "text", "required": "false", "default": "No description provided" },
      'discoveredBy': { "type": "text", "required": "false", "default": "Anonymous" }},
    'pod': {
      'name': { "type": "String", "required": "false", "default": "Unnamed Pod" },
      // 'latitude': { "type": "Number", "required": "true" },
      // 'longitude': { "type": "Number", "required": "true" },
      'description': { "type": "String", "required": "false", "default": "No description provided" },
      'discoveredBy': { "type": "String", "required": "false", "default": "Anonymous" }
    },
    'ruin': {
      'name': { "type": "String", "required": "false", "default": "Unnamed Ruin" },
      // 'latitude': { "type": "Number", "required": "true" },
      // 'longitude': { "type": "Number", "required": "true" },
      'description': { "type": "String", "required": "false", "default": "No description provided" },
      'discoveredBy': { "type": "String", "required": "false", "default": "Anonymous" }
    },
    'slack': {
        'name': { "type": "text", "required": "false", "default": "Unknown Tree" },
        //'latitude': { "type": "Number", "required": "true" },
        //'longitude': { "type": "Number", "required": "true" },
        'lenght': { "type": "text", "required": "false", "default": "No lenght provided" },
        'description': { "type": "text", "required": "false", "default": "No description provided" },
        'discoveredBy': { "type": "text", "required": "false", "default": "Anonymous" }
    }
}

const treeFormHTML = (lat,lng) => ` 
    <input type="text " id="name" name="name" placeholder="name" defaultvalue="Unknown Tree"><br>
    <input type="text " id="size" name="size" placeholder="size" defaultvalue="Unknown Size"><br>
    <input type="text " id="description" name="description" placeholder="description" defaultvalue="No description provided"><br>
    <input type="text " id="discoveredBy" name="discoveredBy" placeholder="discoveredBy" defaultvalue="Anonymous"><br>
    <input type="number" id="latitude" name="latitude" value="${lat}" style='display:none'><br>
    <input type="number" id="longitude" name="longitude" value="${lng}" style='display:none'><br>
`;

const podFormHTML = (lat,lng) => `
    <input type="String " id="name" name="name" placeholder="name" defaultvalue="Unnamed Ruin"><br>
    <input type="String " id="description" name="description" placeholder="description" defaultvalue="No description provided"><br>
    <input type="String " id="discoveredBy" name="discoveredBy" placeholder="discoveredBy" defaultvalue="Anonymous"><br>
    <input type="number" id="latitude" name="latitude" value="${lat}" style='display:none'><br>
    <input type="number" id="longitude" name="longitude" value="${lng}" style='display:none'><br>
`;

const ruinFormHTML = (lat,lng) =>  `
    <input type="String " id="name"         name="name"         placeholder="name"          defaultvalue="Unnamed Pod"><br>
    <input type="String " id="description"  name="description"  placeholder="description"   defaultvalue="No description provided"><br>
    <input type="String " id="discoveredBy" name="discoveredBy" placeholder="discoveredBy"  defaultvalue="Anonymous"><br>
    <input type="number"  id="latitude"     name="latitude"     value="${lat}"       style='display:none'><br>
    <input type="number"  id="longitude"    name="longitude"    value="${lng}"       style='display:none'><br>
`;

const slackFormHTML = (lat,lng) => ` 
    <input type="text " id="name"         name="name"         placeholder="name"          defaultvalue="Unknown Slack"><br>
    <input type="text " id="lenght"       name="lenght"       placeholder="lenght"        defaultvalue="No lenght provided"><br>
    <input type="text " id="description"  name="description"  placeholder="description"   defaultvalue="No description provided"><br>
    <input type="text " id="discoveredBy" name="discoveredBy" placeholder="discoveredBy"  defaultvalue="Anonymous"><br>
    <input type="number"  id="latitude"     name="latitude"     value="${lat}"       style='display:none'><br>
    <input type="number"  id="longitude"    name="longitude"    value="${lng}"       style='display:none'><br>
`;


const feetIcon = L.icon({
    id: '',
    iconUrl: '../icon/feet.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const chestnutIcon = L.icon({
    id: '',
    iconUrl: '../icon/chestnut.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const walnutIcon = L.icon({
    id: '',
    iconUrl: '../icon/walnut.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const treeIcon = L.icon({
    iconUrl: '../icon/tree.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const podIcon = L.icon({
    iconUrl: '../icon/drop.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const ruinIcon = L.icon({
    iconUrl: '../icon/ruin.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const slackIcon = L.icon({
    iconUrl: '../icon/slackline.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const treeiconmapping = (treename) => {
    if (treename === 'Castagno') return chestnutIcon;
    else if (treename === 'Noce') return walnutIcon;
    else return treeIcon;
}

const defaultZoom = 15
let zoom = defaultZoom;
let userLat;
let userLng;

let markersInformations = {};