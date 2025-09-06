let endDest = null;
let depTime = null;
let delayIndicator = null;
let depStops = null;


function create(ctx, state, pids) {
	//print("Hello, World!");
}

function render(ctx, state, pids) {
	Texture.create("Background")
	.texture("jsblock:textures/background.png")
	.size(76, 76)
	.draw(ctx);

	lcdBackgrounds(ctx, state, pids);

	topBackgrounds(ctx, state, pids);

	departure(ctx, state, pids);

	
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
}

function lcdBackgrounds(ctx, state, pids) {
	for (let i = 3; i < 9; i++) {
		Texture.create("")
		.texture("jsblock:textures/orangebkg.png")
		.size(64.4, 5.4)
		.pos(5.8, 9.8 + (i * 7.5))
		.draw(ctx);
	}
}

function topBackgrounds(ctx, state, pids) {
	for (i = 0; i < 2; i++) {
		Texture.create("")
		.texture("jsblock:textures/orangebkg.png")
		.size(64.4, 9.15)
		.pos(5.8, 9.8 + (i * 11.25))
		.draw(ctx);
	}
}

function departure(ctx, state, pids) {
	Text.create()
	.text("London Euston")
	.scale(0.75)
	.font("minecraft:lumedium")
	.color(0xff9900)
	.pos(5.8, 9.8)
	.draw(ctx);
}