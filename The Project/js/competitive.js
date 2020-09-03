
function Competitive() {

    S = Input.length; R = Input[0].length;
    initB(R);
    Weight = Input;

    var i;
    Weight2 = [];
    for (i = 0; i < S; i++) {
        Weight2[i] = [];
        for (j = 0; j < S; j++) {
            Weight2[i][j] = i == j ? 1 : ((-1 / (S - 1)) / 1.1);
        }
    }

    var winer = -1,a1,a2;
    var column = Weight[0].length;
    var html = slide1HC();

    for (var index = 1; index <= S; index++) {
        html += '<div class="mySlides"> <div class="layersInput">' +
            '<div class="text-center layerTitle" >Test Prototype#' + index + '</div>' +
            '<div class="mt-3"><div class = "outChar">a1 = purelin( </div>' +
            '<div class="array">';
        for (var i = 1; i <= Weight.length; i++) {
            html += "<div class='mt-3'>";
            for (var j = 1; j <= column; j++) {
                html += "<span class='wSpan'>" + Weight[i - 1][j - 1].toFixed(2) + "</span>";
            }
            html += "</div>\n";
        }
        html += '</div><div class = "outChar"> * </div><div class="array">';
        for (var i = 1; i <= R; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + Input[index - 1][i - 1].toFixed(2) + "</span>";
            html += "</div>\n";
        }
        html += '</div><div class = "outChar"> + </div><div class="array">';
        for (var i = 1; i <= S; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + Bias[i - 1] + "</span>";
            html += "</div>\n";
        }
        html += '</div><div class = "outChar">) = </div><div class="array">';

        a1 = math.add(math.multiply(Weight, Input[index - 1]), Bias);
        for (var i = 1; i <= S; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + a1[i - 1].toFixed(2) + "</span>";
            html += "</div>\n";
        }
        html += '</div></div>';
        html += '<div class="mt-3 mb-3"><div class = "outChar">a2 = compet( </div>' +
            '<div class="array">';
        for (var i = 1; i <= S; i++) {
            html += "<div class='mt-3'>";
            for (var j = 1; j <= S; j++) {
                html += "<span class='wSpan'>" + Weight2[i - 1][j - 1].toFixed(2) + "</span>";
            }
            html += "</div>\n";
        }
        html += '</div><div class = "outChar"> * </div><div class="array">';
        for (var i = 1; i <= S; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + a1[i - 1].toFixed(2) + "</span>";
            html += "</div>\n";
        }
        html += '</div><div class = "outChar">) = </div><div class="array">';

        a2 = math.multiply(Weight2, a1);
        var max = -9999;
        for (i = 0; i < S; i++) {
            if (a2[i] > max) {
                max = a2[i];
                winer = i + 1;
            }
        }
        for (i = 1; i <= S; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + (i== winer ? 1 : 0) + "</span>";
            html += "</div>\n";
        }
        html += '</div>';
        html += '<div class="resultSlider mt-3">the winer prototype is #' + winer;
        html += '</div></div></div></div>'
    }


    html += '<a class="next" onclick="plusSlides(1)">❯</a>';

    var dotsHtml = '<span class="dot" onclick="currentSlide(1)"></span>';
    for (var i = 1; i <= S; i++) {
        dotsHtml += '<span class="dot" onclick="currentSlide(' + (i + 1) + ')"></span>';
    }
    
    $("#dot1").html(dotsHtml);
    return html;
}