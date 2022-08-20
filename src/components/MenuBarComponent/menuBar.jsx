import React, { useState } from 'react';

export function MenuBar(){
    let[boneCount, setBoneCount] = useState(0);
    let[isBoneDebugEnabled, enableBoneDebug] = useState(true);

    function addBone(){
        let boneName = "Bone"+boneCount;
        if(boneCount === 0){
            boneName = "rootBone";
        }
        document.dispatchEvent(new CustomEvent("addBone", {detail: {boneName: boneName}}));
        setBoneCount(boneCount + 1);
    }

    function bindBones(){
        document.dispatchEvent(new CustomEvent("updateWeight"))
    }
    
    function toggleBoneDebug(){
        enableBoneDebug(!isBoneDebugEnabled);

        document.dispatchEvent(new CustomEvent("toggleBoneDebug"));
    }
    return(
        <div className="navbar rounded-b top-bar shadow-lg border-b border-black" style={{
            width: "95%"
        }}>
            <div className='flex-1 gap-5 top-bar-tools' style={{color: "white"}}>
                <button className='btn btn-circle btn-ghost' onClick={addBone}>Bone</button>
                <button className='btn btn-circle btn-ghost' onClick={bindBones}>Bind</button>
                <button className='btn btn-circle btn-ghost'>Ik</button>
                <button className='btn btn-circle btn-ghost'><i className='icon video'></i></button>
                <button className='btn btn-circle btn-ghost' onClick={toggleBoneDebug}>Debug</button>
                <button className='btn btn-circle btn-ghost' onClick={toggleBoneDebug}>Import</button>
                </div>
        </div>
    )
}