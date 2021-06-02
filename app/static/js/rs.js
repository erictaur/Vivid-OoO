document.addEventListener("DOMContentLoaded", function() {
    initRS();
});

$(document).ready(function(){
    $('#fetchRS').click(function(){
        console.log(PC);
    });
});

function initRS(){
    if(init_RS == 0){
        for(var i=0; i<size_RS; i++){
            var row = document.getElementById("RS_row".concat(i));
            for(var j=0; j<row.childNodes.length; j++){
                if(row.childNodes[j].className == "RS_BUSY"
                    || row.childNodes[j].className == "RS_RS ready"
                    || row.childNodes[j].className == "RS_RT ready"
                    || row.childNodes[j].className == "RS_RD ready"){
                    row.childNodes[j].innerHTML = 0;
                }
            }
        }
        init_RS = 1;
    }
};