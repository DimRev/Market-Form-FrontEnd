import { z } from 'zod'
import { useState } from 'react'

export default function MarketerForm() {
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
      setIsSubmitted(true)
    } else {
      console.log('Form contains errors:', errors)
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
      <input
        type="text"
        name="firstname"
        id="firstname"
        value={formData.firstname}
        onChange={handleInputChange}
      />
      {errors.firstname && <p className="error">{errors.firstname}</p>}

      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
      />
      {errors.lastname && <p className="error">{errors.lastname}</p>}

      <label htmlFor="email">Email Address</label>
      <input
        type="text"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <label htmlFor="website">Website Address</label>
      <input
        type="text"
        name="website"
        id="website"
        value={formData.website}
        onChange={handleInputChange}
      />
      {errors.website && <p className="error">{errors.website}</p>}

      <label htmlFor="linkedin">LinkedIn Profile Address</label>
      <input
        type="text"
        name="linkedin"
        id="linkedin"
        value={formData.linkedin}
        onChange={handleInputChange}
      />
      {errors.linkedin && <p className="error">{errors.linkedin}</p>}

      <label htmlFor="experience">
        How many years of experience do you have with Facebook Marketing?
      </label>
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
        {/* Other radio button options */}
      </section>
      {errors.experience && <p className="error">{errors.experience}</p>}

      <label htmlFor="budget">
        What was the biggest campaign budget you have managed in a single month?
      </label>
      <input
        type="number"
        name="budget"
        id="budget"
        value={formData.budget}
        onChange={handleInputChange}
      />
      {errors.budget && <p className="error">{errors.budget}</p>}

      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  )
}
