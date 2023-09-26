import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function VotingPage() {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const [checkBoxes, setCheckBoxes] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [userEmail, setUserEmail] = useState('');

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setAuth(true);
                    setUserEmail(res.data.email);
                    console.log(res.data);
                } else {
                    setAuth(false)
                }
            })
            .catch(err => console.log(err))
    }, [navigate]);

    const [candidates, setCandidates] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8081/getCandidates/list')
            .then(res => {
                setCandidates(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogOut = () => {
        axios.get('http://localhost:8081/user/logout')
            .then(res => {
                navigate('/');
            }).catch(err => console.log(err));
    };

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
            .then(res => {
                if (res.data.updated) {
                    handleLogOut();
                }
            })
            .catch(err => console.log(err));

        axios.put('http://localhost:8081/user/hasVoted', { email: userEmail })
            .then(res => {
                if (res.data.updated) {
                    handleLogOut();
                } else {
                    setErrorMessage('There was an error while trying to vote, please try again!')
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div style={{}}>
            <Link className='bg-dark text-white p-3 mb-2 w-100' to='/' style={{ position: 'absolute', height: '7%', textDecoration: 'none' }}>
                <div className="elections-container" style={{ fontSize: '30px' }}>
                    <strong>Elect</strong>ions
                </div>
            </Link>
            {
                auth ? (
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
