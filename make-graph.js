var fs = require('fs');

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    if (!rgb) return '#000000';
    return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}
var rgb = function (r, g, b) {//just a shortcut so we can copy paste standard rgb(255, 192, 33) syntax
    return {"r": r, "g": g, "b": b}
};

var operations = 'operations';
var landscape = 'landscape';
var architect = 'architect';
var interiors = 'interiors';
var planner = 'planner';
var urban_designer = 'urban designer';
var civil = 'civil';
var graphics = 'graphics';
var strategies = 'planner';
var billable = 'billable';
var nonbillable = 'nonbillable';

var _colorsByGroup = {
    "Communications Intern": operations,
    "Civil Engineering": civil,
    "Director of Planning and Urban Design": planner,
    "Landscape Architecture Intern": landscape,
    "Civil Engineering Intern": civil,
    "Architectural Designer": architect,
    "summer intern":architect,
    "Marketing Intern":operations,
    "Landscape Architecture Intern":landscape,
    "Landscape Architecture Intern":landscape,
    "Civil Engineering":civil,
    "Landscape Architecture Intern":landscape,
    "Urban Design Intern":urban_designer,
    "Administrative Assistant":operations,
    "Strategies Planning Consultant":planner,
    "Model Builder":architect,
    "Landscape Architecture Intern":landscape,
    "Civil Engineering":civil,
    "CFO":operations,
    "Graphics Intern":operations,
    "FabLab Intern":architect,
    "Planning Intern":planner,
    "Architecture Intern":architect,
    "Interior Design Intern":interiors,
    "Marketing Intern": operations,
    "PROJECT": billable,
    "NONBILL": nonbillable,
    "Architect": architect,
    "Interior Designer": interiors,
    "Landscape Architect": landscape,
    "null": operations,
    "Interior Designer/Architect/PM": interiors,
    "Planner": planner,
    "Interiors": interiors,
    "Architecture": architect,
    "Architecture Designer": architect,
    "Urban Designer": urban_designer,
    "Interior Designer/PM": interiors,
    "Interior Architect/PM": interiors,
    "Planner/Designer": urban_designer,
    "Planner and Designer": urban_designer,
    "Director of Parks Planning": urban_designer,
    "Planning and Urban Design": urban_designer,
    "Planning and Urban Designer": urban_designer,
    "Landscape Designer": landscape,
    "Designer/PM": landscape,
    "Urban Designer | Planner": urban_designer,
    "Planning": planner,
    "Civil Engineer": civil,
    "Planner/Economic Analyst": planner,
    "Landscape Architect/PM": landscape,
    "Landscape Architecture": landscape,
    "Landscape Architect/Urban Designer": landscape,
    "Former employee": rgb(0, 0, 0),
    "Landscape Architecture/PM": landscape,
    "Graphic Designer": graphics,
    "Landscape Ecologist/Environmental Engineer": landscape,
    "Strategies": strategies,
    "Application Developer": strategies,
    "Software Developer": strategies,
    "Marketing Coordinator": operations,
    "Senior Urban Designer": urban_designer,
    "CAD Tech": operations,
    "Director of Land Use Economics": operations,
    "Computer Programmer": strategies,
    "Interior Designer/Architect": interiors,
    "Director of Environmental Graphics": graphics,
    "Programmer": strategies,
    "Director of Development Services": operations,
    "System Analyst": operations,
    "Chief Business Officer": operations,
    "Office Services": operations,
    "Communications Coordinator": operations,
    "Office Services Coordinator": operations,
    "Human Resources Manager": operations,
    "Sustainability Coordinator": operations,
    "Marketing Manager": operations,
    "Brand Communications Manager": operations,
    "Information Systems Manager": operations,
    "Executive Assistant": operations,
    "IS Catalyst": operations,
    "Chief Operating Officer": operations,
    "Network Operations Manager": operations,
    "Design Operations Officer": operations,
    "Brand Content Manager": operations,
    "Director of Talent and Organizational Development": operations,
    "International Marketing Leader": operations,
    "IT Support Specialist": operations,
    "Director of Business Development": operations,
    "Accounting Clerk": operations,
    "Marketing Assistant": operations,
    "Studio Assistant": operations,
    "Creative Director": operations,
    "Director of Marketing": operations,
    "Managing Director": operations,
    "Librarian/Archivist": operations,
    "Maintenance Assistant": operations,
    "Help Desk Analyst": operations,
    "Receptionist": operations,
    "[Leave of Absence]": operations


};

var projects = require('./testdata.json');
var nodesColored = {nodes: []};

var _getColor = function (colorGroup) {
    if (!_colorsByGroup[colorGroup]) {
        console.log('MISSING: ' + colorGroup);
    }
    return _colorsByGroup[colorGroup];//rgbToHex(
};



projects.nodes.forEach(function (node, i) {
    //{"colorGroup":"Architect","id":0,"people_id":"c627e9dd-c51d-4603-a4e3-f932ff79ce81","label":"Kyle Richard"}
    var newNode;
    if (node.people_id) {
        newNode = {
            name: node.first_name +" " + node.last_name,
            email: node.email,
            discipline: _getColor(node.colorGroup),
            studio: node.department,
            title: node.org_title,
            strategies: 0,
            sustainability: 0,
            associations: [{
                "water": 0,
                "energy": 0,
                "visualization": 0,
                "technology": 0,
                "analysis": 0
            }
            ],
            phone: node.phone
        };
        nodesColored.nodes.push(newNode);
    }
    else {
        console.log("fail");
    }



});
fs.writeFile('./sasaki-employees.json', JSON.stringify(nodesColored, null, 2), function (err) {
    if (err) throw err;
    console.log('Saved ' + 'sasaki-employees.json');
});