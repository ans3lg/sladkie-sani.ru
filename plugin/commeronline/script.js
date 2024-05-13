document.addEventListener("DOMContentLoaded", function() {
    var btn_modal_podbor = document.getElementById("modal_podbor");
    var myModal_podbor = document.getElementById("myModal_podbor");
    var close = document.getElementById("close");

    btn_modal_podbor.addEventListener("click", function () {
        myModal_podbor.style.display = "block";
    });

    close.addEventListener("click", function () {
        myModal_podbor.style.display = "none";
    });
});