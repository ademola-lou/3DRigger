import React, { useEffect } from 'react';
import { AppEventListener } from '../../Events/appEvents';
import { gizmoManager } from './GizmoManager';
import { loadModel } from './LoadModelUtils';
import { ViewportCam } from './ViewportCamera';

async function renderScene(canvas){
    const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
    const scene = new BABYLON.Scene(engine);
    scene.useRightHandedSystem = true;
    window.scene = scene;
    window.canvas = canvas;

    scene.clearColor = new BABYLON.Color3.Gray();
    
    function renderLoop(){
     scene.render();
    }
     // Resize
     window.addEventListener("resize", function () {
        engine.resize();
    });
    engine.runRenderLoop(renderLoop);
    
    const camera = new ViewportCam();
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1;

    let url = "assets/models/fish.glb"
    let targetMesh = await loadModel(url);
    

    let wireframeMesh = targetMesh.clone();
    wireframeMesh.material = new BABYLON.StandardMaterial("wiremat");
    wireframeMesh.material.diffuseColor = BABYLON.Color3.Green();
    wireframeMesh.material.wireframe = true;
    wireframeMesh.visibility = 0;

    targetMesh.wireframeMesh = wireframeMesh;

    global.targetMesh = targetMesh;

    gizmoManager();
    
    AppEventListener();
    
    var helper = scene.createDefaultEnvironment({
        enableGroundMirror: true,
        groundShadowLevel: 0.6,
    });       

    helper.setMainColor(new BABYLON.Color3.FromHexString("#40E0D0"));


}
export function ViewportRenderer(){
    let renderCanvas = React.createRef();
    useEffect(() => {
        renderScene(renderCanvas.current);
    }, [])
    return (
        <canvas id="renderCanvas" ref={renderCanvas}></canvas>
    )
}