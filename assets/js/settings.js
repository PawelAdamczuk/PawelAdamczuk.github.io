const hostname = 'paweladamczuk.com';
const groupId = 'OpenAiEndpoint';
const settingsPrefix = `${hostname}.${groupId}`;

// Function to show notification
function showNotification(message, type = 'success') {
    const alert = document.querySelector('.alert');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
    alert.style.display = 'block';

    // Auto-hide after 3 seconds
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}

// Function to load and display current settings
function displayCurrentSettings() {
    const settings = {
        apiKey: localStorage.getItem(`${settingsPrefix}.apiKey`),
        endpoint: localStorage.getItem(`${settingsPrefix}.endpoint`)
    };

    // Show masked API key if it exists
    if (settings.apiKey) {
        settings.apiKey = '*'.repeat(settings.apiKey.length);
    }

    document.getElementById('currentSettings').textContent =
        JSON.stringify(settings, null, 2);

    // Pre-fill the form if settings exist
    if (settings.endpoint) {
        document.getElementById('endpoint').value = settings.endpoint;
    }
}

// Handle form submission
document.getElementById('settingsForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const apiKey = document.getElementById('apiKey').value.trim();
    const endpoint = document.getElementById('endpoint').value.trim();

    if (apiKey) {
        localStorage.setItem(`${settingsPrefix}.apiKey`, apiKey);
    }
    if (endpoint) {
        localStorage.setItem(`${settingsPrefix}.endpoint`, endpoint);
    }

    showNotification('Settings saved successfully!');
    displayCurrentSettings();

    // Clear the API key field for security
    document.getElementById('apiKey').value = '';
});

// Test connection
document.getElementById('testConnection').addEventListener('click', async function () {
    const apiKey = localStorage.getItem(`${settingsPrefix}.apiKey`);
    const endpoint = localStorage.getItem(`${settingsPrefix}.endpoint`);

    if (!apiKey || !endpoint) {
        showNotification('Please save your API settings first', 'warning');
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'user', content: 'Say "Connection successful!"' }
                ],
                max_tokens: 10
            })
        });

        if (response.ok) {
            showNotification('Connection test successful!', 'success');
        } else {
            const error = await response.json();
            showNotification(`Connection test failed: ${error.error?.message || 'Unknown error'}`, 'danger');
        }
    } catch (error) {
        showNotification(`Connection test failed: ${error.message}`, 'danger');
    }
});

// Load current settings on page load
displayCurrentSettings();