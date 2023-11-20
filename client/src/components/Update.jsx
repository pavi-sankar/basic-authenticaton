import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/getUser/${id}`)
      .then(response => {
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        setPassword(response.data.password || '');
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/update/${id}`, { name, email, password })
      .then(result => {
        console.log(result.data);
        // Provide feedback to the user upon success
      })
      .catch(err => {
        console.error(err);
        // Provide error handling and feedback to the user
      });
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Update</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input type="text" name='name' autoComplete='off' value={name} className="form-control" id="username" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="email" name='email' value={email} className="form-control" autoComplete='off' id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input type="password" name='password' value={password} className="form-control" autoComplete='current-password' id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Update
                </button>

              </form>
              <div>
                <p>Already have an account? then click <Link to="/login">here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update;
