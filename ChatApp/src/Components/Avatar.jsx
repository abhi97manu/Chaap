import React, { useEffect, useState, useRef } from 'react'
import {Canvas} from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { DirectionalLight } from 'three'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'; 
import vertexShader from '../Shaders/VertexShader.glsl'
import fragmentShader from '../Shaders/FragmentShader.glsl'
import waterVertex from '../Shaders/WaterVertex.glsl'
import waterFragment from '../Shaders/WaterFragment.glsl'
import { sin } from 'three/tsl'


export const Avatar = () => {

const [Theta, setTheta] = useState();
  const waterShaderRef = useRef();
  const planeRef = useRef();
 

  const clock = new THREE.Clock();
  useEffect(() => {
   
   
    const interval = setInterval(() => {
     if (waterShaderRef.current)
     {
      waterShaderRef.current.uniforms.uTime.value = clock.getElapsedTime();
     waterShaderRef.current.uniforms.directionalLight.value = [20* Math.cos(clock.getElapsedTime() *0.1),20* Math.sin(clock.getElapsedTime() * 0.1),0 ]

     }
    
      if(planeRef.current)
     {
     // console.log(planeRef.current.material.uniforms)
      //planeRef.current.uniforms.ambientColor.value = [1,1,1]
      planeRef.current.material.uniforms.directionalLight.value = [20* Math.cos(clock.getElapsedTime() * 0.1),20* Math.sin(clock.getElapsedTime() * 0.1),0 ];
      }
    },16);
    setTheta(clock.getElapsedTime() * 1);
  },[])


   



   //Load Shaders 

 const AvatarShader  = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    directionalLight: {value : new THREE.Vector3([10,10,10])},
    ambientColor : {value : new THREE.Color(0.8,0.9,0.9)},
    pixelColor : {value : new THREE.Color(0.0,0.8,0.4)},
  }
 })


  //load Models

  //Boy Model load
  const gltf = useLoader(GLTFLoader, '/assets/boy.glb'); 
  gltf.scene.traverse((child) =>
{
  
  if (child.isMesh) child.material = AvatarShader;
  
})
;
//Plane Model load
const plane = useLoader(GLTFLoader, '/assets/testTerrain.glb');
   plane.scene.traverse((child) =>
 {

   if (child.isMesh) child.material = AvatarShader;
})




//Load Textures

const waterTexture = new THREE.TextureLoader().load('/Textures/WaterTex.jpg');
const waterNormTexture = new THREE.TextureLoader().load('/Textures/WaterNORM.jpg');





  return (
    <>
  <div className='w-full h-screen'>
    <Canvas className='bg-zinc-300' camera={ {position : [-10,10,15]}}>
       
    <OrbitControls/>
     
      
      {/* <ambientLight intensity={1.5} /> */}
       <mesh position={[20 *Math.cos(Theta ), 20*  Math.sin(Theta ), 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry/>
        <shaderMaterial vertexShader={vertexShader}
        fragmentShader={fragmentShader}></shaderMaterial>
        {/* <meshStandardMaterial color="blue" /> */}
        
        
      </mesh> 

     {/* water model */}

      <mesh position={[55, -2, -60]} rotation={[Math.PI/2, 0, 0]} scale= {[30,40,30]} castShadow >
        <planeGeometry />
        <shaderMaterial ref = {waterShaderRef} vertexShader={waterVertex} fragmentShader={waterFragment}  side = {THREE.DoubleSide}
        uniforms={
          {
            uTex: {value : waterTexture},
            uNormTex : {value : waterNormTexture},
            uTime : {value : 0},
            directionalLight: {value : new THREE.Vector3([10,10,10]).normalize()},
          }
        }/>
      </mesh> 

    {/* boy model */}
      <primitive object = {gltf.scene} castShadow scale={[1,1,1]} position = {[0,-0.8,0]}>
        </primitive> 

     {/* plane model */}  
      <primitive ref = {planeRef} object = {plane.scene} material = {AvatarShader} castShadow scale={[1,1,1]} position = {[0,-0.8,0]}>
      
      </primitive> 
    </Canvas>
    </div>
    </>
  )
}
export default Avatar
