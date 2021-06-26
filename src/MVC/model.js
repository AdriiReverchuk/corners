export class Model {
   blackStarting = [
      [6, "a"],
      [6, "b"],
      [6, "c"],
      [7, "a"],
      [7, "b"],
      [7, "c"],
      [8, "a"],
      [8, "b"],
      [8, "c"],
   ];
   whiteStarting = [
      [1, "f"],
      [1, "g"],
      [1, "h"],
      [2, "f"],
      [2, "g"],
      [2, "h"],
      [3, "f"],
      [3, "g"],
      [3, "h"],
   ];
   constructor() {}
   getBlackStarting() {
      return this.blackStarting;
   }
   getWhiteStarting() {
      return this.whiteStarting;
   }
}
