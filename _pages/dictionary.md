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
            <p>This is an opinionated, LLM-powered dictionary. Type in a word and press enter. Double click the description to restore the input textbox. It's BYOU - bring your own key. Set the key and endpoint in <a href="/settings">settings</a>. If you came here with a link I sent you that contained the key, you can just use my key, it's already configured. This tool is supposed to be used with Openrouter.</p>
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