/* =============================================================
   ROMANTIC BIRTHDAY WEBSITE
   The main place to customize your website.
   ============================================================= */

// -------------------------------------------------------------
// 1. PERSONAL DETAILS — CHANGE THESE
// -------------------------------------------------------------
const BIRTHDAY_PERSON_NAME = "Mercy ❤️";
const YOUR_NAME = "Ademola";

// Use this format: YYYY-MM-DDTHH:MM:SS
// Example: "2024-02-14T19:30:00"
const LOVE_START_DATE = "2024-11-14T19:30:00";

// Add your own MP3 file inside a folder called "music".
// For example: music/our-song.mp3
// Leave this empty ("") if you do not want music on the site.
const MUSIC_FILE = "08 - Tenerife Sea - (SongsLover.com).mp3";

// -------------------------------------------------------------
// 2. TIMELINE — EDIT, ADD, OR REMOVE MOMENTS
// -------------------------------------------------------------
const timelineMoments = [
  {
    date: "The day we met",
    title: "The beginning",
    text: "A simple hello that quietly changed everything."
  },
  {
    date: "Our first date",
    title: "The spark",
    text: "The kind of conversation that made time disappear."
  },
  {
    date: "Favourite adventures",
    title: "Making memories",
    text: "New places, unexpected detours, and plenty of laughter along the way."
  },
  {
    date: "Funny memories",
    title: "Our inside jokes",
    text: "The little moments no one else would understand — but we always do."
  },
  {
    date: "Today",
    title: "Celebrating you",
    text: "A whole day devoted to the wonderful person you are."
  }
];

// -------------------------------------------------------------
// 3. REASONS — CHANGE THESE TO MAKE THEM PERSONAL
// -------------------------------------------------------------
const reasons = [
  "Your smile",
  "Your kindness",
  "Your laugh",
  "Your strength",
  "Your intelligence",
  "The way you care for everyone",
  "The way you make me feel at home",
  "Your courage",
  "Your beautiful heart",
  "Your sense of humour",
  "The dreams you chase",
  "The way you are completely you"
];

// -------------------------------------------------------------
// 4. SURPRISE MESSAGE — CHANGE THIS IF YOU WISH
// -------------------------------------------------------------
const surpriseMessage = "Thank you for being exactly who you are. Here’s to another year of laughter, adventures, and choosing each other in all the little ways that matter.";

// -------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------
const $ = (selector) => document.querySelector(selector);

function setPersonalText() {
  $("#birthday-name").textContent = BIRTHDAY_PERSON_NAME;
  $("#letter-name").textContent = BIRTHDAY_PERSON_NAME;
  $("#your-name").textContent = YOUR_NAME;
  $("#surprise-message").textContent = surpriseMessage;
}

function buildTimeline() {
  const timeline = $("#timeline");
  timeline.innerHTML = timelineMoments.map((moment) => `
    <article class="timeline-item reveal">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-card">
        <time>${moment.date}</time>
        <h3>${moment.title}</h3>
        <p>${moment.text}</p>
      </div>
    </article>
  `).join("");
}

function buildReasons() {
  const icons = ["♥", "✦", "♡", "✧"];
  const grid = $("#reasons-grid");

  grid.innerHTML = reasons.map((reason, index) => `
    <article class="reason-card reveal" style="--delay:${(index % 6) * 0.18}s">
      <span class="reason-icon" aria-hidden="true">${icons[index % icons.length]}</span>
      <p>${reason}</p>
    </article>
  `).join("");
}

function startLoveCounter() {
  const startDate = new Date(LOVE_START_DATE).getTime();

  const update = () => {
    const now = Date.now();
    let difference = now - startDate;

    if (Number.isNaN(startDate) || difference < 0) difference = 0;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    $("#days").textContent = Math.floor(difference / day);
    $("#hours").textContent = Math.floor((difference % day) / hour);
    $("#minutes").textContent = Math.floor((difference % hour) / minute);
    $("#seconds").textContent = Math.floor((difference % minute) / second);
  };

  update();
  setInterval(update, 1000);
}

function setUpScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function createAmbientHearts() {
  const holder = $("#ambient-hearts");
  const heartCount = window.innerWidth < 700 ? 14 : 23;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "ambient-heart";
    heart.textContent = i % 4 === 0 ? "✦" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * -12}s`;
    heart.style.setProperty("--duration", `${8 + Math.random() * 9}s`);
    heart.style.setProperty("--size", `${.75 + Math.random() * 1.1}rem`);
    holder.appendChild(heart);
  }
}

function setUpLightbox() {
  const dialog = $("#lightbox");
  const image = $("#lightbox-image");
  const caption = $("#lightbox-caption");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      image.src = item.dataset.image;
      image.alt = item.querySelector("img").alt;
      caption.textContent = item.dataset.caption || "";
      dialog.showModal();
    });
  });

  $("#lightbox-close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    const figure = dialog.querySelector("figure");
    const clickedInsideFigure = figure.contains(event.target);
    if (!clickedInsideFigure) dialog.close();
  });
}

function setUpMusic() {
  const audio = $("#birthday-music");
  const button = $("#music-button");
  const status = $("#music-status");

  if (!MUSIC_FILE) {
    status.textContent = "Add your song in script.js";
    button.disabled = true;
    button.style.opacity = ".55";
    button.style.cursor = "not-allowed";
    return;
  }

  audio.src = MUSIC_FILE;

  button.addEventListener("click", async () => {
    try {
      if (audio.paused) {
        await audio.play();
        button.textContent = "❚❚";
        button.setAttribute("aria-label", "Pause music");
        status.textContent = "Now playing";
      } else {
        audio.pause();
        button.textContent = "♫";
        button.setAttribute("aria-label", "Play music");
        status.textContent = "Paused";
      }
    } catch (error) {
      status.textContent = "Browser blocked playback";
    }
  });
}

function setUpSurprise() {
  const button = $("#surprise-button");
  const message = $("#hidden-message");

  button.addEventListener("click", () => {
    message.classList.add("show");
    button.textContent = "Surprise unlocked ♥";
    button.disabled = true;
    createHeartBurst();
    createConfetti();
  });
}

function createHeartBurst() {
  const heartCount = 44;

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = i % 4 === 0 ? "✦" : "♥";

    const angle = (Math.PI * 2 * i) / heartCount;
    const distance = 90 + Math.random() * 300;

    heart.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    heart.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    heart.style.setProperty("--rotate", `${Math.random() * 420 - 210}deg`);
    heart.style.setProperty("--heart-size", `${.8 + Math.random() * 1.5}rem`);

    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

function createConfetti() {
  const colours = ["#f8c5d6", "#d7c8f3", "#d3aa5b", "#ed8eae", "#8c5eaa"];
  const count = 115;

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";

    piece.style.setProperty("--colour", colours[i % colours.length]);
    piece.style.setProperty("--start-x", `${Math.random() * 100 - 50}vw`);
    piece.style.setProperty("--start-y", `${Math.random() * 25 - 20}vh`);
    piece.style.setProperty("--end-x", `${Math.random() * 150 - 75}vw`);
    piece.style.setProperty("--end-y", `${Math.random() * 30}px`);
    piece.style.setProperty("--spin", `${Math.random() * 900 - 450}deg`);

    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function setUpThemeToggle() {
  const themeToggle = $("#theme-toggle");
  const savedTheme = localStorage.getItem("birthday-site-theme");

  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "birthday-site-theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });
}

function setUpBackToTop() {
  const button = $("#back-to-top");

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 650);
  }, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setUpCursorHeart() {
  const cursorHeart = $(".cursor-heart");

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    cursorHeart.style.left = `${event.clientX}px`;
    cursorHeart.style.top = `${event.clientY}px`;
    cursorHeart.classList.add("visible");
  });

  window.addEventListener("pointerleave", () => cursorHeart.classList.remove("visible"));
}

function setUpScrollButton() {
  $("#scroll-button").addEventListener("click", () => {
    $("#letter").scrollIntoView({ behavior: "smooth" });
  });
}

// -------------------------------------------------------------
// START WEBSITE
// -------------------------------------------------------------
setPersonalText();
buildTimeline();
buildReasons();
startLoveCounter();
createAmbientHearts();
setUpScrollReveal();
setUpLightbox();
setUpMusic();
setUpSurprise();
setUpThemeToggle();
setUpBackToTop();
setUpCursorHeart();
setUpScrollButton();
