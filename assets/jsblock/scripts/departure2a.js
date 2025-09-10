let boardNum = 1;

function create(ctx, state, pids) {
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
	boardNum = getBoardNum(pids);

	let arrival = pids.arrivals().get(boardNum - 1);
	if (arrival != null){
		let arrivalDest = TextUtil.cycleString(arrival.destination()); //Extracts destination from arrival and sets language

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
		.text(arrivalDest)
		//.text(schedueledDepHrs + ":" + schedueledDepMins)
		.pos(6.1, 10)
		.scale(1.05)
		.font("minecraft:ukpids")
		.color(0xff9900)
		.draw(ctx);
	}
	
}

function getBoardNum (pids) {
	let userInput = pids.getCustomMessage(0);
	if (!isNaN(userInput)) {
		userInput = Number(userInput);
		if (userInput > 0) {
			return userInput;
		} else {
			return 1;
		}
	} else {
		return 1;
	}
}