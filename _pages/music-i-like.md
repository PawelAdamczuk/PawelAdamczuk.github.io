---
permalink: /music-i-like/
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

.frame {
    transition: height 0.4s ease;
    display: block;
    border: none;
}
</style>

<div markdown = "0">
    <button class="accordion" data-spotify-id="6WupKwtecAV11l4ZSJCG4t">D I S C O V E R 1</button>
    <button class="accordion" data-spotify-id="7qLA3m9AkgkVEvTDRDgjcM">D I S C O V E R 2</button>
    <button class="accordion" data-spotify-id="5Y0mxuNoPu2BWa6Pf99H6I">D I S C O V E R 3</button>
    <button class="accordion" data-spotify-id="6b7gDxiAIdsFrwuPTckNgB">D I S C O V E R 4</button>
    <button class="accordion" data-spotify-id="2On2vU910wFGfuq5LtIJVc">Lost & Found 1</button>
    <button class="accordion" data-spotify-id="54c5g95Ffy5yRwRU7PdoY5">Lost & Found 2</button>
    <button class="accordion" data-spotify-id="0aQ9uPzbUFtpGs9Uqp1ONy">Lost & Found 3</button>
</div>

<script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        if(this.classList.contains("active")) {
            var ifrm = document.createElement("iframe");
            ifrm.classList.add("frame")
            ifrm.setAttribute("src", `https://open.spotify.com/embed/playlist/${this.attributes["data-spotify-id"].value}`);
            ifrm.style.width = "100%";
            ifrm.style.height = "0px";
            this.after(ifrm);
            ifrm.onload = function() {this.style.height = "500px";}
        } else {
            var ifrm = this.nextElementSibling;
            ifrm.style.height = "0px";
            setTimeout(function() { ifrm.remove(); }, 400);
        }

        
        // var panel = this.nextElementSibling;
        // if (panel.style.maxHeight) {
        //     panel.style.maxHeight = null;
        // } else {
        //     panel.style.maxHeight = panel.scrollHeight + "px";
        // } 
    });
}
</script>
