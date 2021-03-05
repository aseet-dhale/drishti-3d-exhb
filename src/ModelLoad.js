import React, { useRef } from 'react';
import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import MODEL from './Models/2.glb';

const ModelMesh = () => {
    const gltf = useLoader(GLTFLoader, MODEL);
    console.log("MODEL => ", gltf);
    return <primitive object={gltf.scene}/>;
}

export default function ModelLoad(){
    return(
        <group>
            <mesh receiveShadow>
                <ModelMesh />
            </mesh>
        </group>
    );
}