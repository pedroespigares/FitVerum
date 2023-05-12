window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    $(".dark-toggler").removeClass("fa-moon");
    $(".dark-toggler").addClass("fa-sun");
    $(document.body).addClass("theme--dark");
  } else {
    $(".dark-toggler").removeClass("fa-sun");
    $(".dark-toggler").addClass("fa-moon");
    $(document.body).removeClass("theme--dark");
  }
};

$(document).on("click", ".header-nav-hamburger-lines", function () {
  $(".header-nav").toggleClass("open");
  $("#header-wave").toggleClass("open");
  $("body").toggleClass("fixed-position");
});

$(document).on("click", ".header-nav-link", function () {
  $(".header-nav").removeClass("open");
  $("#header-wave").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".header-nav-button-not-focus", function () {
  $(".header-nav").removeClass("open");
  $("#header-wave").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".header-nav-button-focus", function () {
  $(".header-nav").removeClass("open");
  $("#header-wave").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".fa-gear", function () {
  $(".header-nav").removeClass("open");
  $("#header-wave").removeClass("open");
  $("body").removeClass("fixed-position");
});

$(document).on("click", ".fa-right-to-bracket", function () {
  $(".header-nav").removeClass("open");
  $("#header-wave").removeClass("open");
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
  localStorage.setItem("theme", "dark");
});

$(document).on("click", ".fa-sun", function () {
  $(".dark-toggler").removeClass("fa-sun");
  $(".dark-toggler").addClass("fa-moon");
  $(document.body).removeClass("theme--dark");
  localStorage.setItem("theme", "light");
});

$(document).on("click", ".forum-form-button", function () {
  $(".forum-container").animate(
    { scrollTop: $(".forum-container").prop("scrollHeight") },
    500
  );
});

$(document).on("keydown", ".forum-form-textarea", function (event) {
  if(event.key === 'Enter' && !event.shiftKey) {
    $(".forum-container").animate(
      { scrollTop: $(".forum-container").prop("scrollHeight") },
      500
    );
  }
});
