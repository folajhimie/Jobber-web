import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
// import { BigSidebar, Navbar, SmallSidebar } from '../../components'
import Happy from '../../components/Happy'
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <Happy />
        {/* <BigSidebar /> */}
        <div>
          {/* <Navbar /> */}
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
