varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vDirLight;

uniform vec3 directionalLight;
uniform vec3 ambientColor;
uniform vec3 pixelColor;

void main() {
  vNormal  = normalize(normalMatrix *normal);
  vPosition = position;

  vDirLight = normalize(modelViewMatrix * vec4(directionalLight,0.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}