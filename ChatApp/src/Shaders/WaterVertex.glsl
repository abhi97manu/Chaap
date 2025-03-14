varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBiTangent;
varying vec3 vDirLight;


uniform float uTime;
uniform vec3 directionalLight;
void main() {

  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec3 tangent = normalize(normalMatrix  * vec3(1.0, 0.0, 0.0));
 vec3 bitangent = normalize(cross(normal, tangent) * 1.0);

 vTangent = tangent;
 vBiTangent = bitangent;
  vec3 pos = position;
  pos.y += cos(uTime/2.0) * 0.03;
  pos.z += sin(uTime/2.0) * 0.03;

   

   vDirLight = normalize(modelViewMatrix * vec4(directionalLight,1.0)).xyz;

   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


 