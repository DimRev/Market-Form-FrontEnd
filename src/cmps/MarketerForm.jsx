import React from 'react'

export default function MarketerForm() {
  return (
    <form className="marketer-form" action="">
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" id="firstname" />

      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" id="lastname" />

      <label htmlFor="email">Email Address</label>
      <input type="text" name="email" id="email" />

      <label htmlFor="website">Website Address</label>
      <input type="text" name="website" id="website" />

      <label htmlFor="linkedin">Linkedin Profile Address</label>
      <input type="text" name="linkedin" id="linkedin" />

      <label htmlFor="experience">
        How many years of experience do you have with Facebook Marketing?
      </label>
      <section className="radio-section">
        <label>
          <input type="radio" name="experience" id="experience" />
          No experience
        </label>
        <label>
          <input type="radio" name="experience" id="experience" />
          0-1 years
        </label>
        <label>
          <input type="radio" name="experience" id="experience" />
          1-2 years
        </label>
        <label>
          <input type="radio" name="experience" id="experience" />2 or more
          years
        </label>
      </section>

      <label htmlFor="budget">
        What was the biggest campaign budged you have managed in a single month?
      </label>
      <input type="number" name="budged" id="budged" />
    </form>
  )
}
