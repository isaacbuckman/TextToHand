var wordsPerRead = document.getElementById("wordsPerRead");
var secondDelay = document.getElementById("secondDelay");
var textInput = document.getElementById("textInput");
var playButton = document.getElementById("playButton");

var timeout;
var speaking = false;
var queue = [];

function PlayPause() {
	if (!speaking) {
		var words = textInput.value.split(" ");
		if (words.length !== 0) {
			var s = "";
			for (var i = 0; i < words.length; i++) {
				s += words[i] + " ";
				if ((i + 1) % wordsPerRead.options[wordsPerRead.selectedIndex].value == 0) {
					var msg = new SpeechSynthesisUtterance(s);
					queue.push(msg);
					s = "";
				} else if (i == words.length - 1) {
					var msg = new SpeechSynthesisUtterance(s);
					queue.push(msg);
				}
			}
			playButton.innerHTML = "Cancel";
			speaking = true;
			speak();
		}
	} else {
		speaking = false;
		queue = [];
		window.speechSynthesis.cancel();
		clearTimeout(timeout);
		playButton.innerHTML = "Play";
	}
}

function speak() {
	var utterance = queue.shift();
	if (queue.length == 0) {
		utterance.onend = function(event) {
			speaking = false;
			window.speechSynthesis.cancel();
			clearTimeout(timeout);
			playButton.innerHTML = "Play";
		}
	} else {
		utterance.onend = function(event) {
			timeout = setTimeout(function(){speak()}, secondDelay.options[secondDelay.selectedIndex].value * 1000);
		}
	}
	window.speechSynthesis.speak(utterance);
}
