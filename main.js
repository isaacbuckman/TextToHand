var wordsPerRead = document.getElementById("wordsPerRead");
var secondDelay = document.getElementById("secondDelay");
var textInput = document.getElementById("textInput");
textInput.value = "Thank you for listening to my presentation."
// textInput.value = "In 1940, Stern began performing with Russian-born pianist Alexander Zakin, collaborating until 1977.[7] Within musical circles, Stern became renowned both for his recordings and for championing certain younger players. Among his discoveries were cellists Yo-Yo Ma and Jian Wang, and violinists Itzhak Perlman and Pinchas Zukerman. ";
var playButton = document.getElementById("playButton");

var interval;
var speaking = false;

function PlayPause() {
	if (!speaking) {
		var words = textInput.value.split(" ");
		var s = "";
		var queue = []
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
		window.speechSynthesis.speak(queue.shift());
		interval = setInterval(function(){
				var utterance = queue.shift();
				if (queue.length == 0) {
					utterance.onend = function(event) {
						speaking = false;
						window.speechSynthesis.cancel();
						clearInterval(interval);
						playButton.innerHTML = "Play";
					}
				}
				window.speechSynthesis.speak(utterance);
				
		},secondDelay.options[secondDelay.selectedIndex].value * 1000);
	} else {
		speaking = false;
		window.speechSynthesis.cancel();
		clearInterval(interval);
		playButton.innerHTML = "Play";
	}
}
