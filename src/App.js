import * as THREE from 'three'
import { useEffect, useRef, useState, forwardRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Selection, Select, EffectComposer, Outline } from '@react-three/postprocessing'
import { BackSide, FrontSide } from 'three'

function Box(props) {
  const ref = useRef()
  const [hovered, hover] = useState(null)
  console.log(hovered)
  return (
    <mesh ref={ref} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
      <torusKnotGeometry args={[0.6, 0.1]} />
      <meshLambertMaterial
        color="black"
        side={BackSide}
        onBeforeCompile={(shader) => {
          const token = `#include <begin_vertex>`
          const customTransform = `
        vec3 transformed = position + objectNormal*0.02;
    `
          shader.vertexShader = shader.vertexShader.replace(token, customTransform)
        }}
      />
    </mesh>
  )
}

function BoxFront(props) {
  const ref = useRef()
  const [hovered, hover] = useState(null)
  console.log('cc!')
  return (
    <mesh ref={ref} {...props} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
      <torusKnotGeometry args={[0.6, 0.1]} />
      <meshPhongMaterial color="yellow" side={FrontSide} />
    </mesh>
  )
}

function Car(props) {
  const group = useRef()
  const { nodes, materials, scene } = useGLTF('assets/test.glb')

  return <primitive ref={group} object={scene} dispose={null} />
}

export default function App() {
  return (
    <Canvas dpr={[1, 2]}>
      <OrbitControls />
      <ambientLight intensity={0.8} />
      <Car position={[0, 0, 0]} />
    </Canvas>
  )
}
