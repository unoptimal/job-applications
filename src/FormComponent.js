import React, { useState } from 'react';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      name,
      email,
    };
  
    try {
      const response = await fetch('https://www.applyingtojobs.lol/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form data submitted successfully:', formData);
        alert('Email sent successfully!');
      } else {
        console.error('Error sending email:', await response.text());
        alert('An error occurred while sending the email.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
