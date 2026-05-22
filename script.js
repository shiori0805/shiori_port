(() => {
  const revealTargets = document.querySelectorAll(".reveal");

  if (revealTargets.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealTargets.forEach((target) => {
      revealObserver.observe(target);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const worksContainer = document.querySelector(".works-container");

  const openLightbox = (src, alt, caption) => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    if (lightboxCaption) {
      lightboxCaption.textContent = caption;
    }

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lightbox-open");
    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lightbox-open");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    if (lightboxCaption) {
      lightboxCaption.textContent = "";
    }
  };

  if (worksContainer && lightbox) {
    worksContainer.addEventListener("click", (event) => {
      const img = event.target.closest(".work-card img");
      if (!img) {
        return;
      }

      const captionEl = img.closest(".work-card")?.querySelector(".work-caption");
      const caption = captionEl?.textContent?.trim() || img.alt;

      openLightbox(img.src, img.alt, caption);
    });

    lightboxClose?.addEventListener("click", closeLightbox);
    lightboxBackdrop?.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }

  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle("is-visible", window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });
    toggleBackToTop();
  }

  const form = document.getElementById("contactForm");
  const messageEl = document.getElementById("formMessage");

  if (!form || !messageEl) {
    return;
  }

  const setMessage = (text, isError = false) => {
    messageEl.textContent = text;
    messageEl.style.color = isError ? "#b15f5f" : "#7b5d4f";
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setMessage("すべての項目を入力してください。", true);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("メールアドレスの形式をご確認ください。", true);
      return;
    }

    setMessage("送信中...");

    window.setTimeout(() => {
      setMessage("お問い合わせありがとうございます。2営業日以内にご返信いたします。");
      form.reset();
    }, 600);
  });
})();
