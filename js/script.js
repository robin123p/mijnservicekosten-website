document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");

  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";

      document.querySelectorAll(".faq-item").forEach(function (other) {
        if (other !== item) {
          other.setAttribute("data-open", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.setAttribute("data-open", "false");
        answer.style.maxHeight = null;
      } else {
        item.setAttribute("data-open", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  var form = document.querySelector("#contact-form");
  if (form) {
    var successBox = document.querySelector("#form-success");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrapper = field.closest(".field");
        var value = field.value.trim();
        var fieldValid = value.length > 0;

        if (fieldValid && field.type === "email") {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (wrapper) {
          wrapper.classList.toggle("error", !fieldValid);
        }
        if (!fieldValid) {
          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      /* Front-end only: geen daadwerkelijke verzending gekoppeld. */
      form.reset();
      form.hidden = true;
      if (successBox) {
        successBox.classList.add("visible");
      }
    });
  }
});
