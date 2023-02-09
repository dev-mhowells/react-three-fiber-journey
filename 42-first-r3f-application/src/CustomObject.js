import * as THREE from 'three'
import { useEffect, useMemo, useRef } from 'react'

export default function customObject() {

    const geometryRef = useRef()


    const verticesCount = 10 * 3

    // useMemo here so calc is not done over and over if component
    // is ever re-rendered
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3)

        for(let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3
        }

        return positions
    }, [])

    // using standardMaterial inside bufferGeometry will result in
    // black shapes, because need to set normals, normals tell which
    // side the faces of the shapes are facing in order for them to react
    // to light.

    // GENERAL RULE - WHEN ACCESSING A NATIVE INSTANCE, YOU NEED A REF

    // UseEffect runs after DOM updates, in other words, after jsx has rendered
    // need to put this in useEffect because if try to call compute normals on
    // geometry ref before it is assigned in jsx, won't work
    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, [])

    // CREATING CUSTOM GEOMETRY: ---

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            {/* below will create geometry.attribute.position */}
            <bufferAttribute 
                attach='attributes-position'
                count={verticesCount}
                // itemsize is how many values should be used for each vertex
                itemSize={ 3 }
                array={positions}
            />
        </bufferGeometry>

        <meshStandardMaterial color="red" side={THREE.DoubleSide}/>
    </mesh>
}