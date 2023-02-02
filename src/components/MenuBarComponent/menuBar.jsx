import React, { useState } from 'react';

export function MenuBar(){
    return(
        <div className="navbar rounded-b top-bar shadow-lg border-b border-black flex flex-row gap-4 place-content-center" style={{
            width: "95%"
        }}>
            <div className='flex-1 gap-3 top-bar-tools' style={{color: "white"}}>
                <button className='btn btn-circle btn-ghost'>File</button>
                <button className='btn btn-circle btn-ghost'>Help</button>
                <button className='btn btn-circle btn-ghost'><i className='icon video'></i></button>
                <button className='btn btn-circle btn-ghost'>Import</button>
                </div>
                <div style={{float: "right"}}>
                    <img src="assets/images/launcherIcons/android-launchericon-192-192.png" className='w-16 rounded-full' />
                </div>
        </div>
    )
}