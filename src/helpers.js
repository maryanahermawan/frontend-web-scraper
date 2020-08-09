export function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    let stringToReturn = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue.substring(0, 200);
    stringToReturn = e.childNodes.length === 0 ? "" : stringToReturn + ' ...';
    return { __html: stringToReturn }
}