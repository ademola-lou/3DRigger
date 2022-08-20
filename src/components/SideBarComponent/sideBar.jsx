import React, { useEffect } from 'react';
import { states } from '../../Utils/states';

export function SideBarRight(){
    
function expandBoneLayer(){
    $('.RightsideBarTools').transition('fade down');
}

function addBone(boneName){

    let new_bone = document.querySelector(".myUL").cloneNode(true);
    let nodes = Array.from(new_bone.childNodes[0].childNodes)

    nodes[0].style.color = "white";
    nodes[0].innerHTML = boneName;

    nodes[0].addEventListener("click", function() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
    new_bone.classList.add(boneName+"_node");
    new_bone.classList.replace("hidden", "visible");
    new_bone.name = boneName;
    
    document.querySelector(".BoneLayerView").appendChild(new_bone);

    
return new_bone;
}
function setBoneParent(rootBoneName, childBoneName){
    let rootBoneNode = document.querySelector("."+rootBoneName+"_node");
    let childBoneNode = document.querySelector("."+childBoneName+"_node");

    let collectorNode = Array.from(rootBoneNode.childNodes[0].childNodes)[1];

    collectorNode.appendChild(childBoneNode);
}

function toggleColor(ev){
    if(!ev.target.state){
        ev.target.state = {
            toggleOff: false
        }
    }
    ev.target.state.toggleOff = !ev.target.state.toggleOff;

    ev.target.style.color = ev.target.state.toggleOff ? "red" : "white";
}

function startWeightPaint(ev){
    toggleColor(ev);
    states.weightPaintEnabled = !states.weightPaintEnabled;
    document.dispatchEvent(new CustomEvent("prepareWeightPaint"));
}

function toggleEraser(ev){
    toggleColor(ev);
    states.weightPaintEraserEnabled = !states.weightPaintEraserEnabled;
}

useEffect(()=>{

    // let prevBoneNode;
    // document.addEventListener("addBone",  ev=>{
    //     let newBoneNode = addBone(ev.detail.boneName);
    //     if(prevBoneNode){
    //         setBoneParent(prevBoneNode.name, newBoneNode.name)
    //     }
    //     prevBoneNode = newBoneNode;
    // });
}, [])

    return(
        <div className='sideBarRight flex flex-col' style={{width: "50px"}}>
        <div className='flex flex-col gap-2'>
         <div className='btn' onClick={expandBoneLayer}><i className="bi bi-grid-3x3-gap"></i></div>

         <div className='RightsideBarTools flex flex-col gap-0 bg-grey border rounded shadow-lg' style={{background: "black"}}>
         <i className="icon-button bi bi-brush m-5" style={{width: "50%", height: '100%'}} onClick={startWeightPaint}></i>
         <i className="icon-button bi bi-eraser m-5" style={{width: "50%", height: '100%'}} onClick={toggleEraser}></i>
         <i className="icon-button bi bi-circle-fill m-5" style={{width: "50%", height: '100%', color: "red"}}></i>
         </div>
         </div>
            {/* <div className='BoneLayerView ui list rounded border-l border-black' style={{height: "100%", width: "100%", transform: "translate(0%, 0%)", background: "rgba(0, 0, 0, .5)"}}>
     
            <ul className="myUL hidden">
                <li><span className="caret" style={{width: "100%", height: "100%"}}>Beverages</span>
                    <ul className="nested">
                        
                        </ul>
                    </li>
                </ul>

              <div className="item single hidden">
                <i className="folder icon"></i>
                    <div className="content">
                    <div className="header" style={{color: "white"}}>Bone</div>
                    </div>
                    <div className='list'></div>
                    </div>
                <div className="list parented hidden">
                <div className="item">
                <i className="folder icon"></i>
                    <div className="content">
                    <div className="header" style={{color: "white"}}>Bone</div>
                    </div>
                </div>
                </div>

            </div> */}
        </div>
    )
}