const startButton = document.querySelector('.start-button');
const texts = document.querySelectorAll('.text');
const writtenTexts = document.querySelectorAll('.written');
const notYetWrittenTexts = document.querySelectorAll('.not-yet-written');
const score = document.querySelector('.score');
const input = document.querySelector('.input');
let chosenText;
let textIndex;
let currentWord = 0;
let startTime = null;

startButton.addEventListener('click', () => {
	texts.forEach((text) => {
		text.classList.add('no-display');
	});
	textIndex = Math.floor(Math.random() * texts.length);
	texts[textIndex].classList.remove('no-display');
	chosenText = notYetWrittenTexts[textIndex].innerHTML.split(' ');
	chosenText.forEach((_, index, array) => {
		if (index === array.length - 1) {
			return;
		}
		array[index] += ' ';
	});
	input.removeAttribute('disabled');
	input.focus();
	startButton.setAttribute('disabled', true);
	score.classList.add('no-display');
});

input.addEventListener('input', () => {
	if (startTime === null) {
		startTime = new Date().getTime();
	}
	if (chosenText[currentWord] === input.value) {
		writtenTexts[textIndex].innerHTML += input.value;
		notYetWrittenTexts[textIndex].innerHTML = notYetWrittenTexts[textIndex].innerHTML.substring(input.value.length);
		currentWord++;
		input.value = '';
	}
	if (currentWord === chosenText.length) {
		texts[textIndex].classList.add('no-display');
		notYetWrittenTexts[textIndex].innerHTML = writtenTexts[textIndex].innerHTML;
		writtenTexts[textIndex].innerHTML = '';
		currentWord = 0;
		let elapsedTime = (new Date().getTime() - startTime) / 1000;
		score.innerHTML = `${elapsedTime} s`;
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