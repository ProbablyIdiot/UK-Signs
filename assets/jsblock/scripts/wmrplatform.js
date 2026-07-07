include(Resources.id("jsblock:scripts/custompidsutils.js"));
include(Resources.id("jsblock:scripts/pids_util.js"));

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	arrival0 = pids.arrivals().get(0) //Base arrival (first one to arrive)
	arrival1 = pids.arrivals().get(1)
	arrival2 = pids.arrivals().get(2)

	drawHeader(ctx, arrival0)
	//draw arrival info here
	drawFooter(ctx, pids, arrival0, arrival1, arrival2)

}

function drawHeader(ctx, arrival) {
	Texture.create("Header bar")
	.texture("jsblock:textures/darkgrayaccent.png")
	.size(186, 10)
	.draw(ctx);

	Text.create("Plat number")
	.text("Platform " + arrival.platformName()) //Gets plat num and prepends "Platform: "
	.color(0xFFFFFF)
	.pos(0,1)
	.draw(ctx);

	Text.create("Digi clock")
	.text(PIDSUtil.formatTime(MinecraftClient.worldDayTime(), true) + ":00") //Gets time, formats accordingly, then adds dummy seconds
	.color(0xffff00)
	.pos(177,1)
	.rightAlign()
	.draw(ctx);
}

function drawFooter(ctx, pids, arrival0, arrival1, arrival2){
	const yOffset = 40;

	if (arrival1) {
		let time = Timing.elapsed();
		let totalTime = 40; //Total time both phases of cycle should take up
		let phase = time % totalTime;

		if (phase < (totalTime / 2)) { //Show next departures for first half of phase
			/* Texture.create("Yellow divider")
			.texture("jsblock:textures/yellowaccent.png")
			.size(186, 1)
			.pos(0, yOffset)
			.draw(ctx);
			
			let infoTxt = "For safety reasons, e-scooters are banned from the railway,this includes stations and trains. Please travel without them.";

			if (pids.getCustomMessage(0).length() > 120) {
				infoTxt = pids.getCustomMessage(0).substring(0, 120); //Gets custom message from jcm, then limits to 68 characters
			} else if (pids.getCustomMessage(0) != ""){
				infoTxt = pids.getCustomMessage(0)
			}

			Text.create("Info text")
			.text(infoTxt)
			.size(316, 20)
			.color(0xFFFFFF)
			.pos(0, yOffset + 3)
			.scale(0.7)
			.wrapText()
			.draw(ctx); */
		} else { //Show info for other half of phase
			
		}
		//departure 2
		drawExtraArrivals(ctx, pids, arrival1, yOffset, 0);
		//departure 3
		drawExtraArrivals(ctx, pids, arrival2, yOffset, 1);
	}
}

function drawExtraArrivals(ctx, pids, arrival, yOffset, num){
	Texture.create("background")
	.texture("jsblock:textures/grayaccent.png")
	.size(184, 9)
	.pos(1, yOffset + (num * 10))
	.draw(ctx);

	let depNum = "2nd"
	if (num == 1) {
		depNum = "3rd"
	}
	Text.create("Info text")
	.text(depNum)
	.size(316, 20)
	.color(0xffff00)
	.pos(3, yOffset + 1.5 + (num * 10))
	.scale(0.7)
	.wrapText()
	.draw(ctx);

	Texture.create("arrow")
	.texture("jsblock:textures/yellowarrowsymbol.png")
	.size(4.5, 9)
	.pos(25, yOffset + (num * 10))
	.draw(ctx);

	depTime = customPIDSUtil.scheduledTime(arrival)[0] + ":" + customPIDSUtil.scheduledTime(arrival)[1];

	Text.create("Depature time")
	.text(depTime)
	.size(316, 20)
	.color(0xffff00)
	.pos(35, yOffset + 1.5 + (num * 10))
	.scale(0.7)
	.wrapText()
	.draw(ctx);

	Text.create("Depature destination")
	.text(arrival.destination())
	.size(100, 20)
	.color(0xffff00)
	.pos(60, yOffset + 1.5 + (num * 10))
	.scale(0.7)
	.draw(ctx);

	Text.create("Delay indicator")
	.text(customPIDSUtil.delayIndicator(arrival))
	.size(100, 20)
	.color(0xbfbfbf)
	.pos(180, yOffset + 1.5 + (num * 10))
	.rightAlign()
	.scale(0.7)
	.draw(ctx);
}