---
permalink: /music/
title: "Music I like"
---

<style>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>

<iframe src="https://open.spotify.com/embed/playlist/6b7gDxiAIdsFrwuPTckNgB" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

<div markdown = "0">
    <button class="accordion" data-spotify-id="6b7gDxiAIdsFrwuPTckNgB">6b7gDxiAIdsFrwuPTckNgB</button>
    <div class="panel">
        <iframe src="https://open.spotify.com/embed/playlist/6b7gDxiAIdsFrwuPTckNgB" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
</div>


<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
</script>
