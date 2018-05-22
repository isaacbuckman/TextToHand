var slider = document.getElementById("myRange");
var output = document.getElementById("output");
var sliderSeconds = document.getElementById("mySeconds");
var outputSeconds = document.getElementById("outputseconds")
var input = document.getElementById("input");
// input.value = "In 1940, Stern began performing with Russian-born pianist Alexander Zakin, collaborating until 1977.[7] Within musical circles, Stern became renowned both for his recordings and for championing certain younger players. Among his discoveries were cellists Yo-Yo Ma and Jian Wang, and violinists Itzhak Perlman and Pinchas Zukerman. ";
var button = document.getElementById("button");

output.innerHTML = slider.value;
outputSeconds.innerHTML = sliderSeconds.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

sliderSeconds.oninput = function() {
  outputSeconds.innerHTML = this.value;
}

var interval;
var speaking = false;

function PlayPause() {
	if (!speaking) {
		var words = input.value.split(" ");
		var s = "";
		var queue = []
		for (var i = 0; i < words.length; i++) {
			s += words[i] + " ";
			if (i % (slider.value) == 0 && i !== 0) {
				var msg = new SpeechSynthesisUtterance(s);
				queue.push(msg);
				s = "";
			} else if (i == words.length - 1) {
				var msg = new SpeechSynthesisUtterance(s);
				queue.push(msg);
			}
		}
		button.innerHTML = "Cancel";
		speaking = true;
		window.speechSynthesis.speak(queue.shift());
		interval = setInterval(function(){
			if (queue.length == 0) {
				clearInterval(interval);
				button.innerHTML = "Play"
			} else {
				window.speechSynthesis.speak(queue.shift());
			}
		},sliderSeconds.value * 1000);
	} else {
		speaking = false;
		console.log(interval);
		window.speechSynthesis.cancel();
		clearInterval(interval);
		button.innerHTML = "Play"
	}
}

/* if (!window.speechSynthesis.speaking) {
	var msg = new SpeechSynthesisUtterance(input.value);
	msg.onend = function(event) {
		button.innerHTML = "Play";
	}
	window.speechSynthesis.speak(msg);
	button.innerHTML = "Cancel";
} else if (!window.speechSynthesis.paused) { 
	window.speechSynthesis.pause();
	button.innerHTML = "Continue";
 } else {
	window.speechSynthesis.resume();
	button.innerHTML = "Pause";
} */

