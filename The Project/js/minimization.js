function Minimize(){
    var i = 0,newBias=[],newWeight=[];
    
    newBias = Biases[numLayers - 1];
    newWeight = Weights[numLayers - 1];
    newBias = math.add(newBias,math.multiply(newWeight,Biases[numLayers - 2]));
    for(i = numLayers-3 ;i >= 0; i -= 1){
        newWeight = math.multiply(newWeight,Weights[i + 1]);
        newBias = math.add(newBias,math.multiply(newWeight,Biases[i]));
    }
    newWeight = math.multiply(newWeight,Weights[0]);


    
    var column = newWeight[0].length;

    var html = '<div class="layersInputs">' +
                '<div class="text-center layerTitle" >New Weight</div><div class="array">';
            
    for (var i = 1; i <= newWeight.length; i++) {
        html += "<div class='mt-3'>";
        for (var j = 1; j <= column; j++) {
            html += "<span class='wSpan'>"+ newWeight[i-1][j-1] +"</span>";
        }
        html += "</div>\n";
    }
    html += '</div></div><div class="layersInputs">' +
            '<div class="text-center layerTitle" >New Bias</div><div class="array">';
    html += "<div class='mt-3'>";
    for (var i = 1; i <= newBias.length; i++) {
        html += "<span class='wSpan'>"+ newBias[i-1] +"</span>";
    }
    html += "</div></div></div>\n";

    return html;
}