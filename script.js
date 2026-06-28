
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

aiOutput.textContent = "Thinking...";

const prompt = `
You are a theological study assistant for a ministry student.

Explain the passage clearly and academically.

PASSAGE:
${passage.text.join("\n")}

Return in this format:

1. Summary
2. Key theological themes
3. Important terms or Greek insights (if relevant)
4. Study questions for reflection
`;

// CALL OPENAI API
try {

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Bearer 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"
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: "You are a helpful theological study assistant."
},
{
role: "user",
content: prompt
}
],
temperature: 0.7
})
});

const data = await response.json();

const output = data.choices?.[0]?.message?.content;

aiOutput.textContent = output || "No response received.";

} catch (err) {
console.error(err);
aiOutput.textContent = "Error connecting to AI.";
}

}
