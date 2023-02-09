import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    // react three fiber hooks can only be called on components inside Canvas
        <Canvas
            // orthographic
            // flat
            // this clamps pixel ratio to be min 1 max 2
            // don't need this because it is set as default anyway
            // dpr={[1, 2]}
            gl={{
                antialias: false,
                // toneMapping: THREE.CineonToneMapping    
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
                position: [3, 2, 6],
                // zoom: 100
            }}
        >
            <Experience />
        </Canvas>
)