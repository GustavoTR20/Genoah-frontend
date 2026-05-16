function Sidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar-logo'>
        <div className='logo-icon'>G</div>

        <div>
          <h2>GENOAH</h2>
          <span>Full Stack Project</span>
        </div>
      </div>

      <nav className='sidebar-nav'>
        <button className='nav-item active'>Subscriptions</button>
        <button className='nav-item'>Dashboard</button>
      </nav>
    </aside>
  )
}

export default Sidebar