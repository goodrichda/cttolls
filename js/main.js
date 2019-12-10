//Connecticut Tolls Map
//Interactive Leaflet map designed to help drivers calculate what tolls as proposed in the November 2018 report would cost them


//create the map
var map = L.map('map').setView([41.5, -72.7],9);

//add ESRI tile layer
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

//Add geojson paths
var urlGantries = 'data/TollGantries.geojson';
var urlRoads = 'data/TollRoads.geojson';
var urlTowns = 'data/cttowns.geojson';

//Define selected tolls symbol icon
var symbol = L.icon({
    iconUrl: 'img/circle.png',
    iconSize: [20,20],
    iconAnchor: [10,10],
    popupAnchor:[0,0]
});

//Define initial toll gantry symbolization
var geojsonMarkerOptions = {
    'radius': 5,
    'color': "black"
};

//create empty layer group
var selectedTolls = L.layerGroup().addTo(map);

//set table values to zero
a1 = 0; a2 = 0; a3 = 0; a4 = 0; a5 = 0; a6 = 0;
b1 = 0; b2 = 0;
c1 = 0; c2 = 0; c3 = 0; c4 = 0; c5 = 0; c6 = 0;
d1 = 0; d2 = 0; d3 = 0; d4 = 0; d5 = 0; d6 = 0;
e1 = 0; e2 = 0; e3 = 0; e4 = 0; e5 = 0; e6 = 0;


//on click, add values to table variables, and add them to the html through jquery
function forEachFeaturetolls(feature, layer){
   layer.on({
       click: function(){
           lat = feature.properties.LATITUDE;
           long = feature.properties.LONGITUDE;
           marker = L.marker([lat,long], {icon: symbol}).addTo(selectedTolls);
           a1 = a1 + feature.properties.CL1_OP_CT_EZ_FULL;
           a2 = a2 + feature.properties.CL1_PK_CT_EZ_FULL;
           a3 = a3 + feature.properties.CL2_OP_CT_FULL;
           a4 = a4 + feature.properties.CL2_PK_CT_FULL;
           a5 = a5 + feature.properties.CL3_OP_CT_FULL;
           a6 = a6 + feature.properties.CL3_PK_CT_FULL;
           b1 = b1 + feature.properties.CL1_OP_CT_EZ_FREQ;
           b2 = b2 + feature.properties.CL1_PK_CT_EZ_FREQ;
           c1 = c1 + feature.properties.CL1_OP_OS_EZ_B;
           c2 = c2 + feature.properties.CL1_PK_OS_EZ_B;
           c3 = c3 + feature.properties.CL2_OP_OS_EZ_B;
           c4 = c4 + feature.properties.CL2_PK_OS_EZ_B;
           c5 = c5 + feature.properties.CL3_OP_OS_EZ_B;
           c6 = c6 + feature.properties.CL3_PK_OS_EZ_B;
           d1 = d1 + feature.properties.CL1_OP_VID_REG;
           d2 = d2 + feature.properties.CL1_PK_VID_REG;
           d3 = d3 + feature.properties.CL2_OP_VID_REG;
           d4 = d4 + feature.properties.CL2_PK_VID_REG;
           d5 = d5 + feature.properties.CL3_OP_VID_REG;
           d6 = d6 + feature.properties.CL3_PK_VID_REG;
           e1 = e1 + feature.properties.CL1_OP_VID_UNREG;
           e2 = e2 + feature.properties.CL1_PK_VID_UNREG;
           e3 = e3 + feature.properties.CL2_OP_VID_UNREG;
           e4 = e4 + feature.properties.CL2_PK_VID_UNREG;
           e5 = e5 + feature.properties.CL3_OP_VID_UNREG;
           e6 = e6 + feature.properties.CL3_PK_VID_UNREG;

           $("#mytable").html("<table><tr><th id = 'payment' rowspan = '3'>Payment Type</th><th id = 'carclass' colspan = '2'>Class 1</th>" + 
                             "<th id = 'carclass' colspan = '2'>Class 2</th><th id = 'carclass' colspan = '2'>Class 3</th></tr>" + 
                              "<tr><th id = 'carclass' colspan = '2'>Passenger Vehicles</th><th id = 'carclass' colspan = '2'>Medium Trucks, Buses</th>" +
                              "<th id = 'carclass' colspan = '2'>Heavy Trucks</th></tr>" +
                             "<tr><td>Off-Peak</td><td>Peak</td><td>Off-Peak</td><td>Peak</td><td>Off-Peak</td><td>Peak</td></tr>" +
                             "<tr id = 'cost'><td>CT E-Z Pass (30% discount off base rates)</td><td>$"+ a1.toFixed(2) + "</td><td>$" + a2.toFixed(2) +
                             "</td><td>$" + a3.toFixed(2) + "</td><td>$" + a4.toFixed(2) + "</td><td>$" + a5.toFixed(2) + "</td><td>$" +
                              a6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>CT E-Z Pass (with 20% commuter discount)</td><td>$"+ b1.toFixed(2) + "</td><td>$" + b2.toFixed(2) +
                             "</td><td>---</td><td>---</td><td>---</td><td>---</td>" +
                              "<<tr id = 'cost'><td>Out of State E-Z Pass (base rate)</td><td>$"+ c1.toFixed(2) + "</td><td>$" + c2.toFixed(2) +
                             "</td><td>$" + c3.toFixed(2) + "</td><td>$" + c4.toFixed(2) + "</td><td>$" + c5.toFixed(2) + "</td><td>$" +
                              c6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>Pre-Registered Plate (25% higher than base)</td><td>$"+ d1.toFixed(2) + "</td><td>$" + d2.toFixed(2) +
                             "</td><td>$" + d3.toFixed(2) + "</td><td>$" + d4.toFixed(2) + "</td><td>$" + d5.toFixed(2) + "</td><td>$" +
                              d6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>Unregistered Plate (50% higher than base)</td><td>$"+ e1.toFixed(2) + "</td><td>$" + e2.toFixed(2) +
                             "</td><td>$" + e3.toFixed(2) + "</td><td>$" + e4.toFixed(2) + "</td><td>$" + e5.toFixed(2) + "</td><td>$" +
                              e6.toFixed(2) + "</td></tr>"
                             );
        }
    });
};



//Clear layers on button click and reset table variables
$(document).ready(function(){
    $("button").click(function(){
        selectedTolls.clearLayers(),
        a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0, a6 = 0,
        b1 = 0, b2 = 0,
        c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0,
        d1 = 0, d2 = 0, d3 = 0, d4 = 0, d5 = 0, d6 = 0,
        e1 = 0, e2 = 0, e3 = 0, e4 = 0, e5 = 0, e6 = 0,
            
            $("#mytable").html("<table><tr><th id = 'payment' rowspan = '3'>Payment Type</th><th id = 'carclass' colspan = '2'>Class 1</th>" + 
                             "<th id = 'carclass' colspan = '2'>Class 2</th><th id = 'carclass' colspan = '2'>Class 3</th></tr>" + 
                              "<tr><th id = 'carclass' colspan = '2'>Passenger Vehicles</th><th id = 'carclass' colspan = '2'>Medium Trucks, Buses</th>" +
                              "<th id = 'carclass' colspan = '2'>Heavy Trucks</th></tr>" +
                             "<tr><td>Off-Peak</td><td>Peak</td><td>Off-Peak</td><td>Peak</td><td>Off-Peak</td><td>Peak</td></tr>" +
                             "<tr id = 'cost'><td>CT E-Z Pass (30% discount off base rates)</td><td>$"+ a1.toFixed(2) + "</td><td>$" + a2.toFixed(2) +
                             "</td><td>$" + a3.toFixed(2) + "</td><td>$" + a4.toFixed(2) + "</td><td>$" + a5.toFixed(2) + "</td><td>$" +
                              a6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>CT E-Z Pass (with 20% commuter discount)</td><td>$"+ b1.toFixed(2) + "</td><td>$" + b2.toFixed(2) +
                             "</td><td>---</td><td>---</td><td>---</td><td>---</td>" +
                              "<<tr id = 'cost'><td>Out of State E-Z Pass (base rate)</td><td>$"+ c1.toFixed(2) + "</td><td>$" + c2.toFixed(2) +
                             "</td><td>$" + c3.toFixed(2) + "</td><td>$" + c4.toFixed(2) + "</td><td>$" + c5.toFixed(2) + "</td><td>$" +
                              c6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>Pre-Registered Plate (25% higher than base)</td><td>$"+ d1.toFixed(2) + "</td><td>$" + d2.toFixed(2) +
                             "</td><td>$" + d3.toFixed(2) + "</td><td>$" + d4.toFixed(2) + "</td><td>$" + d5.toFixed(2) + "</td><td>$" +
                              d6.toFixed(2) + "</td></tr>" +
                              "<<tr id = 'cost'><td>Unregistered Plate (50% higher than base)</td><td>$"+ e1.toFixed(2) + "</td><td>$" + e2.toFixed(2) +
                             "</td><td>$" + e3.toFixed(2) + "</td><td>$" + e4.toFixed(2) + "</td><td>$" + e5.toFixed(2) + "</td><td>$" +
                              e6.toFixed(2) + "</td></tr>"
                             );
    });
});


//create geojson layer for toll gantries
var tolls = L.geoJSON(null,{
    onEachFeature: forEachFeaturetolls,
    pointToLayer: function(feature,latlng){
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
});

//Provide instructions to click toll gantries or display highway name on hover
function roadPopup(feature,layer){    
    var panelContent = feature.properties.NAME;
    
    layer.on({
        mouseover:function(){
            $("#panel").html("<font size='5'>" + panelContent + "</font>");
        },
        mouseout:function(){
            $("#panel").html("<font size='5'>Click Gantries<br>Along Your<br>Route to <br> Find Out</font>")
        }
    });

};

//create geojson layer for toll roads and sytle them based on road name
var tollroads = L.geoJSON(null, {
    style: function(feature){
        switch (feature.properties.NAME) {
            case 'I-291': return {color: '#686868', weight: '5'};
            case 'I-395': return {color: '#A37348', weight: '5'};
            case 'I-691': return {color: '#6FCDAC', weight: '5'};
            case 'I-84 East': return {color: '#C086BE', weight: '5'};
            case 'I-84 West': return {color: '#E18711', weight: '5'};
            case 'I-91': return {color: '#E67B7C', weight: '5'};
            case 'I-95 East': return {color: '#95C473', weight: '5'};
            case 'I-95 West': return {color: '#A1CDF6', weight: '5'};
            case 'Route 15 North': return {color: '#CAAA68', weight: '5'};
            case 'Route 15 West': return {color: '#9A403E', weight: '5'};
            case 'Route 2': return {color: '#7E8EF3', weight: '5'};
            case 'Route 8': return {color: '#FBC720', weight: '5'};
            case 'Route 9': return {color: '#B2B2B2', weight: '5'};
        }
    },
    onEachFeature: roadPopup
});

//town outlines style
mystyle = {
    "weight": 1,
    "color": "#9E9E9E",
    "fill": false,
    "opacity": 0.4
};

//create geojson for town outlines
var towns = L.geoJSON(null,{
    style: mystyle
});


//add geojson features to tollroads, tolls, and towns layers
$.getJSON(urlRoads, function(data){
    tollroads.addData(data);
});


$.getJSON(urlGantries, function(data){
    tolls.addData(data);
});

$.getJSON(urlTowns, function(data){
    towns.addData(data);
});


//add towns, toll roads, and toll gantries to map
towns.addTo(map);

tollroads.addTo(map);

tolls.addTo(map);