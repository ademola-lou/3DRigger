import React from 'react';
import { MenuBar } from './MenuBarComponent/menuBar';
import { SideBarRight } from './SideBarComponent/sideBar';
// import { SideBarRight } from './SideBarComponent/SideBarRight';
import { ViewportRenderer } from './ViewportComponent/ViewportRenderer';
export default function App() {
    return(
        <div>
            <MenuBar></MenuBar>
            <ViewportRenderer></ViewportRenderer>
            <SideBarRight></SideBarRight>
        </div>

    )
}