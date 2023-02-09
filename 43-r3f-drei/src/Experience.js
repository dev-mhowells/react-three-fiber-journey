import { Trail, useTrail, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{

    const cubeRef = useRef()
    const sphereRef = useRef()
    const trailRef = useRef()

    return <>

        {/* makeDefault makes it so the orbit controls freeze when clicking
        on scene to drag an object - because now other helpers can access
        this camera and will deactivate it's controls when needs to*/}
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        {/* when placing pivot controls on object, need to provide an anchor
        with coords which are in relation to the object inside, values are
        also relative to object, 1 on y axis will put it exactly on top. 
        depthtest false puts controls on top of object instead of inside*/}
        <PivotControls 
        anchor={ [0, 0, 0]} 
        depthTest={false} 
        lineWidth={4}
        axisColors={ ['#9381ff', '#ff4d6d', '#7ae582']}
        // to keep the size the same while camera moves in and out:
        scale={100}
        fixed={ true }
        >
            <mesh position-x={ - 2 } ref={sphereRef}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                {/* center centers pizot point of html element, 'label' is class name 
                distance factor controls scale as zoom out*/}
                <Html 
                position={ [1, 1, 0]}
                wrapperClass='label'
                center
                distanceFactor={6}
                occlude={ [sphereRef, cubeRef]}
                >Sphere</Html>
            </mesh>
        </PivotControls>
        {/* to link transformControls with the cube we need to give the cube
        a ref and provide that ref to tranformControls object */}

        <mesh ref={ cubeRef } scale={ 1.5 } position-x={ 2 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <TransformControls object={cubeRef} mode="rotate"/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/* <meshStandardMaterial color="greenyellow" /> */}
            {/* reflection material only works on planar meshes */}
            <MeshReflectorMaterial 
                resolution={ 512 }
                blur={[1000, 1000]}
                mixBlur={ 1 }
                mirror={0.75}
                color="greenyellow"
            />
        </mesh>

    <Float speed={4} floatIntensity={3}>

        {/* woff is the lightest font format */}
        <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={1}
            color="salmon"
            position-y={2}

            maxWidth={2}
            textAlign="center"
        >I LOVE R3F
        {/* can change material of font just like this: */}
            <meshNormalMaterial />
        </Text>
    </Float>

    {/* <Trail
        width={0.7} // Width of the line
        color={'#F8D628'} // Color of the line
        length={1} // Length of the line
        decay={1} // How fast the line fades away
        local={true} // Wether to use the target's world or local positions
        stride={0} // Min distance between previous and current point
        interval={1} // Number of frames to wait before next calculation
          target={trailRef} // Optional target. This object will produce the trail.
        // attenuation={(width) => width} // A function to define the width in each point along it.
        />
        {/* If `target` is not defined, Trail will use the first `Object3D` child as the target. */}
        {/* <Float speed={5} floatIntensity={10} ref={trailRef}>
        <mesh>
            <sphereGeometry />
            <meshBasicMaterial color="blue"/>
        </mesh>
        </Float> */}
        {/* You can optionally define a custom meshLineMaterial to use. */}
        {/* <meshLineMaterial color={"red"} />  */}


      <Trail
        width={1}
        length={4}
        color={'#F8D628'}
        attenuation={(t: number) => {
          return t * t
        }}
        target={trailRef}
      />
      <Float speed={5} floatIntensity={10} ref={trailRef}>
      <mesh>
            <sphereGeometry />
            <meshNormalMaterial color="blue"/>
        </mesh>
      </Float>


    </>
}