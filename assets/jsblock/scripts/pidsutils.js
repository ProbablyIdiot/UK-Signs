const PIDSUtil = {
	getBoardNum (pids) {
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
	},
	lcdBackgrounds(ctx, startY) {
		for (let i = 0; i < 9; i++) {
			Texture.create("")
			.texture("jsblock:textures/orangebkg.png")
			.size(64.4, 5.4)
			.pos(5.8, startY + (i * 7.5))
			.draw(ctx);
		}
	},
	makeAscii(text) {
		var combining = /[\u0300-\u036F]/g; 
		return String(text);
		//print(text);
		//text = text.trimStart();
		//return text.normalize("NFKD").replace(combining, "");
		//return text.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
		//text = text.replace(/\u0142/g, "l");
		//return text.normalize('NFKD').replace(/[^\w\s.-_\/]/g, '');
		//return text;
	},
	type2Stops (route, ctx, start, end, yOffset){
		let i2 = 0;

		for (let i = start; i < route.size(); i ++) { //Loops through all stops in route
			if (i < end) { //Continues after first board and stops departures going off the end of the second board
				stop = TextUtil.getNonCjkParts(route.get(i).getStationName());
				let stopAscii = PIDSUtil.makeAscii(stop);

				if (i == (route.size() - 1)) {
					Text.create("&")
					.text("&")
					.pos(6.2, (yOffset + (i2 * 7.5)))
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);

					Text.create("Stop")
					.text(stopAscii)
					.pos(10.2, (yOffset + (i2 * 7.5)))
					.size(95.5, 5.4)
					.marquee()
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);
				}	else {
					Text.create("Stop")
					.text(stopAscii)
					.pos(6.2, (yOffset + (i2 * 7.5)))
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
				.pos(6.2, (yOffset + (i2 * 7.5)))
				.size(102, 5.4)
				.marquee()
				.scale(0.6)
				.font("minecraft:ukpids")
				.color(0xff9900)
				.draw(ctx);
			}
			i2 = i2 + 1;
		}
	}
}