// lets gooo
createButtons();
clickBtnRight();
clickBtnToTop();
clickBtnToMid();
clickBtnToBottom();
updateButtonBrightness();

// event listener for main button
function clickBtnRight() {
  const btnRight = document.querySelector(".btn-right");

  if (btnRight) {
    btnRight.addEventListener("click", () => {
      const btnJumpExists = document.querySelector(".btn-jump");

      if (btnJumpExists) {
        removeTinyScrollFiller();
        showGPTPosts();
        fullUserPosts();
        removeBtnJump();
      } else {
        hideGPTPosts();
        shortUserPosts();
        btnJump();
        clickBtnJump();
        fewPostsTinyScroll();
      }
    });
  }
}

// event listener for buttons next to user's posts
function clickBtnJump() {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".btn-jump")) {
      removeTinyScrollFiller();
      showGPTPosts();
      fullUserPosts();

      let nametagParent = event.target.closest(".font-semibold.select-none");
      if (nametagParent) {
        requestAnimationFrame(() => {
          nametagParent.scrollIntoView({ behavior: "smooth" });
        });

        removeBtnJump();
      }
    }
  });
}

// event listener for jump to top of the conversation button
function clickBtnToTop() {
  const btnToTop = document.querySelector(".btn-totop");

  if (btnToTop) {
    btnToTop.addEventListener("click", () => {
      const scrollConvo = document.querySelector(
        "[class*='react-scroll-to-bottom--css']:not([class*='full'])"
      );

      scrollConvo.scrollTop = 0;
    });
  }
}

// event listener for jump to middle of the conversation button
function clickBtnToMid() {
  const btnToMid = document.querySelector(".btn-tomid"); // Make sure this matches your button's class

  if (btnToMid) {
    btnToMid.addEventListener("click", () => {
      const scrollConvo = document.querySelector(
        "[class*='react-scroll-to-bottom--css']:not([class*='full'])"
      );

      if (scrollConvo) {
        // Scroll to the middle
        scrollConvo.scrollTop = scrollConvo.scrollHeight / 2;
      }
    });
  }
}

// event listener for jump to bottom of the conversation
function clickBtnToBottom() {
  const btnToBottom = document.querySelector(".btn-tobottom");

  if (btnToBottom) {
    btnToBottom.addEventListener("click", () => {
      const scrollConvo = document.querySelector(
        "[class*='react-scroll-to-bottom--css']:not([class*='full'])"
      );

      if (scrollConvo) {
        // Scroll to the bottom
        scrollConvo.scrollTop = scrollConvo.scrollHeight;
      }
    });
  }
}

// hide gpt posts
function hideGPTPosts() {
  const gptPosts = Array.from(
    document.querySelectorAll('[data-message-author-role="assistant"]')
  ).map((post) => post.closest("[data-testid]"));

  gptPosts.forEach((post) => {
    post.classList.add("hidden");
  });
}

// show gpt posts
function showGPTPosts() {
  const gptPosts = Array.from(
    document.querySelectorAll('[data-message-author-role="assistant"]')
  ).map((post) => post.closest("[data-testid]"));

  gptPosts.forEach((post) => {
    post.classList.remove("hidden");
  });
}

// shorten user posts
function shortUserPosts() {
  const innerUserPosts = document.querySelectorAll(
    '[data-message-author-role="user"]'
  );

  innerUserPosts.forEach((innerUserPost) => {
    innerUserPost.classList.add("short-post");
  });
}

// restore user posts to full length
function fullUserPosts() {
  const innerUserPosts = document.querySelectorAll(
    '[data-message-author-role="user"]'
  );

  innerUserPosts.forEach((innerUserPost) => {
    innerUserPost.classList.remove("short-post");
  });
}

// remove btn-jump
function removeBtnJump() {
  const jumpButtons = document.querySelectorAll(".btn-jump");

  jumpButtons.forEach((button) => {
    button.parentElement.removeChild(button);
  });
}

// scrolls 1px to make btn-jump jump to correct posts
// this doesn't work without setTimeout, but 100ms seems to be enough
function tinyScroll() {
  const scrollConvo = document.querySelector(
    "[class*='react-scroll-to-bottom--css']:not([class*='full'])"
  );

  if (scrollConvo) {
    setTimeout(() => {
      scrollConvo.scrollBy(0, -1);
    }, 100);
  }
}

// adds buffer space if there are too few posts, enabling tinyScroll to work
function fewPostsTinyScroll() {
  const userPosts = Array.from(
    document.querySelectorAll('[data-message-author-role="user"]')
  ).map((post) => post.closest("[data-testid]"));
  const textarea = document.querySelector("textarea");
  const shortPosts = document.querySelectorAll(".short-post");

  if (userPosts.length === 0 || !textarea || shortPosts.length === 0) {
    return;
  }

  const mostRecentUser = userPosts[userPosts.length - 1];
  const rectUser = mostRecentUser.getBoundingClientRect();
  const rectTextarea = textarea.getBoundingClientRect();

  const verticalDistance = Math.abs(rectUser.bottom - rectTextarea.top);

  if (verticalDistance > 37) {
    const fillerHeight = verticalDistance - 35;
    const tinyscrollFiller = document.createElement("div");
    tinyscrollFiller.className = "tinyscroll-filler";
    tinyscrollFiller.style.width = "100%";
    tinyscrollFiller.style.height = fillerHeight + "px";

    const mostRecentShortPost = shortPosts[shortPosts.length - 1];
    mostRecentShortPost.insertAdjacentElement("afterend", tinyscrollFiller);
    tinyScroll();
  } else {
    tinyScroll();
  }
}

// remove tinyScroll filler
function removeTinyScrollFiller() {
  const tinyscrollFiller = document.querySelector(".tinyscroll-filler");
  if (tinyscrollFiller) {
    tinyscrollFiller.remove();
  }
}

// create container for the buttons, create buttons and give them classes
function createButtons() {
  const svgRight = `<svg class="btn-right" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M5 4v5.022a5.48 5.48 0 0 0-1 .185V4a2 2 0 0 1 2-2h4.586a1.5 1.5 0 0 1 1.06.44l3.915 3.914A1.5 1.5 0 0 1 16 7.414V16a2 2 0 0 1-2 2H9.743c.253-.307.474-.642.657-1H14a1 1 0 0 0 1-1V8h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1m8.5 11h-2.522a5.586 5.586 0 0 0 0-1H13.5a.5.5 0 0 1 0 1m0-2h-2.707a5.467 5.467 0 0 0-.393-1h3.1a.5.5 0 0 1 0 1m0-2H9.743a5.533 5.533 0 0 0-1.08-1H13.5a.5.5 0 0 1 0 1m1.293-4L11 3.207V6.5a.5.5 0 0 0 .5.5zM5.5 19a4.5 4.5 0 1 1 0-9a4.5 4.5 0 0 1 0 9m-2.353-4.854l-.003.003a.498.498 0 0 0-.144.348v.006a.498.498 0 0 0 .146.35l2 2a.5.5 0 0 0 .708-.707L4.707 15H7.5a.5.5 0 0 0 0-1H4.707l1.147-1.146a.5.5 0 0 0-.708-.708z"/></svg>`;
  const svgToTop = `<svg class="btn-totop" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.9718 19.964C10.6021 19.964 10.2396 19.8615 9.92454 19.6679C9.60952 19.4744 9.35434 19.1972 9.18733 18.8674C9.02032 18.5375 8.94803 18.1678 8.97847 17.7993C9.00892 17.4308 9.14092 17.078 9.3598 16.78L17.9818 5.01999C18.214 4.70296 18.5176 4.44513 18.868 4.2674C19.2185 4.08967 19.6059 3.99705 19.9988 3.99705C20.3917 3.99705 20.7791 4.08967 21.1296 4.2674C21.48 4.44513 21.7836 4.70296 22.0158 5.01998L30.6378 16.78C30.8567 17.078 30.9887 17.4308 31.0191 17.7993C31.0496 18.1678 30.9773 18.5375 30.8103 18.8674C30.6433 19.1972 30.3881 19.4744 30.0731 19.6679C29.7581 19.8615 29.3955 19.964 29.0258 19.964L22.7058 19.964L30.6378 30.78C30.8567 31.078 30.9887 31.4308 31.0191 31.7993C31.0496 32.1678 30.9773 32.5375 30.8103 32.8674C30.6433 33.1972 30.3881 33.4744 30.0731 33.668C29.7581 33.8615 29.3955 33.964 29.0258 33.964L10.9718 33.964C10.6021 33.964 10.2396 33.8615 9.92454 33.668C9.60953 33.4744 9.35434 33.1972 9.18733 32.8674C9.02032 32.5375 8.94803 32.1678 8.97847 31.7993C9.00892 31.4308 9.14092 31.078 9.3598 30.78L17.2918 19.964L10.9718 19.964ZM19.5958 6.20398L10.9718 17.964L29.0258 17.964L20.4018 6.20398C20.3554 6.14073 20.2947 6.08931 20.2247 6.05386C20.1546 6.01841 20.0773 5.99994 19.9988 5.99994C19.9203 5.99994 19.843 6.01841 19.7729 6.05386C19.7029 6.08931 19.6423 6.14073 19.5958 6.20398ZM19.5958 20.204L10.9718 31.964L29.0258 31.964L20.4018 20.204C20.3554 20.1407 20.2947 20.0893 20.2247 20.0539C20.1546 20.0184 20.0773 19.9999 19.9988 19.9999C19.9203 19.9999 19.843 20.0184 19.7729 20.0539C19.7029 20.0893 19.6423 20.1407 19.5958 20.204Z" fill="currentColor"/>
  </svg>
  `;
  const svgToMid = `<svg class="btn-tomid" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M13.5 9a.5.5 0 0 0 0-1h-7a.5.5 0 0 0 0 1zm0 3a.5.5 0 0 0 0-1h-7a.5.5 0 0 0 0 1zm4.5-2a8 8 0 1 0-16 0a8 8 0 0 0 16 0m-8-7a7 7 0 1 1 0 14a7 7 0 0 1 0-14"/></svg>`;
  const svgToBottom = `<svg class="btn-tobottom" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.0282 20.036C29.3979 20.036 29.7604 20.1385 30.0755 20.3321C30.3905 20.5256 30.6457 20.8028 30.8127 21.1326C30.9797 21.4625 31.052 21.8322 31.0215 22.2007C30.9911 22.5692 30.8591 22.922 30.6402 23.22L22.0182 34.98C21.786 35.297 21.4824 35.5549 21.132 35.7326C20.7815 35.9103 20.3941 36.003 20.0012 36.003C19.6083 36.003 19.2209 35.9103 18.8704 35.7326C18.52 35.5549 18.2164 35.297 17.9842 34.98L9.36219 23.22C9.14331 22.922 9.01131 22.5692 8.98086 22.2007C8.95042 21.8322 9.02271 21.4625 9.18972 21.1326C9.35673 20.8028 9.61191 20.5256 9.92693 20.332C10.2419 20.1385 10.6045 20.036 10.9742 20.036L17.2942 20.036L9.36219 9.22001C9.14331 8.92202 9.01131 8.56919 8.98086 8.2007C8.95042 7.83222 9.02271 7.4625 9.18972 7.13263C9.35673 6.80275 9.61191 6.52563 9.92693 6.33205C10.2419 6.13846 10.6045 6.03599 10.9742 6.03601L29.0282 6.03601C29.3979 6.03599 29.7604 6.13846 30.0755 6.33205C30.3905 6.52563 30.6457 6.80275 30.8127 7.13263C30.9797 7.4625 31.052 7.83222 31.0215 8.2007C30.9911 8.56919 30.8591 8.92202 30.6402 9.22001L22.7082 20.036L29.0282 20.036ZM20.4042 33.796L29.0282 22.036L10.9742 22.036L19.5982 33.796C19.6446 33.8593 19.7053 33.9107 19.7753 33.9461C19.8453 33.9816 19.9227 34.0001 20.0012 34.0001C20.0797 34.0001 20.157 33.9816 20.227 33.9461C20.2971 33.9107 20.3577 33.8593 20.4042 33.796ZM20.4042 19.796L29.0282 8.03601L10.9742 8.03601L19.5982 19.796C19.6446 19.8593 19.7053 19.9107 19.7753 19.9461C19.8454 19.9816 19.9227 20.0001 20.0012 20.0001C20.0797 20.0001 20.157 19.9816 20.227 19.9461C20.2971 19.9107 20.3577 19.8593 20.4042 19.796Z" fill="currentColor"/>
  </svg>`;

  const btnContainer = document.createElement("div");
  btnContainer.className = "btn-container";
  document.body.appendChild(btnContainer);
  btnContainer.innerHTML = svgRight + svgToTop + svgToMid + svgToBottom;
}

// create buttons next to user's posts
function btnJump() {
  const nametags = document.querySelectorAll(".font-semibold.select-none");
  svgBtnJump = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M2.5 5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1zm0 5a.5.5 0 0 0 0 1h10.195a4.474 4.474 0 0 1 1.323-.732a1.51 1.51 0 0 1 .068-.268zm7.86 5.475a1.5 1.5 0 0 1-.274-.475H2.5a.5.5 0 0 0 0 1h8.775l-.007-.018a1.5 1.5 0 0 1-.908-.507m5.14.025a1 1 0 1 0 0-2a1 1 0 0 0 0 2m4-1.5h-.551A3.487 3.487 0 0 0 16 11.051V10.5a.5.5 0 0 0-1 0v.551A3.487 3.487 0 0 0 12.051 14H11.5a.5.5 0 0 0 0 1h.551A3.487 3.487 0 0 0 15 17.949v.551a.5.5 0 0 0 1 0v-.551A3.487 3.487 0 0 0 18.949 15h.551a.5.5 0 0 0 0-1m-2.232 2.268a2.5 2.5 0 1 1-3.536-3.535a2.5 2.5 0 0 1 3.536 3.535"/></svg>`;

  nametags.forEach((nametag) => {
    nametag.classList.add("nametag");

    if (nametag.innerText === "You" && !nametag.querySelector(".btn-jump")) {
      nametag.style.position = "relative";

      const btnJump = document.createElement("div");
      btnJump.className = "btn-jump";
      btnJump.innerHTML = svgBtnJump;
      nametag.appendChild(btnJump);
    }
  });
}

// adjust button hover brighteness dependong on dark/light theme
function updateButtonBrightness() {
  const htmlElement = document.querySelector("html");
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  function applyStyles() {
    const isDark = htmlElement.classList.contains("dark");
    const isLight = htmlElement.classList.contains("light");
    let css = "";

    if (isDark) {
      css = `
              .btn-jump svg:hover,
              .btn-right:hover,
              .btn-tobottom:hover,
              .btn-tomid:hover,
              .btn-totop:hover {
                  filter: brightness(150%);
                  transition: 0.2s;
              }
          `;
    } else if (isLight) {
      css = `
              .btn-jump svg:hover,
              .btn-right:hover,
              .btn-tobottom:hover,
              .btn-tomid:hover,
              .btn-totop:hover {
                  filter: brightness(50%);
                  transition: 0.2s;
              }
          `;
    }

    styleElement.textContent = css;
  }

  // mutation observer for switching dark/light theme after initial load
  const observer = new MutationObserver(applyStyles);
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  applyStyles();
}
