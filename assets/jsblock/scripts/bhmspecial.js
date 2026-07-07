include(Resources.id("jsblock:scripts/custompidsutils.js"));
include(Resources.id("jsblock:scripts/pids_util.js"));


let boardNum = 1;

function create(ctx, state, pids) {
}

function render(ctx, state, pids) {
	customPIDSUtil.drawBackground(ctx);

	customPIDSUtil.lcdBackgrounds(ctx, 55, 12);

	Text.create("Headings")
	.text("Special Notices")
	.pos(1, 1)
	//.scale(0.8)
	.font("minecraft:newbrunel")
	.color(0xffffff)
	.draw(ctx);

	clockDraw(ctx);

	customText(ctx, pids);
}

function dispose(ctx, state, pids) {
	//print("Goodbye, World!");
}

function clockDraw(ctx) {
	Texture.create("")
		.texture("jsblock:textures/orangebkg.png")
		.size(64.4, 20)
		.pos(5.8, 20)
		.draw(ctx);
	//print(PIDSUtil.formatTime(MinecraftClient.worldDayTime(), true));

	Text.create("Main time")
		.text(PIDSUtil.formatTime(MinecraftClient.worldDayTime(), true))
		.pos(6, 20.2)
		.scale(2.65)
		.font("minecraft:luheavy")
		.color(0xffffff)
		.draw(ctx);
	
	Text.create("Seconds")
		.text("00")
		.pos(55, 25.2)
		.scale(1.8)
		.font("minecraft:luheavy")
		.color(0xffffff)
		.draw(ctx);
}

function customText(ctx, pids) {
	let customMessage = pids.getCustomMessage(0);
	//max length = 25

	let i = 0;
	let msgArray = customMessage.match(/.{1,25}/g);

	for (let i = 0; i <= 11; i++){
		if (msgArray[i]) {
			Text.create("Custom messages")
				.text(msgArray[i])
				.pos(38.5, 55.2 + (i * 7.5)) //Set row pos, 1s = outer margin, (i*15) = num of rows * row height 
				.scale(0.6)
				.centerAlign()
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);
		};
	}
}