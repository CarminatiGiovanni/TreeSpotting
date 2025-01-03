const fields = {
    'tree':{
      'name': { "type": "text", "required": "false", "default": "So mia come'l se ciama" },
      //'latitude': { "type": "Number", "required": "true" },
      //'longitude': { "type": "Number", "required": "true" },
      'size': { "type": "text", "required": "false", "default": "" },
      'description': { "type": "text", "required": "false", "default": "" },
      'discoveredBy': { "type": "text", "required": "false", "default": "" }},
    'pod': {
      'name': { "type": "String", "required": "false", "default": "So mia come'l se ciama" },
      // 'latitude': { "type": "Number", "required": "true" },
      // 'longitude': { "type": "Number", "required": "true" },
      'description': { "type": "String", "required": "false", "default": "" },
      'discoveredBy': { "type": "String", "required": "false", "default": "" }
    },
    'mushroom': {
      'name': { "type": "String", "required": "false", "default": "So mia come'l se ciama" },
      // 'latitude': { "type": "Number", "required": "true" },
      // 'longitude': { "type": "Number", "required": "true" },
      'description': { "type": "String", "required": "false", "default": "" },
      'discoveredBy': { "type": "String", "required": "false", "default": "" }
    },
    'ruin': {
      'name': { "type": "String", "required": "false", "default": "So mia come'l se ciama" },
      // 'latitude': { "type": "Number", "required": "true" },
      // 'longitude': { "type": "Number", "required": "true" },
      'description': { "type": "String", "required": "false", "default": "" },
      'discoveredBy': { "type": "String", "required": "false", "default": "" }
    },
    'slack': {
        'name': { "type": "text", "required": "false", "default": "So mia come'l se ciama" },
        //'latitude': { "type": "Number", "required": "true" },
        //'longitude': { "type": "Number", "required": "true" },
        'lenght': { "type": "text", "required": "false", "default": "" },
        'description': { "type": "text", "required": "false", "default": "" },
        'discoveredBy': { "type": "text", "required": "false", "default": "" }
    }
}

const treeFormHTML = (lat,lng) => ` 
    <input type="text " id="name" name="name" placeholder="Nome" defaultvalue="So mia come'l se ciama"><br>
    <input type="text " id="size" name="size" placeholder="Grant circa" defaultvalue=""><br>
    <textarea type="text " id="description" name="description" placeholder="Cuntamela so" defaultvalue=""></textarea><br>
    <input type="text " id="discoveredBy" name="discoveredBy" placeholder="Te ciamet cum'è?" defaultvalue=""><br>
    <input type="number" id="latitude" name="latitude" value="${lat}" style='display:none'><br>
    <input type="number" id="longitude" name="longitude" value="${lng}" style='display:none'><br>
`;

const podFormHTML = (lat,lng) => `
    <input type="String " id="name" name="name" placeholder="Nome" defaultvalue="So mia come'l se ciama"><br>
    <textarea type="String " id="description" name="description" placeholder="Cuntamela so" defaultvalue=""></textarea><br>
    <input type="String " id="discoveredBy" name="discoveredBy" placeholder="Te ciamet cum'è?" defaultvalue=""><br>
    <input type="number" id="latitude" name="latitude" value="${lat}" style='display:none'><br>
    <input type="number" id="longitude" name="longitude" value="${lng}" style='display:none'><br>
`;

const mushroomFormHTML = (lat,lng) => `
    <input type="String " id="name" name="name" placeholder="Nome" defaultvalue="So mia come'l se ciama"><br>
    <textarea type="String " id="description" name="description" placeholder="Cuntamela so" defaultvalue=""></textarea><br>
    <input type="String " id="discoveredBy" name="discoveredBy" placeholder="Te ciamet cum'è?" defaultvalue=""><br>
    <input type="number" id="latitude" name="latitude" value="${lat}" style='display:none'><br>
    <input type="number" id="longitude" name="longitude" value="${lng}" style='display:none'><br>
`;

const ruinFormHTML = (lat,lng) =>  `
    <input type="String " id="name"         name="name"         placeholder="Nome"          defaultvalue="So mia come'l se ciama"><br>
    <textarea type="String " id="description"  name="description"  placeholder="Cuntamela so"   defaultvalue=""></textarea><br>
    <input type="String " id="discoveredBy" name="discoveredBy" placeholder="Te ciamet cum'è?"  defaultvalue=""><br>
    <input type="number"  id="latitude"     name="latitude"     value="${lat}"       style='display:none'><br>
    <input type="number"  id="longitude"    name="longitude"    value="${lng}"       style='display:none'><br>
`;

const slackFormHTML = (lat,lng) => ` 
    <input type="text " id="name"         name="name"         placeholder="Nome"          defaultvalue="So mia come'l se ciama"><br>
    <input type="text " id="lenght"       name="lenght"       placeholder="Longa quant?"        defaultvalue=""><br>
    <textarea type="text " id="description"  name="description"  placeholder="Cuntamela so"   defaultvalue=""></textarea><br>
    <input type="text " id="discoveredBy" name="discoveredBy" placeholder="Te ciamet cum'è?"  defaultvalue=""><br>
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

const getIcon = (type,treename) => {
    if (type=='tree' && treename === 'Castagno') return chestnutIcon;
    else if (type=='tree' && treename === 'Noce') return walnutIcon;
    else if (type=='tree') return treeIcon;
    else if (type=='pod') return podIcon;
    else if (type=='ruin') return ruinIcon;
    else if (type=='slack') return slackIcon;
    else if (type=='mushroom') return mushroomIcon;
    else return undefined;
}

const mushroomIcon = L.icon({
    id: '',
    iconUrl: '../icon/mushroom.png',
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
});

const defaultZoom = 15
let zoom = defaultZoom;
let userLat;
let userLng;

let markersInformations = {};