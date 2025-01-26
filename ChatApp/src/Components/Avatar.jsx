import React from 'react'
import {Canvas} from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { DirectionalLight } from 'three'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'; 
import vertexShader from '../Shaders/VertexShader.glsl'
import fragmentShader from '../Shaders/FragmentShader.glsl'

export const Avatar = () => {


   //Load Shaders 

 const AvatarShader  = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    directionalLight: {value : new THREE.Vector3(50,10,0)},
    ambientColor : {value : new THREE.Color(0.5,0.8,0.8)},
    pixelColor : {value : new THREE.Color(0.9,0.8,0.4)},
  }
 })
  //load Models
  const gltf = useLoader(GLTFLoader, '/src/assets/boy.glb'); 
  gltf.scene.traverse((child) =>
{
  if (child.isMesh) child.material = AvatarShader;
})






  return (
    <>
  <div className='w-full h-screen'>
    <Canvas className='bg-zinc-300'>
       
     
      <directionalLight intensity = {0.7} position = {[1,10,5]} color = "white" castShadow /> 
      
      {/* <ambientLight intensity={1.5} /> */}
       <mesh position={[0, 1, -5]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry/>
        <shaderMaterial vertexShader={vertexShader}
        fragmentShader={fragmentShader}></shaderMaterial>
        {/* <meshStandardMaterial color="blue" /> */}
        
        
      </mesh> 

      ///Plane

      <mesh position={[0, -1, 0]} rotation={[80, 0, 0]} scale= {[10,10,10]} >
        <planeGeometry />
        <meshStandardMaterial color="green" />
        
      </mesh> 
      <OrbitControls/>
      {<primitive object = {gltf.scene} castShadow scale={[1,1,1]} position = {[0,-0.8,0]}>
      
      </primitive> }
    </Canvas>
    </div>
    </>
  )
}
export default Avatar
