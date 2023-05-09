$(document).on("click", ".header-nav-hamburger-lines", function () {
  $(".header-nav").toggleClass("open");
  $("body").toggleClass("fixed-position");
});

$(document).on("click", ".header-nav-link", function () {
  $(".header-nav").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".header-nav-button-not-focus", function () {
  $(".header-nav").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".header-nav-button-focus", function () {
  $(".header-nav").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".fa-gear", function () {
  $(".header-nav").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".fa-right-to-bracket", function () {
  $(".header-nav").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("mouseover", ".fa-gear", function () {
  $(".fa-gear").removeClass("close-gear");
  $(".fa-gear").addClass("open-gear");
});

$(document).on("mouseout", ".fa-gear", function () {
  $(".fa-gear").removeClass("open-gear");
  $(".fa-gear").addClass("close-gear");
});

$(document).on("click", ".fa-moon", function () {
  $(".dark-toggler").removeClass("fa-moon");
  $(".dark-toggler").addClass("fa-sun");
  $(document.body).addClass("theme--dark");
  
});

$(document).on("click", ".fa-sun", function () {
  $(".dark-toggler").removeClass("fa-sun");
  $(".dark-toggler").addClass("fa-moon");
  $(document.body).removeClass("theme--dark");
});
