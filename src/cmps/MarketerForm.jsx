import { z } from 'zod'
import { useState } from 'react'
import { formService } from '../services/api/form.service'

export default function MarketerForm({ setIsSubmitted }) {
  const schema = z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }),
    website: z.string().url({ message: 'Invalid website address' }).optional(),
    linkedin: z
      .string()
      .includes('linkedin.com/in/', { message: 'Invalid LinkedIn address' })
      .optional(),
    experience: z.number().optional(),
    budget: z
      .number()
      .min(1000, { message: 'Minimum budget should be at least 1000' })
      .max(50000, { message: 'Maximum budget should be at most 50,000' })
      .optional(),
  })

  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  function handleInputChange(event) {
    let { name, value, type } = event.target
    if (type === 'number' || type === 'radio') value = +value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function validateForm() {
    try {
      schema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          const fieldName = err.path[0]
          fieldErrors[fieldName] = err.message
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      formService.addForm(formData)
      setIsSubmitted(true)
      //! FOR DEBUGGING
      // console.log('Form submitted:', formData)
    } else {
      //! FOR DEBUGGING
      // console.log('Form contains errors:', errors)
    }
  }

  return (
    <form
      className="marketer-form"
      onSubmit={onSubmit}
      onReset={() => {
        setFormData({})
        setErrors({})
      }}>
      <label htmlFor="firstname">First Name</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="optional"
          value={formData.firstname}
          onChange={handleInputChange}
        />
        {errors.firstname && <div className="error">{errors.firstname}</div>}
      </div>

      <label htmlFor="lastname">Last Name</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="optional"
          value={formData.lastname}
          onChange={handleInputChange}
        />
        {errors.lastname && <div className="error">{errors.lastname}</div>}
      </div>

      <label htmlFor="email">Email Address*</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="required"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <label htmlFor="website">Website Address</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="website"
          id="website"
          placeholder="optional"
          value={formData.website}
          onChange={handleInputChange}
        />
        {errors.website && <div className="error">{errors.website}</div>}
      </div>

      <label htmlFor="linkedin">LinkedIn Profile Address</label>
      <div className="input-wrapper">
        <input
          type="text"
          name="linkedin"
          id="linkedin"
          placeholder="optional"
          value={formData.linkedin}
          onChange={handleInputChange}
        />
        {errors.linkedin && <div className="error">{errors.linkedin}</div>}
      </div>

      <label htmlFor="experience">
        How many years of experience do you have with Facebook Marketing?
      </label>
      <div className="input-wrapper">
        <section className="radio-section">
          <label>
            <input
              type="radio"
              name="experience"
              value={0}
              onChange={handleInputChange}
            />
            No experience
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value={1}
              onChange={handleInputChange}
            />
            0-1 years
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value={2}
              onChange={handleInputChange}
            />
            1-2 years
          </label>
          <label>
            <input
              type="radio"
              name="experience"
              value={3}
              onChange={handleInputChange}
            />
            2 and more years
          </label>
        </section>
        {errors.experience && <div className="error">{errors.experience}</div>}
      </div>

      <label htmlFor="budget">
        What was the biggest campaign budget you have managed in a single month?
      </label>
      <div className="input-wrapper">
        <input
          type="number"
          name="budget"
          id="budget"
          placeholder="optional"
          value={formData.budget}
          onChange={handleInputChange}
        />
        {errors.budget && <div className="error">{errors.budget}</div>}
      </div>

      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  )
}
