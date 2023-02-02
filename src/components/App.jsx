import React from 'react';
import { FootBarMenu } from './FootBarComponent/footBarMenu';
import { FootBarMenuUp } from './FootBarComponent/footBarMenuUp';
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
            <FootBarMenuUp></FootBarMenuUp>
            <FootBarMenu></FootBarMenu>
        </div>

    )
}