import dva from 'dva'
import { createBrowserHistory as createHistory } from 'history'
import '@/assets/styles/reset.css'
import '@/index.scss'
import '@/utils/rem'

// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: {}
})

// 2. Plugins
// app.use({})

// 3. Model
require('@/models').default.forEach(key => app.model(key.default))

// 4. Router
app.router(require('@/router').default)

// 5. Start
app.start('#root')
