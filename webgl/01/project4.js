// This function takes the projection matrix, the translation, and two rotation angles (in radians) as input arguments.
// The two rotations are applied around x and y axes.
// It returns the combined 4x4 transformation matrix as an array in column-major order.
// The given projection matrix is also a 4x4 matrix stored as an array in column-major order.
// You can use the MatrixMult function defined in project4.html to multiply two 4x4 matrices in the same format.
function GetModelViewProjection( projectionMatrix, translationX, translationY, translationZ, rotationX, rotationY )
{
	// [TO-DO] Modify the code below to form the transformation matrix.
	var trans = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		translationX, translationY, translationZ, 1
	];
	var mvp = MatrixMult( projectionMatrix, trans );
	let cosX = Math.cos(rotationX);
	let sinX = Math.sin(rotationX);
	let cosY = Math.cos(rotationY);
	let sinY = Math.sin(rotationY);
	var rotX = [
		1, 0, 0, 0,
		0, cosX, sinX, 0,
		0, -sinX, cosX, 0,
		0, 0, 0, 1
	];
	var rotY = [
		cosY, 0, -sinY, 0,
		0, 1, 0, 0,
		sinY, 0, cosY, 0,
		0, 0, 0, 1
	];
	mvp = MatrixMult( mvp, rotX );
	mvp = MatrixMult( mvp, rotY );
	return mvp;
}


// [TO-DO] Complete the implementation of the following class.

const meshVS = `
	attribute vec3 vertexPos;
	attribute vec2 vertexTexCoords;
	uniform mat4 mvp;
	uniform bool swapYZ;
	varying vec2 texCoords;
	void main()
	{
		if( swapYZ )
			gl_Position = mvp * vec4( vertexPos.x, vertexPos.z, vertexPos.y, 1 );
		else
			gl_Position = mvp * vec4( vertexPos, 1 );
		texCoords = vertexTexCoords;
	}
`;

const meshFS = `
	precision mediump float;
	uniform sampler2D texture;
	uniform float showTexture;
	varying vec2 texCoords;
	void main()	
	{
		if( showTexture > 0.5 )
			gl_FragColor = texture2D( texture, texCoords );
		else
			gl_FragColor = vec4( 1, gl_FragCoord.z*gl_FragCoord.z, 0, 1 );
	}
`;


class MeshDrawer
{
	// The constructor is a good place for taking care of the necessary initializations.
	constructor()
	{
		// [TO-DO] initializations
		this.numTriangles = 0;
		this.program = InitShaderProgram(meshVS, meshFS);
		this.mvp = gl.getUniformLocation( this.program, "mvp" );
		this.texture = gl.getUniformLocation( this.program, "texture" );
		this.showTextureLoc = gl.getUniformLocation( this.program, "showTexture" );
		this.showTexture = 0.0;
		this.swapYZLoc = gl.getUniformLocation( this.program, "swapYZ" );
		this.swapYZ = false;

		this.vertPos = gl.getAttribLocation( this.program, "vertexPos" );
		this.textureCoords = gl.getAttribLocation( this.program, "vertexTexCoords" );

		this.vertexBuffer = gl.createBuffer();
		this.texCoordsBuffer = gl.createBuffer();

		this.showWireFrame = false;
	}
	
	// This method is called every time the user opens an OBJ file.
	// The arguments of this function is an array of 3D vertex positions
	// and an array of 2D texture coordinates.
	// Every item in these arrays is a floating point value, representing one
	// coordinate of the vertex position or texture coordinate.
	// Every three consecutive elements in the vertPos array forms one vertex
	// position and every three consecutive vertex positions form a triangle.
	// Similarly, every two consecutive elements in the texCoords array
	// form the texture coordinate of a vertex.
	// Note that this method can be called multiple times.
	setMesh( vertPos, texCoords )
	{
		// [TO-DO] Update the contents of the vertex buffer objects.
		this.numTriangles = vertPos.length / 3;
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertPos ), gl.STATIC_DRAW );

		gl.bindBuffer( gl.ARRAY_BUFFER, this.texCoordsBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( texCoords ), gl.STATIC_DRAW );
		
	}
	
	// This method is called when the user changes the state of the
	// "Swap Y-Z Axes" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	swapYZFun( swap )
	{
		// [TO-DO] Set the uniform parameter(s) of the vertex shader
		// based on the value of the argument.
		// swap is a boolean (true or false)
		this.swapYZ = swap;
	}

	showWireFrameFun( show )
	{
		this.showWireFrame = show;
	}
	
	// This method is called to draw the triangular mesh.
	// The argument is the transformation matrix, the same matrix returned
	// by the GetModelViewProjection function above.
	draw( trans )
	{
		// [TO-DO] Complete the WebGL initializations before drawing
		gl.useProgram( this.program );

		gl.uniformMatrix4fv( this.mvp, false, trans );
		gl.uniform1i( this.texture, 0 );
		gl.uniform1f( this.showTextureLoc,  this.showTexture);

		gl.uniform1i( this.swapYZLoc, this.swapYZ? 1 : 0 );

		gl.enableVertexAttribArray( this.vertPos );
		gl.enableVertexAttribArray( this.textureCoords );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vertexBuffer );
		gl.vertexAttribPointer( this.vertPos, 3, gl.FLOAT, false, 0, 0 );
		gl.bindBuffer( gl.ARRAY_BUFFER, this.texCoordsBuffer );
		gl.vertexAttribPointer( this.textureCoords, 2, gl.FLOAT, false, 0, 0 );

		if(this.showWireFrame)
		{
			gl.drawArrays( gl.LINES, 0, this.numTriangles );
		}
		else
		{
			gl.drawArrays( gl.TRIANGLES, 0, this.numTriangles );
		}
	}
	
	// This method is called to set the texture of the mesh.
	// The argument is an HTML IMG element containing the texture data.
	setTexture( img )
	{
		// [TO-DO] Bind the texture
		gl.bindTexture( gl.TEXTURE_2D, gl.createTexture() );
		// You can set the texture image data using the following command.
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img );

		// [TO-DO] Now that we have a texture, it might be a good idea to set some uniform parameter(s) of the fragment shader, so that it uses the texture.
		gl.generateMipmap( gl.TEXTURE_2D );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR );
		gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

	}
	
	// This method is called when the user changes the state of the
	// "Show Texture" checkbox. 
	// The argument is a boolean that indicates if the checkbox is checked.
	showTextureFun( show )
	{
		// [TO-DO] set the uniform parameter(s) of the fragment shader to specify if it should use the texture.
		this.showTexture = show ? 1.0 : 0.0;
		// gl.useProgram( this.program );
		// gl.uniform1i( this.showTextureLoc, this.showTexture );
	}
	
	
}
