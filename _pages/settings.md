---
layout: single
classes: wide
author_profile: true
permalink: /settings/
---

<div class="container mt-5">
    <h1 class="mb-4">Dictionary Settings</h1>
    <div class="row">
        <div class="col-md-8 col-lg-6">
            <form id="settingsForm">
                <div class="form-floating">
                    <input type="password" class="form-control" id="apiKey" placeholder="API Key">
                    <label for="apiKey">OpenAI API Key</label>
                </div>
                <div class="form-floating">
                    <input type="url" class="form-control" id="endpoint" placeholder="API Endpoint">
                    <label for="endpoint">OpenAI API Endpoint</label>
                </div>
                <div class="mt-4">
                    <button type="submit" class="btn btn-primary">Save Settings</button>
                    <button type="button" class="btn btn-secondary ms-2" id="testConnection">Test
                        Connection</button>
                    <a href="dictionary.html" class="btn btn-outline-primary ms-2">Go to Dictionary</a>
                </div>
            </form>
            <div class="mt-4">
                <h5>Current Settings:</h5>
                <pre id="currentSettings" class="bg-light p-3 rounded"></pre>
            </div>
        </div>
    </div>
</div>

<!-- Alert for notifications -->
<div class="alert" role="alert"></div>

<script src="{{ '/assets/js/settings.js' | relative_url }}"></script>