// this code is written by daniel kasabov. he is my hero. 

var ballVertexShader = `
attribute vec2 position;

void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`;

var ballFragmentShader = (c, w, h) => `
precision highp float;
uniform vec3 metaballs[${c}];
uniform float time;
const float WIDTH = ${w}.0;
const float HEIGHT = ${h}.0;

void main() {
	float x = gl_FragCoord.x;
	float y = gl_FragCoord.y;
	float v = 0.0;
	for (int i = 0; i < ${c}; i++) {
		vec3 mb = metaballs[i];
		float dx = mb.x - x;
		float dy = mb.y - y;
		float r = mb.z;
		v += r*r/(dx * dx + dy * dy);
	}
	float p = 1.0-y/HEIGHT;
	if (v > 1.0) {
		gl_FragColor = vec4(min(x/WIDTH + 0.5, 1.0) - p, 0, 1.0 - p, 1);
	} else {
		float mult = v * 0.6;
		gl_FragColor = vec4((min(x/WIDTH + 0.5, 1.0) - p) * mult, 0, (1.0-p) * mult, 1);
	}
}
`;

var _ = `
precision highp float;
const int NUM_METABALLS = 15;

uniform vec3 metaballs[15];
uniform vec2 uResolution;
uniform sampler2D uColorSampler;
uniform sampler2D uNoiseSampler;
uniform float uTime;

  void main(){
	float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float v = 0.0;
  float radius = 2.0;
  float speed = 1.5;
  for (int i = 0; i < NUM_METABALLS; i++) {
	  vec3 mb = metaballs[i];
		  float dx = mb.x - x;
		  float dy = mb.y - y;

	float r = mb.z;
	v += r*r/(dx*dx + dy*dy);
	  }

  vec4 color;
  if (v > 1.0) {
	  vec4 textureColor = texture2D(uColorSampler, vec2(gl_FragCoord.x / uResolution.x, gl_FragCoord.y / uResolution.y) );
	vec4 noiseColor = (texture2D(uNoiseSampler, gl_FragCoord.xy / 100.0 )) / 1.;
	float l = length(noiseColor);
	if(l > 1.05){
		vec4 mixedColor = textureColor + (noiseColor * 0.001);
			  color = mixedColor;
		  }
	else{
		//discard;
	  color = textureColor * 0.85;
		  }
	  }
  else {
	  discard;
	  }
  gl_FragColor = vec4(color.rgb, 0.8);
  }`;

export default {
	vertexShader: ballVertexShader,
	fragmentShader: ballFragmentShader
};
