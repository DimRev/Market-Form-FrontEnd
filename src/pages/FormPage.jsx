import React, { useState } from 'react'
import MarketerForm from '../cmps/MarketerForm'

export default function FormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <section className="form-page">
      {isSubmitted ? (
        <div className="submit-msg">Thank you for submitting the form</div>
      ) : (
        <MarketerForm setIsSubmitted={setIsSubmitted} />
      )}
    </section>
  )
}
