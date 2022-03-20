const texts = [
	"The fastest typing speed ever, 216 words per minute, was achieved by Stella Pajunas-Garnand from Chicago in 1946 in one minute on an IBM electric. As of 2005, writer Barbara Blackburn was the fastest English language typist in the world, according to The Guinness Book of World Records. Using the Dvorak Simplified Keyboard, she had maintained 150 wpm for 50 minutes, and 170 wpm for shorter periods, with a peak speed of 212 wpm.",
	"Hunt and peck (two-fingered typing), also known as Eagle Finger, is a common form of typing in which the typist presses each key individually. Instead of relying on the memorized position of keys, the typist must find each key by sight. Use of this method may also prevent the typist from being able to see what has been typed without glancing away from the keys. Although good accuracy may be achieved, any typing errors that are made may not be noticed immediately due to the user not looking at the screen. There is also the disadvantage that because fewer fingers are used, those that are used are forced to move a much greater distance.",
	"Proofreader applicants are tested primarily on their spelling, speed, and skill in finding errors in the sample text. Toward that end, they may be given a list of ten or twenty classically difficult words and a proofreading test, both tightly timed. The proofreading test will often have a maximum number of errors per quantity of text and a minimum amount of time to find them. The goal of this approach is to identify those with the best skill set.",
	"Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake. Many experienced typists can feel or sense when they have made an error and can hit the Backspace key and make the correction with no increase in time between keystrokes.",
	"The emperor penguin's diet consists mainly of fish, crustaceans and cephalopods, although its composition varies from population to population. Fish are usually the most important food source, and the Antarctic silverfish (Pleuragramma antarcticum) makes up the bulk of the bird's diet. Other prey commonly recorded include other fish of the family Nototheniidae, the glacial squid (Psychroteuthis glacialis), and the hooked squid species Kondakovia longimana, as well as Antarctic krill (Euphausia superba). The emperor penguin searches for prey in the open water of the Southern Ocean, in either ice-free areas of open water or tidal cracks in pack ice."
];
const startButton = document.querySelector('.start-button');
const writtenText = document.querySelector('.written');
const notYetWrittenText = document.querySelector('.not-yet-written');
const score = document.querySelector('.score');
const input = document.querySelector('.input');
const textbox = document.querySelector('.textbox');
let chosenText;
let textIndex;
let currentWord = 0;
let startTime = null;

startButton.addEventListener('click', () => {
	textIndex = Math.floor(Math.random() * texts.length);
	chosenText = texts[textIndex].split(' ');
	chosenText.forEach((_, index, array) => {
		if (index === array.length - 1) {
			return;
		}
		array[index] += ' ';
	});
	notYetWrittenText.innerHTML = texts[textIndex];
	input.removeAttribute('disabled');
	input.focus();
	startButton.setAttribute('disabled', true);
	score.classList.add('no-display');
	textbox.firstElementChild.classList.remove('no-display');
});

input.addEventListener('input', () => {
	if (startTime === null) {
		startTime = new Date().getTime();
	}
	if (chosenText[currentWord] === input.value) {
		writtenText.innerHTML += input.value;
		notYetWrittenText.innerHTML = notYetWrittenText.innerHTML.substring(input.value.length);
		currentWord++;
		input.value = '';
	}
	if (currentWord === chosenText.length) {
		textbox.firstElementChild.classList.add('no-display');
		notYetWrittenText.innerHTML = '';
		writtenText.innerHTML = '';
		currentWord = 0;
		let elapsedTime = new Date().getTime() - startTime;
		score.innerHTML = `${(chosenText.length / (elapsedTime / 60000)).toFixed(2)} wpm`;
		score.classList.remove('no-display');
		input.setAttribute('disabled', true);
		startButton.removeAttribute('disabled');
		return;
	}
	if (chosenText[currentWord].startsWith(input.value)) {
		input.classList.remove('wrong');
	} else {
		input.classList.add('wrong');
	}
});