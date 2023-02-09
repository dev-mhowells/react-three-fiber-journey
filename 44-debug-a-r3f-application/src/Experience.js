import { OrbitControls } from '@react-three/drei'
import { button, useControls } from 'leva'
import Cube from './Cube'
import { Perf } from 'r3f-perf'

export default function Experience()
{

    const { perfVisible } = useControls(
        {perfVisible: true,}
    )

    // const { position } = useControls({
    //     position: -2,
    // })

    // const { position } = useControls({
    //     position: {
    //         value: -2,
    //         min: -4,
    //         max: 4,
    //         step: 0.01,
    //     }
    // })

    // changing value to an object here will change position to an
    // object also where previously it was a value

    const { position, color, visible } = useControls('sphere', {
        position: {
            value: {x: -2, y: 0},
            min: -4,
            max: 4,
            step: 0.01,
            joystick: 'invertY'
        }, 
        color: '#ff0000',
        visible: true,
        myInterval:
        {
            min: 0,
            max: 10,
            value: [ 4, 5 ]
        },
        clickMe: button(() => {console.log('ok')}),
        choice: {options: ['a', 'b', 'c']}
    })

    const { scale } = useControls('cube', {
        scale:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5,
        }
    })

    console.log(position)

    return <>
        { perfVisible ? <Perf position="top-left"/> : null}
        

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={[position.x, position.y, 0]} visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        {/* this method is useful for debugging and editing Experience
        from the console */}
        <Cube scale={ scale }/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}