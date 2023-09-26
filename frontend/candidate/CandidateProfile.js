import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function CandidateProfile() {
  const { id } = useParams();
  const [candidat, setCandidate] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/candidate/${id}`);
        setCandidate(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className='w-100' style={{ position: 'absolute', height: '10%' }}>
        <div className="bg-dark text-white p-1 mb-2">
          <div className="elections-container" style={{ fontSize: '30px' }}>
            <strong>Elect</strong>ions
          </div>
          <Link to='/' style={{ fontSize: '40px', position: 'absolute', left: '2%', top: '-10%',  color: 'white' }}><FaHome /></Link>
        </div>
      </div>
      <div style={{ left: '1%', position: 'absolute', top: '10%' }}>
        <h1 className="text-decoration-underline" > <FaUser style={{ fontSize: '35px' }} />Candidate Profile</h1>
      </div>
      {candidat.map(candidate => (
        <div style={{ left: '1%', position: 'absolute', top: '20%', maxWidth: '120%' }}>
          <ul style={{ color: 'white', fontSize: '25px' }} key={candidate.id}>
            <li style={{ backgroundColor: 'black' }}>Name: {candidate.name} </li>
            <li style={{ backgroundColor: 'red' }}> Email: {candidate.email}  </li>
            <li style={{ backgroundColor: 'red' }}>City: {candidate.City} </li>
            <li style={{ backgroundColor: 'black' }}>Zip: {candidate.Zip} </li>
            <li style={{ backgroundColor: 'black' }}>Description: {candidate.userDescription} </li>
          </ul>
        </div>
      ))}
    </div>
  )
}
export default CandidateProfile
