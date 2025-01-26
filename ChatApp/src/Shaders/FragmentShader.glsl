varying vec3 vPosition;
varying vec3 vNormal;


uniform vec3 directionalLight;
uniform vec3 ambientColor;
uniform vec3 pixelColor;


void main() {

  vec3 normalDir = normalize(directionalLight);
  vec3 normalNor = normalize(vNormal); 
  vec3 colorDiff = vec3(1,1,1);

  float diffuse = max(dot(normalNor, normalDir),0.0);
  vec3 color = diffuse * colorDiff;

  vec3 ambient = pixelColor * ambientColor  * vec3(0.8,0.3,0.0);

  //vec3 color = vec3(1.0, 1.0, 1.0);

  gl_FragColor = vec4(color + ambient, 1.0); 
}