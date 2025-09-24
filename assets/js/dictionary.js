// Function to focus input and open keyboard
function focusAndOpenKeyboard() {
    const searchInput = document.getElementById('searchInput');

    // Special handling for iOS Safari
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Create a temporary button and click it to enable user interaction
        const tempButton = document.createElement('button');
        tempButton.style.position = 'fixed';
        tempButton.style.top = '0';
        tempButton.style.left = '0';
        tempButton.style.opacity = '0';
        document.body.appendChild(tempButton);

        tempButton.addEventListener('click', function () {
            searchInput.focus();
            // Add a slight delay for iOS
            setTimeout(() => {
                searchInput.click();
                // Remove the temporary button
                document.body.removeChild(tempButton);
            }, 100);
        });

        tempButton.click();
    } else {
        searchInput.focus();
        // For Android
        if (/Android/.test(navigator.userAgent)) {
            searchInput.blur();
            searchInput.focus();
        }
    }
}

// Focus input when page loads and after a small delay
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure DOM is fully ready
    setTimeout(focusAndOpenKeyboard, 300);
});

// Also focus when visibility changes (e.g., when user switches back to the tab)
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        setTimeout(focusAndOpenKeyboard, 300);
    }
});

// Check URL parameters and save to localStorage if present
function saveConfigFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const endpoint = urlParams.get('endpoint');

    if (key && endpoint) {
        const hostname = 'paweladamczuk.com';
        const groupId = 'OpenAiEndpoint';
        localStorage.setItem(`${hostname}.${groupId}.apiKey`, key);
        localStorage.setItem(`${hostname}.${groupId}.endpoint`, endpoint);

        // Remove parameters from URL without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
        return true;
    }
    return false;
}

// Try to save config from URL and reload if successful
if (saveConfigFromUrl()) {
    location.reload();
}

// Load system prompt
let systemPrompt;
fetch('assets/dictionary-prompt.txt')
    .then(response => response.text())
    .then(text => {
        systemPrompt = text;
    })
    .catch(error => console.error('Error loading system prompt:', error));

// Get DOM elements first
const configError = document.getElementById('configError');
const searchContainer = document.getElementById('searchContainer');
const responseContainer = document.getElementById('responseContainer');
const searchInput = document.getElementById('searchInput');
const responseBox = document.getElementById('responseBox');
const spinner = document.getElementById('spinner');
const responseText = document.getElementById('responseText');

// Get API configuration from LocalStorage
const hostname = 'paweladamczuk.com';
const groupId = 'OpenAiEndpoint';
const apiKey = localStorage.getItem(`${hostname}.${groupId}.apiKey`);
const apiEndpoint = localStorage.getItem(`${hostname}.${groupId}.endpoint`);

function checkConfiguration() {
    if (!apiKey || !apiEndpoint) {
        searchContainer.classList.add('hidden');
        responseContainer.classList.add('hidden');
        configError.classList.remove('hidden');
        return false;
    }
    configError.classList.add('hidden');
    searchContainer.classList.remove('hidden');
    return true;
}

// Initial configuration check
checkConfiguration();

// Handle enter key press
searchInput.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();

        if (!checkConfiguration()) {
            return;
        }

        if (query) {
            // Hide search, show response with spinner
            searchContainer.classList.add('hidden');
            responseContainer.classList.remove('hidden');
            responseText.textContent = ''; // Clear previous response
            spinner.classList.remove('hidden');
            responseText.classList.add('hidden');

            try {
                console.log('Making request to:', apiEndpoint);
                const response = await fetch(apiEndpoint + '/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                        'HTTP-Referer': 'https://paweladamczuk.com',
                        'X-Title': 'Dictionary Assistant'
                    },
                    body: JSON.stringify({
                        model: 'meta-llama/llama-4-scout',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: `Define and explain the word or phrase: ${query}` }
                        ],
                        temperature: 0.7
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error?.message || 'API request failed');
                }

                // Hide spinner and display the response with markdown
                spinner.classList.add('hidden');
                responseText.innerHTML = marked.parse(data.choices[0].message.content);
                responseText.classList.remove('hidden');
                responseText.classList.add('fade-in');

            } catch (error) {
                console.error('Error:', error);
                if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                    spinner.classList.add('hidden');
                    responseText.innerHTML = '<p class="text-danger">Connection error. Please check if the API endpoint is correct and accessible.</p>';
                    responseText.classList.remove('hidden');
                } else {
                    spinner.classList.add('hidden');
                    responseText.innerHTML = `<p class="text-danger">An error occurred while fetching the response: ${error.message}</p>`;
                    responseText.classList.remove('hidden');
                }
            }
        }
    }
});

// Double click anywhere to show search input again
document.addEventListener('dblclick', function () {
    searchContainer.classList.remove('hidden');
    responseContainer.classList.add('hidden');
    searchInput.value = '';
    searchInput.focus();
});