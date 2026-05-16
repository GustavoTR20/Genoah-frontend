import Trash from '../assets/trash.png'

function SubscriptionTable({
  filteredSubscriptions,
  statusFilter,
  setStatusFilter,
  editSubscription,
  deleteSubscription
}) {
  return (
    <>
      <div className='filters'>
        <button className={statusFilter === 'All' ? 'active-filter' : ''} onClick={() => setStatusFilter('All')}>
          All
        </button>

        <button className={statusFilter === 'Active' ? 'active-filter' : ''} onClick={() => setStatusFilter('Active')}>
          Active
        </button>

        <button className={statusFilter === 'Paused' ? 'active-filter' : ''} onClick={() => setStatusFilter('Paused')}>
          Paused
        </button>

        <button className={statusFilter === 'Cancelled' ? 'active-filter' : ''} onClick={() => setStatusFilter('Cancelled')}>
          Cancelled
        </button>
      </div>

      <div className='subscriptions-section'>
        <div className='subscriptions-header'>
          <h2>Your Subscriptions</h2>

          <span>
            {filteredSubscriptions.length} active services
          </span>
        </div>

        <div className='table-header'>
          <span>Service</span>
          <span>Category</span>
          <span>Status</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className='subscription-row'>
            <div className='table-service'>
              <div className='subscription-icon'>
                {subscription.serviceName.charAt(0)}
              </div>

              <div>
                <h3>{subscription.serviceName}</h3>
                <p>{subscription.accountEmail}</p>
              </div>
            </div>

            <div className='table-category'>
              <span className='category-badge'>
                {subscription.category}
              </span>
            </div>

            <div className='table-status'>
              <span
                className={`status-badge ${subscription.status.toLowerCase()}`}>
                {subscription.status}
              </span>
            </div>

            <div className='table-price'>
              €{subscription.monthlyPrice}
            </div>

            <div className='table-actions'>
              <button className='edit-button' onClick={() => editSubscription(subscription)}>
                Edit
              </button>

              <button onClick={() => deleteSubscription(subscription.id)}>
                <img src={Trash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SubscriptionTable