import { Rigger } from "../Library/Rigger";
import { states } from "../Utils/states";

export function AppEventListener(){
    const skeleton = Rigger.getInstance();
    
    let addBoneFunc = function(){
        Rigger.createBone("newBone", states.selected_bone?.index);
    }
    document.addEventListener("addBone", addBoneFunc);

    let isCameraLocked = false;

    let defaultmat = targetMesh.material;
    let paintmat = new BABYLON.StandardMaterial("mat");
    paintmat.emissiveColor = BABYLON.Color3.Gray();
    paintmat.specularColor = BABYLON.Color3.Black();
    
    let prepareWeightPaintFunc = function(){
        // isCameraLocked = !isCameraLocked;
        // let camera = scene.activeCamera;
        // if(isCameraLocked){
        //     camera.detachControl();
        //     targetMesh.material = paintmat;
        //     targetMesh.wireframeMesh.visibility = 1;
        // }else{
        //     camera.attachControl(canvas, true);
        // }
        targetMesh.material = paintmat;
        targetMesh.wireframeMesh.visibility = 1;
    }

    
    document.addEventListener("prepareWeightPaint", prepareWeightPaintFunc);
    

    let targetBoneIndex = 0;
    let BoneWeightShaderMat = BABYLON.SkeletonViewer.CreateBoneWeightShader(
        {
            skeleton,
            targetBoneIndex
        }, 
        scene)

    let isBoneWeightmatActive = false;
    let toggleBoneDebugFunc = function(ev){
        const debugMode = ev.detail.debugMode;
        switch(debugMode){
            case "T": 
                targetMesh.material = defaultmat;
                targetMesh.wireframeMesh.visibility = 0;
            break;
            case "B":
                targetMesh.material = paintmat;
                targetMesh.wireframeMesh.visibility = 1;
            break;
            case "W":
                if(targetMesh.skeleton){
                    targetMesh.material = BoneWeightShaderMat;
                    targetMesh.wireframeMesh.visibility = 0;
                }else{
                    targetMesh.material = defaultmat;
                    targetMesh.wireframeMesh.visibility = 0;
                }
            break;
        }
        isBoneWeightmatActive = debugMode === "W" && targetMesh.skeleton;
    }
    
    let checkActiveBoneWeight = function(){
        if(isBoneWeightmatActive){
            targetBoneIndex = states.selected_bone?.index ?? 0;
            BoneWeightShaderMat.setFloat("targetBoneIndex", targetBoneIndex);
        }
    }
    scene.onBeforeRenderObservable.add(checkActiveBoneWeight);

    document.addEventListener("toggleBoneDebug", toggleBoneDebugFunc)

    Rigger.startVertexWeightPaint(global.targetMesh);
}