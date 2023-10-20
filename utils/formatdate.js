import React from 'react'

const formatdate = (date) => {
  return (
    new Date(date).toLocaleDateString()
  )
}

export default formatdate;