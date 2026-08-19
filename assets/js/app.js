/* ============================================================
   ACADEMIC RESEARCH HUB
   Main Application
   ============================================================ */

/* ============================================================
   1. SEED DATA
   ============================================================ */

const seed = {

  progress: [
    {
      id: 1,
      title: "Set up the research notebook",
      date: "2026-08-18",
      tag: "Coding",
      description:
        "Created the initial structure for documenting research progress, ideas, simulations, and writing.",
      link: ""
    },
    {
      id: 2,
      title: "Review quantum geometry framework",
      date: "2026-08-17",
      tag: "Reading",
      description:
        "Reviewed the relation between Berry curvature, quantum metric, and optical response.",
      link: ""
    }
  ],

  notes: [
    {
      id: 3,
      title: "Quantum Geometry",
      date: "2026-08-18",
      tag: "Theory",
      description:
        "Notes on Berry connection, Berry curvature, quantum metric, and their role in response functions.",
      link: ""
    },
    {
      id: 4,
      title: "Nonlinear Optical Response",
      date: "2026-08-15",
      tag: "Theory",
      description:
        "Working notes for χ(2), χ(3), SHG, THG, and density-matrix perturbation theory.",
      link: ""
    }
  ],

  papers: [
    {
      id: 5,
      title:
        "Berry-Curvature–Enhanced Second-Harmonic Generation in Two-Band Quantum Materials",
      date: "2026-08-01",
      tag: "Writing",
      description:
        "Draft manuscript exploring geometric contributions to nonlinear optical response.",
      link: ""
    },
    {
      id: 6,
      title:
        "Nanoscale Organic Contaminant Detection at the Surface Using a Nonlinear Bond Model",
      date: "2026-07-20",
      tag: "Publication",
      description:
        "Manuscript using bond hyperpolarizability concepts for surface-sensitive nonlinear optical detection.",
      link: ""
    }
  ],

  /* ==========================================================
     COMPUTATION
     ========================================================== */

  computation: [
    {
      id: 15,
      title: "GaAs MBHM χ²",
      date: "2026-08-19",
      tag: "Simulation",
      description:
        "Calculation of second-order nonlinear susceptibility using the Modified Bond Hyperpolarizability Model.",
      link: "",

      fileName: "",
      fileType: "",
      fileSize: 0,
      fileData: "",

      metadata: {
        software: "Python",
        method: "MBHM",
        material: "GaAs",
        observable: "χ(2)",
        notes: ""
      }
    }
  ],

  scope: [
    {
      id: 7,
      title: "Nonlinear Optics",
      date: "",
      tag: "Research",
      description:
        "SHG, THG, RA-SHG, SBHM, MBHM, χ(2), χ(3), and surface nonlinear response.",
      link: ""
    },
    {
      id: 8,
      title: "Quantum Geometry",
      date: "",
      tag: "Research",
      description:
        "Berry curvature, quantum metric, topology, geometric contributions to optical and transport responses.",
      link: ""
    },
    {
      id: 9,
      title: "Quantum Materials",
      date: "",
      tag: "Research",
      description:
        "Graphene, topological insulators, Weyl semimetals, semiconductors, perovskites, and related systems.",
      link: ""
    },
    {
      id: 10,
      title: "Computational Physics",
      date: "",
      tag: "Methods",
      description:
        "Tight-binding, k·p, Wannier functions, DFT, numerical transport, and high-performance computing.",
      link: ""
    },
    {
      id: 11,
      title: "Materials & Detection",
      date: "",
      tag: "Application",
      description:
        "Organic contaminants, nonlinear spectroscopy, interfaces, and nanoscale optical sensing.",
      link: ""
    },
    {
      id: 12,
      title: "Scientific Computing",
      date: "",
      tag: "Tools",
      description:
        "Python, Mathematica, Quantum ESPRESSO, Wannier90, Yambo, OpenMX, and reproducible workflows.",
      link: ""
    }
  ],

  activity: [
    {
      id: 13,
      title: "Research Notebook Launched",
      date: "2026-08-18",
      tag: "Research",
      description:
        "Started a public-facing academic research hub for documenting ongoing work.",
      link: ""
    },
    {
      id: 14,
      title: "Research & Teaching",
      date: "2026-08-01",
      tag: "Teaching",
      description:
        "Academic activity, physics mentoring, lecture preparation, and student development.",
      link: ""
    }
  ]
};


/* ============================================================
   2. LOAD DATA
   ============================================================ */

let data;

try {

  const stored = localStorage.getItem("academicResearchHub");

  data = stored
    ? JSON.parse(stored)
    : seed;

} catch (error) {

  console.error("Failed to load saved data:", error);

  data = seed;
}


/* ============================================================
   3. DOM HELPERS
   ============================================================ */

const $ = selector => document.querySelector(selector);

const $$ = selector => [
  ...document.querySelectorAll(selector)
];


/* ============================================================
   4. CONSTANTS
   ============================================================ */

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "webp",
  "pdf",
  "mp4",
  "webm",
  "py",
  "ipynb",
  "txt",
  "csv",
  "json",
  "zip"
];


/* ============================================================
   5. GENERAL FUNCTIONS
   ============================================================ */

function save() {

  try {

    localStorage.setItem(
      "academicResearchHub",
      JSON.stringify(data)
    );

  } catch (error) {

    console.error("Unable to save data:", error);

    if (
      error.name === "QuotaExceededError" ||
      error.code === 22
    ) {

      alert(
        "Storage penuh.\n\n" +
        "File computation terlalu besar untuk localStorage.\n" +
        "Silakan hapus beberapa file atau gunakan GitHub upload mode."
      );

      return;
    }
  }

  render();
}


function esc(value = "") {

  return String(value).replace(
    /[&<>"']/g,
    m => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m])
  );
}


function fmt(date) {

  if (!date) return "No date";

  const x = new Date(date + "T00:00:00");

  return x.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  );
}


function formatFileSize(bytes) {

  if (!bytes) return "0 B";

  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];

  const i =
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

  return (
    parseFloat(
      (bytes / Math.pow(1024, i)).toFixed(2)
    ) +
    " " +
    units[i]
  );
}


function getExtension(filename = "") {

  const parts = filename.split(".");

  if (parts.length < 2) return "";

  return parts.pop().toLowerCase();
}


function all() {

  return Object.values(data)
    .flat()
    .sort(
      (a, b) =>
        (b.date || "").localeCompare(
          a.date || ""
        )
    );
}


/* ============================================================
   6. EMPTY STATE
   ============================================================ */

function empty(text) {

  return `
    <div class="entry-card">
      <p>${esc(text)}</p>
    </div>
  `;
}


/* ============================================================
   7. DELETE
   ============================================================ */

function remove(type, id) {

  const item = data[type]?.find(
    x => x.id === id
  );

  if (!item) return;

  const confirmed = confirm(
    `Delete "${item.title}"?`
  );

  if (!confirmed) return;

  data[type] = data[type].filter(
    x => x.id !== id
  );

  save();
}


function cardActions(type, id) {

  return `
    <button
      class="delete-btn"
      onclick="remove('${type}',${id})"
      title="Delete"
      aria-label="Delete">
      ×
    </button>
  `;
}


/* ============================================================
   8. MAIN RENDER
   ============================================================ */

function render() {

  $("#statProgress").textContent =
    data.progress.length;

  $("#statNotes").textContent =
    data.notes.length;

  $("#statPapers").textContent =
    data.papers.length;

  $("#statComputation").textContent =
    data.computation.length;

  $("#statActivities").textContent =
    data.activity.length;

  $("#year").textContent =
    new Date().getFullYear();

  const latest = all()[0];

  $("#lastUpdate").textContent =
    latest
      ? fmt(latest.date)
      : "—";


  /* ----------------------------------------------------------
     Recent Progress
     ---------------------------------------------------------- */

  $("#recentProgress").innerHTML =
    data.progress
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(a.date)
      )
      .slice(0, 4)
      .map(
        x => `
          <div class="feed-item">

            <small>
              ${fmt(x.date)}
              ·
              ${esc(x.tag)}
            </small>

            <h3>
              ${esc(x.title)}
            </h3>

            <p>
              ${esc(x.description)}
            </p>

          </div>
        `
      )
      .join("") ||
    empty(
      "No progress entries yet."
    );


  /* ----------------------------------------------------------
     Scope Preview
     ---------------------------------------------------------- */

  $("#scopePreview").innerHTML =
    data.scope
      .slice(0, 5)
      .map(
        (x, i) => `
          <div class="scope-chip">

            <b>
              ${String(i + 1).padStart(2, "0")}
              ·
              ${esc(x.title)}
            </b>

            <span>
              ${esc(x.description)}
            </span>

          </div>
        `
      )
      .join("");


  renderProgress();
  renderNotes();
  renderPapers();
  renderComputation();
  renderScope();
  renderActivities();
}


/* ============================================================
   9. PROGRESS
   ============================================================ */

function renderProgress() {

  const q =
    ($("#progressSearch")?.value || "")
      .toLowerCase();

  const f =
    $("#progressFilter")?.value ||
    "all";


  const items =
    data.progress
      .filter(
        x =>
          (f === "all" ||
            x.tag.toLowerCase() === f) &&
          (
            `${x.title} ${x.description} ${x.tag}`
              .toLowerCase()
              .includes(q)
          )
      )
      .sort(
        (a, b) =>
          b.date.localeCompare(a.date)
      );


  $("#progressList").innerHTML =
    items
      .map(
        x => `
          <article class="entry-card">

            <div class="date-box">
              ${fmt(x.date)}
            </div>

            <div>

              <h3>
                ${esc(x.title)}
              </h3>

              <p>
                ${esc(x.description)}
              </p>

              <span class="tag">
                ${esc(x.tag)}
              </span>

            </div>

            <div>
              ${cardActions(
                "progress",
                x.id
              )}
            </div>

          </article>
        `
      )
      .join("") ||
    empty("No matching progress.");
}


/* ============================================================
   10. NOTES
   ============================================================ */

function renderNotes() {

  $("#notesList").innerHTML =
    data.notes
      .map(
        x => `
          <article class="note-card">

            <div class="note-icon">
              ✎
            </div>

            <small>
              ${fmt(x.date)}
              ·
              ${esc(x.tag)}
            </small>

            <h3>
              ${esc(x.title)}
            </h3>

            <p>
              ${esc(x.description)}
            </p>

            <span class="tag">
              ${esc(x.tag)}
            </span>

            <div style="margin-top:12px">
              ${cardActions(
                "notes",
                x.id
              )}
            </div>

          </article>
        `
      )
      .join("");
}


/* ============================================================
   11. PAPERS
   ============================================================ */

function renderPapers() {

  $("#papersList").innerHTML =
    data.papers
      .map(
        x => `
          <article class="paper-card">

            <div>

              <small>
                ${fmt(x.date)}
              </small>

              <h3>
                ${esc(x.title)}
              </h3>

              <p>
                ${esc(x.description)}
              </p>

              ${
                x.link
                  ? `
                    <a
                      href="${esc(x.link)}"
                      target="_blank"
                      rel="noopener"
                      class="tag">
                      Open link ↗
                    </a>
                  `
                  : ""
              }

            </div>

            <div>

              <span class="status">
                ${esc(x.tag)}
              </span>

              ${cardActions(
                "papers",
                x.id
              )}

            </div>

          </article>
        `
      )
      .join("");
}


/* ============================================================
   12. COMPUTATION
   ============================================================ */

function renderComputation() {

  const container =
    $("#computationList");

  if (!container) return;


  const items =
    data.computation
      .slice()
      .sort(
        (a, b) =>
          (b.date || "").localeCompare(
            a.date || ""
          )
      );


  container.innerHTML =
    items
      .map(
        x => {

          const preview =
            renderComputationPreview(x);

          const metadata =
            x.metadata || {};


          return `
            <article
              class="computation-card">

              ${preview}

              <div
                class="computation-content">

                <small>
                  ${fmt(x.date)}
                  ·
                  ${esc(x.tag)}
                </small>

                <h3>
                  ${esc(x.title)}
                </h3>

                <p>
                  ${esc(x.description)}
                </p>


                ${
                  x.fileName
                    ? `
                      <div
                        class="file-name">

                        📎
                        ${esc(x.fileName)}

                      </div>

                      <div
                        class="file-meta">

                        ${esc(
                          x.fileType ||
                          "Unknown type"
                        )}

                        ·

                        ${formatFileSize(
                          x.fileSize
                        )}

                      </div>
                    `
                    : ""
                }


                ${
                  metadata.software ||
                  metadata.method ||
                  metadata.material ||
                  metadata.observable
                    ? `
                      <div
                        class="metadata-box">

                        ${
                          metadata.software
                            ? `
                              <span>
                                <b>Software:</b>
                                ${esc(
                                  metadata.software
                                )}
                              </span>
                            `
                            : ""
                        }

                        ${
                          metadata.method
                            ? `
                              <span>
                                <b>Method:</b>
                                ${esc(
                                  metadata.method
                                )}
                              </span>
                            `
                            : ""
                        }

                        ${
                          metadata.material
                            ? `
                              <span>
                                <b>Material:</b>
                                ${esc(
                                  metadata.material
                                )}
                              </span>
                            `
                            : ""
                        }

                        ${
                          metadata.observable
                            ? `
                              <span>
                                <b>Observable:</b>
                                ${esc(
                                  metadata.observable
                                )}
                              </span>
                            `
                            : ""
                        }

                      </div>
                    `
                    : ""
                }


                ${
                  metadata.notes
                    ? `
                      <div
                        class="metadata-notes">

                        ${esc(
                          metadata.notes
                        )}

                      </div>
                    `
                    : ""
                }


                <div
                  class="computation-actions">

                  ${
                    x.fileData
                      ? `
                        <button
                          class="secondary-btn"
                          onclick="downloadComputation(${x.id})">

                          ↓ Download

                        </button>
                      `
                      : ""
                  }

                  ${
                    x.link
                      ? `
                        <a
                          href="${esc(x.link)}"
                          target="_blank"
                          rel="noopener"
                          class="tag">

                          External link ↗

                        </a>
                      `
                      : ""
                  }

                  ${cardActions(
                    "computation",
                    x.id
                  )}

                </div>

              </div>

            </article>
          `;
        }
      )
      .join("") ||
    empty(
      "No computation results yet."
    );
}


/* ============================================================
   13. COMPUTATION PREVIEW
   ============================================================ */

function renderComputationPreview(item) {

  if (!item.fileData) {

    return `
      <div
        class="computation-preview empty-preview">

        <span>
          No file preview
        </span>

      </div>
    `;
  }


  const type =
    item.fileType || "";


  /* IMAGE */

  if (
    type.startsWith("image/")
  ) {

    return `
      <div
        class="computation-preview">

        <img
          src="${item.fileData}"
          alt="${esc(item.title)}"
          loading="lazy">

      </div>
    `;
  }


  /* PDF */

  if (
    type === "application/pdf"
  ) {

    return `
      <div
        class="computation-preview pdf-preview">

        <iframe
          src="${item.fileData}"
          title="${esc(item.title)}">
        </iframe>

      </div>
    `;
  }


  /* VIDEO */

  if (
    type.startsWith("video/")
  ) {

    return `
      <div
        class="computation-preview">

        <video
          controls
          preload="metadata">

          <source
            src="${item.fileData}"
            type="${esc(type)}">

          Your browser does not support video.

        </video>

      </div>
    `;
  }


  /* OTHER FILES */

  return `
    <div
      class="computation-preview file-preview">

      <div class="file-icon">
        📄
      </div>

      <strong>
        ${esc(item.fileName)}
      </strong>

      <small>
        ${formatFileSize(
          item.fileSize
        )}
      </small>

    </div>
  `;
}


/* ============================================================
   14. DOWNLOAD COMPUTATION
   ============================================================ */

function downloadComputation(id) {

  const item =
    data.computation.find(
      x => x.id === id
    );

  if (
    !item ||
    !item.fileData
  ) {

    alert(
      "File tidak tersedia."
    );

    return;
  }


  const a =
    document.createElement("a");

  a.href = item.fileData;

  a.download =
    item.fileName ||
    "computation-result";

  document.body.appendChild(a);

  a.click();

  a.remove();
}


/* ============================================================
   15. SCOPE
   ============================================================ */

function renderScope() {

  $("#scopeList").innerHTML =
    data.scope
      .map(
        (x, i) => `
          <article class="scope-card">

            <span class="scope-num">
              ${String(i + 1).padStart(2, "0")}
            </span>

            <h3>
              ${esc(x.title)}
            </h3>

            <p>
              ${esc(x.description)}
            </p>

            <span class="tag">
              ${esc(x.tag)}
            </span>

            <div style="margin-top:14px">

              ${cardActions(
                "scope",
                x.id
              )}

            </div>

          </article>
        `
      )
      .join("");
}


/* ============================================================
   16. ACTIVITIES
   ============================================================ */

function renderActivities() {

  $("#activityList").innerHTML =
    data.activity
      .slice()
      .sort(
        (a, b) =>
          b.date.localeCompare(a.date)
      )
      .map(
        x => `
          <article
            class="activity-card">

            <small>
              ${fmt(x.date)}
              ·
              ${esc(x.tag)}
            </small>

            <h3>
              ${esc(x.title)}
            </h3>

            <p>
              ${esc(x.description)}
            </p>

            <span class="tag">
              ${esc(x.tag)}
            </span>

            <div style="margin-top:12px">

              ${cardActions(
                "activity",
                x.id
              )}

            </div>

          </article>
        `
      )
      .join("");
}


/* ============================================================
   17. FILE READER
   ============================================================ */

function readFileAsDataURL(file) {

  return new Promise(
    (resolve, reject) => {

      const reader =
        new FileReader();

      reader.onload =
        () => resolve(
          reader.result
        );

      reader.onerror =
        () => reject(
          reader.error
        );

      reader.readAsDataURL(file);

    }
  );
}


/* ============================================================
   18. FILE VALIDATION
   ============================================================ */

function validateFile(file) {

  if (!file) {

    return {
      valid: false,
      message: "No file selected."
    };
  }


  if (
    file.size >
    MAX_FILE_SIZE
  ) {

    return {
      valid: false,
      message:
        `File terlalu besar.\n\n` +
        `Maximum: ${formatFileSize(
          MAX_FILE_SIZE
        )}\n` +
        `Your file: ${formatFileSize(
          file.size
        )}`
    };
  }


  const ext =
    getExtension(file.name);


  if (
    !ALLOWED_EXTENSIONS.includes(ext)
  ) {

    return {
      valid: false,
      message:
        `File type .${ext} belum didukung.\n\n` +
        `Supported:\n` +
        ALLOWED_EXTENSIONS.join(", ")
    };
  }


  return {
    valid: true
  };
}


/* ============================================================
   19. FILE INPUT PREVIEW
   ============================================================ */

function previewSelectedFile(file) {

  const preview =
    $("#uploadPreview");

  const meta =
    $("#uploadMetadata");


  if (!preview) return;


  if (!file) {

    preview.innerHTML = "";

    if (meta) {
      meta.innerHTML = "";
    }

    return;
  }


  const validation =
    validateFile(file);


  if (!validation.valid) {

    preview.innerHTML = "";

    if (meta) {
      meta.innerHTML = "";
    }

    alert(validation.message);

    $("#media").value = "";

    return;
  }


  const type =
    file.type || "";


  if (
    type.startsWith("image/")
  ) {

    const reader =
      new FileReader();

    reader.onload = e => {

      preview.innerHTML = `
        <img
          src="${e.target.result}"
          alt="Selected file preview">
      `;

    };

    reader.readAsDataURL(file);

  }

  else if (
    type === "application/pdf"
  ) {

    const reader =
      new FileReader();

    reader.onload = e => {

      preview.innerHTML = `
        <iframe
          src="${e.target.result}"
          title="PDF preview">
        </iframe>
      `;

    };

    reader.readAsDataURL(file);

  }

  else if (
    type.startsWith("video/")
  ) {

    const reader =
      new FileReader();

    reader.onload = e => {

      preview.innerHTML = `
        <video
          controls
          preload="metadata">

          <source
            src="${e.target.result}"
            type="${esc(type)}">

        </video>
      `;

    };

    reader.readAsDataURL(file);

  }

  else {

    preview.innerHTML = `
      <div class="file-preview">

        <div class="file-icon">
          📄
        </div>

        <strong>
          ${esc(file.name)}
        </strong>

      </div>
    `;
  }


  if (meta) {

    meta.innerHTML = `
      <span>
        <b>Name:</b>
        ${esc(file.name)}
      </span>

      <span>
        <b>Type:</b>
        ${esc(
          file.type ||
          "Unknown"
        )}
      </span>

      <span>
        <b>Size:</b>
        ${formatFileSize(
          file.size
        )}
      </span>
    `;
  }
}


/* ============================================================
   20. FORM
   ============================================================ */

function openForm(type) {

  $("#entryType").value =
    type;


  const names = {

    progress:
      "Daily progress",

    notes:
      "Lecture note",

    papers:
      "Paper",

    computation:
      "Computation result",

    scope:
      "Research scope",

    activity:
      "Activity"
  };


  $("#formEyebrow").textContent =
    "NEW " +
    names[type].toUpperCase();


  $("#formTitle").textContent =
    "Add " +
    names[type].toLowerCase();


  $("#date").value =
    new Date()
      .toISOString()
      .slice(0, 10);


  $("#tag").value =

    type === "activity"
      ? "Teaching"

    : type === "scope"
      ? "Research"

    : type === "papers"
      ? "Writing"

    : type === "computation"
      ? "Simulation"

    : "Theory";


  /* ----------------------------------------------------------
     Show / hide upload
     ---------------------------------------------------------- */

  if (
    type === "computation"
  ) {

    $("#mediaLabel")
      .classList
      .remove(
        "hidden-field"
      );

  } else {

    $("#mediaLabel")
      .classList
      .add(
        "hidden-field"
      );
  }


  /* ----------------------------------------------------------
     Reset computation preview
     ---------------------------------------------------------- */

  if ($("#media")) {

    $("#media").value = "";
  }

  if ($("#uploadPreview")) {

    $("#uploadPreview").innerHTML = "";
  }

  if ($("#uploadMetadata")) {

    $("#uploadMetadata").innerHTML = "";
  }


  $("#modal")
    .classList
    .remove("hidden");
}


function closeForm() {

  $("#modal")
    .classList
    .add("hidden");

  $("#entryForm").reset();


  if ($("#uploadPreview")) {

    $("#uploadPreview").innerHTML = "";
  }

  if ($("#uploadMetadata")) {

    $("#uploadMetadata").innerHTML = "";
  }
}


/* ============================================================
   21. FORM BUTTONS
   ============================================================ */

$$("[data-open-form]")
  .forEach(
    button => {

      button.onclick =
        () =>
          openForm(
            button.dataset.openForm
          );

    }
  );


$("#closeModal").onclick =
  closeForm;


$("#modal").onclick =
  event => {

    if (
      event.target.id ===
      "modal"
    ) {

      closeForm();
    }
  };


/* ============================================================
   22. FILE INPUT EVENT
   ============================================================ */

if ($("#media")) {

  $("#media").addEventListener(
    "change",
    event => {

      const file =
        event.target.files[0];

      previewSelectedFile(file);

    }
  );
}


/* ============================================================
   23. FORM SUBMIT
   ============================================================ */

$("#entryForm").onsubmit =
  async event => {

    event.preventDefault();


    const type =
      $("#entryType").value;


    const entry = {

      id: Date.now(),

      title:
        $("#title")
          .value
          .trim(),

      date:
        $("#date").value,

      tag:
        $("#tag").value,

      description:
        $("#description")
          .value
          .trim(),

      link:
        $("#link")
          .value
          .trim(),

      fileName: "",
      fileType: "",
      fileSize: 0,
      fileData: "",

      metadata: {

        software:
          $("#software")?.value
            ?.trim() || "",

        method:
          $("#method")?.value
            ?.trim() || "",

        material:
          $("#material")?.value
            ?.trim() || "",

        observable:
          $("#observable")?.value
            ?.trim() || "",

        notes:
          $("#metadataNotes")?.value
            ?.trim() || ""
      }
    };


    /* ========================================================
       COMPUTATION FILE
       ======================================================== */

    if (
      type ===
      "computation"
    ) {

      const fileInput =
        $("#media");


      if (
        fileInput &&
        fileInput.files.length
      ) {

        const file =
          fileInput.files[0];


        const validation =
          validateFile(file);


        if (
          !validation.valid
        ) {

          alert(
            validation.message
          );

          return;
        }


        entry.fileName =
          file.name;

        entry.fileType =
          file.type;

        entry.fileSize =
          file.size;


        try {

          entry.fileData =
            await readFileAsDataURL(
              file
            );

        } catch (
          error
        ) {

          console.error(
            error
          );

          alert(
            "Unable to read file."
          );

          return;
        }
      }
    }


    /* ========================================================
       SAVE
       ======================================================== */

    if (!data[type]) {

      data[type] = [];
    }


    data[type].push(
      entry
    );


    save();

    closeForm();
  };


/* ============================================================
   24. ROUTING
   ============================================================ */

function route() {

  const hash =
    location.hash
      .replace("#", "") ||
    "home";


  const pageExists =
    document.getElementById(
      hash
    );


  const activePage =
    pageExists
      ? hash
      : "home";


  $$(".page")
    .forEach(
      page =>
        page.classList.toggle(
          "active-page",
          page.id === activePage
        )
    );


  $$(".nav-link")
    .forEach(
      nav =>
        nav.classList.toggle(
          "active",
          nav.dataset.page ===
          activePage
        )
    );


  $("#pageLabel")
    .textContent =
      (
        activePage === "home"
          ? "overview"
          : activePage
      )
      .replace("-", " ")
      .toUpperCase();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


window.addEventListener(
  "hashchange",
  route
);


/* ============================================================
   25. SEARCH / FILTER
   ============================================================ */

if ($("#progressSearch")) {

  $("#progressSearch")
    .oninput =
    renderProgress;
}


if ($("#progressFilter")) {

  $("#progressFilter")
    .onchange =
    renderProgress;
}


/* ============================================================
   26. THEME
   ============================================================ */

$("#themeBtn").onclick =
  () => {

    const dark =
      document.documentElement
        .dataset
        .theme ===
      "dark";


    document.documentElement
      .dataset
      .theme =
      dark
        ? ""
        : "dark";


    localStorage.setItem(
      "academicTheme",
      dark
        ? "light"
        : "dark"
    );
  };


if (
  localStorage.getItem(
    "academicTheme"
  ) === "dark"
) {

  document.documentElement
    .dataset
    .theme =
    "dark";
}


/* ============================================================
   27. MOBILE MENU
   ============================================================ */

$("#menuBtn").onclick =
  () =>
    $(".sidebar")
      .classList
      .toggle("open");


$$(".nav-link")
  .forEach(
    nav => {

      nav.onclick =
        () =>
          $(".sidebar")
            .classList
            .remove("open");

    }
  );


/* ============================================================
   28. EXPORT RESEARCH DATA
   ============================================================ */

$("#exportBtn").onclick =
  () => {

    const blob =
      new Blob(
        [
          JSON.stringify(
            data,
            null,
            2
          )
        ],
        {
          type:
            "application/json"
        }
      );


    const url =
      URL.createObjectURL(
        blob
      );


    const a =
      document.createElement(
        "a"
      );


    a.href = url;

    a.download =
      "academic-research-data.json";


    document.body.appendChild(a);

    a.click();

    a.remove();


    URL.revokeObjectURL(
      url
    );
  };


/* ============================================================
   29. INITIAL RENDER
   ============================================================ */

render();

route();
