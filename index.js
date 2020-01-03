// small : 97-122
// caps: 65-90
//symbols: 32-47

"use strict";

let elements = document.getElementsByClassName("pwd-option");
let keys = Object.keys(elements);
let pwd_length = document.getElementById("pwd-length");
let slider = document.getElementById("slider");
let pwd_field = document.getElementById("pwd-field");

document.getElementById("copy-btn").addEventListener("click", () => {
	copyToClipboard();
});

document.getElementById("new-pwd-btn").addEventListener("click", () => {
	generatePassword();
});

pwd_length.addEventListener("keydown", event => {
	// can also use event.keyCode or event.key or event.code
	if (event.which === 13) {
		slider.value = event.target.value;
		generatePassword();
	}
});

slider.addEventListener("input", event => {
	event.preventDefault();
	pwd_length.value = event.target.value;
	generatePassword();
});

function addEventListeners(elements) {
	for (let element of elements) {
		element.addEventListener("click", () => {
			setCheckboxStatus(event);
			generatePassword();
		});
	}
}

function setCheckboxStatus(event) {
	let status = uncheckingAllowed();
	if (!status) {
		event.target.checked = true;
	}
}

function uncheckingAllowed() {
	let optionValues = [];
	console.log(Object.values(elements));
	for (let element of elements) {
		optionValues.push(element.checked);
	}
	let count = 0;
	for (let value of optionValues) {
		if (value) {
			count++;
		}
	}
	if (count < 1) {
		return false;
	}
	return true;
}

function getPwdOptions(elements) {
	let options = {};
	for (let element of elements) {
		options[element.name] = element.checked;
	}
	return options;
}

const copyToClipboard = () => {
	let password = pwd_field.value;
	navigator.clipboard.writeText(password);
};

function createPassword(length, options) {
	let obj = {};
	let password = "";

	if (options.lowercase) {
		obj.SMALL = [97, 122];
	}
	if (options.uppercase) {
		obj.CAPS = [65, 90];
	}
	if (options.number) {
		obj.NUM = [0, 9];
	}
	if (options.symbol) {
		obj.SYM = [33, 47];
	}

	let keys = Object.keys(obj);
	if (keys.length < 1) {
		return "";
	}
	for (let i = 0; i < length; i++) {
		let random = Math.floor(Math.random() * keys.length);
		let charToEncode = Math.floor(Math.random() * (obj[keys[random]][1] - obj[keys[random]][0]) + obj[keys[random]][0]);
		if (keys[random] == "NUM") {
			password += charToEncode;
		} else {
			password += String.fromCharCode(charToEncode);
		}
	}
	return password;
}

function generatePassword() {
	let length = pwd_length.value;
	// let elements = document.querySelectorAll(".pwd-option");
	let options = getPwdOptions(elements);
	let password = createPassword(length, options);
	pwd_field.value = password;
}

addEventListeners(elements);
generatePassword();
