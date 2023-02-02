export async function loadModel(url, ext){
    let container = scene.getMeshByName("modelContainer");
    if(scene.getMeshByName("modelContainer")){
        container.dispose();
    }
    if(!ext){
        ext = url.split('.').pop();
    }

    let result = await BABYLON.SceneLoader.ImportMeshAsync("", url, "", scene, null, `.${ext}`);
    container = new BABYLON.Mesh("modelContainer");

    let targetMesh;
    result.meshes.forEach(mesh=>{
        if(mesh.geometry){
           mesh.originalMaterial = mesh.material.clone();
        //    mesh.scaling.scaleInPlace(2);
           targetMesh = mesh;
        }
    })
    
    container.normalizeToUnitCube();
    

    return result.meshes[1];
}