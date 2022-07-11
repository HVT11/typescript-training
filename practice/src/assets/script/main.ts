import {on} from "./helpers/helper"
import Model from "./models/user-models"
import View from "./views/user-view"
import Controllers from "./controllers/user-controller"
import Template from "./templates/template"

const model = new Model()
const template = new Template()
const view = new View(template)

const app = new Controllers(model, view)

const setView = () => app.setView(document.location.hash)
on(window, 'load', setView)
on(window, 'hashchange', setView)