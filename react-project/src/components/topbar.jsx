function Topbar({ showForm, setShowForm }) {
  return (
    <div className='topbar'>
      <h1>Manage Subscriptions</h1>

      <button
        className='topbar-button'
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Close' : '+ Add New'}
      </button>
    </div>
  )
}

export default Topbar