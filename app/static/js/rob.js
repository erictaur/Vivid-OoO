let init_ROB    = 0;
let init_RS     = 0;
let size_ROB    = 8;
let size_RS     = 8;
let tail_ROB    = 0;
let head_ROB    = 0;
let PC          = 0;

document.addEventListener("DOMContentLoaded", function() {
    initROB();
});

$(document).ready(function(){
    $('#fetchROB').click(function(){
        if(tail_ROB%4 == 0 && tail_ROB != 0){
            commit();
        }
        loading();
    });
});   

function initROB(){
    if(init_ROB == 0){
        for(var i=0; i<size_ROB; i++){
            var row = document.getElementById("ROB_row".concat(i));
            for(var j=0; j<row.childNodes.length; j++){
                if(row.childNodes[j].className == "ROB_BUSY"){
                    row.childNodes[j].innerHTML = 0;
                }
            }
        }
        init_ROB = 1;
    }
};

function loading(){
    var cols = document.getElementById("ROB_row".concat(tail_ROB = (tail_ROB+1)-size_ROB > 0? tail_ROB-size_ROB : tail_ROB));
    var valid_tail = 0;
    //console.log(cols);
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
        tail_ROB = (tail_ROB+1)-size_ROB > 0? tail_ROB-size_ROB : tail_ROB;
        if(tail_ROB < instructions.length){
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
            dispatch();
            tail_ROB++;
            PC++;
        }
    }
}    

function dispatch(){
    var result = (function fullRS(){
        var isfull;
        var dispatch_idx;
        for(var i=0; i<size_ROB; i++){
            var RS_row = document.getElementById("RS_row".concat(i));
            var row = RS_row.children;

            for(var j=0; j<row.length; j++){
                console.log(row[j]);
                if(row[j].className == "RS_BUSY" && row[j].innerHTML == 0){
                    isfull = false;
                    dispatch_idx = i;
                    row[j].innerHTML = 1;
                    break;
                }
                else{
                    isfull = true;
                }
            }
            if(isfull == false){
                break;
            }
        }
        return [isfull, dispatch_idx];
    })();
    console.log(result);
    
    if(result[0] == false){
        var ROB_row = document.getElementById("ROB_row".concat(tail_ROB));
        var RS_row  = document.getElementById("RS_row".concat(result[1]));
        var RS_cols  = RS_row.children;
        var ROB_cols = ROB_row.children;

        //console.log(ROB_row);
        //console.log(RS_row);

        var rs;
        var rt;
        var rd;

        for(var i=0; i < ROB_cols.length; i++){
            switch(ROB_cols[i].className){
                case "ROB_col1":
                    console.log(ROB_cols[i]);
                    rs = ROB_cols[i].innerHTML;
                    break;
                case "ROB_col2":
                    rt = ROB_cols[i].innerHTML;
                    break;
                case "ROB_col3":
                    rd = ROB_cols[i].innerHTML;
                    break;
            }
        }

        for(var j=0; j < RS_cols.length; j++){
            //console.log(RS_cols[j].className);
            switch(RS_cols[j].className){
                case "RS_col1":
                    RS_cols[j].innerHTML = rs;
                    break;
                case "RS_col2":
                    RS_cols[j].innerHTML = rt;
                    break;
                case "RS_col3":
                    RS_cols[j].innerHTML = rd;
                    break;
            }
        }
    }
}

function commit(){
    var finish_inst = document.getElementById("ROB_row".concat(head_ROB));
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
    head_ROB++;
}