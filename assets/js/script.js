// ============================== //
// = FLASHCARD GENERATOR SCRIPT = //
// ============================== //

document.addEventListener('DOMContentLoaded', () => {
    
    // Grab references to DOM elements by their IDs
    const wordInput = document.getElementById('word-input');
    const pronunciationInput = document.getElementById('pronunciation-input');
    const typeInput = document.getElementById('type-input');
    const meaningInput = document.getElementById('definition-input');
    const downloadBtn = document.getElementById('download-btn');
    const wordPreview = document.getElementById('word-preview');
    const pronunciationPreview = document.getElementById('pronunciation-preview');
    const typePreview = document.getElementById('type-preview');
    const meaningPreview = document.getElementById('definition-preview');
    const flashcardPreview = document.getElementById('flashcard-preview');

    // Default values for placeholders when inputs are empty
    const defaults = {
        word: "Word",
        pronunciation: "/pronunciation/",
        type: "noun",
        meaning: "The meaning of the word will appear here.",
    };

    // Sanitize user input to prevent HTML injection
    function sanitize(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // ----------------------------
    // - Update Flashcard Preview -
    // ----------------------------
    // This function updates the live flashcard preview
    // whenever the user types or changes input values.
    function updatePreview() {
        
        // Word: show typed word or fallback default
        wordPreview.textContent = wordInput.value.trim() || defaults.word;

        // Pronunciation: wrap in slashes if typed, otherwise show default
        pronunciationPreview.textContent = pronunciationInput.value.trim() ? `/${pronunciationInput.value.trim()}/` : defaults.pronunciation;
        
        // Word type always comes from the dropdown
        typePreview.textContent = typeInput.value;

        // Definition: sanitize, allow **bold** markdown syntax
        const meaning = sanitize(meaningInput.value.trim())
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
        
        // Render sanitized + formatted meaning, or fallback default
        meaningPreview.innerHTML = meaning || defaults.meaning;
    }

    // ----------------------------
    // - Bold Shortcut Handler    -
    // ----------------------------
    // Adds support for Ctrl+B / Cmd+B in the definition input.
    // Wraps the selected text with **bold markdown** automatically.
    function handleBoldShortcut(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            const start = meaningInput.selectionStart;              // Cursor selection start
            const end = meaningInput.selectionEnd;                  // Cursor selection end
            const text = meaningInput.value.substring(start, end);
            
            if (text) {
                // Replace selection with bold markdown
                meaningInput.setRangeText(`**${text}**`, start, end, 'end');
                updatePreview();
            }
        }
    }

    // ----------------------------
    // - Download Flashcard       -
    // ----------------------------
    // Captures the flashcard preview as an image and downloads it.
    function downloadFlashcard() {
        html2canvas(flashcardPreview, {
            // Keep same background color
            backgroundColor: getComputedStyle(flashcardPreview).backgroundColor,
            
            // Render at higher resolution for better quality
            scale: 2
        }).then(canvas => {
            const link = document.createElement('a');
            
            // Generate safe filename from word (lowercase, no special chars)
            const safeName = (wordInput.value.trim() || 'flashcard').toLowerCase().replace(/[^a-z0-9\-]/g, '-');
            link.download = `${safeName}.png`;              // Filename
            link.href = canvas.toDataURL('image/png');      // Image data
            link.click();                                   // Trigger download
        });
    }

    // Attach event listeners
    [wordInput, pronunciationInput, typeInput, meaningInput].forEach(el =>
    el.addEventListener('input', updatePreview)             // Update preview on typing
    );
    meaningInput.addEventListener('keydown', handleBoldShortcut);   // Bold shortcut
    downloadBtn.addEventListener('click', downloadFlashcard);       // Download button

    // Initialize preview once on page load with defaults
    updatePreview();
    
});

// ============================== //
// =     LIGHT MODE TOGGLE      = //
// ============================== //

// Theme toggle 
const toggle = document.getElementById("theme-toggle");

// Check system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Load saved theme or system theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
    toggle.checked = true;
} else {
    document.documentElement.classList.remove("dark");
    toggle.checked = false;
}

// Toggle switch listener
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});

// Auto-switch when system theme changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
        // System switched to dark
        document.documentElement.classList.add("dark");
        toggle.checked = true;
    } else {
        // System switched to light
        document.documentElement.classList.remove("dark");
        toggle.checked = false;
    }
});