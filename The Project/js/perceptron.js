function Perceptron(requB, transfer) {
    var test = 0,
        i = 0,
        j = 0,
        error = 0,
        loop = 0,
        numOfInputs = Input.length,
        Output, flag = false;
    S = Target[0].length;
    R = Input[0].length;

    if (Weight.length === 0) {
        initW();
    }

    if (requB === "Yes" && Bias.length === 0) {
        initB(0);
    }

    i = 0;
    while (loop < 30) {

        for (j = 0; j < numOfInputs; j++) {
            if (i == numOfInputs) {
                i = 0;
            }
            if (requB === "Yes") {
                Output = transferFunction(math.add(math.multiply(Weight, Input[i]), Bias), transfer);
            } else {
                Output = transferFunction(math.multiply(Weight, Input[i]), transfer);
            }
            if (areEqual(Output, Target[i])) {
                i++;
                test++;
            } else {
                break;
            }
        }

        if (test == numOfInputs) {
            flag = true;
            break;
        } else {
            test = 0;
            for (var z = 0; z < S; z++) {
                error = Target[i][z] - Output[z];
                Weight[z] = math.add(Weight[z], math.multiply(error, Input[i]));
                if (requB === "Yes") {
                    Bias[z] = Bias[z] + error;
                }
            }
        }
        i++;
        loop++;
    }

    var html;
    var dotsHtml = '<span class="dot" onclick="currentSlide(1)"></span>';
    if (!flag) {
        html = '<div class="mySlides"><div class="layersInputs">' +
            '<div class="text-center layerTitle" >Information!</div><div class="text-center resultSlider">' +
            'We can not find solution for that input using Perceptron try another inputs or' +
            ' change the type of network </div> </div></div>';
    } else {
        var column = Weight[0].length,
            a, i = 0,
            j = 0;
        html = '<a class="prev" onclick="plusSlides(-1)">❮</a><div class="mySlides"><div class="layersInputs">' +
            '<div class="text-center layerTitle" >Weight</div><div class="array">';

        for (i = 1; i <= Weight.length; i++) {
            html += "<div class='mt-3'>";
            for (j = 1; j <= column; j++) {
                html += "<span class='wSpan'>" + Weight[i - 1][j - 1].toFixed(2) + "</span>";
            }
            html += "</div>\n";
        }
        html += '</div></div>';

        if (requB == "Yes") {
            html += '<div class="layersInputs">' +
                '<div class="text-center layerTitle" >Bias</div><div class="array">';
            html += "<div class='mt-3'>";
            for (i = 1; i <= Bias.length; i++) {
                html += "<span class='wSpan'>" + Bias[i - 1] + "</span>";
            }
            html += "</div></div></div>\n";
        }
        html += '</div>\n';

        for (var index = 1; index <= Input.length; index++) {
            html += '<div class="mySlides"> <div class="layersInput">' +
                '<div class="text-center layerTitle" >Test Prototype#' + index + '</div>' +
                '<div class="mt-3"><div class = "outChar">a = purelin( </div>' +
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
            html += '</div>';
            if (requB == "Yes") {
                html += '<div class = "outChar"> + </div><div class="array">';
                for (var i = 1; i <= Bias.length; i++) {
                    html += "<div class='mt-3'>";
                    html += "<span class='wSpan'>" + Bias[i - 1].toFixed(2) + "</span>";
                    html += "</div>\n";
                }
                html += '</div>';
            }

            html += '<div class = "outChar">) = </div><div class="array">';
            a = (requB == "Yes" ? math.add(math.multiply(Weight, Input[index - 1]), Bias) :
                math.multiply(Weight, Input[index - 1]));
            a = transferFunction(a, transfer);
            for (var i = 1; i <= a.length; i++) {
                html += "<div class='mt-3'>";
                html += "<span class='wSpan'>" + a[i - 1].toFixed(2) + "</span>";
                html += "</div>\n";
            }
            flag = false;
            for (var i = 1; i <= a.length; i++) {
                if (a[i - 1] != Target[index - 1][i - 1]) {
                    flag = true;
                }
            }
            html += '</div><div class="resultSlider mt-3"> Output ' + (flag ? '!' : '') + '= Target';
            html += '</div></div></div></div>'
        }
        html += '<a class="next" onclick="plusSlides(1)">❯</a>';
        for (var i = 1; i <= Input.length; i++) {
            dotsHtml += '<span class="dot" onclick="currentSlide(' + (i + 1) + ')"></span>';
        }
    }
    

    $("#dot1").html(dotsHtml);
    return html;

}