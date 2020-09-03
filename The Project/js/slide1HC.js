function slide1HC(){
    var column = Weight[0].length;
    var code = '<a class="prev" onclick="plusSlides(-1)">❮</a><div class="mySlides">' +
        '<div class="layersInputs">' +
        '<div class="text-center layerTitle" >Weight<sup>1</sup></div><div class="array">';

    for (var i = 1; i <= Weight.length; i++) {
        code += "<div class='mt-3'>";
        for (var j = 1; j <= column; j++) {
            code += "<span class='wSpan'>" + Weight[i - 1][j - 1].toFixed(2) + "</span>";
        }
        code += "</div>\n";
    }
    code += '</div></div><div class="layersInputs">' +
        '<div class="text-center layerTitle" >Bias <sup>1</sup> </div><div class="array">';
    code += "<div class='mt-3'>";
    for (var i = 1; i <= Bias.length; i++) {
        code += "<span class='wSpan'>" + Bias[i - 1] + "</span>";
    }
    code += "</div></div></div>\n";
    code += '<div class="layersInputs">' +
        '<div class="text-center layerTitle" >Weight <sup>2</sup> </div><div class="array">';
    for (var i = 1; i <= S; i++) {
        code += "<div class='mt-3'>";
        for (var j = 1; j <= S; j++) {
            code += "<span class='wSpan'>" + Weight2[i - 1][j - 1].toFixed(2) + "</span>";
        }
        code += "</div>\n";
    }
    code += '</div></div></div>\n';
    return code;
}