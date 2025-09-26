include(Resources.id("jsblock:scripts/pidsutils.js"));
let boardNum = 1;

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	Texture.create("Background")
	.texture("jsblock:textures/background.png")
	.size(76, 76)
	.draw(ctx);

	PIDSUtil.lcdBackgrounds(ctx, 1.55);

	departure(ctx, state, pids);
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
}

function departure(ctx, state, pids) {
	boardNum = PIDSUtil.getBoardNum(pids);
	let arrival = pids.arrivals().get(boardNum - 1);
	if (arrival != null) {
		let route = arrival.route().getPlatforms(); //Gets platforms of all stops of the route
		let i2 = 0; // i2 is used for positioning, as i is artificially higher

		PIDSUtil.type2Stops(route, ctx, 5, 12, 1.55)

		tocIndicator(ctx, arrival);
	}
}

function tocIndicator(ctx, arrival) {
	let routeName = arrival.routeName();
	let text = routeName.match(/\[(.*?)\]/); //Uses some stackoverflow regex magic to get text within square brackets
	
	if (text != null) {
		text = text[1]; //Gets extracted TOC name from regex kerfuffle
	} else {
		text = "Minecraft Transit Rail";
	}

	Text.create("tocDisp")
	.text(text)
	.pos(6.2, 61.55)
	.size(132.5, 5.4)
	.scale(0.45)
	.font("minecraft:lumedium")
	.color(0xff9900)
	.draw(ctx);
}

