import React from 'react'
import Image from 'next/image'
import image from '../../app/images/sp.gif'

const index = () => {
  return (
    <div>
        <Image width={200} height={200} src={image} alt="spiner"/>
    </div>
  )
}

export default index