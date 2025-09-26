include(Resources.id("jsblock:scripts/pidsutils.js"));
let boardNum = 1;

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	Texture.create("Background")
	.texture("jsblock:textures/background.png")
	.size(76, 76)
	.draw(ctx);

	PIDSUtil.lcdBackgrounds(ctx, 9.8, 9);

	Text.create("Headings")
	.text("Departures")
	.pos(1, 1)
	//.scale(0.8)
	.font("minecraft:newbrunel")
	.color(0xffffff)
	.draw(ctx);

	depatures(ctx, state, pids);
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
}

function depatures(ctx, state, pids) {
	let i2 = 0; //i2 is used for positioning due to i being artificially higher
	boardNum = PIDSUtil.getBoardNum(pids);

	for (
			let i = ((boardNum * 8 )- 8);
			i < ((boardNum * 8) - 3);
			i++) 
		{
		let arrival = pids.arrivals().get(i);
		if (arrival != null){
			let arrivalDest = TextUtil.getNonCjkParts(arrival.destination()); //Extracts destination from arrival and sets language
			let arrivalDestAscii = PIDSUtil.makeAscii(arrivalDest);

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
			.text(schedueledDepHrs + ":" + schedueledDepMins)
			.pos(6, 10 + (i2 * 15)) //Set row pos, 1s = outer margin, (i*15) = num of rows * row height 
			.scale(0.6)
			.font("minecraft:ukpids")
			.color(0xff9900)
			.draw(ctx);

			Text.create("Render dest")
			.text(arrivalDestAscii)
			.marquee()
			.size(75.5, 6)
			.pos(22.5, 10 + (i2 * 15)) //Set row pos, 1s = outer margin, (i*15) = num of rows * row height 
			.scale(0.6)
			.font("minecraft:ukpids")
			.color(0xff9900)
			.draw(ctx);

			let formatEstDepHrs = String(estDepHrs).padStart(2, "0");
			let formatEstDepMins = String(estDepMins).padStart(2, "0");
			let delayIndicator = "On Time"

			if (depDeviationMins > 0) {
				delayIndicator = "Expt " + formatEstDepHrs + ":" + formatEstDepMins
			}

			if (i < (boardNum * 8)- 4) {//Remove bottom line of last departure to line up with board 1b
				Text.create("On Time/Expected")
				.text(delayIndicator)
				.pos(22.5, 17.5 + (i2 * 15)) //Set row pos, 1s = outer margin, (i*15) = num of rows * row height 
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);

				Text.create("Platform")
				.text("Plat " + arrival.platformName())
				.rightAlign()
				.pos(70.4, 17.5 + (i2 * 15)) //Set row pos, 1s = outer margin, (i*15) = num of rows * row height 
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);
			}

		}
		
		i2 = i2 + 1;
	}

}