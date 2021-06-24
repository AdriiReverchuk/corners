export class View {
   constructor() {
      console.log("view");
      console.log(this.getElements("tr"));
      this.renderTable();
   }
   renderTable() {
      const firstChild = this.getElements("tr>td:first-child");
      const rowElemets = this.getElements("tr");
      const rowIndex = this.getElements("tr:last-child>td>span");
      for (let i = 0; i < firstChild.length; i++) {
         console.log(rowIndex[i].textContent);
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
   }
   getElements(selector) {
      const elem = document.querySelectorAll(selector);
      return elem;
   }
}
