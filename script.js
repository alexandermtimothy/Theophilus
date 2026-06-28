// ================================
// Stable Debug Version
// ================================

document.addEventListener("DOMContentLoaded", () => {

  console.log("Study Tool JS Loaded");

  const content = document.querySelector(".content");

  // We grab input AFTER render OR from DOM safely
  function getInput() {
    return document.querySelector("input");
  }

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

  // Attach listener AFTER a short delay to ensure DOM is stable
  setTimeout(() => {
    const input = getInput();

    console.log("Input found:", input);

    if (!input) {
      console.error("No input found in DOM");
      return;
    }

    input.addEventListener("keydown", (e) => {
      console.log("Key pressed:", e.key);

      if (e.key === "Enter") {
        const query = input.value.toLowerCase().trim();
        console.log("Searching:", query);
        openPassage(query);
      }
    });

  }, 50);

  function openPassage(query) {
    const passage = bible[query];

    if (!passage) {
      alert("Passage not found. Try: romans 8 or john 3");
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

    // Re-bind input AFTER render
    setTimeout(() => {
      const input = getInput();

      console.log("Rebound input:", input);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const query = input.value.toLowerCase().trim();
          console.log("Searching (post-render):", query);
          openPassage(query);
        }
      });
    }, 50);
  }

});
