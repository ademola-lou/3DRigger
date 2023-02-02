import { Rigger } from "../../Library/Rigger";
import { states } from "../../Utils/states";
const higlightColor = new BABYLON.Color3(0, 1, 1);
let prevBoneSelected;
export function gizmoManager(){
     // Create utility layer the gizmo will be rendered on
     const utilLayer = new BABYLON.UtilityLayerRenderer(scene);

     // Create the gizmo and attach to the box
     const rotationGizmo = new BABYLON.RotationGizmo(utilLayer);

     // Keep the gizmo fixed to world rotation
     rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
     rotationGizmo.updateGizmoPositionToMatchAttachedMesh = true;

     const positionGizmo = new BABYLON.PositionGizmo(utilLayer);
     positionGizmo.updateGizmoRotationToMatchAttachedMesh = false;
     positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;


     scene.onPointerObservable.add(()=>{
       let pickResult = scene.pick(scene.pointerX, scene.pointerY, function predicate(mesh) {
            if (!mesh.name.includes("_linkedNode")) {
                return false;
            }
            return true;
        });	
        if(pickResult.hit){
            
            rotationGizmo.attachedMesh = pickResult.pickedMesh;
            states.selected_bone = rotationGizmo.attachedMesh;
            if(prevBoneSelected){
                if(Rigger.meshHighlighter.hasMesh(prevBoneSelected)){
                    Rigger.meshHighlighter.removeMesh(prevBoneSelected);
                }
            }

            if(pickResult.pickedMesh.name.includes("Root")){
                positionGizmo.attachedMesh = pickResult.pickedMesh;
            }

            Rigger.meshHighlighter.addMesh(pickResult.pickedMesh, higlightColor);
            prevBoneSelected = pickResult.pickedMesh;
        }
    }, BABYLON.PointerEventTypes.POINTERDOWN);

    scene.onPointerObservable.add(()=>{
        rotationGizmo.attachedMesh = null;
        positionGizmo.attachedMesh = null;
        states.selected_bone = null;
    }, BABYLON.PointerEventTypes.POINTERDOUBLETAP);


}