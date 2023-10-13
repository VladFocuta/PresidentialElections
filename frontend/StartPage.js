import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaSignInAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import NavBar from './NavBar';
import Logout from './Logout';
import { useAuth } from '../User/Contexts/userContext';

function StartPage() {
    const {user,loggedIn} = useAuth();
    const isCandidate = user.Candidate ? 1 : 0;
    const hasVoted = user.Voted ? 1 : 0;

    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/getCandidates/list')
            .then(res => {
                const sortedCandidates = res.data.sort((a, b) => b.Votes - a.Votes);
                setCandidates(sortedCandidates);
            })
            .catch(err => console.log(err));
    }, []);

    const [totalVotes, setTotalVotes] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8081/user/totalVotes')
            .then(res => {
                setTotalVotes(res.data.totalVotes || 0);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <NavBar />
            <div className="elections-container" style={{ fontSize: '30px', color: 'white' }}>
                <strong >Elect</strong>ions
            </div>
            <div style={{ position: 'absolute', top: '15%', left: '36%' }}>
                <div className='d-flex justify-content-center mt-3' style={{ maxWidth: '100%', borderRadius: '10%', border: '5px solid black', backgroundColor: 'grey' }}>
                    <h1 className='mt-1' style={{ color: 'white' }} >Candidates List :</h1>
                    <ul style={{ listStyle: 'none', padding: 20 }}>
                        {candidates.map(candidate => (
                            <Link
                                key={candidate.id}
                                to={`/candidate/${candidate.id}`}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid #ccc',
                                    padding: '10px 0',
                                    display: 'block',
                                    transition: 'background-color 0.2s',
                                }}
                                className="candidate-link"
                            >
                                <h3 className="elections-container"><FaUser /> {candidate.name}</h3>
                                <div>  ({((candidate.Votes / totalVotes) * 100).toFixed(2)} % of total)</div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            {
                loggedIn ? (
                    <div>

                        <div style={{ position: 'absolute', right: '8%', top: '1%' }}>
                            <Logout />
                        </div>
                        <div style={{ position: 'absolute', top: '20%', maxWidth: '100%', left: '1%' }}>
                            <Link className="btn btn-primary w-100 mx-auto my-auto" style={{ color: 'white', fontSize: '20px', backgroundColor: 'rgb(49, 41, 41)', borderBlockColor: 'black' }} to='/home' type="button"> <FaUser /> Go to Profile</Link>
                        </div>

                        {isCandidate ?
                            <div style={{ position: 'absolute', top: '30%', maxWidth: '100%', left: '1%' }}>
                                <h2 className='text-decoration-underline'> You are a Candidate <FaCheck style={{ color: 'green', fontSize: '24px' }} /></h2>
                            </div>
                            :
                            <div style={{ position: 'absolute', top: '28%', maxWidth: '100%', left: '1%' }}>
                                <Link className="btn btn-primary w-100 mx-auto my-auto" style={{ color: 'white', fontSize: '20px', backgroundColor: 'rgb(49, 41, 41)', borderBlockColor: 'black' }} to='/PartElections' type="button"> <FaUserPlus />  Participate to Elections</Link>
                            </div>
                        }

                        {
                            hasVoted ?
                                <div style={{ position: 'absolute', top: '39%', maxWidth: '100%', left: '1%' }}>
                                    <h2 className='text-decoration-underline'> You already voted <FaCheck style={{ color: 'green', fontSize: '24px' }} /></h2>
                                </div>
                                :
                                <div style={{ position: 'absolute', top: '36%', maxWidth: '100%', left: '1%' }}>
                                    <Link className="btn btn-primary w-100 mx-auto my-auto" style={{ color: 'white', fontSize: '20px', backgroundColor: 'rgb(49, 41, 41)', borderBlockColor: 'black' }} to='/VotingPage' type="button"> <FaEnvelope size={24} color="white" /> Vote</Link>
                                </div>
                        }
                    </div>
                ) : (
                    <div style={{ position: 'absolute', top: '20%', left: '1%' }}>
                        <Link to='/login' className='btn btn-primary'> <FaSignInAlt /> Login Now</Link>
                        <h3 style={{ color: 'white' }}>to your account!
                        </h3>
                    </div>
                )}
        </div>
    )
}

export default StartPage
