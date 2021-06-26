export class Controller {
   constructor(model, view) {
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
         const board = document.querySelector("table");
         board.addEventListener("click", (event) => {
            if (event.target.tagName === "IMG") {
               event.target.setAttribute("draggable", "true");
               this.posibleDropZones(event.target);
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
      const topRow = node.parentNode.parentNode.previousSibling.previousSibling;
      const bottomRow = node.parentNode.parentNode.nextSibling.nextSibling;
      let topCell;
      let bottomCell;
      if (leftSide) {
         if (this.isFreeCell(leftSide)) {
            console.log("left side -true");
         } else {
            console.log("left side -false");
         }
      }
      if (this.isFreeCell(rightSide)) {
         console.log("right side-true");
      } else {
         console.log("right side -false");
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
         if (this.isFreeCell(topCell)) {
            console.log("top side-true");
         } else {
            console.log("top side -false");
         }
      }
      if (bottomCell) {
         if (this.isFreeCell(bottomCell)) {
            console.log("bottom side-true");
         } else {
            console.log("bottom side -false");
         }
      }
   }
}
