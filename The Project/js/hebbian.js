function Hebbian(requB) {
    S = Target.length === 0 ?Input[0].length : Target[0].length; 
    R = Input[0].length;
    Target = Target.length === 0 ?  math.transpose(Input) : math.transpose(Target);
    var i = 0,j = 0,isOrthonormal = true,output,PPlus,a,flag = false;
    output = math.multiply(Input,math.transpose(Input));

    for(i = 0;i<Input.length;i+=1){
        for(j=0;j<Input.length;j++){
            if((i != j && output[i][j] != 0) || (i == j && output[i][j] != 1)){
                isOrthonormal = false;
                break;
            }
        }
        if(!isOrthonormal){break;}
    }
    if(requB == "Yes"){
        for(i = 0;i<Input.length;i+=1){Input[i].push(1);}
    }
    if(isOrthonormal){
        Weight = math.multiply(Target,Input);
    }else{
        try {
            PPlus = math.multiply(math.inv(math.multiply(Input,math.transpose(Input))),Input);
        } catch (error) {
            var dotsHtml = '<span class="dot" onclick="currentSlide(1)"></span>';
            $(".dot-container").html(dotsHtml);
            return '<div class="mySlides"><div class="layersInputs">' +
            '<div class="text-center layerTitle" >Information!</div><div class="text-center resultSlider">' +
            'We can not calculate weights by Pseudoinverse rule becuase the inputs does not have inverse </div> </div></div>';
        }
        Weight = math.multiply(Target,PPlus);
    }
    
    if(requB == "Yes"){
        Bias = [];
        for (i = 1; i <= Weight.length; i++) {
            Bias[i-1] = Weight[i-1].pop();
        }
        for(i=0; i<Input.length;i++){
            Input[i].pop();
        }
    }

    var column = Weight[0].length;
    var html = '<a class="prev" onclick="plusSlides(-1)">❮</a><div class="mySlides">' +
        '<div class="layersInputs"><div class="hebbian">'+
        (isOrthonormal? 'The prototypes is orthonormal so we will use Hebbian rule to get weight'
        : 'The prototypes is not orthonormal so we will use Pseudoinverse rule to get weight') +
        '</div></div><div class="layersInputs">' +
        '<div class="text-center layerTitle" >Weight</div><div class="array">';

    for (i = 1; i <= Weight.length; i++) {
        html += "<div class='mt-3'>";
        for (j = 1; j <= column; j++) {
            html += "<span class='wSpan'>" + Weight[i - 1][j - 1].toFixed(2) + "</span>";
        }
        html += "</div>\n";
    }
    html += '</div></div>';
    
    if(requB == "Yes"){
        html += '<div class="layersInputs">' +
            '<div class="text-center layerTitle" >Bias</div><div class="array">';
        html += "<div class='mt-3'>";
        for (i = 1; i <= Bias.length; i++) {
            html += "<span class='wSpan'>" + Bias[i - 1].toFixed(2) + "</span>";
        }
        html += "</div></div></div>\n";
    }   
    html += '</div>\n';

    Target = math.transpose(Target);

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
        if(requB == "Yes"){
            html += '<div class = "outChar"> + </div><div class="array">';
            for (var i = 1; i <= Bias.length; i++) {
                html += "<div class='mt-3'>";
                html += "<span class='wSpan'>" + Bias[i - 1].toFixed(2) + "</span>";
                html += "</div>\n";
            }
            html += '</div>';
        }
        
        html += '<div class = "outChar">) = </div><div class="array">';
        a = (requB == "Yes" ? math.add(math.multiply(Weight, Input[index - 1]), Bias)
            :math.multiply(Weight, Input[index - 1]));
        for (var i = 1; i <= a.length; i++) {
            html += "<div class='mt-3'>";
            html += "<span class='wSpan'>" + math.abs(a[i - 1]).toFixed(2) + "</span>";
            html += "</div>\n";
        }
        flag = false;
        for (var i = 1; i <= a.length; i++){
            if(math.abs(a[i - 1] - Target[index - 1][i-1]) > 1e-3){
                flag = true;
            }
        }
        html += '</div><div class="resultSlider mt-3"> Output '+ (flag?'!':'') +'= Target';
        html += '</div></div></div></div>'
    }


    html += '<a class="next" onclick="plusSlides(1)">❯</a>';

    var dotsHtml = '<span class="dot" onclick="currentSlide(1)"></span>';
    for (var i = 1; i <= Input.length; i++) {
        dotsHtml += '<span class="dot" onclick="currentSlide(' + (i + 1) + ')"></span>';
    }
    
    $("#dot1").html(dotsHtml);
    return html;
}