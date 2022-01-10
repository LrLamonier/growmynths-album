//////////////////////////////
///// Smooth scrolling
//////////////////////////////

const allLinks = document.querySelectorAll(".link-smooth");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Scroll to other sections
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link")) {
      const headerEl = document.querySelector(".header");
      headerEl.classList.toggle("nav-open");
    }
  });
});

//////////////////////////////
///// Map
//////////////////////////////

const renderMap = function () {
  var map = L.map("map", {
    maxZoom: 4,
    minZoom: 1,
    // center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
  }).setView([-125, 135], 2);

  var w = 2048,
    h = 2048,
    imageUrl = "img/the-goblet-sub-map.webp";

  var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
  var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
  var bounds = new L.LatLngBounds(southWest, northEast);

  L.imageOverlay(imageUrl, bounds).addTo(map);

  var houseIcon = L.icon({ iconUrl: "img/house-icon.png", iconSize: [30, 30] });
  var marker = L.marker([-145, 138], { icon: houseIcon }).addTo(map);

  const adjustZoom = function () {
    const screenWidthOne = window.matchMedia("(max-width: 1200px)");
    if (screenWidthOne.matches) {
      map.setView([-145, 140], 2);
    }
    const screenWidthTwo = window.matchMedia("(max-width: 550px)");
    if (screenWidthTwo.matches) {
      map.setView([-150, 140], 2);
      console.log("yay");
    }
  };
  adjustZoom();
};

renderMap();

//////////////////////////////
///// Slider
//////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider-btn--left");
  const btnRight = document.querySelector(".slider-btn--right");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot--active"));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add("dots-dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Initialization
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Interface
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // Keyboard commands
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

//////////////////////////////
///// Modal gallery
//////////////////////////////

const galleryEl = document.querySelector(".section-gallery");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const imgLinks = document.querySelectorAll(".gallery-img");
const closeModal = function () {
  overlay.classList.add("hidden");
  modalContainer.classList.add("hidden");
  overlay.innerHTML = "";
};

galleryEl.addEventListener("click", function (event) {
  const imgClick = event.target.dataset.imgn;
  if (event.target.dataset.imgn) {
    const openModal = function () {
      overlay.classList.remove("hidden");
      modalContainer.classList.remove("hidden");
      const markup = `<img class="overlay-img close" src="img/album/${imgClick}.webp" />`;
      overlay.innerHTML = markup;
    };
    openModal();
  }

  if (event.target.classList.contains("close")) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
