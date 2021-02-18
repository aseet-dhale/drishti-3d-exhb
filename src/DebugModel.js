import { OrbitControls, PerspectiveCamera, PointerLockControls, TrackballControls, useHelper } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { CameraHelper, DirectionalLightHelper, PointLightHelper } from 'three';
import ModelControls from './ModelControls';
import ModelLoad from './ModelLoad';
const LoaderMesh = () => {
    return (
        <group>
            <mesh>
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color={"pink"} />
            </mesh>
        </group>
    );
}

const Lights = () => {
    const dLight = useRef();
    const pLight = useRef();
    const mesh = useRef();
    // useFrame(() => {
    //     mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += -0.05;
    // })
    // useHelper(dLight, DirectionalLightHelper);
    // useHelper(pLight, PointLightHelper);
    return (
        <>
            <mesh ref={mesh}>
                <ambientLight intensity={0.75} />
                {/* <pointLight ref={pLight} position={[0, -2, -2]} intensity={1} /> */}
                <directionalLight ref={dLight} intensity={1} />
            </mesh>
        </>
    );
}

const Camera = () => {
    const cameraRef = useRef();
    // useHelper(cameraRef, CameraHelper, 1, 'hotpink');
    return (
        <PerspectiveCamera
            makeDefault={true}
            position={[0, 0.5, 0]}
            ref={cameraRef}
            fov={35}
        />
    );
}

export default function DebugModel() {
    return (
        <>
            <Canvas 
                colorManagement
                style={{
                    background: "radial-gradient(circle, rgba(182,26,26,1) 0%, rgba(154,0,6,1) 100%)"
                    // background: "#f9f9f9"
                }}
            >
                <Camera />
                <Lights />
                <React.Suspense fallback={<LoaderMesh />}>
                    <ModelLoad />
                </React.Suspense>
                <axesHelper args={[5]} />
                <ModelControls />
            </Canvas>
        </>
    );
}