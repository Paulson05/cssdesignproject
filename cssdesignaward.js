var hambuger = document.getElementById("hambuger-toggle");
var navmenu =  document.getElementById("nav-menu");
hambuger.addEventListener("click", function () {
    hambuger.classList.toggle("change");
    navmenu.classList.toggle("nav-toggle");
})