
// ================================
// Stable Architecture Version
// ================================

document.addEventListener("DOMContentLoaded", () => {

  const searchBox = document.getElementById("searchBox");
  const view = document.getElementById("view");
  const pageTitle = document.getElementById("pageTitle");

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

    renderPassage(passage);
  }

  function renderPassage(passage) {

    pageTitle.textContent = passage.title;

    view.innerHTML = `
      <div class="card" style="grid-column: 1 / -1;">
        ${passage.text.map(v => `<p>${v}</p>`).join("")}
      </div>
    `;
  }

});
