export function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    const stringToReturn = e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    return { __html: stringToReturn }
}