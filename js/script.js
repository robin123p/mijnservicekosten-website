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
    var errorBox = document.querySelector("#form-error");
    var submitBtn = form.querySelector("button[type='submit']");
    var submitBtnDefaultText = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (errorBox) {
        errorBox.classList.remove("visible");
      }

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

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Versturen...";
      }

      fetch("https://formspree.io/f/mbglvvqj", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            form.hidden = true;
            if (successBox) {
              successBox.classList.add("visible");
            }
          } else {
            throw new Error("Versturen mislukt");
          }
        })
        .catch(function () {
          if (errorBox) {
            errorBox.classList.add("visible");
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtnDefaultText;
          }
        });
    });
  }
});
