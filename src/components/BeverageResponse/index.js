import React from 'react'

export default ({ beverageData, imageData, setFormData, setImageData }) => {
  const shouldRender = beverageData && imageData
  if (!shouldRender) {
    return null
  }
  return (
    <div>
      <h1>You ordered {beverageData.beverage.name}</h1>
      <p>Size: {beverageData.size}</p>
      {beverageData.strength && <p>Strength: {beverageData.strength}</p>}
      {beverageData.milk && <p>Milk: {beverageData.milk}</p>}
      <p>Sugar: {beverageData.sugar ? 'Yes' : 'No'}</p>

      {imageData && imageData.urls && imageData.urls.regular && (
        <img src={imageData.urls.small} alt={imageData.alt_description} />
      )}
      <br />
      <p>
        Photo by{' '}
        <a rel="noopener noreferrer" target="_blank" href={imageData.user.links.html}>
          {imageData.user.name}
        </a>{' '}
        on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://unsplash.com/?utm_source=${
            process.env['REACT_APP_UNSPLASH_APP_NAME']
          }&utm_medium=referral`}
        >
          Unsplash
        </a>
      </p>
      <button
        onClick={() => {
          setFormData(null)
          setImageData(null)
        }}
      >
        Order another one
      </button>
    </div>
  )
}
