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
        isCameraLocked = !isCameraLocked;
        let camera = scene.activeCamera;
        if(isCameraLocked){
            camera.detachControl();
            targetMesh.material = paintmat;
            targetMesh.wireframeMesh.visibility = 1;
        }else{
            camera.attachControl(canvas, true);
        }
    }

    
    document.addEventListener("prepareWeightPaint", prepareWeightPaintFunc);
    

    let targetBoneIndex = 0;
    let materialIndex = 0;
    let BoneWeightShaderMat = BABYLON.SkeletonViewer.CreateBoneWeightShader(
        {
            skeleton,
            targetBoneIndex
        }, 
        scene)

    let isBoneWeightmatActive = false;
    let toggleBoneDebugFunc = function(ev){
        switch(materialIndex){
            case 0: 
                targetMesh.material = defaultmat;
                targetMesh.wireframeMesh.visibility = 0;
            break;
            case 1:
                targetMesh.material = paintmat;
                targetMesh.wireframeMesh.visibility = 1;
            break;
            case 2:
                if(targetMesh.skeleton){
                    targetMesh.material = BoneWeightShaderMat;
                    targetMesh.wireframeMesh.visibility = 0;
                }else{
                    targetMesh.material = defaultmat;
                    targetMesh.wireframeMesh.visibility = 0;
                }
            break;
        }
        isBoneWeightmatActive = materialIndex === 2 && targetMesh.skeleton;

        materialIndex = ++materialIndex % 3;
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