document.addEventListener("DOMContentLoaded", () => {

const searchBox = document.getElementById("searchBox");
const view = document.getElementById("view");
const pageTitle = document.getElementById("pageTitle");

let currentPassage = null;

// mini dataset
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
alert("Passage not found. Try 'Romans 8' or 'John 3'");
return;
}

currentPassage = query;
renderPassage(passage);
}

// RENDER
function renderPassage(passage) {

pageTitle.textContent = passage.title;

view.innerHTML = `
<div class="card" style="grid-column:1/-1;">
${passage.text.map(v => `<p>${v}</p>`).join("")}
</div>
`;
}

});
