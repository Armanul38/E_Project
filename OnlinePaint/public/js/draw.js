//1. initializing variable and conditions
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//canvas.width = 800;
//canvas.height = 500;
var mouse = false;
ctx.lineJoin = "round";
ctx.lineCap = "round";
var positionX, positionY;

//Element retrieval
var brush = document.getElementById("brush-btn"); //Brush
var eraser = document.getElementById("eraser-btn"); //Eraser
var color = document.getElementById("color-picker"); //Color
var size = document.getElementById("brush-size"); //Size
var clear = document.getElementById("clear-btn");

//var save1 = document.getElementById("save-btn");
var load1 = document.getElementById("load");

//var saveLink = document.getElementById("save-btn"); //saveLink element

//Set initial color conditions
var myColor = color.value;
ctx.strokeStyle = myColor;

//Set initial size conditions
var mySize = size.value;
ctx.lineWidth = mySize;

brush.style.border = "2px solid red";
canvas.style.cursor = "pointer";

canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);

//4. Color change conditions
function colorChange() {
	myColor = color.value;
	ctx.strokeStyle = myColor;
}

//5. Size change conditions
function sizeChange() {
	mySize = size.value;
	ctx.lineWidth = mySize;
}

//2.Make brush work
function getCoordinates(canvas, e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

function brushDraw(canvas, positionX, positionY) {
	if(mouse) {
		ctx.lineTo(positionX, positionY);
		ctx.stroke();

	}
}

function brushDown(e) {
	mouse = true;
	var coordinates = getCoordinates(canvas, e);
	canvas.style.cursor = "pointer";
	positionX = coordinates.x;
	positionY = coordinates.y;
	ctx.beginPath();
	ctx.moveTo(positionX, positionY);
	ctx.lineTo(positionX, positionY);
	ctx.stroke();
}

function brushMove(event) {
	var coordinates = getCoordinates(canvas, event);
	positionX = coordinates.x;
	positionY = coordinates.y;
	brushDraw(canvas, positionX, positionY);
}

function brushUp() {
	mouse = false;
	canvas.style.cursor = "default";
}

function brushClick() {
	var brushColor = document.getElementById("color-picker");
	ctx.strokeStyle = brushColor.value;
	brush.style.border = "2px solid red";
	eraser.style.border = "none";

	canvas.addEventListener("mousedown", brushDown, false); //bubble phase
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//3. Making the eraser work
function eraserClick() {
	ctx.strokeStyle = "white";
	eraser.style.border = "2px solid red";
	brush.style.border = "none";

	canvas.addEventListener("mousedown", brushDown, false);
	canvas.addEventListener("mousemove", brushMove, false);
	canvas.addEventListener("mouseup", brushUp, false);
}

//7. Making the save button work
/*function saveClick() {
	var data = canvas.toDataURL(); //encodes image information into a base 64 format
	console.log(data);
	saveLink.href = data;
	//saveLink.download = "myImage.png";
}*/


function clearClick() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

}

// function savey() {
// 	console.log(1);
// 	const data = canvas.toDataURL('image/png');
// 	const a = document.createElement('a');
// 	a.href = data;
//     a.download = 'image.png';
//     <?php
//     $vari='data';

//     ?>
// 	a.click();
//   }




  function load(event) {
    const file = [...event.target.files].pop();
    this.readTheFile(file)
      .then((image) => loadTheImage(image))
  }
 function  loadTheImage(image) {
    const img = new Image();
    const canvas = canvas;
    img.onload = function () {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = image;
  }
  function readTheFile(file) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    })
  }


//Event Listeners for tools
brush.addEventListener("click", brushClick); //Brush click event
eraser.addEventListener("click", eraserClick); //Eraser click event
color.addEventListener("change", colorChange); //Color change event
size.addEventListener("change", sizeChange); //Size change event
clear.addEventListener("click", clearClick);
//save1.addEventListener("click", savey);
loadInput.addEventListener('click', load);
//save.addEventListener("click", saveClick);

