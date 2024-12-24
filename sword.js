// are you not entertained?

class SwordAnimation {
  constructor() {
    this.slashSound = new Audio('loz-slash.wav');
    
    document.querySelectorAll(".sword").forEach((sword) => {
      Object.assign(sword.style, {
        display: "inline-block",
        cursor: "pointer",
        transformOrigin: "left center",
      });

      sword.addEventListener("click", () => this.handleSlash(sword));
    });
  }

  handleSlash(sword) {
    const textElement = sword.nextElementSibling;
    if (textElement.getAttribute("data-sliced")) return;

    this.slashSound.currentTime = 0; // Reset sound in case it's already playing
    this.slashSound.play();

    this.animateSword(sword);

    const text = textElement.textContent;
    textElement.textContent = "";
    textElement.setAttribute("data-sliced", "true");

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;

      Object.assign(span.style, {
        display: "inline-block",
        position: "relative",
        transformOrigin: "top left",
      });

      textElement.appendChild(span);

      setTimeout(() => {
        this.animateChar(span, i);
      }, 250 + i * 30);
    });
  }

  animateSword(sword) {
    Object.assign(sword.style, {
      transform: "translateX(-5px) rotate(-15deg)",
      transition: "transform 0.1s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
    });

    setTimeout(() => {
      Object.assign(sword.style, {
        transform: "translateX(10px) rotate(-45deg)",
      });
    }, 50);

    setTimeout(() => {
      Object.assign(sword.style, {
        transform: "",
        transition: "",
      });
    }, 300);
  }

  animateChar(span, index) {
    let startTime;
    const duration = 800;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const translateY = progress * 150;
      const translateX = progress * (30 + index * 2);
      const rotate = progress * (45 + Math.random() * 30);
      const opacity = 1 - progress;

      Object.assign(span.style, {
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
        opacity: opacity,
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SwordAnimation();
});
