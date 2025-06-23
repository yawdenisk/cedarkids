import React, { useState } from 'react'

export default function Accordion({title, text}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='accordion'>
    <div className='accordion-header'>
    <p>{title}</p>
    <button onClick={() => setIsOpen(!isOpen)}>{isOpen == true ? "-" : "+"}</button>
    </div>
                        {isOpen && (
        <p>{text}</p>
    )}
</div>
  )
}
