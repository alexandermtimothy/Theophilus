// ================================
// Simple Study Tool - Logic Layer
// ================================

const searchInput = document.querySelector("input");
const content = document.querySelector(".content");

// Temporary Bible dataset (we'll expand later)
const bible = {
  "romans 8": {
    title: "Romans 8",
    text: [
      "1 There is therefore now no condemnation for those who are in Christ Jesus.",
      "2 For the law of the Spirit of life has set you free in Christ Jesus...",
      "28 And we know that in all things God works for the good of those who love him..."
    ]
  },
  "john 3": {
    title: "John 3",
    text: [
      "16 For God so loved the world that he gave his one and only Son...",
      "17 For God did not send his Son into the world to condemn the world..."
    ]
  }
};

// Handle search
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase().trim();
    openPassage(query);
  }
});

function openPassage(query) {
  const passage = bible[query];

  if (!passage) {
    alert("Passage not found yet. Try 'Romans 8' or 'John 3'");
    return;
  }

  renderPassage(passage);
}

function renderPassage(passage) {
  content.innerHTML = `
    <header>
      <h1>${passage.title}</h1>
      <input type="text" placeholder="Search Scripture..." />
    </header>

    <div class="cards" style="grid-template-columns:1fr;">
      <div class="card">
        ${passage.text.map(v => `<p>${v}</p>`).join("")}
      </div>
    </div>
  `;

  // Re-bind search after re-render
  const newInput = document.querySelector("input");

  newInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const query = newInput.value.toLowerCase().trim();
      openPassage(query);
    }
  });
}
