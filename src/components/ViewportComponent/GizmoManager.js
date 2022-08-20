import { states } from "../../Utils/states";

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
            if(pickResult.pickedMesh.name.includes("Root")){
                positionGizmo.attachedMesh = pickResult.pickedMesh;
            }
        }
    }, BABYLON.PointerEventTypes.POINTERDOWN);

    scene.onPointerObservable.add(()=>{
        rotationGizmo.attachedMesh = null;
        positionGizmo.attachedMesh = null;
        states.selected_bone = null;
    }, BABYLON.PointerEventTypes.POINTERDOUBLETAP);


}