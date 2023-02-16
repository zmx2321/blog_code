import ElementPlus from 'element-plus'
import VForm3 from 'vform3-builds'
import 'vform3-builds/dist/designer.style.css'
import 'virtual:svg-icons-register'
const plugins = {
  install(app, b) {
    app.use(VForm3).use(ElementPlus)
  }
}

export default plugins