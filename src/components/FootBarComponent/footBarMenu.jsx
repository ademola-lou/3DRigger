import React, { useState } from 'react';
import { toggleColor } from '../../Utils/ui-utils';

export function FootBarMenu(){
    let[footBarUpMenuActive, toggleFootBarUpMenu] = useState(true);
    function openAnimationMenu(ev){
        toggleColor(ev);
        document.querySelector(".foot-bar-up").style.left = footBarUpMenuActive ? "25%" : "-100%";

        toggleFootBarUpMenu(!footBarUpMenuActive);
    }

    function openLayersMenu(ev){
        toggleColor(ev);
        document.querySelector(".foot-bar-up").style.left = footBarUpMenuActive ? "50%" : "-100%";

        toggleFootBarUpMenu(!footBarUpMenuActive);
    }
    return(
        <div className="navbar rounded foot-bar shadow-lg place-content-center" style={{
            width: "35%",
        }}>
            <div className='flex flex-row gap-4'>
            <i className="icon-button bi bi-film" onClick={openAnimationMenu}></i>
            <i className="icon-button bi bi-layers" onClick={openLayersMenu}></i>
            </div>
        </div>
    )
}