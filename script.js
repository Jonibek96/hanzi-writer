
let obj;
let pathStroke;
const STROKE_WIDTH = 200;
const  VERSION = '2.0';
let character = document.getElementById("character").value;

 //Load char server
 function loadChar (char) {
     document.querySelector('#target').innerHTML = '';
     char = document.querySelector('.js-char').value;
     // var writer = createSvg();
     let xhr = new XMLHttpRequest();
     xhr.open('GET', `https://cdn.jsdelivr.net/npm/hanzi-writer-data@${VERSION}/${char}.json`, false);
     xhr.send();
     // if (xhr.status != 200) {
     //     // обработать ошибку
     //     console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
     // } else {
     //     // вывести результат
     //     console.log( xhr.responseText ); // responseText -- текст ответа.
     // }
     return xhr.responseText;
 }

 //load stroke//
 obj = JSON.parse(loadChar(character));
 pathStroke = obj.strokes;

 var arr = obj.medians.map((el)=>{
     return "M " + el.join(' ').replace(/ /g, ' L ').replace(/,/g ,' ');
});


// create svg element
function createSvg () {
    var xmlns = "http://www.w3.org/2000/svg";
    var boxWidth = 1024;
    var boxHeight = 1024;
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, 'vievBox', `0 0  ${boxWidth}  ${boxHeight}`);
    svgElem.setAttributeNS(null, 'width', boxWidth);
    svgElem.setAttributeNS(null, 'height', boxHeight);
    svgElem.setAttributeNS(null, 'id', "svg1");

    var defs = document.createElementNS(xmlns, "defs");
    for (let ch in pathStroke) {
        let mask = 'mask-' + ch;
        var clipPath = document.createElementNS(xmlns, 'clipPath');
        clipPath.setAttributeNS(null, 'id', mask);
        var path = document.createElementNS(xmlns, "path");
        path.setAttributeNS(null, 'd', pathStroke[ch]);
        clipPath.appendChild(path);
        defs.appendChild(clipPath);
    }
    svgElem.appendChild(defs);
    //
    var g = document.createElementNS(xmlns, "g");
    svgElem.appendChild(g);
    g.setAttributeNS(null, 'transform', "translate(20, 336.40625) scale(0.3515625, -0.3515625)");
    var g1 = document.createElementNS(xmlns, "g");
    g1.setAttributeNS(null, 'style', "opacity: 1");
    g1.setAttributeNS(null, 'id', "g1");
    for (let ch in arr) {
        let mask = 'mask-' + ch;
        var path = document.createElementNS(xmlns, "path");
        path.setAttributeNS(null, 'clip-path', `url(#${mask})`);
        path.setAttributeNS(null, 'd', arr[ch]);
        path.setAttributeNS(null, 'stroke', "#DDD");
        path.setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
        path.setAttributeNS(null, 'stroke-linejoin', "miter");
        path.setAttributeNS(null, 'stroke-linecap', "round");
        path.setAttributeNS(null, 'fill', "none");
        g1.appendChild(path);
    }
    g.appendChild(g1);
    var g2 = document.createElementNS(xmlns, "g");
    g2.setAttributeNS(null, 'style', "opacity:1, display:initial");
    g2.setAttributeNS(null, 'id', "g2");

        for (let ch in arr) {
            let mask = 'mask-' + ch;
            var path = document.createElementNS(xmlns, "path");
            path.setAttributeNS(null, 'clip-path', `url(#${mask})`);
            path.setAttributeNS(null, 'd', arr[ch]);
            path.setAttributeNS(null, 'stroke', "black");
            path.setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
            path.setAttributeNS(null, 'stroke-linejoin', "miter");
            path.setAttributeNS(null, 'stroke-linecap', "round");
            path.setAttributeNS(null, 'stroke-dasharray', `${path.getTotalLength() + (STROKE_WIDTH / 2)} ${path.getTotalLength() + (STROKE_WIDTH / 2)}`);
            path.setAttributeNS(null, 'fill', "none");
            path.setAttributeNS(null, 'style', "opacity:1 stroke-dashoffset:0");
                 var animate = document.createElementNS(xmlns, "animate");
                 animate.setAttributeNS(null, 'attributeName', "stroke-dashoffset");
                 animate.setAttributeNS(null, 'begin', ch);
                 animate.setAttributeNS(null, 'values', `${path.getTotalLength() + (STROKE_WIDTH / 2)}; 0`);
                 animate.setAttributeNS(null, 'dur', "1s");
                 animate.setAttributeNS(null, 'repeatCount', "1");
                 animate.setAttributeNS(null, 'fill', "freeze");
                 animate.setAttributeNS(null, 'calcMode', "linear");
                 path.appendChild(animate);
            g2.appendChild(path);
        }
        g.appendChild(g2);
        svgElem.appendChild(g);
        var target = document.getElementById("target");
        target.appendChild(svgElem);
    }
// buttton showHide svg element
function guizChar() {
    let x = document.getElementById('g2');
    if (x.style.opacity === '1' ||  x.style.display === "initial") {
        x.style.opacity = '0.2';
        x.style.display = "none"
    }
    else{
       x.style.opacity = '1';
       x.style.display = "initial"
    }
}

// button outline svg element
function Outline() {
    let x = document.getElementById('g1');
    if (x.style.opacity === '1') {
        x.style.opacity = '0';
        x.style.display = "none"
    }
    else {
        x.style.opacity = '1';
        x.style.display = "initial"
    }
}

