import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Get() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/getreg")
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, []);


const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteUser/${id}`)
      .then(res => {
        console.log(res.data); 
        window.location.reload();
      })
      .catch(err => {
        console.error(`Error deleting user with ID ${id}:`, err.response?.data || err.message);
      });
  };
  

  return (
    <div>
      <h1>manage accounts</h1>
        {
          users.map((user) => (
       <li key={user._id}>
              {user.name}<br />
              {user.password}<br />
              {user.email}<br />
              <Link to={`/update/${user._id}`}><button>update</button></Link>
              <button onClick={(e)=>handleDelete(user._id)}>delete</button>
              </li>
         
          ))
        }
    </div>
  );
}

export default Get;
