import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileInfo() {
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('User.email@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [nameEditable, setNameEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [phoneEditable, setPhoneEditable] = useState(false);
  const userDetails = useSelector(state => state.userDetails);

  //console.log('usrr',userDetails)

  const handleEditName = () => {
    setNameEditable(true);
  };

  const handleEditEmail = () => {
    setEmailEditable(true);
  };

  const handleEditPhone = () => {
    setPhoneEditable(true);
  };

  return (
    <div className='border p-3 shadow rounded'>
      <div>
      <div className='d-flex justify-content-between mt-3'>
            <label className='fw-bold '>Name</label>  
            <button onClick={handleEditName} className='btn '>
              {nameEditable ? 'Save' : 'Edit'}
            </button>
      </div>
        <input type="text" value={userDetails==null ? '' : userDetails.username} disabled={!nameEditable}onChange={(e) => setName(e.target.value)} className='form-control '/>
       
      </div>
      <div>

      <div className='d-flex justify-content-between mt-3'>
            <label className='fw-bold'>Email</label>
            <button onClick={handleEditEmail} className='btn'>
              {emailEditable ? 'Save' : 'Edit'}
            </button>
      </div>
       <input type="text" value={ userDetails==null ? '' : userDetails.email} disabled={!emailEditable}onChange={(e) => setEmail(e.target.value)} className='form-control'/>
      </div>
      <div>
       <div className='d-flex justify-content-between mt-3'>
            <label className='fw-bold'>Phone</label>
            <button onClick={handleEditPhone} className='btn'>
              {phoneEditable ? 'Save' : 'Edit'}
            </button>
       </div>
        <input type="text" value={userDetails==null ? '' : userDetails.phone} disabled={!phoneEditable}onChange={(e) => setPhone(e.target.value)} className='form-control'/>
      </div>
    </div>
  );
}

export default ProfileInfo;
