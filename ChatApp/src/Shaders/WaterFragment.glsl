varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBiTangent;
varying vec3 vDirLight;

uniform sampler2D uTex;
uniform sampler2D uNormTex;
uniform float uTime;



void main() {
    vec4 mainColor =  texture2D(uTex,vUv);

    vec3 normColor = texture2D(uNormTex, vUv).rgb;
     vec3 normal = normalize(normColor * 2.0 - 1.0);
        normal.x *= sin(uTime/2.0) *0.3; 

    
      mat3 TBN =  mat3(normalize(vTangent), normalize(vBiTangent), normalize(vNormal));
      vec3 worldNormal = normalize(TBN * normal);

     float diffuse = max(dot(worldNormal, vDirLight), 0.0);
   

   
 // uv.x += cos(uTime) * 0.1;
  gl_FragColor = vec4(mainColor.rgb * diffuse, mainColor.a);
   }