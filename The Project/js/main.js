var slideIndex = 1;

function loop(row, column, prefix, numT = 0, flag = false) {
    var html = "",
        id = "";
    switch (prefix) {
        case "P":
            id = "input"
            break;
        case "W":
            id = "weight"
            break;
        case "B":
            id = "bias"
            break;
    }
    for (var i = 1; i <= row; i++) {
        html += "<div class='mt-3'> " + prefix + i;
        for (var j = 1; j <= column; j++) {
            html += "  <input type='number' class='p' placeholder='0' id='" + id +
                (prefix == "B" ? j : (i + "" + j)) + "' value='0'>\n";
        }
        if (flag) {
            html += "<span class='target'>T" + i + "</span>\n";
            for (var j = 1; j <= numT; j++) {
                html += "<input type='number' class='p' placeholder='0' id='target" + i +
                    "" + j + "' value='0'>\n";
            }
        }
        html += "</div>\n";
    }
    return html;
}

function displayInputs(thereTarget = false, thereWeight = false, thereBias = false) {
    $("#willAddTarget").text("Inputs" + (thereTarget ? " & Targets" : ""));

    $("#inputs").html(loop(numP, R, "P", S, thereTarget));

    if (thereWeight) {
        $("#willAddWeight").css('display', 'block');
        $("#weight").css('display', 'block');
        $("#weight").html(loop(S, R, "W"));
    } else {
        $("#willAddWeight").css('display', 'none');
        $("#weight").css('display', 'none');
    }

    if (thereBias) {
        $("#willAddBias").css('display', 'block');
        $("#bias").css('display', 'block');
        $("#bias").html(loop(1, S, "B"));
    } else {
        $("#willAddBias").css('display', 'none');
        $("#bias").css('display', 'none');
    }
}

function showLayerNeurons() {
    var n = parseInt($("#numLayer").val());
    if (n > 1) {
        var html = "";
        for (var i = 1; i <= n; i++) {
            html += '<div style="display: inline-block;">' +
                '<div class="text-center" >layer #' + i + '</div>' +
                '<input type="number" placeholder="2" step="1" value="2" id="layer' + i + '" required ' +
                'class = "layer">' + '</div>';
        }
        $("#layers").html(html);
    } else {
        $("#layers").html('<center>Number of layers must be integer more than or equal 2</center>');
    }
}

$(document).ready(function () {

    /****************************question 1*************************** */
    $("input[value='Perceptron']").prop("checked", true);
    showLayerNeurons();
    /**********************first section*********************** */
    $("#first").on("click", function () {
        type = $('input[name="type"]:checked').val();
        $('#error').css('display', 'none');
        numP = parseInt($('#numP').val());
        R = parseInt($('#R').val());

        if (numP >= 2 && R >= 2) {
            Input = [];
            $("input[value='No']").prop("checked", true);

            if (type === "Perceptron") {
                $("#initWeight").css('display', 'block');
                $("#initBias").css('display', 'none');
                $("#optionalTarget").css('display', 'none');
                $("#targetQuestion").css('display', 'block');
                $("#transfer").css('display', 'block');

            } else if (type === "Hebbian") {
                $("#initWeight").css('display', 'none');
                $("#initBias").css('display', 'none');
                $("#optionalTarget").css('display', 'block');
                $("#targetQuestion").css('display', 'none');
                $("#transfer").css('display', 'none');
            }

            $(".firstsection").hide();

            if (type === "Perceptron" || type === "Hebbian") {
                $(".secondsection").show();
            } else {
                $("#transfer").css('display', 'none');
                displayInputs();
                $(".thirdsection").show();
            }

        } else {
            $('#error').css('display', 'block');
        }

    });

    $("input[name='requireBias']").on("click change", function () {
        if (type == "Perceptron") {
            $(this).val() == "Yes" ? $("#initBias").slideDown(500) : $("#initBias").slideUp(500);
        }
    });
    $("input[name='addTarget']").on("click change", function () {
        if (type == "Hebbian") {
            $(this).val() == "Yes" ? $("#targetQuestion").slideDown(500) : $("#targetQuestion").slideUp(500);
        }
    });
    /**************************second section************************ */
    $("#firstback").on("click", function () {
        $(".firstsection").show();
        $(".secondsection").hide();
    })
    $("#secondnext").on("click", function () {
        $('#error2').css('display', 'none');
        requB = $('input[name="requireBias"]:checked').val();
        S = 1;
        if (type === "Perceptron") {
            var initW = $('input[name="thereInitWeight"]:checked').val() == "Yes";
            var initB = $('input[name="thereInitBias"]:checked').val() == "Yes" && requB == "Yes";
            S = parseInt($('#S').val());
            displayInputs(true, initW, initB);
        } else {
            var optTarget = $('input[name="addTarget"]:checked').val() == "Yes";
            if (optTarget) {
                S = parseInt($('#S').val());
            }
            displayInputs(optTarget, false, false);
        }
        if (S > 0) {
            $(".secondsection").hide();
            $(".thirdsection").show();
        } else {
            $('#error2').css('display', 'block');
        }
    });
    /****************************third section******************* */
    $("#secondback").on("click", function () {
        $("#finishError").css('display', 'none');
        if (type === "Perceptron" || type === "Hebbian") {
            $(".secondsection").show();
        } else {
            $(".firstsection").show();
        }
        $(".thirdsection").hide();
    })
    $("#finish").on("click", function () {
        $("#finishError").css('display', 'none');
        var flag = true,
            i = 0;
        Target = [];
        Input = [];
        Weight = [];
        Bias = [];

        for (i = 1; i <= numP; i++) {
            Input[i - 1] = [];
            for (var j = 1; j <= R; j++) {
                var value = parseFloat($("#input" + i + "" + j).val());
                if (!math.isNaN(value)) {
                    if (type == "Competitive" || type == "Hamming") {
                        if (value != 1.0 && value != -1.0) {
                            flag = false;
                            break;
                        }
                    }
                    Input[i - 1][j - 1] = value;
                } else {
                    $("#finishError").html('Enter valid number in The Inputs');
                    $("#finishError").css('display', 'block');
                    return;
                }
            }
            if(!flag){
                break;
            }
        }
        if (type == "Perceptron" || (type == "Hebbian" && $('input[name="addTarget"]:checked').val() == "Yes")) {
            requB = $('input[name="requireBias"]:checked').val();
            S = parseInt($('#S').val());
            Target = [];
            for (i = 1; i <= numP; i++) {
                Target[i - 1] = [];
                for (var j = 1; j <= S; j++) {
                    var value = parseFloat($("#target" + i + "" + j).val());
                    if (!math.isNaN(value)) {
                        Target[i - 1][j - 1] = value;
                    } else {
                        $("#finishError").html('Enter valid number in The Targets');
                        $("#finishError").css('display', 'block');
                        return;
                    }
                }
            }
        }

        if (type == "Perceptron") {
            
            if ($('input[name="thereInitWeight"]:checked').val() == "Yes") {
                for (i = 1; i <= S; i++) {
                    Weight[i - 1] = [];
                    for (var j = 1; j <= R; j++) {
                        var value = parseFloat($("#weight" + i + "" + j).val());
                        if (!math.isNaN(value)) {
                            Weight[i - 1][j - 1] = value;
                        } else {
                            $("#finishError").html('Enter valid number in The Weight');
                            $("#finishError").css('display', 'block');
                            return;
                        }
                    }
                }
            }
            if ( requB == "Yes" &&
                $('input[name="thereInitBias"]:checked').val() == "Yes") {
                for (i = 1; i <= S; i++) {
                    var value = parseFloat($("#bias" + i).val());
                    if (!math.isNaN(value)) {
                        Bias[i - 1] = value;
                    } else {
                        $("#finishError").html('Enter valid number in The Bias');
                        $("#finishError").css('display', 'block');
                        return;
                    }

                }
            }
            
            if (isDifferentPrototypes()) {
                $(".slider").html(Perceptron(requB,$("#SelectedTransfer").val()));
                slideIndex = 1;
                showSlides(1);
                $(".thirdsection").slideUp(700);
                $(".result").slideDown(700);
            } else {
                $("#finishError").html('Prototypes must be differrents');
                $("#finishError").css('display', 'block');
            }
        }
        if (type == "Hebbian") {
            if (isDifferentPrototypes()) {
                $(".slider").html(Hebbian(requB));
                slideIndex = 1;
                showSlides(1);
                $(".thirdsection").slideUp(700);
                $(".result").slideDown(700);
            } else {
                $("#finishError").html('Prototypes must be differrents');
                $("#finishError").css('display', 'block');
            }
        } else if (type == "Competitive" || type == "Hamming") {
            if(flag){
                if (isDifferentPrototypes()) {
                    try {
                        $(".slider").html(type == "Competitive" ? Competitive() : Hamming());
                    } catch (error) {
                        alert(error);
                    }
                    slideIndex = 1;
                    showSlides(1);
                    $(".thirdsection").slideUp(700);
                    $(".result").slideDown(700);
                } else {
                    $("#finishError").html('Prototypes must be differrents');
                    $("#finishError").css('display', 'block');
                }
            }else{
                $("#finishError").html('Inputs must be 1 or -1');
                $("#finishError").css('display', 'block');
            }
            
        }

    });
    /****************************question2************************* */
    $("#numLayer").on("keyup change click", function () {
        showLayerNeurons();
    });

    $("#next").on("click", function () {
        $('#q2Error').css('display', 'none');
        numLayers = parseInt($("#numLayer").val());
        var flag = true;
        var html = "",
            i = 0,
            n;
        neurons = [];
        for (i = 1; i <= numLayers; i++) {
            n = parseInt($("#layer" + i).val());
            if (n > 0) {
                neurons[i - 1] = n;
            } else {
                flag = false;
                break;
            }
        }
        RQ2 = parseInt($("#RQ2").val());
        if(numLayers < 2){
            $('#q2Error').html('number of layer must be greater than or equal 2');
            $('#q2Error').css('display', 'block');
        }else if(!flag){
            $('#q2Error').html('number of neurons in each layer must be positive number');
            $('#q2Error').css('display', 'block');
        }else if(RQ2 < 2){
            $('#q2Error').html('R must be greater than or equal 2');
            $('#q2Error').css('display', 'block');
        }else {

            for (i = 1; i <= numLayers; i++) {
                html += '<div class="layersInputs">' +
                    '<div class="text-center layerTitle" >layer #' + i + '</div>' +
                    '<div class="type mb-3 subTitle">Weight</div>';
                for (var j = 1; j <= neurons[i - 1]; j++) {
                    html += "<div class='mt-3'> W" + j;
                    var column = i > 1 ? neurons[i - 2] : RQ2;
                    for (var k = 1; k <= column; k++) {
                        html += "  <input type='number' class='p' placeholder='0' id='weightQ" +
                            i + "" + j + "" + k + "' value='0'>\n";
                    }
                    html += "</div>\n";
                }
                html += '<div class="type mb-3 subTitle">Bias</div>';
                html += "<div class='mt-3'> B";
                for (var j = 1; j <= neurons[i - 1]; j++) {
                    html += "  <input type='number' class='p' placeholder='0' id='biasQ" +
                        i + "" + j + "' value='0'>\n";
                }
                html += "</div>\n";
                html += '</div>';
            }

            $("#weightsQ2").html(html);
            $(".firstsectionQ2").hide();
            $(".secondSectionQ2").show();
        }

    });

    $("#backQ2").on("click", function () {
        $(".secondSectionQ2").hide();
        $(".firstsectionQ2").show();
        $('#q2Errorfinish').css('display', 'none');
    });
    $("#finishQ2").on("click", function () {
        $('#q2Errorfinish').css('display', 'none');
        Weights = [];
        Biases = [];
        var flag = true;
        for (i = 1; i <= numLayers; i++) {
            Weights[i - 1] = [];
            for (var j = 1; j <= neurons[i - 1]; j++) {
                var column = i > 1 ? neurons[i - 2] : RQ2;
                Weights[i - 1][j - 1] = [];
                for (var k = 1; k <= column; k++) {
                    var value = parseFloat($("#weightQ" + i + "" + j + "" + k).val());
                    if (!math.isNaN(value)) {
                        Weights[i - 1][j - 1][k - 1] = value;
                    } else {
                        flag = false;
                        break;
                    }
                }
                if (!flag) {
                    break;
                }
            }
            if (!flag) {
                break;
            }
            Biases[i - 1] = [];
            for (var j = 1; j <= neurons[i - 1]; j++) {
                var value = parseFloat($("#biasQ" + i + "" + j).val());
                if (!math.isNaN(value)) {
                    Biases[i - 1][j - 1] = value;
                } else {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                break;
            }
        }
        if (flag) {

            $(".mySlides2").html(Minimize());
            $(".secondSectionQ2").slideUp(700);
            $(".result2").slideDown(700);
        } else {
            $('#q2Errorfinish').css('display', 'block');
        }
    });
});


$(window).ready(function () {
    var startchange = $('#startchange');
    var offset = startchange.offset();

    $(window).on("scroll", function () {

        if ($(window).scrollTop() > offset.top) {
            $(".navbar").css('background-color', '#fff');

        } else {
            $('.navbar').css('background-color', 'transparent');

        }
    })

});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

$("#exit").on("click", function () {
    $(".thirdsection").slideDown(700);
    $(".result").slideUp(700);
})

$("#exit2").on("click", function () {
    $(".secondSectionQ2").slideDown(700);
    $(".result2").slideUp(700);
})