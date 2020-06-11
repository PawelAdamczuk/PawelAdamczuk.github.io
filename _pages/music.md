---
permalink: /music/
title: "Music I like"
---

<iframe src="https://open.spotify.com/embed/playlist/6b7gDxiAIdsFrwuPTckNgB" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

<button class="accordion">Section 1</button>
<div class="panel">
    <iframe src="https://open.spotify.com/embed/playlist/6b7gDxiAIdsFrwuPTckNgB" width="100%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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
