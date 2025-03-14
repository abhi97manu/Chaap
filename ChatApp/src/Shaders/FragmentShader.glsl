varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vDirLight;


uniform vec3 directionalLight;
uniform vec3 ambientColor;
uniform vec3 pixelColor;


void main() {

  vec3 colorDiff = vec3(0.4,0.7,0.7);

  

  float diffuse = max(dot(vNormal, vDirLight),0.0);
  vec3 color = diffuse * colorDiff;

  vec3 ambient = pixelColor  * (ambientColor + color);

  //vec3 color = vec3(1.0, 1.0, 1.0);

  gl_FragColor = vec4(color * ambient, 1.0); 
}