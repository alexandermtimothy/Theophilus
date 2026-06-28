
document.addEventListener("DOMContentLoaded", () => {

const searchBox = document.getElementById("searchBox");
const view = document.getElementById("view");
const pageTitle = document.getElementById("pageTitle");

let currentPassage = null;

// Bible dataset
const bible = {
"romans 8": {
title: "Romans 8",
text: [
"1 There is therefore now no condemnation for those in Christ Jesus.",
"2 The law of the Spirit of life has set you free.",
"28 All things work together for good for those who love God."
]
},
"john 3": {
title: "John 3",
text: [
"16 For God so loved the world that He gave His only Son.",
"17 God did not send His Son to condemn the world."
]
}
};

// SEARCH
searchBox.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
const query = searchBox.value.toLowerCase().trim();
openPassage(query);
}
});

function openPassage(query) {
const passage = bible[query];

if (!passage) {
alert("Try: Romans 8 or John 3");
return;
}

currentPassage = query;
render(passage);
loadNotes(query);
}

// RENDER UI
function render(passage) {

pageTitle.textContent = passage.title;

view.innerHTML = `
<div class="card">
<h2>Passage</h2>
${passage.text.map(v => `<p>${v}</p>`).join("")}
</div>

<div class="card">
<h2>My Notes</h2>

<textarea id="notesBox" style="
width:100%;
height:200px;
margin-top:10px;
padding:10px;
border-radius:8px;
border:none;
resize:vertical;
"></textarea>

<p style="opacity:0.6; margin-top:10px;">
Autosaves as you type
</p>

</div>
`;

// attach listener AFTER render
const notesBox = document.getElementById("notesBox");

notesBox.addEventListener("input", () => {
saveNotes(currentPassage, notesBox.value);
});

}

// STORAGE
function saveNotes(key, value) {
if (!key) return;

localStorage.setItem("notes_" + key, value);
}

function loadNotes(key) {
const notesBox = document.getElementById("notesBox");
if (!notesBox) return;

const saved = localStorage.getItem("notes_" + key);
notesBox.value = saved || "";
}

});
