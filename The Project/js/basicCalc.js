var type,Input,Weight,Weight2,Bias,Target,S=0,R=0,numP,requB;
var numLayers;

function isDifferentPrototypes(){
    for(var i=0;i<Input.length;i++){
        for(var j=i+1; j< Input.length;j++){
            if(Input[i][0] == Input[j][0]){
                var k = 1;
                do {
                    if(Input[i][k] != Input[j][k]){
                        break;
                    }
                    k++;
                } while (k < Input[0].length);
                if(k == Input[0].length){
                    return false;
                }
            }
        }
    }
    return true;
}
function initW(){
    Weight = [];
    for (var i = 0; i < S; i++) {
        Weight[i] = [];
        for (var j = 0; j < R; j++){
            Weight[i][j] = (Math.random() * 2) - 1 ;
        }
    }
}

function initB(value){
    Bias = [];
    for (var i = 0; i < S; i++) {
        Bias[i] = value;
    }
}

function areEqual(mat1, mat2) {
    mat1 = math.compare(mat1, mat2);

    for (var i = 0; i < mat1.length; i++) {
        if (mat1[i] != 0) {
            return false;
        }
    }
    return true;
}
function transferFunction(mat1, fname){
    var a = [],i;
   
    switch(fname){
        case 'hardlim':
            for (i = 0; i < mat1.length; i++) {
                if(mat1[i] >= 0){
                    a.push(1);
                }else{
                    a.push(0);
                }
            }
            break;

        case 'hardlims':
            for(i = 0 ; i < mat1.length ; i++){
                if(mat1[i] >= 0){
                    a.push(1);
                }else{
                    a.push(-1);
                }
            }
                break;

        case 'purelin':
            for(i = 0 ; i < mat1.length ; i++){
               a.push(mat1[i]); 
            }
            break;

        case 'satlin':
            for(i = 0 ; i < mat1.length ; i++){
                if(mat1[i] < 0){
                    a.push(0);
                }else if(mat1[i] > 1){
                    a.push(1);
                }else{
                    a.push([mat1[i]]);
                }
            }
            break; 

        case 'satlins':
            for(i = 0 ; i < mat1.length ; i++){
                if(mat1[i] < -1){
                    a.push(-1);
                }else if(mat1[i] > 1){
                    a.push(1);
                }else{
                    a.push(mat1[i]);
                }
            }
                    
            break; 

        case 'logsig':
            for(i = 0 ; i < mat1.length ; i++){
                a.push(1/(1+Math.pow(Math.E,mat1[i])));
            }
            break; 

        case 'tansig':
            for(i = 0 ; i < mat1.length ; i++){
                a.push((Math.pow(Math.E,mat1[i]) - Math.pow(Math.E,-1 * mat1[i])) / (Math.pow(Math.E,mat1[i]) + Math.pow(Math.E,-1 * mat1[i])));
            }
            break; 

        case 'poslin':
            for(i = 0 ; i < mat1.length ; i++){
                if(mat1[i] < 0){
                    a.push(0);
                }else{
                    a.push(mat1[i]);
                }
            }
            break;

        }

    return a;
}