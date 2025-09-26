include(Resources.id("jsblock:scripts/pidsutils.js"));
let boardNum = 1;

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	PIDSUtil.drawBackground(ctx)

	PIDSUtil.lcdBackgrounds(ctx, 32.3, 15);

	topBackgrounds(ctx, state, pids);

	departure(ctx, state, pids);

	
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
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
	boardNum = PIDSUtil.getBoardNum(pids);
	let time = Timing.elapsed();

	let arrival = pids.arrivals().get(boardNum - 1);
	if (arrival != null){
		
		let estDepTime = new Date(arrival.departureTime()); //Fetch time object of dept time and convert to date object
		let estDepHrs = estDepTime.getHours();
		let estDepMins = estDepTime.getMinutes();

		let depDeviation = new Date(arrival.deviation());
		let depDeviationHrs = depDeviation.getHours();
		let depDeviationMins = depDeviation.getMinutes();

		//Convert to string and add leading zeros
		let schedueledDepHrs = String(estDepHrs).padStart(2, "0");
		let schedueledDepMins = String(estDepMins).padStart(2, "0");

		if (depDeviation > 0) {
			//Remove deviation from estimated depature time, convert to string and add leading zeros
			schedueledDepHrs = String(estDepHrs - depDeviationHrs).padStart(2, "0"); 
			schedueledDepMins = String(estDepMins - depDeviationMins).padStart(2, "0");
		}

		Text.create("Departure time")
		//.text(arrivalDest)
		.text(schedueledDepHrs + ":" + schedueledDepMins)
		.pos(6.1, 10)
		.scale(0.9)
		.font("minecraft:ukpids")
		.color(0xff9900)
		.draw(ctx);
		
		topRight(arrival, time, ctx);

		let route = arrival.route().getPlatforms(); //Gets platforms of all stops of the route
		let lastStop = route.get(route.size()-1).getStationName(); //Gets last stop in route
		let lastStopFormat = TextUtil.getNonCjkParts(lastStop)
		let lastStopAscii = PIDSUtil.makeAscii(lastStopFormat);

		Text.create("Destination header")
		.text(lastStopAscii)
		.pos(6.2, 21.25)
		.size(70.5, 9.15)
		.marquee()
		.scale(0.85)
		.font("minecraft:ukpids")
		.color(0xff9900)
		.draw(ctx);

		Text.create("Calling at")
		.text("Calling at:")
		.pos(6.2, 32.5)
		.scale(0.6)
		.font("minecraft:ukpids")
		.color(0xff9900)
		.draw(ctx);

		PIDSUtil.type2Stops(arrival, route, ctx, 0, 40)
	}
	
}

function topRight (arrival, time, ctx) {
	let totalTime = 6.5;
	let platTime = 4;
	let phase = time % totalTime;
	let text = "";

	if (phase < platTime) {
		text = "Plat "+ arrival.platformName();
	} else {
		let estDepTime = new Date(arrival.departureTime()); //Fetch time object of dept time and convert to date object
		let estDepHrs = estDepTime.getHours();
		let estDepMins = estDepTime.getMinutes();

		let depDeviation = new Date(arrival.deviation());
		let depDeviationMins = depDeviation.getMinutes();

		let formatEstDepHrs = String(estDepHrs).padStart(2, "0");
		let formatEstDepMins = String(estDepMins).padStart(2, "0");
		text = "On Time";

		if (depDeviationMins > 0) {
			text = "Expt " + formatEstDepHrs + ":" + formatEstDepMins;
		}
	}

	Text.create("Platform number")
	.text(text)
	.pos(69.4, 10)
	.rightAlign()
	.scale(0.9)
	.font("minecraft:ukpids")
	.color(0xff9900)
	.draw(ctx);
}