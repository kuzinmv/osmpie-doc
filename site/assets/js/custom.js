document.addEventListener("DOMContentLoaded", function () {
  
  

  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".fbs__net-navbar .scroll-link");

  function removeActiveClasses() {
    if (navLinks) {
      navLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  function addActiveClass(currentSectionId) {
    const activeLink = document.querySelector(
      `.fbs__net-navbar .scroll-link[href="#${currentSectionId}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  function getCurrentSection() {
    let currentSection = null;
    let minDistance = Infinity;
    if (sections) {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 4);

        if (distance < minDistance && rect.top < window.innerHeight) {
          minDistance = distance;
          currentSection = section.getAttribute("id");
        }
      });
    }

    return currentSection;
  }

  function updateActiveLink() {
    const currentSectionId = getCurrentSection();
    if (currentSectionId) {
      removeActiveClasses();
      addActiveClass(currentSectionId);
    }
  }

  window.addEventListener("scroll", updateActiveLink);

  const portfolioGrid = document.querySelector('#portfolio-grid');
  if (portfolioGrid) {
    var iso = new Isotope("#portfolio-grid", {
      itemSelector: ".portfolio-item",
      layoutMode: "masonry",
    });

    if (iso) {
      iso.on("layoutComplete", updateActiveLink);

      imagesLoaded("#portfolio-grid", function () {
        iso.layout();
        updateActiveLink();
      });
    }

    var filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons) {
      filterButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
          e.preventDefault();
          var filterValue = button.getAttribute("data-filter");
          iso.arrange({ filter: filterValue });

          filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
          });
          button.classList.add("active");
          updateActiveLink();
        });
      });
    }

    updateActiveLink();
  }
});

const navbarScrollInit = () => {
  var navbar = document.querySelector(".fbs__net-navbar");

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (navbar) {
    if (scrollTop > 0) {
      navbar.classList.add("active");
    } else {
      navbar.classList.remove("active");
    }
  }
};

const navbarInit = () => {
  document.querySelectorAll('.dropdown-toggle[href="#"]').forEach(function (el, index) {
    el.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });
};

// ======= Marquee =======
const logoMarqueeInit = () => {
  const wrapper = document.querySelector(".logo-wrapper");
  const boxes = gsap.utils.toArray(".logo-item");
  
  if (boxes.length > 0) {
    const loop = horizontalLoop(boxes, {
      paused: false,
      repeat: -1,
      speed: 0.25,
      reversed: false,
    });
    
    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () =>
            tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
          config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
      gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
          distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          // if we're wrapping the timeline's playhead, make the proper adjustments
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
    }
  }
};

document.addEventListener("DOMContentLoaded", logoMarqueeInit);

// ======= Navbar Scroll =======
document.addEventListener("DOMContentLoaded", function () {
  logoMarqueeInit();
  navbarInit();
  window.addEventListener("scroll", navbarScrollInit);
});

// ======= Swiper =======
const swiperInit = () => {
  var swiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    speed: 700,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: ".custom-button-next",
      prevEl: ".custom-button-prev",
    },
  });

  const progressCircle = document.querySelector(".autoplay-progress svg");
  const progressContent = document.querySelector(".autoplay-progress span");
  if (progressCircle && progressContent ) {
    var swiper2 = new Swiper(".sliderSwiper", {
      slidesPerView: 1,
      speed: 700,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".custom-button-next",
        prevEl: ".custom-button-prev",
      },

      on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
      }
    });
  }

};

document.addEventListener("DOMContentLoaded", swiperInit);

// ======= Glightbox =======
const glightBoxInit = () => {
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
};
document.addEventListener("DOMContentLoaded", glightBoxInit);

// ======= BS OffCanvass =======
const bsOffCanvasInit = () => {
  var offcanvasElement = document.getElementById("fbs__net-navbars");
  if (offcanvasElement) {
    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      document.body.classList.add("offcanvas-active");
    });

    offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
      document.body.classList.remove("offcanvas-active");
    });
  }
};
document.addEventListener("DOMContentLoaded", bsOffCanvasInit);

// ======= Back To Top =======
const backToTopInit = () => {
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", backToTopInit);


// ======= Inline SVG =======
const inlineSvgInit = () => {
  const imgElements = document.querySelectorAll(".js-img-to-inline-svg");
  if (imgElements) {
    imgElements.forEach((imgElement) => {
      const imgURL = imgElement.getAttribute("src");

      fetch(imgURL)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgText, "image/svg+xml");
          const svgElement = svgDocument.documentElement;

          Array.from(imgElement.attributes).forEach((attr) => {
            if (attr.name !== "class") {
              svgElement.setAttribute(attr.name, attr.value);
            } else {
              const classes = attr.value
                .split(" ")
                .filter((className) => className !== "js-img-to-inline-svg");
              if (classes.length > 0) {
                svgElement.setAttribute("class", classes.join(" "));
              }
            }
          });

          imgElement.replaceWith(svgElement);
        })
        .catch((error) => console.error("Error fetching SVG:", error));
    });
  }
};

document.addEventListener("DOMContentLoaded", inlineSvgInit);

// ======= AOS =======
const aosInit = () => {
  AOS.init({
    duration: 800,
    easing: 'slide',
    once: true
  });
}
document.addEventListener("DOMContentLoaded", aosInit);

// ======= PureCounter =======
const pureCounterInit = () => {
  new PureCounter({
    selector: ".purecounter",
  });
}
document.addEventListener("DOMContentLoaded", pureCounterInit);

// ======= Disable Click Navbar Dropdown =======
const addHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

  const preventClick = (event) => event.preventDefault();
  const showDropdown = () => {
    dropdown.classList.add('show');
    dropdownToggle.setAttribute('aria-expanded', 'true');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.add('show');
  };
  const hideDropdown = () => {
    dropdown.classList.remove('show');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    dropdownMenu.classList.remove('show');
  };

  // Disable the click event for toggling the dropdown
  dropdownToggle.addEventListener('click', preventClick);

  // Open dropdown on hover
  dropdown.addEventListener('mouseover', showDropdown);

  // Close dropdown when mouse leaves
  dropdown.addEventListener('mouseleave', hideDropdown);

  // Store references to the event listeners for later removal
  dropdown.__events = { preventClick, showDropdown, hideDropdown };
};

const removeHoverEvents = (dropdown) => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const { preventClick, showDropdown, hideDropdown } = dropdown.__events || {};

  if (preventClick) {
    // Remove the event listeners
    dropdownToggle.removeEventListener('click', preventClick);
    dropdown.removeEventListener('mouseover', showDropdown);
    dropdown.removeEventListener('mouseleave', hideDropdown);

    // Remove the reference to the stored events
    delete dropdown.__events;
  }
};

const handleNavbarEvents = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  if (window.innerWidth >= 992) {

    // Add hover events to dropdowns
    dropdowns.forEach(addHoverEvents);
    dropstarts.forEach(addHoverEvents);
    dropends.forEach(addHoverEvents);
  } else {

    // Remove hover events from dropdowns
    dropdowns.forEach(removeHoverEvents);
    dropstarts.forEach(removeHoverEvents);
    dropends.forEach(removeHoverEvents);
  }
};

// Function to handle resizing
const handleResize = () => {
  const dropdowns = document.querySelectorAll('.navbar .dropdown');
  const dropstarts = document.querySelectorAll('.navbar .dropstart');
  const dropends = document.querySelectorAll('.navbar .dropend');

  // Remove hover events before rechecking window size
  dropdowns.forEach(removeHoverEvents);
  dropstarts.forEach(removeHoverEvents);
  dropends.forEach(removeHoverEvents);

  // Re-apply hover events based on window size
  handleNavbarEvents();
};

// Call the function on resize event and initially
window.addEventListener('resize', handleResize);
handleNavbarEvents();



document.addEventListener('DOMContentLoaded', function() {
  const editableElements = document.querySelectorAll('[contenteditable="true"]');

  editableElements.forEach(element => {
    element.addEventListener('click', function(e) {
      // Выделяем весь текст в элементе
      selectText(this);

      // Копируем в буфер обмена
      copyToClipboard(this.textContent || this.innerText);

      // Показываем уведомление (опционально)
      showCopyNotification(element,'copied!');
    });
  });

  function selectText(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
    }).catch(err => {
      fallbackCopyToClipboard(text);
    });
  }

  function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  function showCopyNotification(element, message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      z-index: 1000;
    `;
    element.appendChild(notification);

    setTimeout(() => {
      element.removeChild(notification);
    }, 2000);
  }
});



const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper = new Swiper(".mySwiper", {
  slidesPerView: '1',
  spaceBetween: 20,
  loop: true,
  speed: 1000,
  effect: "fade",
  centeredSlides: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: true,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});


const attribution = new ol.control.Attribution({collapsible: false,});
const view = new ol.View({
  center: ol.proj.fromLonLat([ 73.387596 ,54.973088]),
  zoom: 19
});
const map1 = new ol.Map({
  target: 'map1',
  controls: ol.control.defaults.defaults({attribution: false}).extend([attribution]),
  layers: [

    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://d.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
        maxZoom: 22,
        minZoom: 12,
        crossOrigin: 'anonymous'
      }),
      visible: true,
      title: ' Raster',
    }),
  ],
  view: view
});


const map2 = new ol.Map({
  target: 'map2',
  controls: ol.control.defaults.defaults({attribution: false}).extend([attribution]),
  layers: [

    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://d.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        maxZoom: 22,
        minZoom: 12,
        crossOrigin: 'anonymous'
      }),
      visible: true,
      title: ' Raster',
    })
  ],
  view: view
});

const exploreLink = document.getElementById('explore-area');


function getMapInfo() {
  if (!exploreLink) return;
  const view = map1.getView();
  const zoom = view.getZoom()+1;
  const center = view.getCenter();
  if (center) {
    const lonLat = ol.proj.toLonLat(center);
    console.log('Center:', lonLat, zoom);
    const [lon, lat] = lonLat;
    const newHref = `https://osmpie.org/app/?pos=${lon.toFixed(6)}&pos=${lat.toFixed(6)}&zoom=${zoom.toFixed(2)}`;
    exploreLink.href = newHref;
  }

  return {
    zoom: zoom,
    center: center,
    centerFormatted: center ? `[${center[0].toFixed(4)}, ${center[1].toFixed(4)}]` : 'N/A'
  };
}

olms.apply(map1, 'https://osmpie.org/map/styles/skeleton/style.json');

olms.apply(map2, 'https://osmpie.org/map/styles/surface/style.json');

map1.on('moveend', function() {
  const info = getMapInfo();
});

// Событие изменения зума
map1.getView().on('change:resolution', function() {
  const info = getMapInfo();
});

// Комбинированное событие для всех изменений вида
map1.getView().on('change:center', function() {
  const info = getMapInfo();
});