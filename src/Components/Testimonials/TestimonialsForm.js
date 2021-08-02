import React, { useState } from 'react';
import '../FormStyles.css';

const TestimonialForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === 'description') {
      setInitialValues({ ...initialValues, description: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="name"
        placeholder="Testimonial Title"
        type="text"
        value={initialValues.name}
        onChange={handleChange}
      ></input>
      <input
        className="input-field"
        name="description"
        placeholder="Testimonial description"
        type="text"
        value={initialValues.description}
        onChange={handleChange}
      ></input>
      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default TestimonialForm;