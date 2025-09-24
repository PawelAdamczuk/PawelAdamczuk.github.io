---
layout: single
classes: wide
author_profile: true
permalink: /dictionary/
---

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

<div class="container mt-5">
    <div id="configError" class="row justify-content-center hidden">
        <div class="col-12">
            <div class="alert alert-warning text-center" role="alert">
                <h4 class="alert-heading mb-3">Configuration Required</h4>
                <p>The dictionary needs to be configured before it can be used.</p>
                <hr>
                <a href="settings.html" class="btn btn-warning">Go to Settings</a>
            </div>
        </div>
    </div>
    <div id="searchContainer" class="row justify-content-center">
        <div class="col-12">
            <input type="text" id="searchInput" class="form-control form-control-lg"
                placeholder="Type a word and press Enter..." autocomplete="off" autofocus>
        </div>
    </div>
    <div id="responseContainer" class="row justify-content-center hidden">
        <div class="col-12">
            <div id="responseBox" class="response-box">
                <div id="spinner" class="spinner hidden">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div id="responseText"></div>
            </div>
        </div>
    </div>
</div>

<script src="{{ '/assets/js/dictionary.js' | relative_url }}"></script>