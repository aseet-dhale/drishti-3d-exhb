import { PointerLockControls } from '@react-three/drei';
import React, {useState, useRef} from 'react';

const SPEED = 0.03;


export default function ModelControls() {
    const [isMobile,setIsMobile] = useState(false);
    const ref = useRef();
    const keyMap = {}
    const keyDown = (e) => {
        keyMap[e.code] = true;
        keyEvent();
    }
    const keyUp = (e) => {
        keyMap[e.code] = false;
        keyEvent();
    }
    const keyEvent = () => {
        if (keyMap['KeyW']){
            ref.current.moveForward(SPEED);
        }
        if (keyMap['KeyS']){
            ref.current.moveForward(-SPEED);
        }
        if (keyMap['KeyD']){
            ref.current.moveRight(SPEED);
        }
        if (keyMap['KeyA']){
            ref.current.moveRight(-SPEED);
        }
    }
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);
    return (
        <PointerLockControls
            ref={ref}
        />
    );
}