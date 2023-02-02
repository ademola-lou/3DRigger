import { states } from "../Utils/states";

export class Rigger {
    static bones = []; 
    static bonesNode = [];
    static boneDrawPlane;
    static getInstance(name){
        if(!this.skeleton){
            this.skeleton = new BABYLON.Skeleton(name??"_baseSkeleton", (name??"_baseSkeleton")+"ID", scene);
            this.boneDrawPlane = BABYLON.MeshBuilder.CreatePlane("drCanv", {size: 2});
            this.boneDrawPlane.visibility = 0.1
            this.boneDrawPlane.setEnabled(false);
            this.meshHighlighter = new BABYLON.HighlightLayer("hl", scene, {
                isStroke: true,
                blurHorizontalSize: 1,
                blurVerticalSize: 1,
                blurTextureSizeRatio: 3
            });
            
        }
        return this.skeleton;
    }
    static setDrawPlane(){
        this.boneDrawPlane.setEnabled(true);
        this.boneDrawPlane.position.copyFrom(scene.activeCamera.getFrontPosition(2));
        this.boneDrawPlane.lookAt(scene.activeCamera.target);
        return this.boneDrawPlane;
    }
    static createBone(name, parentBoneIndex){
        if(!parentBoneIndex){
            parentBoneIndex = this.bones.length-1;
        }
        let prevBone = this.bones.length > 0 ? this.bones[parentBoneIndex] : null;
        let prevNode = this.bonesNode.length > 0 ? this.bonesNode[parentBoneIndex] : null;
        
        if(this.bones.length === 0){
            name = "Root";
        }else if(name === undefined){
            name = "newbone"+this.bones.length;
        }

        let boneNode = Rigger.buildSpur(name+"_linkedNode", {}, scene);
        boneNode.index = this.bones.length;
        boneNode.position.set(0, this.bonesNode.length === 0 ? 0 : .3, 0);

        let bone = new BABYLON.Bone(name, this.skeleton, prevBone, BABYLON.Matrix.Translation(0, this.bonesNode.length === 0 ? 0 : .3, 0))//, BABYLON.Matrix.Identity(), BABYLON.Matrix.Identity(), this.bones.length);
        
        bone.linkTransformNode(boneNode);
        this.bones.push(bone);

        boneNode.parent = prevNode;
        this.bonesNode.push(boneNode);

        return bone;
    }
    /**
     * Create a simple transform for a mesh
     */
    static bindToMesh(mesh){
        mesh.skeleton = this.skeleton;
        let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        this.matricesWeights = [];
        this.matricesIndices = [];
        for(let ii = 0; ii<positions.length / 3; ii++){
            //add only one bone influence per vertex
            this.matricesWeights.push(1, 0, 0, 0);
            this.matricesIndices.push(0, 0, 0, 0);
        }
        mesh.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, this.matricesIndices, true);    
        mesh.setVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, this.matricesWeights, true);
    }
    /**
     * Create spur node
     */
    static buildSpur(name, params = {}, scene){
    if(!this.spurMaterial){
        this.spurMaterial = new BABYLON.StandardMaterial("spurMat");
        this.spurMaterial.specularColor = BABYLON.Color3.Black();
        this.spurMaterial.diffuseColor = BABYLON.Color3.Green().scale(2)
    }
	const myShape = [
		 	new BABYLON.Vector3(1, -1, 0), new BABYLON.Vector3(1, 1, 0), new BABYLON.Vector3(-1, 1, 0), new BABYLON.Vector3(-1, -1, 0), new BABYLON.Vector3(1, -1, 0)
	];
	
	const myPath = [
			new BABYLON.Vector3(0, 0, 0),
			new BABYLON.Vector3(0, 0.5, 0),
			new BABYLON.Vector3(0, 2, 0)
	];
	let h = myPath[2].subtract(myPath[1]).normalize().length();
    let midStepFactor = 0.5;

	const scaling = (index, distance) => {
        switch (index) {
        case 0:
        case 2:
        return 0;
        case 1:
            return (h * midStepFactor);
    }
    return 0

	};

	const extrusion = BABYLON.MeshBuilder.ExtrudeShapeCustom("star", {shape: myShape, path: myPath, scaleFunction: scaling, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    extrusion.scaling.y *= 3
    const ballB = BABYLON.MeshBuilder.CreateSphere("ballB", {diameter: 0.3, segments: 5})
    const ballT = BABYLON.MeshBuilder.CreateSphere("ballT", {diameter: 0.3, segments: 5})
    ballT.position.y = myPath[2].y * 3;

    let spurMesh = BABYLON.Mesh.MergeMeshes([extrusion, ballB, ballT]);
    spurMesh.scaling.set(0.05, 0.05, 0.05);
    spurMesh.bakeCurrentTransformIntoVertices()
    spurMesh.name = name;
    spurMesh.renderingGroupId = 1;
    spurMesh.material = this.spurMaterial;
    spurMesh.isSpur = true;
    return spurMesh

    }
    /**
     * Bind only specified vertices of a mesh
     */
    static bindVerticesFromMeshUsingIndex(indices, mesh, selectedBoneIndex, debug = true){
        if(!this.bones[selectedBoneIndex]){
            throw `bone ${selectedBoneIndex} does not exist!`
        }
        let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        
        for(let ii = 0; ii<positions.length / 3; ii++){
            
            let boneIndex = this.matricesIndices[(ii * 4)];
            let r_weight = 1;
            let b_weight = 0;

            for(let jj = 0; jj<indices.length; jj++){
                if(indices[jj] === ii){
                    if(debug){
                        const vert = new BABYLON.Vector3(positions[(ii*3)], positions[(ii*3 + 1)], positions[(ii*3 + 2)]);
                        Rigger.createDebugMarker(vert)
                    }
                    boneIndex = selectedBoneIndex;
                    r_weight = 0.23;
                    b_weight = 0.62;
                }
            }
            this.matricesIndices[(ii * 4)] = boneIndex;
            this.matricesWeights[(ii * 4)] = r_weight;
            this.matricesWeights[(ii * 4)+1] = b_weight; 
        }
        mesh.updateVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, this.matricesIndices);    
        mesh.updateVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, this.matricesWeights);
    }
    static createDebugMarker(position){
        let marker = BABYLON.MeshBuilder.CreateBox("_marker", {size: 0.5})
        marker.material = new BABYLON.BackgroundMaterial("mat")
        marker.material.useRGBColor = false
        marker.position.copyFrom(position)
        marker.material.primaryColor = BABYLON.Color3.Green()
    }

    static createSkeletonViewer(mesh, thickness, color, scene) {
    const viewer = new BABYLON.Debug.SkeletonViewer(this.skeleton, mesh, scene, true, 1, {
        displayMode: BABYLON.Debug.SkeletonViewer.DISPLAY_SPHERE_AND_SPURS/*DISPLAY_LINES*/,
        returnToRest: false
    });

    viewer.changeDisplayOptions('midStepFactor', thickness);
    viewer.debugMesh.material = new BABYLON.StandardMaterial('skeleton', scene);

    if (color) {
        viewer.debugMesh.material.diffuseColor = color;
    }

    return viewer;
    }

    static getControlNode(name){
        const mesh = scene.getNodeByName(name+"_linkedNode");
        return mesh;
    }

    static startVertexWeightPaint(mesh){
    // let marker = BABYLON.MeshBuilder.CreateSphere("_marker", {diameter: 0.2, segments: 1})
    // marker.isVisible = false;

    let camera = scene.activeCamera;
    const vertices = [];
    const positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
           
    let colors = [];
    let selectedVertexIndices = new Set();

    for(let i = 0; i<positions.length/3; i++){
        vertices.push(new BABYLON.Vector3(positions[(i * 3)], positions[(i * 3)+1], positions[(i * 3)+2]));
        colors.push(0.5, 0.5, 0.5, 0);
    }
    mesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors, true) 

    let targetVec = BABYLON.Vector3.Zero();
    let pointerDown = false;
    scene.onPointerObservable.add(()=>{
        let picker = scene.pick(scene.pointerX, scene.pointerY, (predicmesh)=>{
            return predicmesh === mesh;
        })
        if(picker.hit){
            pointerDown = true;
        }
    }, BABYLON.PointerEventTypes.POINTERDOWN);

    scene.onPointerObservable.add(()=>{
        if(pointerDown && (states.weightPaintEnabled || states.weightPaintEraserEnabled)){
        let picker = scene.pick(scene.pointerX, scene.pointerY, (predicmesh)=>{
            return predicmesh === mesh;
        })

        if(picker.hit){
            camera.detachControl()
            for(let j = 0; j<vertices.length; j++){
                BABYLON.Vector3.TransformCoordinatesToRef(vertices[j], picker.pickedMesh.getWorldMatrix(), targetVec);
                const distance = BABYLON.Vector3.Distance(targetVec, picker.pickedPoint);
                if(distance < states.brushRadius){
                    if(!states.weightPaintEraserEnabled){
                    colors[j * 4] = 1;
                    selectedVertexIndices.add(j);
                    }else{
                        colors[j * 4] = 0.5;
                        selectedVertexIndices.delete(j);
                    }
                }
            }
           mesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, colors); 
        }
     }
    }, BABYLON.PointerEventTypes.POINTERMOVE);

    scene.onPointerObservable.add(()=>{
        pointerDown = false;
        camera.attachControl()
    }, BABYLON.PointerEventTypes.POINTERUP);

    let firstBind = true;

    document.addEventListener("updateWeight", ()=>{
        if(this.bones.length > 0){
            if(selectedVertexIndices.size > 0){
                if(firstBind){
                    Rigger.bindToMesh(mesh);
                }

                let ind = Array.from(selectedVertexIndices);
                let boneIndex = states.selected_bone?.index ?? 0;

                console.log("selected bon",boneIndex);

                for(let i = 0; i<this.bones.length; i++){
                    let tNode = this.bones[i].getTransformNode();
                    tNode.computeWorldMatrix();

                    let bMat = tNode._localMatrix.clone();
                    this.bones[i].updateMatrix(bMat, true);
                }
               
                Rigger.bindVerticesFromMeshUsingIndex(ind, mesh, boneIndex, false);

                console.log("applying vertex paint");

                selectedVertexIndices.clear();
                // mesh.wireframeMesh.visibility = 0;
                colors = colors.map(val => 0.5);
                mesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
                firstBind = false;
            }
        }else{
            alert("no bones added!")
        }
    })
    
    }

    static testAnimation(targetName){
    const control0 = Rigger.getControlNode(targetName);

    const frameRate = 10;

    const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keyFrames = []; 

    keyFrames.push({
        frame: 0,
        value: 2
    });

    keyFrames.push({
        frame: frameRate,
        value: -2
    });

    keyFrames.push({
        frame: 2 * frameRate,
        value: 2
    });

    xSlide.setKeys(keyFrames);

    control0.animations.push(xSlide);

    scene.beginAnimation(control0, 0, 2 * frameRate, true);

    }
}