const rules = document.querySelector(".rules-toggle");
const rulesInfo = document.querySelector(".rules-info");
const selectors = document.querySelectorAll(".selector");
const endMsg = document.querySelector(".endgame");
const endRelative = document.querySelector(".endgame-relative");
const endMsgText = document.querySelector(".endgame-header");
const overlay = document.querySelector(".endgame-overlay");

const done = document.querySelectorAll(".done");
const help = document.querySelector(".cheat");
const hints = document.querySelectorAll(".hint");
var randomHelp = [];
var currentActive = 1;

const rows = document.querySelectorAll(".row");
const btns = document.querySelectorAll(".btn");
var color = "yellow";
var currentRow = [];
var activeRow;
let hintActive = 0;
const colors = ["yellow", "red", "green", "aqua", "turquoise", "purple"];

//1.    Showing rules
rules.addEventListener("click", showRules);
function showRules() {
  rulesInfo.classList.toggle("hidden");
}
var gameWin = winningCombo();
//2.    Selecting Color
selectors.forEach((dot) => {
  dot.addEventListener("click", function () {
    selectors.forEach((dot) => {
      dot.classList.remove("selected");
    });
    color = dot.classList[1];

    dot.classList.add("selected");
  });
});

//3.    Checking if row is not selected
function checkRow() {
  for (var row of rows) {
    if (row.classList.contains("current")) {
      return row.id;
    }
  }
}

//4.    Coloring the buttons
rows.forEach((row) => {
  if (row.id === checkRow()) {
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (btn.classList.contains(`r${currentActive}`)) {
          console.log(btn);
          btn.classList.remove("yellow");
          btn.classList.remove("red");
          btn.classList.remove("green");
          btn.classList.remove("aqua");
          btn.classList.remove("turquoise");
          btn.classList.remove("purple");
          btn.classList.remove("background");
          btn.classList.add(color);
          btn.setAttribute("color", color);
          var btnColor = btn.getAttribute("color");

          btn.classList.add("active");
          if (!currentRow.includes(btn)) {
            currentRow.push(btn);
          }

          console.log(currentRow);

          //Showing the tick if row is complete
          if (currentRow.length === 4) {
            done.forEach((tick) => {
              if (tick.classList.contains(checkRow())) {
                tick.classList.remove("hidden");
                //Clicking the tick
                tick.addEventListener("click", function () {
                  //8.    Checking winning combo

                  hintFiller1();
                  hintFiller2();
                  hintFiller3();
                  hintFiller4();
                  checkWin();
                  gameLose();

                  currentActive++;
                  btns.forEach((btn) => {
                    if (btn.classList.contains("active")) {
                      nextActive();
                    }
                  });
                });
              }
            });
          }
        }
      });
    });
  }
});
//5.    Switching to another row
function nextActive() {
  rows.forEach((row) => {
    if (row.classList.contains("current")) {
      row.classList.remove("current");
      const rowArr = Array.from(rows);
      var curr = rowArr[currentActive - 1];
      console.log(curr);
      if (curr) {
        curr.classList.add("current");
        currentRow = [];
        btns.forEach((btn) => {
          btn.classList.remove("active");
        });
        done.forEach((tick) => {
          tick.classList.add("hidden");
        });
      }
      rows.forEach((row) => {
        if (row.id === `r${currentActive}`) {
          hintFiller1(), hintFiller2(), hintFiller3(), hintFiller4();
        }
      });
    }
  });
}

//6.    Generating random colors
function winningCombo() {
  const randomcombo = [...new Array(4)].map((color) => {
    random = Math.floor(Math.random() * Math.floor(colors.length));
    randomHelp.push(random);
    return colors[random];
  });
  return randomcombo;
}
console.log(gameWin);

//7.    Creating hints
const html = `
<span class="cheatcode">${randomHelp[0]}</span>
<span class="cheatcode">${randomHelp[1]}</span>
<span class="cheatcode">${randomHelp[2]}</span>
<span class="cheatcode">${randomHelp[3]}</span>
`;
help.insertAdjacentHTML("beforeend", html);

//8.    function for filling hints
function hintFiller1() {
  for (var row of rows) {
    if (row.id == `r${currentActive}`) {
      for (var hint of hints) {
        if (hint.classList.contains(checkRow())) {
          if (currentRow.length === 4) {
            if (currentRow[0].getAttribute("color") === gameWin[0]) {
              if (!hint.classList.contains("right")) {
                hint.classList.add("right");
                console.log("hint fill1");
                break;
              }
            }
          }
        }
      }
    }
  }
}
function hintFiller2() {
  for (var hint of hints) {
    if (hint.classList.contains(`r${currentActive}`)) {
      if (currentRow.length === 4) {
        if (currentRow[1].getAttribute("color") === gameWin[1]) {
          if (!hint.classList.contains("right")) {
            hint.classList.remove("almost");
            hint.classList.add("right");
            console.log("hint fill2");
            break;
          }
        }
      }
    }
  }
}

function hintFiller3() {
  for (var hint of hints) {
    if (hint.classList.contains(`r${currentActive}`)) {
      if (currentRow.length === 4) {
        if (currentRow[2].getAttribute("color") === gameWin[2]) {
          if (!hint.classList.contains("right")) {
            hint.classList.remove("almost");
            hint.classList.add("right");

            console.log("hint fill3");
            break;
          }
        }
      }
    }
  }
}
function hintFiller4() {
  for (var hint of hints) {
    if (hint.classList.contains(`r${currentActive}`)) {
      if (currentRow.length === 4) {
        if (currentRow[3].getAttribute("color") === gameWin[3]) {
          if (!hint.classList.contains("right")) {
            hint.classList.remove("almost");
            hint.classList.add("right");
            console.log("hint fill4");
            break;
          }
        }
      }
    }
  }
}

//Checking if game is lost or won
function checkWin() {
  if (currentRow.length === 4) {
    if (
      currentRow[0].getAttribute("color") === gameWin[0] &&
      currentRow[1].getAttribute("color") === gameWin[1] &&
      currentRow[2].getAttribute("color") === gameWin[2] &&
      currentRow[3].getAttribute("color") === gameWin[3]
    ) {
      endMsg.classList.remove("hidden");
      overlay.classList.remove("hidden");
      endRelative.classList.remove("failure");
      endRelative.classList.add("victory");
      endMsgText.textContent = "game won!!!";
    }
  }
}
function gameLose() {
  for (var row of rows) {
    if (row.id === `r10`) {
      if (currentRow.length === 4) {
        if (
          hints.forEach((hint) => {
            hint.classList.contains("active");
          })
        ) {
          endMsg.classList.remove("hidden");
          overlay.classList.remove("hidden");
          endRelative.classList.add("failure");
          endRelative.classList.remove("victory");
          endMsgText.textContent = "game lost!!!";
        }
      }
    }
  }
}
