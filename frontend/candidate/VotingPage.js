import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../User/Contexts/userContext';

function VotingPage() {
    const { user, loggedIn, setLoggedIn } = useAuth();
    const [checkBoxes, setCheckBoxes] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/getCandidates/list')
            .then(res => {
                setCandidates(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const userLogOut = () => {
        axios.get('http://localhost:8081/user/logout')
            .then(res => {
                localStorage.removeItem('authToken');
                setLoggedIn(false);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    const handleCheckBoxChange = (id, email) => {
        setCheckBoxes(prevState => ({
            ...prevState,
            [id]: !prevState[id] ? email : undefined,
        }));
    };

    const handleVotesSubmit = () => {
        const selectedEmail = Object.values(checkBoxes).filter(email => email);

        if (selectedEmail.length > 1) {
            setErrorMessage('You can choose only one candidate');

            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        axios.put('http://localhost:8081/user/updateVotes', { email: selectedEmail })
            .catch(err => console.log(err));

        axios.put('http://localhost:8081/user/hasVoted', { email: user.email })
            .then(res => {
                if (res.data.updated) {
                    userLogOut();
                } else {
                    setErrorMessage('There was an error while trying to vote, please try again!')
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Link className='bg-dark text-white p-3 mb-2 w-100' to='/' style={{ position: 'absolute', height: '7%', textDecoration: 'none' }}>
                <div className="elections-container" style={{ fontSize: '30px' }}>
                    <strong>Elect</strong>ions
                </div>
            </Link>
            {
                loggedIn ? (
                    <div style={{ position: 'absolute', top: '15%', left: '36%' }}>
                        <div className='d-flex justify-content-center mt-3' style={{ maxWidth: '100%', borderRadius: '10%', border: '5px solid black', backgroundColor: 'grey' }}>
                            <h1 style={{ color: 'white' }} >Candidates List:</h1>
                            <ul>
                                {candidates.map(candidate => (
                                    <div key={candidate.id} to={`/user/candidate/${candidate.id}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id={`flexCheckDefault-${candidate.id}`}
                                                checked={!!checkBoxes[candidate.id]}
                                                onChange={() => handleCheckBoxChange(candidate.id, candidate.email)}
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                {candidate.name}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                            {Object.values(checkBoxes).some(checked => checked) && (

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleVotesSubmit}>
                                    Vote
                                </button>

                            )}
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ position: 'absolute', top: '20%' }}>
                        <Link to='/login' className='btn btn-primary'>Login Now</Link>
                        <h3 style={{ color: 'white' }}>Please relog
                        </h3>
                    </div>
                )}
        </div>
    )
}
export default VotingPage
