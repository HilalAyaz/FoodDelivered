import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:5000/api/loginUser',
        {
          email: formData.email,
          password: formData.password
        },

        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200) {
        const data = await response.data

        if (data.success) {
          localStorage.setItem('userEmail', formData.email)
          localStorage.setItem('authToken', data.authToken)
          console.log(localStorage.getItem('authToken'))
          navigate('/')
        }
      } else {
        alert('Login failed. Please try again with correct credentials if already a user or Signup.')
      }
    } catch (err) {
      console.log('An error occurred:', err)
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
          Submit
        </button>
        <Link to='/createuser' className='m-3 btn btn-danger'>
          New User?
        </Link>
      </form>
    </div>
  )
}

export default Login
