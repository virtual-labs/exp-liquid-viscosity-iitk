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
		x: 450,
		y: height / 2,
		radius: 10
	};

	this.initial = {
		x: handle.x,
		y: handle.y
	}

	window.offset = {};
	draw();
	var activePointerId = null;
	var dragOffset = { x: 0, y: 0 };
	canvas.addEventListener("pointerdown", function (event) {
		if (!isDrag || activePointerId !== null || (event.pointerType === "mouse" && event.button !== 0)) {
			return;
		}

		var pointerCoords = getMousePos(canvas, event);
		var scaleX = canvas.clientWidth / canvas.width;
		var scaleY = canvas.clientHeight / canvas.height;
		var distanceX = (pointerCoords.x - handle.x) * scaleX;
		var distanceY = (pointerCoords.y - handle.y) * scaleY;
		var hitRadius = Math.max(handle.radius * Math.min(scaleX, scaleY), 24);
		if (Math.sqrt(distanceX * distanceX + distanceY * distanceY) <= hitRadius) {
			event.preventDefault();
			activePointerId = event.pointerId;
			dragOffset.x = handle.x - pointerCoords.x;
			dragOffset.y = handle.y - pointerCoords.y;
			canvas.setPointerCapture(event.pointerId);
			isAnimate = true;
		}
	});

	canvas.addEventListener("pointermove", function (event) {
		if (event.pointerId !== activePointerId) {
			return;
		}

		event.preventDefault();
		var pointerCoords = getMousePos(canvas, event);
		handle.x = pointerCoords.x + dragOffset.x;
		handle.y = pointerCoords.y + dragOffset.y;
		draw();
	});

	canvas.addEventListener("pointerup", function (event) {
		if (event.pointerId !== activePointerId) {
			return;
		}

		activePointerId = null;
		window.preY = handle.y;

		if (handle.x > 630 && handle.x + 35 < 710 && handle.y < 80) {
			window.lastAnimationFrameTime = null;
			requestAnimationFrame(animate);
			stopWatch.reStart();
		}
	});

	canvas.addEventListener("pointercancel", function (event) {
		if (event.pointerId === activePointerId) {
			activePointerId = null;
		}
	});

createTable();

			//draw();

};

function animate(frameTime) {
	if (isAnimate) {
		requestAnimationFrame(animate);
		if (window.lastAnimationFrameTime === null) {
			window.lastAnimationFrameTime = frameTime;
			return;
		}

		var frameDelta = frameTime - window.lastAnimationFrameTime;
		window.lastAnimationFrameTime = frameTime;
		handle.y += frameDelta * 0.06;
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
			window.time = stopWatch.getElapsedSeconds();
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
	context.drawImage(img, 580, 80, 150, 400);

}

var getMousePos = function (canvas, e) {
	var boundingClientRect = canvas.getBoundingClientRect();
	var tx = (e.clientX - boundingClientRect.left - canvas.clientLeft) * canvas.width / canvas.clientWidth;
	var ty = (e.clientY - boundingClientRect.top - canvas.clientTop) * canvas.height / canvas.clientHeight;
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
    this.elapsedMs = 0;
    this.startTime = 0;
    this.draw = function () {
        var elapsed = this.isStart ? performance.now() - this.startTime : this.elapsedMs;
        var elapsedSeconds = Math.floor(elapsed / 1000);
        this.s = elapsedSeconds % 60;
        this.ms = Math.floor((elapsed % 1000) / 10);
        this.time = (this.s < 10 ? "0" + this.s : this.s) + ":" + (this.ms < 10 ? "0" + this.ms : this.ms);
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
        this.elapsedMs = 0;
        this.startTime = 0;
        this.ms = 0;
        this.s = 0;
    }
    this.start = function () {
        if (!this.isStart) {
            this.isStart = true;
            this.startTime = performance.now() - this.elapsedMs;
        }
    }
    this.stop = function () {
        if (this.isStart) {
            this.elapsedMs = performance.now() - this.startTime;
            this.isStart = false;
        }
    }
    this.reStart = function () {
        if (!this.isStart) {
            this.reset();
            this.start();
        }
    }
    this.getElapsedSeconds = function () {
        return this.elapsedMs / 1000;
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
	window.ballDensity = document.getElementById("select2").value;
	if (window.ballDensity == 0) {
		window.message2 = " ";
		window.ballColor = "white";
	} else {
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
	}
	draw();
}

function textValue() {
	var radiusField = document.getElementById("field");
	var radius = radiusField.valueAsNumber;
	if (!radiusField.value || !Number.isInteger(radius) || radius < 10 || radius > 35) {
		alert("Please enter a whole-number radius between 10 and 35 cm");
		return;
	}

	window.handle.radius = radius;
	if (window.ballDensity != 0) {
		draw();
	} else {
		alert("Please Select Material of Ball");
	}
}


       function drawGraph() {
    
    var datapoints1 = [];
    for (let i = 1; i <= 5; i++) {
        var tx = document.getElementById("d"+i+"1").firstChild.value;
        var ty = document.getElementById("d"+i+"2").firstChild.value;
        datapoints1.push({ x: parseFloat(tx), y: parseFloat(ty) });
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
