// hbContent.js


function callConceptMessage(conceptID, conceptName) {
    let objConcept = {
        "conceptID": conceptID,
        "conceptName": conceptName
    }
    window.parent.postMessage(objConcept, "*");
}

function callConcept(conceptID, conceptName) {
    // create "button" html object
    let str = '';
    str += '<button class="concept" onclick="callConceptMessage(';
    str += "'" + conceptID + "'";
    str += ',';
    str += "'" + conceptName + "'";
    str += ')">';
    str += conceptName;
    str += '</button>';
    document.write(str);
}