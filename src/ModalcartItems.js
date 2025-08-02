import React from 'react'

function ModalcartItems({shoe}) {
  return (
    <div key={shoe.id} className="shoe-card">
                
                <h3>{shoe.title}</h3>
                <p>${shoe.price}</p>
              </div>
  )
}

export default ModalcartItems;