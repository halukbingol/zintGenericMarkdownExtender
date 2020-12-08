const zint_show_hide = function () {
    let elActive = event.currentTarget;
    let nextDiv = elActive.nextElementSibling;
    nextDiv.classList.toggle("zint-content-hidden");
}