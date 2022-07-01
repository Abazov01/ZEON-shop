import React from 'react'
import './userdata.scss'
import { useState } from 'react';
import PrivateModal from '../privateModal/PrivateModal';

export default function UserData() {
  const [modal, setModal] = useState()
  const user = JSON.parse(localStorage.getItem('currentUser'))
  return (
    <div className='userdata'>
      <div className='name'><span>{user.name+" "+user.surname}</span>  <span style={{cursor:'pointer'}} onClick={() => setModal(e => !e)} href="#">&#9998;</span></div>
      <div className='email'><span>Email: </span>{user.email}</div>
      <div className='phone'><span>Phone: </span>{user.phone}</div>
      <div className='country'><span>Country: </span>{user.country}</div>
      <div className='city'><span>City: </span>{user.city}</div>
      <div style={{display: modal ? 'block':'none'}}><PrivateModal setModal={setModal}></PrivateModal></div>
    </div>
  )
}
