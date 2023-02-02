import React, { useEffect, useState } from 'react';
import { states } from '../../Utils/states';
import { Pane } from 'tweakpane';

export function SideBarRight(){

function updateBrushRadius(ev){
    states.brushRadius = ev.target.value / 1000;
    
}

function toggleColor(ev){
    ev.target.style.color = ev.target.style.color === "red" ? "white" : "red";
    if(ev.target.id === "weightBrush"){
        document.getElementById("weightEraser").style.color = "white";
    }else{
        document.getElementById("weightBrush").style.color = "white";
    }
}

function startWeightPaint(ev){
    toggleColor(ev);
    states.weightPaintEnabled = !states.weightPaintEnabled;
    document.dispatchEvent(new CustomEvent("prepareWeightPaint"));
}

function toggleEraser(ev){
    toggleColor(ev);
    states.weightPaintEnabled = false;
    states.weightPaintEraserEnabled = !states.weightPaintEraserEnabled;
}
function setButtonIcon(tab){
    const button = tab.controller_.ic_.view.titleElement;
}

function toggleBoneDebug(mode){
    document.dispatchEvent(new CustomEvent("toggleBoneDebug", {detail: {
        debugMode: mode
    }}));
}

let[boneCount, setBoneCount] = useState(0);

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

useEffect(()=>{
    const pane = new Pane({
        title: "Inspector"
    });
    pane.containerElem_.id = "sideBarPanel";
    
    const tab = pane.addTab({
        pages: [
          {title: 'Tools'},
          {title: 'Bones'},
          {title: 'Settings'}
        ],
      });
    const addBoneButton = tab.pages[1].addButton({
        title: 'Add Bone'
    }).on('click', addBone);

    const bindBoneToMeshVerts = tab.pages[1].addButton({
        label: "Bind to vertices",
        title: 'apply'
    }).on('click', bindBones);

    const bindBoneToMesh = tab.pages[1].addButton({
        label: "Bind to mesh",
        title: 'apply'
    });

    const debugMode = tab.pages[1].addBlade({
        view: 'list',
        label: 'Debug mode',
        options: [
          {text: 'Brush Paint', value: 'B'},
          {text: 'Weight Paint', value: 'W'},
          {text: 'Texture', value: 'T'},
        ],
        value: 'B',
      });
    debugMode.on('change', d =>{
        toggleBoneDebug(d.value);
    })
    const motionPath = tab.pages[0].addFolder({
        title: 'MotionPath',
      });
    motionPath.addButton({
        title: 'Add points'
      });

    //   const boneLists = tab.pages[1].addFolder({
    //     title: 'Bone(s)',
    //   });
    //   const boneListContainer = boneLists.controller_.view.element
    //   boneListContainer.style.overflowY = "auto";
    //   boneListContainer.style.height = "100px";

    //   addBoneNode(boneLists, "head")
    //   addBoneNode(boneLists, "fin")
    //   addBoneNode(boneLists, "gills")
    //   addBoneNode(boneLists, "tail")

    const importSkeletonButton = tab.pages[1].addButton({
        title: 'Import Skeleton'
    })
    scene.debugLayer.show({embedMode: true, enableClose: false, enablePopup: false}).then(()=>{
        document.getElementById("bottomPart").style.display = "none";
        document.getElementById("title").textContent = "Scene Heirachy";
        // document.getElementById("title").style.color = "blue"
        document.getElementById("embed").style.touchAction = "none"
    })
}, [])

    return(
        <div className='sideBarRight flex flex-col' style={{width: "50px", height: "100%"}}>
        <div className='flex flex-col gap-2'>
         <div className='RightsideBarTools flex flex-col gap-0 bg-grey border rounded shadow-lg' style={{background: "black"}}>
         <i className="icon-button bi bi-brush m-5" style={{width: "50%", height: '100%'}} id="weightBrush" onClick={startWeightPaint}></i>
         <i className="icon-button bi bi-eraser m-5" style={{width: "50%", height: '100%'}} id="weightEraser" onClick={toggleEraser}></i>
         <i className="icon-button bi bi-bounding-box m-5"style={{width: "50%", height: '100%'}}></i>
         </div>
         
         </div>
         <div className='brushRadiusContainer bg-grey border rounded shadow-lg' style={{background: "black"}}>
         <input type="range" min="0" max="100" defaultValue={50} orient="vertical" className="range" onChange={updateBrushRadius}/>
         </div>
        </div>
    )
}
export function addBoneNode(parent, name){
    const newboneNode = parent.addFolder({
        title: name,
    });
}