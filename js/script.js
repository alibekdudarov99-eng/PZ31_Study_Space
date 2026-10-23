"use strict";


const nameInput = document.querySelector("#name-input");
const saveNameButton = document.querySelector("#save-name");
const greeting = document.querySelector("#greeting");
const nameStatus = document.querySelector("#name-status");

const noteInput = document.querySelector("#note-input");
const saveNoteButton = document.querySelector("#save-note");
const clearNoteButton = document.querySelector("#clear-note");
const noteStatus = document.querySelector("#note-status");


function setCookie(key, value, days) {
    const seconds = days * 24 * 60 * 60;
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; max-age=${seconds}; path=/`;
}

function getCookie(key) {
    const prefix = `${encodeURIComponent(key)}=`;
    const found = document.cookie
        .split("; ")
        .find((item) => item.startsWith(prefix));
    return found ? decodeURIComponent(found.slice(prefix.length)) : "";
}


const savedNote = localStorage.getItem("pz31-note");
if (savedNote !== null) {
    noteInput.value = savedNote;
    noteStatus.textContent = "Заметка восстановлена из localStorage.";
}


const savedName = getCookie("pz31-name");
if (savedName !== "") {
    nameInput.value = savedName;
    greeting.textContent = `Привет, ${savedName}!`;
    nameStatus.textContent = "Имя восстановлено из cookie.";
}


saveNoteButton.addEventListener("click", () => {
    const note = noteInput.value.trim();

    if (note === "") {
        noteStatus.textContent = "Сначала напишите заметку.";
        return;
    }

    
    localStorage.setItem("pz31-note", note);

    noteStatus.textContent = "Заметка сохранена в браузере.";
});


clearNoteButton.addEventListener("click", () => {
    
    localStorage.removeItem("pz31-note");

    noteInput.value = "";
    noteStatus.textContent = "Заметка удалена.";
});


saveNameButton.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (name === "") {
        nameStatus.textContent = "Сначала введите имя.";
        return;
    }

    
    setCookie("pz31-name", name, 7);

    greeting.textContent = `Привет, ${name}!`;
    nameStatus.textContent = "Имя сохранено в cookies на 7 дней.";
});
