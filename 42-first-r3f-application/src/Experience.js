import { useThree, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { extend } from "@react-three/fiber"
import CustomObject from './CustomObject'

// can't actually get this working
extend({ OrbitControls }) // OrbitControls as OrbitControls

export default function Experience() {

    // useThree gives us state with camera in!
    const {camera, gl} = useThree()

    const cubeRef = useRef()
    const groupRef = useRef()

    // for animation:
    // to access the property of the reference, must use .current
    useFrame((state, delta) => {
        // this is a native 3js mesh!
        // access the delta to standardise rotation speed
        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta

        // ROTATING CAMERA:
        // const angle = state.clock.elapsedTime
        // state.camera.position.x = Math.sin(angle) * 8
        // state.camera.position.z = Math.cos(angle) * 8
        // state.camera.lookAt(0, 0, 0)
    })

    // try not to update geometry size too often, requires descruction and re-rendering
    // of the geometry. If you want to change size, change the scale of the mesh
    return <>
        {/* this doesn't work - errors */}
        {/* <OrbitControls args={[camera, gl.domElement]}/> */}

        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>

        <group ref={groupRef}>
            {/* this will call set on the scale: */}
            {/* <mesh scale={[2, 2, 1]}> */}
            {/* if all values are the same, can do this: */}
            {/* position x, y, z */}
            {/* <mesh scale={1.5} position={[2, 0, 0]}>  */}
            {/* note: always use numbers to specify units, not strings */}
            <mesh ref={cubeRef} scale={1.5} position-x={2} rotation-y={Math.PI * 0.25}> 
                {/* <boxGeometry args={[1.5, 32, 32]}/> */}
                {/* <meshBasicMaterial args={[{ color: 'red', wireframe: true}]}/> */}
                {/* can also write attributes like this: */}
                {/* <meshBasicMaterial color='purple' wireframe/> */}
                <boxGeometry scale={12} />
                <meshStandardMaterial color='mediumpurple' />
            </mesh>
            <mesh position-x={-2}>
                <sphereGeometry />
                <meshStandardMaterial color={'orange'}/>
            </mesh>
        </group>
            <mesh scale={10} rotation-x={Math.PI * -0.5} position-y={-1}>
                <planeGeometry />
                <meshStandardMaterial color='greenyellow'/>
            </mesh>

            <CustomObject />
        </>
}