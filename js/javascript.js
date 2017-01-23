var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');

  }
  else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');

  }

});


var buyLink = document.querySelector(".product-of-week__order");
var overlay = document.querySelector(".modal-overlay");
var modal = document.querySelector(".add-basket");

buyLink.addEventListener("click", function (e) {
  e.preventDefault(),
    modal.classList.add("add-basket--show"),
    overlay.classList.add("modal-overlay--show")

}),

  overlay.addEventListener("click", function (e) {
    e.preventDefault(),
      modal.classList.remove("add-basket--show"),
      overlay.classList.remove("modal-overlay--show")

  });
