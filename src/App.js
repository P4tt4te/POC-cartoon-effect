import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
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

function Box2(props) {
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

export default function App() {
  return (
    <Canvas dpr={[1, 2]}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <group>
        <Box2 />
        <Box scale={[1.03, 1.03, 1.03]} />
      </group>
    </Canvas>
  )
}
