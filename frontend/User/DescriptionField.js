import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DescriptionField() {
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [userDescription, setUserDescription] = useState([]); // aici primesc valoarea noua pusa si o trimis catre server
    const [readOnlyDescription, setReadOnlyDescription] = useState([]);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Succes") {
                    setEmail(res.data.email);
                    setUserDescription(res.data.userDescription);
                    setReadOnlyDescription(res.data.userDescription);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/user/updateDescription', { email, userDescription })
        setUserDescription(userDescription);
        setReadOnlyDescription(userDescription);
        setEditing(false);
    };

    const handleCancelClick = () => {
        setUserDescription(userDescription);
        setEditing(false);
    };

    return (
        <div className='mt-5' style={{ maxWidth: '30%', position: 'relative', left: '36%' }}>
            {editing ? (

                <div>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={userDescription}
                        onChange={event => setUserDescription(event.target.value)}
                    > </textarea>
                    <button className="btn btn-info mt-2" onClick={handleSaveClick}>
                        Save
                    </button>
                    <button className="btn btn-secondary mt-2" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>

            ) : (
                <div className='' style={{ width: '100%', backgroundColor: 'rgb(97, 95, 95)', bottom: '50%' }}>
                    <strong className='fs-5' style={{ color: 'white' }}>Description</strong>
                    <p className='text-center' style={{ color: 'white', backgroundColor: 'rgb(97, 95, 95)', width: '100%' }}>
                        {readOnlyDescription}</p>
                    <button className="btn btn-secondary mb-2" style={{ color: 'white', width: '100%' }}
                        onClick={handleEditClick}>
                        Edit Description
                    </button>
                </div>
            )}
        </div>
    );
}
export default DescriptionField;
