const missions = [
  {
    "question": "Which backend check is probably broken?",
    "snippet": "if (email_exists(email)) block_signup();",
    "choices": [
      "It ignores account status",
      "It hashes passwords too slowly",
      "It blocks HTTPS",
      "It validates DNS"
    ],
    "answer": "It ignores account status",
    "hint": "Deleted and active accounts should not always be treated the same."
  },
  {
    "question": "What is the main user impact?",
    "snippet": "deleted account -> email still registered",
    "choices": [
      "Email reuse is blocked",
      "Database encryption improves",
      "DNS cache expires",
      "Images load faster"
    ],
    "answer": "Email reuse is blocked",
    "hint": "The account is gone, but the email remains claimed."
  },
  {
    "question": "Which fix is safest?",
    "snippet": "email table: email, status, deleted_at",
    "choices": [
      "Check active status before blocking reuse",
      "Remove all email validation",
      "Accept duplicate active emails",
      "Disable account deletion"
    ],
    "answer": "Check active status before blocking reuse",
    "hint": "Lifecycle-aware validation is the key."
  }
];
const flag = "FLAG{DELETED_USERS_SHOULD_NOT_KEEP_EMAILS_LOCKED}";
let index = 0;
let score = 0;
let lives = 3;
let answered = false;

const ui = {
  terminal: document.querySelector("#terminal-code"),
  score: document.querySelector("#score"),
  lives: document.querySelector("#lives"),
  mission: document.querySelector("#mission"),
  question: document.querySelector("#question"),
  snippet: document.querySelector("#snippet"),
  choices: document.querySelector("#choices"),
  hint: document.querySelector("#hint"),
  next: document.querySelector("#next"),
  feedback: document.querySelector("#feedback"),
  flag: document.querySelector("#flag")
};

function updateHud() {
  ui.score.textContent = score;
  ui.lives.textContent = lives;
  ui.mission.textContent = Math.min(index + 1, missions.length);
}

function render() {
  const mission = missions[index];
  answered = false;
  ui.terminal.textContent = mission.snippet;
  ui.question.textContent = mission.question;
  ui.snippet.textContent = mission.snippet;
  ui.feedback.textContent = "";
  ui.next.disabled = true;
  ui.choices.innerHTML = "";

  mission.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answer(choice, button));
    ui.choices.appendChild(button);
  });

  updateHud();
}

function answer(choice, selected) {
  if (answered) return;
  answered = true;
  const mission = missions[index];
  const buttons = [...document.querySelectorAll(".choice")];
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === mission.answer) button.classList.add("correct");
  });

  if (choice === mission.answer) {
    selected.classList.add("correct");
    score += 10;
    ui.feedback.textContent = "Correct. Keep going.";
  } else {
    selected.classList.add("wrong");
    lives = Math.max(0, lives - 1);
    ui.feedback.textContent = "Not quite. " + mission.hint;
  }

  if (index === missions.length - 1 && score >= missions.length * 10) {
    ui.flag.textContent = flag;
    ui.flag.classList.remove("hidden");
    ui.feedback.textContent = "CTF complete. Flag unlocked.";
  }

  if (lives === 0) {
    ui.feedback.textContent = "Game over. Restart and review the report.";
    ui.next.textContent = "Restart";
  }

  ui.next.disabled = false;
  updateHud();
}

function next() {
  if (lives === 0 || index === missions.length - 1) {
    index = 0;
    score = 0;
    lives = 3;
    ui.next.textContent = "Next";
    ui.flag.classList.add("hidden");
    render();
    return;
  }
  index += 1;
  ui.next.textContent = index === missions.length - 1 ? "Finish" : "Next";
  render();
}

ui.hint.addEventListener("click", () => {
  ui.feedback.textContent = "Hint: " + missions[index].hint;
});
ui.next.addEventListener("click", next);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

render();
