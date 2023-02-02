import React, { useState, useEffect } from 'react';

export function FootBarMenuUp(){
    useEffect(()=>{
        // console.log("ping...")
        // var target = {
        //     name1: 1,
        //     name2: 2,
        //     name3: 3
        // };
        
        // // // initialize timeliner
        // var timeliner = new Timeliner(target);
        // timeliner.addLayer('name1');
        // timeliner.addLayer('name2');
        // timeliner.addLayer('name3');
        
        // timeliner.load({"version":"1.2.0","modified":"Mon Dec 08 2014 10:41:11 GMT+0800 (SGT)","title":"Untitled","layers":[{"name":"x","values":[{"time":0.1,"value":0,"_color":"#893c0f","tween":"quadEaseIn"},{"time":3,"value":3.500023,"_color":"#b074a0"}],"tmpValue":3.500023,"_color":"#6ee167"},{"name":"y","values":[{"time":0.1,"value":0,"_color":"#abac31","tween":"quadEaseOut"},{"time":0.5,"value":-1.000001,"_color":"#355ce8","tween":"quadEaseIn"},{"time":1.1,"value":0,"_color":"#47e90","tween":"quadEaseOut"},{"time":1.7,"value":-0.5,"_color":"#f76bca","tween":"quadEaseOut"},{"time":2.3,"value":0,"_color":"#d59cfd"}],"tmpValue":-0.5,"_color":"#8bd589"},{"name":"rotate","values":[{"time":0.1,"value":-25.700014000000003,"_color":"#f50ae9","tween":"quadEaseInOut"},{"time":2.8,"value":0,"_color":"#2e3712"}],"tmpValue":-25.700014000000003,"_color":"#2d9f57"}]});
        // // TimelinelayerCabinetPanel.style.left = "100px"
        // document.querySelector(".foot-bar-up").appendChild(TimelinelayerCabinetPanel)
    }, [])
    return(
        // <div className="rounded foot-bar-up shadow-lg place-content-center" style={{
        //     width: "90%",
        // }}>
        <div className="rounded foot-bar-up shadow-lg place-content-center" style={{
            zIndex: "5"
            // width: "90%",
        }}>
            {/* style={{transform: "translate(3%, 10%)", width: "90%"}} */}
            {/* <div className='flex flex-row gap-5'>
                <div className='flex flex-col gap-3' style={{height: "100%"}}>
                <i className="icon-button bi bi-circle"></i>
                <i className="icon-button bi bi-play"></i>
                <i className="icon-button bi bi-trash"></i>
                </div>
                <div className="rounded border-l timelinePlayer" style={{
                        width: "100%",
                        height: "100%",
                        background: "#2e5090",
                        borderColor: "silver"
                    }}>
                        Test
            </div>
            </div> */}
        </div>
    )
}