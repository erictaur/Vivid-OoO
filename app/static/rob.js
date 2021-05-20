let init = 0;
let size = 8;
let tail = 0;
let head = 0;
let PC   = 0;

document.addEventListener("DOMContentLoaded", function() {
    initRS();
});

$(document).ready(function(){
    $('#fetch').click(function(){
        if(tail%4 == 0 && tail != 0){
            commit();
        }
        loading();
    });
});   

function initRS(){
    if(init == 0){
        for(var i=0; i<size; i++){
            var row = document.getElementById("ROB_row".concat(i));
            for(var j=0; j<row.childNodes.length; j++){
                if(row.childNodes[j].className == "ROB_BUSY"){
                    row.childNodes[j].innerHTML = 0;
                }
            }
        }
        init = 1;
    }
};

function loading(){
    var cols = document.getElementById("ROB_row".concat(tail = (tail+1)-size > 0? tail-size : tail));
    var valid_tail = 0;
    console.log(cols);
    for(var i=0; i<cols.childNodes.length; i++){
        if(cols.childNodes[i].className == "ROB_BUSY"){
            if(cols.childNodes[i].innerHTML == 0){
                valid_tail = 1;
                break;
            }
        }
    }
    if(valid_tail == 1){
        var children = cols.children;
        tail = (tail+1)-size > 0? tail-size : tail;
        if(tail < instructions.length){
            for(var i=0; i<instructions[0].length; i++){
                children[i].innerHTML = instructions[PC][i];
            }               
            var update = function updateROB(){
                for(var i=0; i<children.length; i++){
                    switch(children[i].className){
                        case "ROB_PC":
                            children[i].innerHTML = PC;
                            break;                                
                        case "ROB_BUSY":
                            children[i].innerHTML = 1;
                            break;
                        case "ROB_TAG":
                            break;                                
                        case "ROB_TAG_OLD":
                            break;                                
                    }
                }                    
            }
            update();
            tail++;
            PC++;
        }
    }
}    

function commit(){
    var finish_inst = document.getElementById("ROB_row".concat(head));
    var finish = finish_inst.children;
    var update = function updateROB(){
            for(var i=0; i<finish.length; i++){
                switch(finish[i].className){
                    case "ROB_PC":
                        break;                                
                    case "ROB_BUSY":
                        finish[i].innerHTML = 0;
                        break;
                    case "ROB_TAG":
                        break;                                
                    case "ROB_TAG_OLD":
                        break;                                
                }
            }
        }
    update();
    head++;
}