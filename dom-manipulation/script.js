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

    // Create and append the quote text
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${quote.text}"`;
    quoteDisplay.appendChild(quoteText);

    // Create and append the category
    const quoteCategory = document.createElement('p');
    quoteCategory.textContent = `- ${quote.category}`;
    quoteCategory.style.fontStyle = 'italic';
    quoteCategory.style.marginTop = '5px';
    quoteDisplay.appendChild(quoteCategory);
}

// Function to dynamically create the quote addition form
function createAddQuoteForm() {
    // Select the button to place the form after it
    const newQuoteButton = document.getElementById('newQuote');

    // Create the form container div
    const formDiv = document.createElement('div');
    formDiv.style.marginTop = '20px';

    // Create the input fields and button
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote; // Attach the onclick event handler

    // Append elements to the form container
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);

    // Insert the entire form container into the DOM after the button
    newQuoteButton.parentNode.insertBefore(formDiv, newQuoteButton.nextSibling);
}

// Function to add a new quote to the quotes array
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };

        quotes.push(newQuote);

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.");
    }
}

// Event listener to run functions when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial display of a random quote
    showRandomQuote();

    // Dynamically create the quote addition form
    createAddQuoteForm();
    
    // Attach event listener to the "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
});