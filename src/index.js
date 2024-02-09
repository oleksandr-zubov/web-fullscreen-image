import { imageURL, imagesIdsList } from "./images";

document.addEventListener("DOMContentLoaded", () => {
  let imagesContainer = document.querySelector(".image-continer");
  let countdownIndicator = document.querySelector("#coundown");

  let images = new Array();
  let visibleIndex = -1;

  const INTERVAL = 5;
  let seconds = -1;
  let countdown = undefined;

  let paused = false;

  imagesIdsList.map((imageId, index) => {
    let image = document.createElement("img");
    image.dataset.src = imageURL + imageId;
    image.alt = index;
    image.loading = "lazy";
    image.classList.add("hidden");

    images.push(image);

    imagesContainer.append(image);
  });

  function load(image) {
    let url = image.getAttribute("data-src");
    url && ((image.src = url), image.removeAttribute("data-src"));
  }

  function toggle(image) {
    image.classList.toggle("hidden");
    image.classList.toggle("visible");
  }

  function next() {
    // first run
    if (visibleIndex < 0) {
      visibleIndex = 0;
      load(images[visibleIndex]);
      toggle(images[visibleIndex]);
      startCoundown(INTERVAL);
      return;
    }

    // hide current
    toggle(images[visibleIndex]);

    // show next
    visibleIndex !== images.length - 1 ? visibleIndex++ : (visibleIndex = 0);
    load(images[visibleIndex]);
    toggle(images[visibleIndex]);
    startCoundown(INTERVAL);
  }

  function setCoundown() {
    countdown = setInterval(() => {
      countdownIndicator.innerHTML = seconds;
      seconds--;
      if (!seconds) {
        clearInterval(countdown);
        next();
      }
    }, 1000);
  }

  function unsetCoundown() {
    clearInterval(countdown);
  }

  function startCoundown(lenght) {
    seconds = lenght;
    setCoundown();
  }

  function pauseCountdown() {
    unsetCoundown();
  }

  function resumeCountdown() {
    setCoundown();
  }

  function control() {
    if (!paused) {
      pauseCountdown();
    } else {
      resumeCountdown();
    }
    paused = !paused;
  }

  next();

  imagesContainer.addEventListener("click", function () {
    control();
  });
});
