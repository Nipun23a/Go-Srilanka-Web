var textBox = document.getElementById("textBox");
var imgBox = document.getElementById("imgBox");

textBox.onkeyup = textBox.onkeypress = function(){
    document.getElementById("prevText").innerHTML = this.value;
    }
var loadFile = function(event){
    imgBox.style.backgroundImage = "url(" +URL.createObjectURL(event.target.files[0])+ ")";

    }

function colorChange(){
    let color = document.getElementById("backgroundColor").value;
    document.body.style.backgroundColor = color;
    }