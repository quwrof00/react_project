import React, {useRef} from 'react';
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'

function Auth() {
  const navigate = useNavigate();
  const form = useRef();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regnoPattern = /^\d{2}B[A-Z]{2}\d{4}$/;

  
  const toTimetable = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const email = formData.get('from_email');
    const regno = formData.get('from_regno');
    
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!regnoPattern.test(regno)) {
      alert('Please enter a valid registration number.');
      return;
    }

    emailjs.sendForm('service_41hzvjj', 'template_tiyhv9i', form.current, 'o1dmw-o0yje0nKH82')
    .then(
      (response) => {
        alert('Email sent successfully!');
        e.target.reset();
        console.log('SUCCESS!', response.status, response.text);
        navigate('/timetable');
      },
      (error) => {
        alert('Failed to send email. Please try again.');
        console.error('FAILED...', error);
      }
    );    
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Authentication</h2>
    
    {/* {Authentication Form} */}
    <form ref={form} onSubmit={toTimetable}>
      <div className="mb-4">
        <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
          Registration Number
        </label>
        <input
        name='from_regno'
          type="text"
          id="registrationNumber"
          placeholder="Enter your registration number"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email ID
        </label>
        <input
        name='from_email'
          type="email"
          id="email"
          placeholder="Enter your email ID"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        Submit
      </button>
    </form>
  </div>
</div>
  )
}

export default Auth