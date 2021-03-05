import { DeviceOrientationControls, OrbitControls, PointerLockControls, TrackballControls } from '@react-three/drei';
import React, { useState, useRef, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { extend, useThree } from 'react-three-fiber';

const SPEED = 0.03;


export default function ModelControls(props) {
    const { camera, gl } = useThree();
    const pointerlC = useRef();
    const orbitC = useRef();
    const keyMap = {}
    const keyDown = (e) => {
        keyMap[e.code] = true;
        keyEvent();
    }
    const keyUp = (e) => {
        keyMap[e.code] = false;
        keyEvent();
    }
    console.log("PROPS => ", props);
    const keyEvent = () => {
        if (keyMap['KeyW'] && !isMobile) {
            pointerlC.current.moveForward(SPEED);
        }
        if (keyMap['KeyS'] && !isMobile) {
            pointerlC.current.moveForward(-SPEED);
        }
        if (keyMap['KeyD'] && !isMobile) {
            pointerlC.current.moveRight(SPEED);
        }
        if (keyMap['KeyA'] && !isMobile) {
            pointerlC.current.moveRight(-SPEED);
        }
    }
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    // useEffect(() => {
    //     if (props.buttonEvents.buttonPressed){
    //         console.log("HMMMMMMm => ",props.buttonEvents.buttonEvent);
    //         const pos = camera.position;
    //         const state = props.buttonEvents.buttonEvent;
    //         if(state === "left"){
    //             pos.x -= SPEED;
    //             camera.position.set(pos.x,pos.y,pos.z);
    //         }
    //         if(state === "right"){
    //             pos.x += SPEED;
    //             camera.position.set(pos.x,pos.y,pos.z);
    //         }
    //         if(state === "forward"){
    //             pos.z += SPEED;
    //             camera.position.set(pos.x,pos.y,pos.z);
    //         }
    //         if(state === "backward"){
    //             pos.z -= SPEED;
    //             camera.position.set(pos.x,pos.y,pos.z);
    //         }
    //         camera.updateMatrix();
    //     }
    // });

    return (
        <>
            {!isMobile ? (<PointerLockControls
                ref={pointerlC} />)
                : (
                    <>
                        <OrbitControls
                            // ref={orbitC}
                            // maxPolarAngle={Math.PI / 2}
                            // enableZoom={false}
                        />
                    </>
                )}
        </>
    );
}