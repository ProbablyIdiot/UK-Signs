let boardNum = 1;

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	Texture.create("Background")
	.texture("jsblock:textures/background.png")
	.size(76, 76)
	.draw(ctx);

	lcdBackgrounds(ctx, state, pids);

	departure(ctx, state, pids);
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
}

function lcdBackgrounds(ctx, state, pids) {
	for (let i = 0; i < 9; i++) {
		Texture.create("")
		.texture("jsblock:textures/orangebkg.png")
		.size(64.4, 5.4)
		.pos(5.8, 1.55 + (i * 7.5))
		.draw(ctx);
	}
}

function departure(ctx, state, pids) {
	let arrival = pids.arrivals().get(boardNum - 1);
	if (arrival != null) {
		let route = arrival.route().getPlatforms(); //Gets platforms of all stops of the route
		let i2 = 0; // i2 is used for positioning, as i is artificially higher

		for (let i = 5; i < route.size(); i ++) { //Loops through all stops in route
			if (i < 12) { //Continues after first board and stops departures going off the end of the second board
				stop = TextUtil.getNonCjkParts(route.get(i).getStationName());
				let stopAscii = makeAscii(stop);

				if (i == (route.size() - 1)) {
					Text.create("&")
					.text("&")
					.pos(6.2, (1.55 + (i2 * 7.5)))
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);

					Text.create("Stop")
					.text(stopAscii)
					.pos(10.2, (1.55 + (i2 * 7.5)))
					.size(95.5, 5.4)
					.marquee()
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);
				}	else {
					Text.create("Stop")
					.text(stopAscii)
					.pos(6.2, (1.55 + (i2 * 7.5)))
					.size(102, 5.4)
					.marquee()
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);
				}
			} else if (i == 12) {
				Text.create("Continues... (to be removed in multiple page update)")
				.text("Continues...")
				.pos(6.2, (1.55 + (i2 * 7.5)))
				.size(102, 5.4)
				.marquee()
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);
			}
			i2 = i2 + 1;
		}


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

function makeAscii(text) {
	var combining = /[\u0300-\u036F]/g; 
	text = String(text)
	//return text.normalize("NFKD").replace(combining, "");
	return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
}