// Initialize AOS
AOS.init({
  once: true,
});

// Initialize Fancybox
Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

// Initialize Rellax
window.addEventListener("load", function () {
  var rellax = new Rellax(".rellax");
});

// Initialize Swiper (Example)
// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,
// });

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const closeBtn = document.querySelector(".mobile-menu__close");

  function toggleMenu() {
    if (burger) burger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
    mobileOverlay.classList.toggle("is-active");
    document.body.style.overflow = mobileMenu.classList.contains("is-active")
      ? "hidden"
      : "";
  }

  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", toggleMenu);
  }

  // Desktop Submenu Arrow Logic
  const desktopMenuItems = document.querySelectorAll(".header__menu-item");
  desktopMenuItems.forEach((item) => {
    const submenu = item.querySelector(".header__submenu");
    const link = item.querySelector(".header__menu-link");
    const icon = link ? link.querySelector("i") : null;

    if (submenu) {
      // If submenu exists, ensure icon is present
      if (!icon) {
        const newIcon = document.createElement("i");
        newIcon.className = "icon-namechevron-down";
        link.appendChild(newIcon);
      }
    } else {
      // If no submenu, remove icon if it exists
      if (icon) {
        icon.remove();
      }
    }
  });

  // Mobile Submenu Toggle & Arrow Logic
  const mobileMenuItems = document.querySelectorAll(".mobile-menu__item");

  mobileMenuItems.forEach((item) => {
    const link = item.querySelector(".mobile-menu__link");
    const submenu = item.querySelector(".mobile-menu__submenu");
    const icon = link ? link.querySelector("i") : null;

    if (submenu) {
      // If submenu exists, ensure icon is present
      if (!icon && link) {
        const newIcon = document.createElement("i");
        newIcon.className = "icon-namechevron-down";
        link.appendChild(newIcon);
      }

      if (link) {
        link.addEventListener("click", (e) => {
          e.preventDefault(); // Prevent navigation if it's a submenu toggle
          item.classList.toggle("is-open");
        });
      }
    } else {
      // If no submenu, remove icon if it exists
      if (icon) {
        icon.remove();
      }
    }
  });

  if (document.querySelector(".advantages-swiper")) {
    const swiper = new Swiper(".advantages-swiper", {
      loop: false,
      speed: 600,

      pagination: {
        el: ".advantages-sliders-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".advantages-sliders-button-next",
        prevEl: ".advantages-sliders-button-prev",
      },

      slidesPerView: "auto",
      spaceBetween: 8,

      breakpoints: {
        1280: {
          spaceBetween: 24,
        },
      },
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".product-range__tab");
  const contents = document.querySelectorAll(".product-range__content");

  // Initialize Nested Swipers
  new Swiper(".product-range__nested-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    observer: true, // Fix for hidden tabs initialization
    observeParents: true, // Fix for hidden tabs initialization
    navigation: {
      nextEl: ".product-range-button-next",
      prevEl: ".product-range-button-prev",
    },
    pagination: {
      el: ".product-range-pagination",
      clickable: true,
    },
  });

  // Initialize Fancybox (if not auto-initialized)
  if (typeof Fancybox !== "undefined") {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

  // Function to update active content
  function updateContent(targetTab) {
    const activeContent = document.getElementById(`content-${targetTab}`);

    // 1. Сначала показываем новый контент, чтобы избежать схлопывания высоты страницы
    if (activeContent) {
      activeContent.classList.add("product-range__content--active");
    }

    // 2. Затем скрываем остальные
    contents.forEach((c) => {
      if (c !== activeContent) {
        c.classList.remove("product-range__content--active");
      }
    });
  }

  // Initialize Main Swiper
  const swiper = new Swiper(".product-range__swiper", {
    effect: "cards",
    grabCursor: true,
    slideToClickedSlide: true,
    observer: true, // Важно для корректной работы при изменении DOM
    observeParents: true, // Важно для корректной работы при изменении DOM
    wrapperClass: "product-range__swiper-wrapper", // Custom BEM wrapper class
    slideClass: "product-range__swiper-slide", // Custom BEM slide class
    cardsEffect: {
      rotate: false, // This removes the rotation
      perSlideOffset: 25, // Increased to make cards stick out more (wider stack)
      perSlideRotate: 0, // Ensure per-slide rotation is 0
      slideShadows: true, // Enabled shadows
    },
    breakpoints: {
      1280: {
        cardsEffect: {
          perSlideOffset: 15, // Уменьшаем отступ на десктопе, чтобы слайды были ближе
        },
      },
    },
    on: {
      slideChange: function () {
        // Update tabs and content when the slide changes
        const activeSlide = this.slides[this.activeIndex];
        const activeTabAttr = activeSlide.getAttribute("data-tab");

        tabs.forEach((t) => t.classList.remove("product-range__tab--active"));
        const activeTabElement = document.querySelector(
          `.product-range__tab[data-tab="${activeTabAttr}"]`
        );
        if (activeTabElement) {
          activeTabElement.classList.add("product-range__tab--active");
        }

        // Update content area
        updateContent(activeTabAttr);
      },
    },
  });

  // Tab switching logic
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = tab.getAttribute("data-tab");

      // Find the index of the first slide that matches this tab
      const slides = swiper.slides;
      let targetIndex = 0;

      for (let i = 0; i < slides.length; i++) {
        if (slides[i].getAttribute("data-tab") === targetTab) {
          targetIndex = i;
          break;
        }
      }

      swiper.slideTo(targetIndex);
      // Content update is handled by the slideChange event above
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const faceSvg = document.querySelector(".enhanced__boxs-face svg");
  if (!faceSvg) return;

  const paths = faceSvg.querySelectorAll("path");
  const overlay = document.querySelector(".lines-overlay");
  const tabs = document.querySelectorAll(".enhanced__boxs-tabs-item");
  const boxsContainer = document.querySelector(".enhanced__boxs");

  // Color mapping
  const zoneColors = {
    "#EC6547": "red",
    "#AE6C9E": "purple",
    "#E7AC44": "yellow",
  };

  // Helper to check color
  function getZoneFromFill(fill) {
    if (!fill) return null;
    const lowerFill = fill.toLowerCase();
    if (
      lowerFill.includes("#ec6547") ||
      lowerFill.includes("paint0") ||
      lowerFill.includes("paint1")
    )
      return "red";
    if (lowerFill.includes("#ae6c9e")) return "purple";
    if (lowerFill.includes("#e7ac44")) return "yellow";
    return null;
  }

  // Assign zones to paths
  paths.forEach((path) => {
    const fill = path.getAttribute("fill");
    const zone = getZoneFromFill(fill);
    if (zone) {
      path.setAttribute("data-zone", zone);

      path.addEventListener("click", (e) => {
        // Disable on screens smaller than 1280px
        if (window.innerWidth < 1280) return;
        e.stopPropagation(); // Prevent triggering the document click
        handleZoneClick(zone, e);
      });
    }
  });

  // Add click listeners to tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      // e.stopPropagation(); // Optional: keep this if you want clicking a tab to NOT close the active state
      const zone = tab.dataset.zone;

      // Update active state on tabs
      tabs.forEach((t) => {
        if (t.dataset.zone === zone) {
          t.classList.add("active");
        } else {
          t.classList.remove("active");
        }
      });

      // Clear existing lines when clicking a tab (do not draw new ones)
      if (overlay) overlay.innerHTML = "";
    });
  });

  // Hide when clicking outside
  document.addEventListener("click", (e) => {
    // If the click is NOT inside the boxsContainer
    if (boxsContainer && !boxsContainer.contains(e.target)) {
      if (overlay) overlay.innerHTML = "";
      tabs.forEach((t) => t.classList.remove("active"));
    }
  });

  function handleZoneClick(zone, event) {
    // Disable on screens smaller than 1280px
    if (window.innerWidth < 1280) return;

    // Update active state on tabs
    tabs.forEach((t) => {
      if (t.dataset.zone === zone) {
        t.classList.add("active");
      } else {
        t.classList.remove("active");
      }
    });

    // Clear existing lines
    overlay.innerHTML = "";

    // Find corresponding tab
    const tab = document.querySelector(
      `.enhanced__boxs-tabs-item[data-zone="${zone}"]`
    );
    if (!tab) return;

    // Get coordinates relative to the container
    const containerRect = boxsContainer.getBoundingClientRect();

    // Use the tab element itself to find the border-bottom end
    const tabRect = tab.getBoundingClientRect();

    // 1. Start point: Bottom-Left corner of the tab
    const tabLeftX = tabRect.left - containerRect.left;

    // 2. Mid point: Bottom-Right corner of the tab
    const tabRightX = tabRect.right - containerRect.left;

    // Y coordinate (bottom of tab)
    const tabBottomY = tabRect.bottom - containerRect.top;

    let endX, endY;

    if (event && event.type === "click" && event.target.tagName === "path") {
      // If clicked on SVG, use the click coordinates
      endX = event.clientX - containerRect.left;
      endY = event.clientY - containerRect.top;
    } else {
      // If clicked on tab or no event, use center of the zone
      const zonePaths = faceSvg.querySelectorAll(`path[data-zone="${zone}"]`);
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      if (zonePaths.length === 0) return;

      zonePaths.forEach((p) => {
        const r = p.getBoundingClientRect();
        if (r.left < minX) minX = r.left;
        if (r.top < minY) minY = r.top;
        if (r.right > maxX) maxX = r.right;
        if (r.bottom > maxY) maxY = r.bottom;
      });

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      endX = centerX - containerRect.left;
      endY = centerY - containerRect.top;
    }

    // Draw line: TabLeft -> TabRight -> Target
    drawLine(tabLeftX, tabRightX, tabBottomY, endX, endY);
  }

  function drawLine(x1, x2, y1, x3, y3) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // Create a line from bottom-left of tab to bottom-right, then to target
    const d = `M ${x1} ${y1} L ${x2} ${y1} L ${x3} ${y3}`;

    path.setAttribute("d", d);
    path.setAttribute("class", "connection-line");
    overlay.appendChild(path);

    // Add circle at the end
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", x3);
    circle.setAttribute("cy", y3);
    circle.setAttribute("r", "3");
    circle.setAttribute("fill", "#000");
    overlay.appendChild(circle);
  }
});
