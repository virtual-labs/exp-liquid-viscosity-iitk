//document.getElementsByClassName("button")[0].addEventListener("click", function () { alert("Helloo"); }, false)

//document.getElementById("res").addEventListener("click", function () { alert("Helloo"); }, false)

window.onload = function () {


	window.canvas = document.getElementById('myCanvas');
	window.context = canvas.getContext('2d');
	window.stopWatch = new StopWatch(200,400);
	window.message = " ";
	window.message2 = " ";
	//window.message3 = " ";
	window.lequidDensity = 0;
	window.flaskImageId = "empty";
	window.ballColor = "white";
	window.ballDensity = 0;
	window.isAnimate = true;
	window.isDrag = true;
	window.visc ="";
	var width = canvas.width;
	var height = canvas.height;

	this.handle =
	{
		x: width / 2,
		y: height / 2,
		radius: 10
	};

	this.initial = {
		x: handle.x,
		y: handle.y
	}

	offset = {};
	draw();
	//mouse event Listener
	if(isDrag)

		{	document.body.addEventListener("mousedown", function (event) {
				var mousCord = getMousePos(canvas, event);
				isAnimate = true;
				if (utils.circlePointCollision(mousCord.x, mousCord.y, handle) && isDrag) {
					document.body.addEventListener("mousemove", onMouseMove);
					document.body.addEventListener("mouseup", onMouseUp);
					offset.x = mousCord.x - handle.x;
					offset.y = mousCord.y - handle.y;
				}
			});

			function onMouseMove(event) {
				var mousCord = getMousePos(canvas, event);
				handle.x = mousCord.x;// - offset.x;
				handle.y = mousCord.y;// - offset.y;
				draw();
			}

			function onMouseUp(event) {
				document.body.removeEventListener("mousemove", onMouseMove);
				document.body.removeEventListener("mouseup", onMouseUp);

				window.preY = handle.y;
				


				//animation
				var dx = 4;
				var dy = 4;


				window.canvas = document.getElementById('myCanvas');
				window.context = canvas.getContext('2d');

				if (handle.x>650 && handle.x < 780 && handle.y < 80){
					animate();
					stopWatch.reStart();
				}
		}
}

createTable();

			//draw();

};

function animate() { 
	if (isAnimate) {
		requestAnimationFrame(animate);
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawFlask();
		context.beginPath();
		context.arc(handle.x, handle.y, handle.radius, 0, 2 * Math.PI, false);
		context.strokeStyle = "blue";
		context.fillStyle = window.ballColor;
		context.fill();
		context.stroke();


		if (handle.y > 400 || handle.y  < 0) {

			isAnimate = false;
			stopWatch.stop();
			window.time=stopWatch.s+(stopWatch.ms)/100;
			window.postY = handle.y;
			var dist = Math.round((postY-preY)*0.13).toFixed(2);
			var velo =Math.round(dist/time).toFixed(2);
			context.font = "20px Georgia";
			context.fillStyle = "black";
			context.fillText("Distance = "+dist+" cm",100,200);
			//context.fillText("velocity = "+velo+" cm/s",100,190);

	//Result buuton Listener
			document.getElementById("res").addEventListener("click",function(){
			window.visc =Math.round((0.000218*handle.radius*handle.radius*(window.ballDensity - window.lequidDensity))/velo).toFixed(2);
			// context.font = "20px Georgia";
			// context.fillStyle = "black";
			// context.fillText("Liquid viscosity="+visc+" Pa-S", 100, 220);
			handle.x = initial.x;
			handle.y = initial.y;
			isDrag = true;
			isAnimate = false;
			stopWatch.reset();
			stopWatch.stop();
			draw();

		}, false);
			isDrag = false;

		}



		handle.y += 1;
	}
		//draw();
	stopWatch.draw();
	ballDisplay();
	liquidDisplay();

}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();

	context.globalCompositeOperation = 'destination-over';
	context.arc(window.handle.x, window.handle.y, window.handle.radius, 0, 2 * Math.PI, false);
	context.fillStyle = window.ballColor;
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = '#000000';
	context.stroke();
	stopWatch.draw();	

	drawFlask();
	liquidDisplay();
	ballDisplay();
}

function drawFlask() {



	var img = document.getElementById(window.flaskImageId);
	context.drawImage(img, 650, 80, 150, 400);

}

var getMousePos = function (canvas, e) {
	var boundingClientRect = canvas.getBoundingClientRect();
	var tx = e.clientX - boundingClientRect.left;
	var ty = e.clientY - boundingClientRect.top;
	console.log(boundingClientRect.left);
	return {
		x: tx,
		y: ty
	};
};

var StopWatch = function (x, y) {
    this.width = 100;
    this.height = 40;
    this.x = x;
    this.y = y;
    this.s = 0;
    this.ms = 0;
    this.isStart = false;
    this.isDraw = false;
    this.time = null;
    this.timeInterval = null;
    this.draw = function () {
        if (this.s % 2 == 0)
            this.time = (this.s < 10 ? "0" + this.s : this.s) + ":" + (this.ms < 10 ? "0" + this.ms : this.ms);
        else
            this.time = (this.s < 10 ? "0" + this.s : this.s) + " " + (this.ms < 10 ? "0" + this.ms : this.ms);
        context.clearRect(this.x, this.y, this.width, this.height);
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();
        context.closePath();

        context.font = "30px Arial";
        context.fillStyle = "gray";
        context.fillText(this.time, this.x + this.width / 2 - 30, this.y + this.height / 2 + 10);

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText("Stopwatch :", this.x + this.width / 2 - 170, this.y + this.height / 2 + 5);

        context.font = "20px Arial";
        context.fillStyle = "black";
        context.fillText("SS:MS", this.x + this.width / 2 - 30, this.y + this.height / 2 + 40);
    }
    this.reset = function () {
        this.ms = 0;
        this.s = 0;
    }
    this.start = function () {
        if (!this.isStart) {
            this.isStart = true;
            this.timeInterval = setInterval(this.operate, 10);
        } else {
            terminal.update("Stopwatch is already running.");
        }
    }
    this.stop = function () {
        if (this.isStart) {
            this.isStart = false;
            clearInterval(this.timeInterval);
        }
    }
    this.reStart = function () {
        if (!this.isStart) {
            this.reset();
            this.start();
        }
    }
    this.operate = function () {
        stopWatch.ms += 1;
        if (stopWatch.ms == 100) {
            stopWatch.s++;
            stopWatch.ms = 0;
            if (stopWatch.s == 60) {
                stopWatch.s = 0;
            }
        }
        stopWatch.draw();
    }
}

function liquidDisplay() {
	context.font = "15px Georgia";
	context.fillStyle = "black";
	context.fillText(window.message, 100, 120);

}

function ballDisplay() {
	context.font = "15px Georgia";
	context.fillStyle = "black";
	context.fillText(window.message2, 100, 160);

}


function selectValue1() {
	window.lequidDensity = document.getElementById("select1").value;


	window.message = "Liquid density=" + lequidDensity + " Kg per cubic meter";

	if (window.lequidDensity == 997) {

		window.flaskImageId = "water";
	} else if (window.lequidDensity == 803) {

		window.flaskImageId = "alcohol";
	} else {
		window.flaskImageId = "kero";
	}
	draw();
}

function selectValue2() {
	if (window.lequidDensity!=0) 
	{
		window.ballDensity = document.getElementById("select2").value;
		window.message2 = "Ball density = " + ballDensity + " Kg per cubic meter";

		if (window.ballDensity == 1602) {
			window.ballColor = "#c9ebc3";

		}
		else if (window.ballDensity == 19300) {
			window.ballColor = "#5e5e5e";
		}
		else {
			window.ballColor = "#baa738";
		}
		draw();
	}
	else
	{
		window.ballDensity = 0;
		alert("Please select Liquid");

	}
}

function textValue() {


		window.handle.radius = document.getElementById("field").value;
		if (isNaN(handle.radius) || handle.radius < 10 || handle.radius >35) 
		{
    		alert("Please Enter radius between 10 to 35");
  		}

	else
	{
		if (window.ballDensity!=0)
		 {

			draw();
		}
		else
		{
			alert("Please Select Material of Ball")
		}
	}
}


       function drawGraph() {
    
    var datapoints1 = [];
    for (let i = 1; i <= 5; i++) {
        var tx = document.getElementById("d"+i+"1").firstChild.value;
        var ty = document.getElementById("d"+i+"2").firstChild.value;
        datapoints1.push({ x: parseInt(tx), y: parseInt(ty) });
        graphline("l1", datapoints1, "x axis", "y-axis");
    }
}


function createTable() {
    var str = "<h3 class='text-center'>Datatable</h3>"; 
    str += "<table>";
    str += "<tr><th>Sr No.</th><th class= 'text-center'>Distance<br>(S)</th><th class='text-center'> Fall Time <br>(t)</th></tr>";
    var table = document.getElementById("dataTable");
    for (i = 1; i <= 5; i++) {
        str += '<tr><td>' + i + '.</td><td id = "d' + i + '1"><input type="text"></td><td id = "d' + i + '2"><input type="text"></td></tr>';
    }
    str += "</table>";
    table.innerHTML = str;
}


//Percentage Error Calculation
 function Error ()
 {
 	var userViscosity = document.getElementById("terror").value;
 	var  error = 100*(userViscosity-visc)/visc;
 	if (isNaN(userViscosity)) 
 	{ 
 		alert("Please input Valid number");	
 	}
 	else
 	{
	 	if(error<10)
	 	{	
	 		alert("Percentage Error="+error);
	 	}
	 	else
	 	{
	 		alert("Error is greater than 10% perform again");
	 	}
 	}
 }

function reset()
{
	// handle.x = initial.x;
	// handle.y = initial.y;
	// isDrag = true;
	// isAnimate = false;
	// stopWatch.reset();
	// stopWatch.stop();
	// draw();
	location.reload();
}

