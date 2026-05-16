function Footer({
  totalMonthlyCost,
  activeSubscriptions,
  annualCost
}) {
  return (
    <div className='analytics-footer'>
      <div className='analytics-item'>
        <span>Monthly Spend</span>

        <h3> €{totalMonthlyCost.toFixed(2)} </h3>
      </div>

      <div className='analytics-item'>
        <span>Services</span>

        <h3>{activeSubscriptions}</h3>
      </div>

      <div className='analytics-item'>
        <span>Annual Cost</span>

        <h3> €{annualCost.toFixed(2)} </h3>
      </div>
    </div>
  )
}

export default Footer