const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth - 250;
canvas.height = innerHeight;
let erasing = false;

c.fillStyle = "#add8e6";
c.fillRect(0, 0, canvas.width, canvas.height);

let btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
  if (btn.id !== "clear") {
    if (btn.id !== "erase") {
      btn.addEventListener("click", () => {
        btncolor = $(btn).css("backgroundColor");
        $("#color-picker").spectrum("set", String(btncolor));
        coler = $("#color-picker").spectrum("get");
        coler = coler.toHexString();
        c.strokeStyle = coler;
      });
    }
  }
});

c.strokeStyle = "white";
c.lineJoin = "round";
c.lineWidth = 15;
$("#color-picker").on("change.spectrum", function (e, color) {
  if (erasing == false) {
    color = color.toHexString();
    c.strokeStyle = color;
  }
});

document.getElementById("myRange").oninput = function () {
  var val = document.getElementById("myRange").value;
  document.getElementById("wrapper").innerHTML = val;
  c.lineWidth = val * 3;
};

document.getElementById("clear").addEventListener("click", () => {
  c.fillRect(0, 0, canvas.width, canvas.height);
});

document.getElementById("erase").addEventListener("click", () => {
  c.strokeStyle = "#add8e6";
  erasing = !erasing;
  if (erasing) {
    btns.forEach((btn) => {
      if (btn.id != "clear") {
        if (btn.id !== "erase") {
          btn.disabled = true;
        }
      }
    });
    canvas.style.cursor = 'url("./eraser.cur"), auto';
    $("#color-picker").spectrum("disable");
    document.getElementById(
      "erase"
    ).innerHTML = `<i class="fas fa-pen"></i> Pen`;
  } else {
    btns.forEach((btn) => {
      if (btn.id != "clear") {
        if (btn.id !== "erase") {
          btn.disabled = false;
        }
      }
    });
    canvas.style.cursor = 'url("./pen.cur"), auto';
    $("#color-picker").spectrum("enable");
    col = $("#color-picker").spectrum("get");
    col = col.toHexString();
    c.strokeStyle = col;
    document.getElementById(
      "erase"
    ).innerHTML = `<i class="fas fa-eraser"></i> Erase`;
  }
});

let mouseClientY, mouseClientX, click;

addEventListener("mousemove", (event) => {
  mouseClientX = event.clientX;
  mouseClientY = event.clientY;
  if (!click) {
    c.closePath();
    c.beginPath();
    c.moveTo(mouseClientX, mouseClientY);
    c.stroke();
  } else {
    c.lineTo(mouseClientX, mouseClientY);
    c.stroke();
  }
});
addEventListener("mousedown", () => {
  click = true;
});
addEventListener("mouseup", () => {
  click = false;
});
