<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="css/draw.css">
	<title>Document</title>
</head>


    <body>

        <div class="top-bar">
            <button id="clear-btn">Clear</button>
            <input type="color" id="color-picker">
            <input type="range" id="brush-size" min="1" max="50" value="10">
			<button id="brush-btn">Brush</button>
			<button id="eraser-btn">Eraser</button>
			<button id="save-btn"  type="button" onclick="savey()">Save</button>

        </div>

        <canvas id="canvas" style="border: 1px solid black" width="800" height="480"></canvas>
        <p> Select file<input type="file" onchange="previewImage(this) "></p>
        <img id="preview">

        <p><button onclick="setImage()">Set image</button></p>


        <script>
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
function previewImage(input){
    var reader =new FileReader();
     reader.onload=function(e){
        document.getElementById("preview").setAttribute("src",e.target.result);
     };

     reader.readAsDataURL(input.files[0]);
}
function setImage(){
    // var x=document.getElementById("x").value;
    // var y=document.getElementById("y").value;
    // var width=document.getElementById("width").value;
    // var height=document.getElementById("height").value;
     var image=document.getElementById("preview");
    //context.drawImage(image,x,y,width,height);
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    context.drawImage(image,0,0,canvas.offsetWidth,canvas.offsetHeight);


}
function savey() {
	console.log(1);
	var data = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	a.href = data;
    a.download = 'image.png';
    a.click();

    

  }
</script>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="js/draw.js"></script>

    </body>

</html>
