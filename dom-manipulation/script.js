// Global quotes array
let quotes = [];

// Simulate a server URL (JSONPlaceholder)
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10';

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

// Function to display a random quote from the filtered array
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const filteredQuotes = getFilteredQuotes();

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p>No quotes found for this category.</p>';
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

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

// Function to dynamically populate the category filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Clear previous categories, but keep "All Categories"
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];
    
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore the last selected filter from local storage
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

// Function to filter and display quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save the selected filter to local storage
    localStorage.setItem('lastFilter', selectedCategory);
    
    // Display a new random quote from the filtered list
    showRandomQuote();
}

// Helper function to get the quotes based on the current filter
function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem('lastFilter') || 'all';
    
    if (selectedCategory === 'all') {
        return quotes;
    } else {
        return quotes.filter(quote => quote.category === selectedCategory);
    }
}

// Function to add a new quote from the user input
async function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        
        // Simulate posting the new quote to the server
        await postQuoteToServer(newQuote);

        quotes.push(newQuote);
        saveQuotes(); // Save the updated quotes array
        populateCategories(); // Update the categories dropdown

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added successfully and synced!");
        showRandomQuote(); // Display a new quote from the updated list
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
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                populateCategories();
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

// Simulates fetching data from a server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const serverData = await response.json();
        
        // Transform the mock API data into the quote format
        return serverData.map(post => ({
            text: post.title,
            category: 'Server Sync'
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Simulates posting data to a server
async function postQuoteToServer(quote) {
    console.log('Simulating POST request to server with new quote:', quote);
    // You would typically use a real POST request here, e.g., using fetch:
    /*
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quote),
      });
      const data = await response.json();
      console.log('Post successful:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
    */
}

// Function to sync local and server data with conflict resolution
async function syncQuotes() {
    const syncStatus = document.getElementById('syncStatus');
    syncStatus.textContent = 'Syncing...';
    
    const serverQuotes = await fetchQuotesFromServer();
    
    // Simple conflict resolution: server data takes precedence.
    // We'll merge new quotes from the server into our local array.
    let newQuotesAdded = 0;
    serverQuotes.forEach(serverQuote => {
        // Check if the server quote already exists locally
        const isDuplicate = quotes.some(localQuote => localQuote.text === serverQuote.text && localQuote.category === serverQuote.category);
        if (!isDuplicate) {
            quotes.push(serverQuote);
            newQuotesAdded++;
        }
    });
    
    if (newQuotesAdded > 0) {
        saveQuotes();
        populateCategories();
        syncStatus.textContent = `Quotes synced with server! Added ${newQuotesAdded} new quotes.`;
        showRandomQuote();
    } else {
        syncStatus.textContent = 'Quotes synced with server!';
    }
}

// Event listener to run functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load quotes when the page starts
    populateCategories(); // Populate the category filter
    showRandomQuote(); // Display an initial quote
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    
    // Periodically check for new quotes from the server
    setInterval(syncQuotes, 60000); // Sync every 60 seconds
});