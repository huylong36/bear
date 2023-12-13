import Home from "../pages/Home"
import Following from "../pages/Following"

const publicRoutes: any = [
    { path: '/', component: Home },
    { path: '/following', component: Following }
]
export { publicRoutes }