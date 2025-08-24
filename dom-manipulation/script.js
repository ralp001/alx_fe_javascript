// Global quotes array
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    } else {
        // Fallback quotes if local storage is empty
        quotes = [
            { text: "The only way to do great work is to love what you do.", category: "Work" },
            { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Inspiration" }
        ];
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote from the array
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Clear previous content
    quoteDisplay.innerHTML = '';

    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `- ${quote.category}`;
    quoteCategory.style.fontStyle = 'italic';
    quoteCategory.style.marginTop = '5px';

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);

    // Optional: Use session storage to remember the last viewed quote
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to add a new quote from the user input
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes(); // Save the updated quotes array

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Function to export quotes as a JSON file
function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            // Check if the imported data is an array of objects
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
                showRandomQuote();
            } else {
                alert('Invalid JSON file format. Please upload a file with an array of quote objects.');
            }
        } catch (error) {
            alert('An error occurred while parsing the JSON file. Please ensure the file is valid.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener to run functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load quotes when the page starts
    showRandomQuote(); // Display an initial quote
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);

    // Optional: display the last viewed quote from session storage
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        // You could add logic here to display the last quote
    }
});