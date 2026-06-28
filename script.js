
document.addEventListener("DOMContentLoaded", () => {

const searchBox = document.getElementById("searchBox");
const pageTitle = document.getElementById("pageTitle");

const passageText = document.getElementById("passageText");
const notesBox = document.getElementById("notesBox");

const aiButton = document.getElementById("aiButton");
const aiOutput = document.getElementById("aiOutput");

let currentPassage = null;

// dataset
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
openPassage(searchBox.value.toLowerCase().trim());
}
});

function openPassage(query) {

const passage = bible[query];

if (!passage) {
alert("Try Romans 8 or John 3");
return;
}

currentPassage = query;

render(passage);
loadNotes(query);
}

// RENDER
function render(passage) {

pageTitle.textContent = passage.title;

passageText.innerHTML = `
${passage.text.map(v => `<p>${v}</p>`).join("")}
`;

notesBox.value = localStorage.getItem("notes_" + currentPassage) || "";

}

// NOTES
notesBox.addEventListener("input", () => {
if (!currentPassage) return;
localStorage.setItem("notes_" + currentPassage, notesBox.value);
});

// AI BUTTON
aiButton.addEventListener("click", async () => {
runAI();
});

async function runAI() {

if (!currentPassage) {
aiOutput.textContent = "Open a passage first.";
return;
}

const passage = bible[currentPassage];

// Build context prompt
const prompt = `
You are a theological study assistant.

Explain this passage clearly:

${passage.text.join("\n")}

Return:
1. Summary
2. Key theological themes
3. Key Greek/word concepts (if relevant)
4. Study questions
`;

// TEMP FAKE AI (so it works immediately)
aiOutput.textContent =
"AI is analysing passage...\n\n" +
"Summary:\n" +
"This passage teaches assurance in Christ and God's sovereignty.\n\n" +
"Themes:\n" +
"- No condemnation\n- Life in the Spirit\n- Providence of God\n\n" +
"Study Questions:\n" +
"- What does 'no condemnation' imply legally?\n" +
"- How does Paul define life in the Spirit?\n" +
"- How does this connect to justification in Romans 5?";

}

});
