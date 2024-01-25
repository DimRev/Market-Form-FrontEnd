import React, { useEffect, useState } from 'react'
import MarketerForm from '../cmps/MarketerForm'
import { formService } from '../services/api/form.service'

export default function FormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formsCount, setFormsCount] = useState(0)
  useEffect(() => {
    getFormsCount()
  }, [isSubmitted])

  async function getFormsCount() {
    const forms = await formService.getForms()
    setFormsCount(forms.length)
  }
  return (
    <section className="form-page">
      <div>{formsCount} have already sent a form!</div>
      {isSubmitted ? (
        <div className="submit-msg">Thank you for submitting the form</div>
      ) : (
        <MarketerForm setIsSubmitted={setIsSubmitted} />
      )}
    </section>
  )
}
