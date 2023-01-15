precision highp float;
uniform float time;
uniform float vec2[10];

const float WIDTH = ${w}.0;
const float HEIGHT = ${h}.0;

float ripple(float x) {
	if (x == 0) {
		return 1;
	}
	return sin(x) / x;
}

void main() {
	
}