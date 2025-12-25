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

  // News Slider & Tabs
  const newsContainer = document.querySelector(".news__cards");
  if (newsContainer) {
    const allSlides = Array.from(newsContainer.querySelectorAll(".swiper-slide"));
    const wrapper = newsContainer.querySelector(".swiper-wrapper");
    const tabs = document.querySelectorAll(".news__tab");

    let newsSwiper;

    function initSwiper() {
      newsSwiper = new Swiper(".news__cards", {
        slidesPerView: 'auto',
        spaceBetween: 24,
        observer: true,
        observeParents: true,
        mousewheel: {
          forceToAxis: true,
        },
        navigation: {
          nextEl: ".news__tabs-button-next",
          prevEl: ".news__tabs-button-prev",
        },
        pagination: {
          el: ".news__tabs-swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1280: {
            spaceBetween: 48,
          },
        },
      });
    }

    function filterSlides(category) {
      // Prevent layout jump by setting min-height
      const containerHeight = newsContainer.offsetHeight;
      newsContainer.style.minHeight = `${containerHeight}px`;

      if (newsSwiper) {
        newsSwiper.destroy(true, true);
      }

      wrapper.innerHTML = "";

      const filteredSlides = allSlides.filter(
        (slide) => slide.getAttribute("data-category") === category
      );

      filteredSlides.forEach((slide) => wrapper.appendChild(slide));

      initSwiper();

      // Remove min-height after a short delay to allow Swiper to settle
      setTimeout(() => {
        newsContainer.style.minHeight = "";
      }, 100);
    }

    // Initial filter
    const activeTab = document.querySelector(".news__tab--active");
    if (activeTab) {
      filterSlides(activeTab.getAttribute("data-tab"));
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        tabs.forEach((t) => t.classList.remove("news__tab--active"));
        tab.classList.add("news__tab--active");
        filterSlides(tab.getAttribute("data-tab"));
      });
    });
  }

  if (document.querySelector(".advantages-swiper")) {
    let advantagesSwiper = null;

    function initAdvantagesSwiper() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 1280 && !advantagesSwiper) {
        advantagesSwiper = new Swiper(".advantages-swiper", {
          loop: false,
          speed: 600,
          watchOverflow: true,
          mousewheel: {
            forceToAxis: true,
          },

          pagination: {
            el: ".advantages-sliders-pagination",
            clickable: true,
          },

          navigation: {
            nextEl: ".advantages-sliders-button-next",
            prevEl: ".advantages-sliders-button-prev",
          },

          slidesPerView: "auto",
          spaceBetween: 16,
        });
      } else if (screenWidth >= 1280 && advantagesSwiper) {
        advantagesSwiper.destroy(true, true);
        advantagesSwiper = null;
      }
    }

    initAdvantagesSwiper();
    window.addEventListener("resize", initAdvantagesSwiper);
  }

  if (document.querySelector(".indicationses-swiper")) {
    const swiper = new Swiper(".indicationses-swiper", {
      loop: false,
      speed: 600,
      mousewheel: {
        forceToAxis: true,
      },

      pagination: {
        el: ".indicationses-swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".indicationses-button-next",
        prevEl: ".indicationses-button-prev",
      },

      slidesPerView: "auto",
      spaceBetween: 16,

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
    mousewheel: {
      forceToAxis: true,
    },
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
  let swiper;

  const onSlideChange = function () {
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
  };

  if (document.querySelector(".product-range__twac")) {
    // TwAc Swiper (Fade Effect)
    swiper = new Swiper(".product-range__swiper", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      grabCursor: true,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      mousewheel: {
        forceToAxis: true,
      },
      wrapperClass: "product-range__swiper-wrapper",
      slideClass: "product-range__swiper-slide",
      on: {
        slideChange: onSlideChange,
      },
    });
  } else {
    // Default Swiper (Cards Effect)
    swiper = new Swiper(".product-range__swiper", {
      effect: "cards",
      grabCursor: true,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      mousewheel: {
        forceToAxis: true,
      },
      wrapperClass: "product-range__swiper-wrapper",
      slideClass: "product-range__swiper-slide",
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
        slideChange: onSlideChange,
      },
    });
  }

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

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".syringe-section");
  const svg = document.getElementById("lines-svg");
  const syringe = document.getElementById("main-syringe");

  // Configuration for connections
  // source: ID of the text block
  // target: % position on the syringe image (x, y) relative to the image container
  // anchor: where on the text block the line starts ('right' or 'left')
  let connections = [];

  if (document.querySelector(".composition")) {
    // Logic for Fortox (Composition) page
    connections = [
      { source: "block-1", targetY: 28, anchor: "right" }, // Albumin
      { source: "block-2", targetY: 65, anchor: "right" }, // Sodium Chloride
      { source: "block-3", targetY: 38, anchor: "left" }, // Botulinum Toxin
      { source: "block-4", targetY: 75, anchor: "left" }, // Molecular Mass
    ];
  } else {
    // Default logic (TwAc page)
    connections = [
      { source: "block-1", targetY: 35, anchor: "right" }, // Top Left -> Middle Barrel
      { source: "block-2", targetY: 60, anchor: "right" }, // Bottom Left -> Finger Grip
      { source: "block-3", targetY: 53, anchor: "left" }, // Top Right -> Black Stopper
    ];
  }

  function drawLines() {
    if (!svg || !syringe) return;
    svg.innerHTML = "";

    // Disable on screens smaller than 1280px
    if (window.innerWidth < 1280) return;

    const syringeRect = syringe.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    connections.forEach((conn) => {
      const block = document.getElementById(conn.source);
      if (!block) return;

      // Find the title element to underline (h3, h4, or fallback to block itself)
      const title =
        block.querySelector(".info-header") ||
        block.querySelector("h3") ||
        block.querySelector("h4") ||
        block.querySelector(".syringe-text__title") ||
        block;
      const titleRect = title.getBoundingClientRect();

      // Calculate coordinates relative to SVG
      // Y position for the underline (bottom of the title with slight offset)
      const lineY = titleRect.bottom - svgRect.top + 5;

      // Start Point: Beginning of the header (Left side)
      const startX = titleRect.left - svgRect.left;

      // Mid Point: End of the header (Right side) - creates the underline
      const midX = titleRect.right - svgRect.left;

      // End Point (Syringe)
      // We assume the syringe is centered in its column
      const endX = syringeRect.left + syringeRect.width / 2 - svgRect.left;
      const endY =
        syringeRect.top +
        syringeRect.height * (conn.targetY / 100) -
        svgRect.top;

      // Create Path
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      // Determine drawing direction based on anchor
      let d;
      if (document.querySelector(".composition")) {
        if (conn.anchor === "left") {
          // Right block: Start at Left edge (startX), go Left 40px, then to Syringe
          d = `M ${startX} ${lineY} L ${startX - 40} ${lineY} L ${endX} ${endY}`;
        } else {
          // Left block: Start at Right edge (midX), go Right 40px, then to Syringe
          d = `M ${midX} ${lineY} L ${midX + 40} ${lineY} L ${endX} ${endY}`;
        }
      } else {
        if (conn.anchor === "left") {
          // For blocks on the right (anchor left): Draw underline Right -> Left, then connect to Syringe
          // Extend the horizontal line to the left to clear the text block
          const turnX = startX - 60;
          d = `M ${midX} ${lineY} L ${turnX} ${lineY} L ${endX} ${endY}`;
        } else {
          // For blocks on the left (anchor right): Draw underline Left -> Right, then connect to Syringe
          d = `M ${startX} ${lineY} L ${midX} ${lineY} L ${endX} ${endY}`;
        }
      }

      path.setAttribute("d", d);
      path.setAttribute("class", "connector-line");

      // Create Dot/Arrow at end
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("cx", endX);
      dot.setAttribute("cy", endY);
      dot.setAttribute("r", "3");
      dot.setAttribute("class", "connector-dot");

      svg.appendChild(path);
      svg.appendChild(dot);
    });
  }

  // Initial draw
  // Wait for image to load for correct rects
  if (syringe && syringe.complete) {
    drawLines();
  } else if (syringe) {
    syringe.onload = drawLines;
  }

  window.addEventListener("resize", drawLines);

  // Animation Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animations
          const img = document.querySelector(".syringe-image");
          if (img) img.classList.add("visible");

          setTimeout(() => {
            const b1 = document.getElementById("block-1");
            if (b1) b1.classList.add("visible");
          }, 300);

          setTimeout(() => {
            const b3 = document.getElementById("block-3");
            if (b3) b3.classList.add("visible");
          }, 600);

          setTimeout(() => {
            const b2 = document.getElementById("block-2");
            if (b2) b2.classList.add("visible");
          }, 900);

          setTimeout(() => {
            const b4 = document.getElementById("block-4");
            if (b4) b4.classList.add("visible");
          }, 1200);

          setTimeout(() => {
            const details = document.querySelector(".details-container");
            if (details) details.classList.add("visible");
          }, 1200);

          // Animate lines after text appears
          setTimeout(() => {
            if (section && window.innerWidth >= 1280) {
              section.classList.add("animate-lines");
            }
          }, 1500);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (section) {
    observer.observe(section);
  }

  // Section Paralax Swiper Logic
  const paralaxSwiperSelector = ".section-paralax-swiper";
  let paralaxSwiper = null;

  function initParallaxSwiper() {
    const screenWidth = window.innerWidth;
    const swiperElement = document.querySelector(paralaxSwiperSelector);

    if (!swiperElement) return;

    if (screenWidth < 1280 && !paralaxSwiper) {
      paralaxSwiper = new Swiper(paralaxSwiperSelector, {
        slidesPerView: "auto",
        spaceBetween: 16,
        loop: false,
        observer: true, // Fix for hidden tabs initialization
        observeParents: true, // Fix for hidden tabs initialization
        navigation: {
          nextEl: ".section-paralax-button-next",
          prevEl: ".section-paralax-button-prev",
        },
        pagination: {
          el: ".section-paralax-swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          1280: {
            slidesPerView: 2.2,
            spaceBetween: 30,
            centeredSlides: false,
          },
        },
      });
    } else if (screenWidth >= 1280 && paralaxSwiper) {
      paralaxSwiper.destroy(true, true);
      paralaxSwiper = null;
    }
  }

  // Initialize on load
  initParallaxSwiper();

  // Check on resize
  window.addEventListener("resize", () => {
    initParallaxSwiper();
  });

  // Video Hover Logic
  const videoCards = document.querySelectorAll('.product__top-card-image, .product__bottom-card');

  videoCards.forEach(card => {
    const video = card.querySelector('video');
    if (video) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(e => console.log('Video play failed:', e));
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  // Lazy Load Videos (IntersectionObserver)
  const lazyVideos = document.querySelectorAll('.lazy-video');
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.play().catch(e => console.log('Lazy video play failed:', e));
          observer.unobserve(video);
        }
      });
    });

    lazyVideos.forEach(video => {
      videoObserver.observe(video);
    });
  } else {
    // Fallback for older browsers
    lazyVideos.forEach(video => {
      video.play();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const accordionItems = document.querySelectorAll(".accordion__item");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion__header");

    if (header) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("is-active");

        // Close all other items
        accordionItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("is-active");
            const otherBody = otherItem.querySelector(".accordion__body");
            if (otherBody) otherBody.style.maxHeight = null;
          }
        });

        // Toggle current item
        item.classList.toggle("is-active");
        const body = item.querySelector(".accordion__body");

        if (body) {
          if (!isActive) {
            body.style.maxHeight = body.scrollHeight + 32 + "px";
          } else {
            body.style.maxHeight = null;
          }
        }
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Appeex Cards Swiper Logic
  const appeexSwiperSelector = ".hero--appeex-cards-swiper";
  let appeexSwiper = null;

  function initAppeexSwiper() {
    const screenWidth = window.innerWidth;
    const swiperElement = document.querySelector(appeexSwiperSelector);

    if (!swiperElement) return;

    if (screenWidth < 1280 && !appeexSwiper) {
      appeexSwiper = new Swiper(appeexSwiperSelector, {
        slidesPerView: "auto",
        spaceBetween: 64,
        centeredSlides: true,
        loop: false,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: ".hero--appeex-cards-button-next",
          prevEl: ".hero--appeex-cards-button-prev",
        },
        pagination: {
          el: ".hero--appeex-cards-pagination",
          clickable: true,
        },
      });
    } else if (screenWidth >= 1280 && appeexSwiper) {
      appeexSwiper.destroy(true, true);
      appeexSwiper = null;
    }
  }

  // Initialize on load
  initAppeexSwiper();

  // Check on resize
  window.addEventListener("resize", () => {
    initAppeexSwiper();
  });

  // Chemical Mediators Tabs Logic
  const chemicalTabs = document.querySelectorAll(".chemical-mediators__tab");

  chemicalTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      if (window.innerWidth < 1280) {
        e.preventDefault();
        // Close other tabs
        chemicalTabs.forEach((t) => {
          if (t !== tab) t.classList.remove("is-active");
        });
        // Toggle current tab
        tab.classList.toggle("is-active");
      }
    });
  });

  // Close tabs when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth < 1280) {
      if (!e.target.closest(".chemical-mediators__tab")) {
        chemicalTabs.forEach((tab) => {
          tab.classList.remove("is-active");
        });
      }
    }
  });
});



// Global handler to prevent browser navigation on horizontal scroll over sliders
document.addEventListener(
  "wheel",
  (e) => {
    // Check if scrolling horizontally
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Check if the hover target is inside a slider
      const isSlider = e.target.closest(
        ".swiper, .news__cards, .advantages-swiper, .indications-swiper, .product-range__nested-swiper, .product-range__swiper"
      );

      if (isSlider) {
        // Prevent default browser behavior (navigation)
        e.preventDefault();
      }
    }
  },
  { passive: false }
);
