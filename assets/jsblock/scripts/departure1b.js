let boardNum = 1;

function create(ctx, state, pids) {
	let userInput = pids.getCustomMessage(0);
	if (!isNaN(userInput)) {
		userInput = Number(userInput);
		if (userInput > 0) {
			boardNum = userInput;
		}
	}
}

function render(ctx, state, pids) {
	Texture.create("Background")
	.texture("jsblock:textures/background.png")
	.size(76, 76)
	.draw(ctx);

	lcdBackgrounds(ctx, state, pids);

	depatures(ctx, state, pids);

	Text.create("Page indicator")
	.text("Page 1 of 1")
	.pos(6, 61.55)
	.scale(0.7)
	.font("minecraft:luheavy")
	.color(0xff9900)
	.draw(ctx);
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

function depatures(ctx, state, pids) {
	let i2 = 0; //i2 is used for positioning due to i being artificially higher
	
	for (
			let i = ((boardNum * 8)- 4);
			i < (boardNum * 8);
			i++) 
			{
		//print(i);
		let arrival = pids.arrivals().get(i);
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

			if (i > 4) {
				Text.create("Departure time")
				.text(schedueledDepHrs + ":" + schedueledDepMins)
				.pos(6, -5.8 + (i2 * 15)) //Set row pos, 1s = outer margin, (i2*15) = num of rows * row height 
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);

				Text.create("Render dest")
				.text(arrivalDest)
				.marquee()
				.size(75.5, 6)
				.pos(22.5, -5.8 + (i2 * 15)) //Set row pos, 1s = outer margin, (i2*15) = num of rows * row height 
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);
			}

			let formatEstDepHrs = String(estDepHrs).padStart(2, "0");
			let formatEstDepMins = String(estDepMins).padStart(2, "0");
			let delayIndicator = "On Time"

			if (depDeviationMins > 1) {
				delayIndicator = "Expt" + formatEstDepHrs + ":" + formatEstDepMins
			}

			Text.create("On Time/Expected")
			.text(delayIndicator)
			.pos(22.5, 1.55 + (i2 * 15)) //Set row pos, 1s = outer margin, (i2*15) = num of rows * row height 
			.scale(0.6)
			.font("minecraft:ukpids")
			.color(0xff9900)
			.draw(ctx);

			Text.create("Platform")
			.text("Plat " + arrival.platformName())
			.rightAlign()
			.pos(70.4, 1.55 + (i2 * 15)) //Set row pos, 1s = outer margin, (i2*15) = num of rows * row height 
			.scale(0.6)
			.font("minecraft:ukpids")
			.color(0xff9900)
			.draw(ctx);
		}

		i2 = i2 + 1;
	}

}