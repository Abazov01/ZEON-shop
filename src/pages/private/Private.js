import React from 'react'
import History from './componentst/history/History'
import Total from './componentst/totaldata/Total'
import UserData from './componentst/userdata/UserData'


const style = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '53px 0'
}


export default function Private() {
  
  return (
    <div className='private'>
        <div className="container">
            <div style={style} className="private-wrapper">
                <UserData/>
                <Total/>
            </div>

            <History/>
        </div>
    </div>
  )
}
