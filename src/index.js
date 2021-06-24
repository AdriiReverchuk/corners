import { Model } from "./MVC/model";
import { View } from "./MVC/view";
import { Controller } from "./MVC/controller";
const app = new Controller(new Model(), new View());
