import { Outlet } from "react-router-dom"
const Layout = () => {
    return (
        <main onContextMenu={e=>e.preventDefault()} className="app">
            <Outlet />
        </main>
    )
}

export default Layout