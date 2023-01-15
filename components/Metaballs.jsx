import { useEffect, useRef } from "react";
import MB from './shaders/mb.js';
// this code was written by daniel kasabov. he is my hero. 
export default function Metaballs({classes}) {
	const canvas = useRef(null);

	useEffect(() => {
		if (!canvas.current["getContext"]) {
			return;
		}

		let gl = canvas.current.getContext("webgl");
		checkResize(gl.canvas);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		let NUM_METABALLS = 25;
		let WIDTH = canvas.current.clientWidth;
		let HEIGHT = canvas.current.clientHeight;
		if(WIDTH < 768){
			NUM_METABALLS = 5;
		}
		else if(WIDTH < 1024){
			NUM_METABALLS = 10;
		}



		let vShader = compileShader(gl, MB.vertexShader, gl.VERTEX_SHADER);
		let fShader = compileShader(
			gl,
			MB.fragmentShader(NUM_METABALLS, WIDTH, HEIGHT),
			gl.FRAGMENT_SHADER
		);

		let program = gl.createProgram();
		gl.attachShader(program, vShader);
		gl.attachShader(program, fShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		var vertexData = new Float32Array([
			-1.0,
			1.0, // top left
			-1.0,
			-1.0, // bottom left
			1.0,
			1.0, // top right
			1.0,
			-1.0, // bottom right
		]);
		var vertexDataBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

		var positionHandle = getAttribLocation(gl, program, "position");
		gl.enableVertexAttribArray(positionHandle);
		gl.vertexAttribPointer(
			positionHandle,
			2, // position is a vec2
			gl.FLOAT, // each component is a float
			gl.FALSE, // don't normalize values
			2 * 4, // two 4 byte float components per vertex
			0 // offset into each span of vertex data
		);

		var metaballs = [];

		for (var i = 0; i < NUM_METABALLS; i++) {
			var radius = Math.random() * 100  + 20;
			metaballs.push({
				x: Math.random() * (WIDTH - 2 * radius) + radius,
				y: Math.random() * (HEIGHT - 2 * radius) + radius,
				vx:
					(Math.trunc(((Math.random() * 1) / radius) * 100) + 1) *
					generateRandomSign(),
				vy:
					(Math.trunc(((Math.random() * 1) / radius) * 100) + 1) *
					generateRandomSign(),
				r: radius,
			});
		}

		var metaballsHandle = getUniformLocation(gl, program, "metaballs");
		var timeHandle = getUniformLocation(gl, program, "time");
		let reqId;

		var step = function (time) {
			gl.clearColor(0, 0, 0, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			// Update positions and speeds
			for (var i = 0; i < NUM_METABALLS; i++) {
				var mb = metaballs[i];

				mb.x += mb.vx;
				if (mb.x - mb.r < 0) {
					mb.x = mb.r + 1;
					mb.vx = Math.abs(mb.vx);
				} else if (mb.x + mb.r > WIDTH) {
					mb.x = WIDTH - mb.r;
					mb.vx = -Math.abs(mb.vx);
				}
				mb.y += mb.vy;
				if (mb.y - mb.r < 0) {
					mb.y = mb.r + 1;
					mb.vy = Math.abs(mb.vy);
				} else if (mb.y + mb.r > HEIGHT) {
					mb.y = HEIGHT - mb.r;
					mb.vy = -Math.abs(mb.vy);
				}
			}

			// To send the data to the GPU, we first need to
			// flatten our data into a single array.
			var dataToSendToGPU = new Float32Array(3 * NUM_METABALLS);
			for (var i = 0; i < NUM_METABALLS; i++) {
				var baseIndex = 3 * i;
				var mb = metaballs[i];
				dataToSendToGPU[baseIndex + 0] = mb.x;
				dataToSendToGPU[baseIndex + 1] = mb.y;
				dataToSendToGPU[baseIndex + 2] = mb.r;
			}
			gl.uniform3fv(metaballsHandle, dataToSendToGPU);
			gl.uniform1f(timeHandle, time/1000.0);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			reqId = requestAnimationFrame(step);
		};

		step();

		return () => {
			cancelAnimationFrame(reqId);
		};
	}, [canvas]);

	const getUniformLocation = (gl, program, name) => {
		var uniformLocation = gl.getUniformLocation(program, name);
		if (uniformLocation === -1) {
			throw "Can not find uniform " + name + ".";
		}
		return uniformLocation;
	};

	const generateRandomSign = () => {
		if (Math.random() < 0.5) {
			return 1;
		}
		return -1;
	};

	const compileShader = (gl, source, type) => {
		let shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw (
				"Shader compilation failed with: " + gl.getShaderInfoLog(shader)
			);
		}

		return shader;
	};

	const getAttribLocation = (gl, program, name) => {
		var attributeLocation = gl.getAttribLocation(program, name);
		if (attributeLocation === -1) {
			throw "Can not find attribute " + name + ".";
		}
		return attributeLocation;
	};

	const checkResize = (canvas) => {
		// Lookup the size the browser is displaying the canvas in CSS pixels.
		const displayWidth = canvas.clientWidth;
		const displayHeight = canvas.clientHeight;

		// Check if the canvas is not the same size.
		const needResize =
			canvas.width !== displayWidth || canvas.height !== displayHeight;

		if (needResize) {
			// Make the canvas the same size
			canvas.width = displayWidth;
			canvas.height = displayHeight;
		}

		return needResize;
	};

	const deleteCanvas = () => {};

	return (
		<div className="">
			<canvas
				ref={canvas}
				className={classes}
			></canvas>
		</div>
	);
}
