// script.js

let selectedMood = null;

// Handle mood selection
const moods = document.querySelectorAll(".mood");
moods.forEach(mood => {
  mood.addEventListener("click", () => {
    moods.forEach(m => m.classList.remove("selected")); // remove others
    mood.classList.add("selected");
    selectedMood = mood.getAttribute("data-mood");
  });
});

// Save mood and journal
document.getElementById("saveBtn").addEventListener("click", () => {
  const journalText = document.getElementById("journal").value.trim();
  const statusMsg = document.getElementById("statusMsg");

  if (!selectedMood || journalText === "") {
    statusMsg.textContent = "Please select a mood and write your thoughts!";
    return;
  }

  const entry = {
    mood: selectedMood,
    journal: journalText,
    date: new Date().toLocaleString()
  };

  const key = "moodEntry_" + Date.now();
  localStorage.setItem(key, JSON.stringify(entry));

  // Reset UI
  document.getElementById("journal").value = "";
  moods.forEach(m => m.classList.remove("selected"));
  selectedMood = null;
  statusMsg.textContent = "🌟 Mood saved successfully!";

  displaySavedEntries(); // Refresh display
});

// Show saved entries from localStorage
function displaySavedEntries() {
  const savedEntriesDiv = document.getElementById("savedEntries");
  savedEntriesDiv.innerHTML = "<h3>📒 Your Past Entries</h3>";

  const entries = Object.keys(localStorage)
    .filter(key => key.startsWith("moodEntry_"))
    .sort((a, b) => b.localeCompare(a)); // newest first

  if (entries.length === 0) {
    savedEntriesDiv.innerHTML += "<p style='text-align:center;'>No entries saved yet.</p>";
    return;
  }

  entries.forEach(key => {
    const entry = JSON.parse(localStorage.getItem(key));
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${entry.mood}</strong> - <em>${entry.date}</em><br>${entry.journal}`;
    savedEntriesDiv.appendChild(div);
  });
}

// On page load
window.addEventListener("DOMContentLoaded", displaySavedEntries);
