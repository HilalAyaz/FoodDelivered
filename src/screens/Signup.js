import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
  const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/createUser',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address
        },

        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        const data = response.data

        if (data.success) {
          console.log('success', data.success)
          alert('Registration successful. Please log in.')
          navigate('/login')
        } else {
          console.log('Check your data and try again.', !data.success)
        }
      } else {
        console.log('Registration failed. Please try again later.')
      }
    } catch (error) {
      console.log('An error occurred:', error)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            value={formData.name}
            onChange={handleChange}
            id='name'
            placeholder='Full Name'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            name='email'
            value={formData.email}
            onChange={handleChange}
            id='email'
            placeholder='Email address'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Address
          </label>
          <input
            type='text'
            className='form-control'
            name='address'
            value={formData.address}
            onChange={handleChange}
            id='address'
            placeholder='Address'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={formData.password}
            onChange={handleChange}
            id='password'
            placeholder='Password'
          />
        </div>
        <button type='submit' className='btn btn-success'>
          Signup
        </button>
        <Link to='/Login' className='m-3 btn btn-danger'>
          Already a User?
        </Link>
      </form>
    </div>
  )
}

export default Signup
