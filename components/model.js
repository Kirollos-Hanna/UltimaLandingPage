
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export default function Model(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/deer.glb')
    const { actions } = useAnimations(animations, group)
    const { viewport } = useThree()

    const moveDeer = (speed) => {
        if (group.current.position.x < 2.5) {
            group.current.position.x = speed
        } else {
            actions.Walk.stop().crossFadeTo(actions.Idle, 0.5, false)
        }
    }
    useEffect(() => {
        actions.Walk.timeScale = 0.4
        actions.Walk.play();
    })
    
    useFrame(({ clock }) => {
        moveDeer(clock.getElapsedTime() / 2)
        // TODO change rotation of head to mouse position / raycasting(?)
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group
                position={[-(viewport.width/2)-0.5, -2.8, 0]}
                rotation={[1.45, 0, 54.8]}
                scale={[0.15, 0.15, 0.15]}
            >
                <primitive object={nodes.Root} />
                <primitive object={nodes.IKHindLegPoleL} />
                <primitive object={nodes.IKFrontLegL} />
                <primitive object={nodes.IKHindTargetL} />
                <primitive object={nodes.IKFrontTargetL} />
                <primitive object={nodes.IKHindLegPoleR} />
                <primitive object={nodes.IKFrontLegR} />
                <primitive object={nodes.IKHindTargetR} />
                <primitive object={nodes.IKFrontTargetR} />
                <skinnedMesh
                    geometry={nodes.deer_1.geometry}
                    material={materials.Mat}
                    skeleton={nodes.deer_1.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.deer_2.geometry}
                    material={materials['Material.001']}
                    skeleton={nodes.deer_2.skeleton}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/deer.glb')