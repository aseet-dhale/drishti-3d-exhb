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
            position={[0, 0.5, 5]} // z = 2.glb = 5, 1.glb = 0
            ref={cameraRef}
            fov={35}
        />
    );
}

export default function DebugModel() {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [buttonEvent, setButtonEvent] = useState(null);
    const buttonEvents = {
        "buttonPressed": buttonPressed,
        "setButtonPressed": setButtonPressed,
        "buttonEvent": buttonEvent,
        "setButtonEvent": setButtonEvent,
    }
    // <div id="model-controls">
    //             <div>
    //                 {/* Forward */}
    //                 <button onClick={() => { setButtonEvent("forward"); setButtonPressed(true); }} onMouseUp={() => setButtonPressed(false)}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
    //                         <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
    //                     </svg>
    //                 </button>
    //             </div>
    //             <div>
    //                 {/* Left */}
    //                 <button onClick={() => { setButtonEvent("left"); setButtonPressed(true); }} onMouseUp={() => setButtonPressed(false)}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    //                         <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
    //                     </svg>
    //                 </button>
    //                 {/* Backward */}
    //                 <button onClick={() => { setButtonEvent("backward"); setButtonPressed(true); }} onMouseUp={() => setButtonPressed(false)}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
    //                         <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
    //                     </svg>
    //                 </button>
    //                 {/* Right */}
    //                 <button onClick={() => { setButtonEvent("right"); setButtonPressed(true); }} onMouseUp={() => setButtonPressed(false)}>
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
    //                         <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
    //                     </svg>
    //                 </button>
    //             </div>
    //         </div>
    return (
        <>
            
            <Canvas
                colorManagement
                style={{
                    // background: "radial-gradient(circle, rgba(182,26,26,1) 0%, rgba(154,0,6,1) 100%)"
                    background: "#f9f9f9"
                }}
            >
                <Camera />
                <Lights />
                <React.Suspense fallback={<LoaderMesh />}>
                    <ModelLoad />
                </React.Suspense>
                {/* <axesHelper args={[5]} /> */}
                <ModelControls buttonEvents={buttonEvents} />
                {/* <OrbitControls /> */}
            </Canvas>
        </>
    );
}