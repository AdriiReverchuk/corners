export class Controller {
   constructor(model, view) {
      this.move = 1;
      this.model = model;
      this.view = view;
      this.view.renderTable(
         this.model.getBlackStarting(),
         this.model.getWhiteStarting()
      );
      this.startGame();
   }
   startGame() {
      const btn = document.getElementById("btn");
      btn.addEventListener("click", (event) => {
         this.view.removeFigures();
         this.view.renderTable(
            this.model.getBlackStarting(),
            this.model.getWhiteStarting()
         );
         let playersTurn = "checker-white";
         const msg = document.querySelector(".turn");
         msg.textContent = "White Turn";

         const board = document.querySelector("table");
         board.addEventListener("mousedown", (event) => {
            const item = event.target;
            this.endGame(true);
            this.endGame(false);

            if (item.tagName === "IMG" && item.className === playersTurn) {
               this.move++;
               item.setAttribute("draggable", "true");
               this.posibleDropZones(item);
               item.id = "drag-item";
               const dropZones = document.querySelectorAll(".drop-zone");
               this.dragAndDrop(dropZones);
               item.id = " ";
               item.removeAttribute("draggable");
               dropZones.forEach((element) => {
                  element.classList.remove("drop-zone");
               });
               this.endGame(true);

               if (this.move % 2 === 0) {
                  playersTurn = "checker-black";
                  msg.textContent = "Black Turn";
               } else {
                  playersTurn = "checker-white";
                  msg.textContent = "White Turn";
               }
               console.log(document.querySelectorAll("#drag-item"));
               console.log(document.querySelectorAll(".drop-zone"));
            }
         });
      });
   }
   isFreeCell(node) {
      if (node.hasChildNodes()) {
         node.childNodes.forEach((element) => {
            if (element.nodeName === "IMG") {
               console.log("false");
               return false;
            } else {
               console.log("true", "1");
               return true;
            }
         });
      } else {
         console.log("true");
         return true;
      }
   }
   posibleDropZones(node) {
      const leftSide = node.parentNode.previousSibling.previousSibling;
      const rightSide = node.parentNode.nextSibling.nextSibling;
      console.log(node.parentNode.parentNode);
      let topRow;
      if (node.parentNode.parentNode.getAttribute("data-row") !== "1") {
         topRow = node.parentNode.parentNode.previousSibling.previousSibling;
      }
      const bottomRow = node.parentNode.parentNode.nextSibling.nextSibling;
      let topCell;
      let bottomCell;
      if (leftSide) {
         if (this.isFreeCell(leftSide)) {
            leftSide.classList.add("drop-zone");
            console.log("left side -true");
         } else {
            console.log("left side -false");
         }
      }
      if (rightSide) {
         if (this.isFreeCell(rightSide)) {
            rightSide.classList.add("drop-zone");
            console.log("right side-true");
         } else {
            console.log("right side -false");
         }
      }
      if (topRow) {
         topRow.childNodes.forEach((element) => {
            if (element.nodeName !== "#text") {
               if (
                  element.getAttribute("data-column") ===
                  node.parentNode.getAttribute("data-column")
               ) {
                  topCell = element;
               }
            }
         });
      }
      if (bottomRow) {
         bottomRow.childNodes.forEach((element) => {
            if (element.nodeName !== "#text") {
               if (
                  element.getAttribute("data-column") ===
                  node.parentNode.getAttribute("data-column")
               ) {
                  bottomCell = element;
               }
            }
         });
      }
      if (topCell) {
         console.log(topCell);
         if (this.isFreeCell(topCell)) {
            topCell.classList.add("drop-zone");
            console.log("top side-true");
         } else {
            console.log("top side -false");
         }
      }
      if (bottomCell) {
         if (this.isFreeCell(bottomCell)) {
            bottomCell.classList.add("drop-zone");
            console.log("bottom side-true");
         } else {
            console.log("bottom side -false");
         }
      }
   }
   dragAndDrop(arrZones) {
      const dragItem = document.getElementById("drag-item");
      dragItem.ondragstart = this.drag;
      arrZones.forEach((element) => {
         element.ondragover = this.allowDrop;
         element.ondrop = this.drop;
      });
   }
   drag(event) {
      event.dataTransfer.setData("id", event.target.id);
   }
   allowDrop(event) {
      event.preventDefault();
   }
   drop(event) {
      const itemId = event.dataTransfer.getData("id");
      event.target.append(document.getElementById(itemId));
      const dropZones = document.querySelectorAll("drop-zone");
      dropZones.forEach((element) => {
         element.classList.remove("drop-zone");
      });
   }
   endGame(isBlack) {
      let counter = 0;
      const rows = document.querySelectorAll("tr");
      if (!isBlack) {
         rows[5].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-white") {
                     counter++;
                  }
               });
            }
         });
         rows[6].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-white") {
                     counter++;
                  }
               });
            }
         });
         rows[7].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-white") {
                     counter++;
                  }
               });
            }
         });
         if (counter === 9) alert("White Win!!!");
      } else {
         rows[0].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-black") {
                     counter++;
                  }
               });
            }
         });
         rows[1].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-black") {
                     counter++;
                  }
               });
            }
         });
         rows[2].childNodes.forEach((element) => {
            if (element !== "#text") {
               element.childNodes.forEach((item) => {
                  if (item.className === "checker-black") {
                     counter++;
                  }
               });
            }
         });
         if (counter === 8) alert("Black Win!!!");
      }
   }
}
