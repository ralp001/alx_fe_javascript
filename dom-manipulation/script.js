// Array to store quote objects
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Work" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Innovation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Inspiration" }
];

// Function to display a random quote from the array
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Clear previous content to avoid stacking quotes
    quoteDisplay.innerHTML = '';

    // Create a new paragraph element for the quote text and its category
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `- ${quote.category}`;
    quoteCategory.style.fontStyle = 'italic';
    quoteCategory.style.marginTop = '5px';

    // Append the new elements to the display container
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote from the user input
function addQuote() {
    // Get values from the input fields and remove whitespace
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    // Check if both fields are filled
    if (newQuoteText && newQuoteCategory) {
        // Create a new quote object
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };

        // Add the new quote to the array
        quotes.push(newQuote);

        // Clear the input fields for the next entry
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Display a success message
        alert("Quote added successfully!");
    } else {
        // Alert the user if a field is empty
        alert("Please enter both a quote and a category.");
    }
}

// Add an event listener to the "Show New Quote" button
document.addEventListener('DOMContentLoaded', () => {
    // Show an initial quote when the page loads
    showRandomQuote();

    // Attach the event listener to the button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});