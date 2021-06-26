export class View {
   constructor() {}
   renderTable(itemsB, itemsW) {
      const firstChild = this.getElements("tr>td:first-child");
      const rowElemets = this.getElements("tr");
      const rowIndex = this.getElements("tr:first-child>td>span");
      for (let i = 0; i < firstChild.length; i++) {
         const p = document.createElement("p");
         p.textContent = i + 1;
         const content = firstChild[i].textContent;
         firstChild[i].prepend(p);
         rowElemets[i].setAttribute("data-row", i + 1);
         const rowChildElements = rowElemets[i].childNodes;
         let counter = 0;
         rowChildElements.forEach((element) => {
            if (element.nodeName !== "#text") {
               element.setAttribute(
                  "data-column",
                  rowIndex[counter].textContent
               );
               counter++;
            }
         });
      }
      this.renderItem(itemsB, true);
      this.renderItem(itemsW, false);
   }
   renderItem(items, isBlack) {
      const rowElements = this.getElements("tr");
      for (let i = 0; i < items.length; i++) {
         rowElements.forEach((element, index) => {
            if (element.getAttribute("data-row") === items[i][0].toString()) {
               element.childNodes.forEach((elemChild) => {
                  if (
                     elemChild.nodeName !== "#text" &&
                     elemChild.getAttribute("data-column") === items[i][1]
                  ) {
                     const img = document.createElement("img");
                     img.className = "checker";
                     if (isBlack) {
                        img.src =
                           "https://cdn1.savepice.ru/uploads/2021/6/24/1015dc99c461ae67009bf169a48f3d0b-full.png";
                        img.className = "checker-black";
                     } else {
                        img.src =
                           "https://cdn1.savepice.ru/uploads/2021/6/24/503ba904acee325630700f4701baa8f8-full.png";
                        img.className = "checker-white";
                     }
                     elemChild.append(img);
                  }
               });
            }
         });
      }
   }
   getElements(selector) {
      const elem = document.querySelectorAll(selector);
      return elem;
   }
}
