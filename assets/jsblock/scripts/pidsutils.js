const PIDSUtil = {
	drawBackground (ctx) {
		Texture.create("Background")
		.texture("jsblock:textures/background.png")
		.size(76, 152)
		.draw(ctx);
	},
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
	lcdBackgrounds(ctx, startY, num) {
		for (let i = 0; i < num; i++) {
			Texture.create("")
			.texture("jsblock:textures/orangebkg.png")
			.size(64.4, 5.4)
			.pos(5.8, startY + (i * 7.5))
			.draw(ctx);
		}
	},
	makeAscii(text) {
		var combining = /[\u0300-\u036F]/g; 
		text = String(text);
		return text
			.replace(/[ÀÁÂÃÄÅĀĂĄ]/g, "A")
			.replace(/[àáâãäåāăą]/g, "a")
			.replace(/[ÇĆĈĊČ]/g, "C")
			.replace(/[çćĉċč]/g, "c")
			.replace(/[ÐĎĐ]/g, "D")
			.replace(/[ðďđ]/g, "d")
			.replace(/[ÈÉÊËĒĔĖĘĚ]/g, "E")
			.replace(/[èéêëēĕėęě]/g, "e")
			.replace(/[ĜĞĠĢ]/g, "G")
			.replace(/[ĝğġģ]/g, "g")
			.replace(/[ĤĦ]/g, "H")
			.replace(/[ĥħ]/g, "h")
			.replace(/[ÌÍÎÏĨĪĬĮİ]/g, "I")
			.replace(/[ìíîïĩīĭįı]/g, "i")
			.replace(/[Ĵ]/g, "J")
			.replace(/[ĵ]/g, "j")
			.replace(/[Ķ]/g, "K")
			.replace(/[ķ]/g, "k")
			.replace(/[ĹĻĽĿŁ]/g, "L")
			.replace(/[ĺļľŀł]/g, "l")
			.replace(/[ÑŃŅŇ]/g, "N")
			.replace(/[ñńņň]/g, "n")
			.replace(/[ÒÓÔÕÖØŌŎŐ]/g, "O")
			.replace(/[òóôõöøōŏő]/g, "o")
			.replace(/[ŔŖŘ]/g, "R")
			.replace(/[ŕŗř]/g, "r")
			.replace(/[ŚŜŞŠ]/g, "S")
			.replace(/[śŝşš]/g, "s")
			.replace(/[ŢŤŦ]/g, "T")
			.replace(/[ţťŧ]/g, "t")
			.replace(/[ÙÚÛÜŨŪŬŮŰŲ]/g, "U")
			.replace(/[ùúûüũūŭůűų]/g, "u")
			.replace(/[Ŵ]/g, "W")
			.replace(/[ŵ]/g, "w")
			.replace(/[ÝŶŸ]/g, "Y")
			.replace(/[ýÿŷ]/g, "y")
			.replace(/[ŹŻŽ]/g, "Z")
			.replace(/[źżž]/g, "z")

			// Cyrillic (Russian) characters
			.replace(/[Аа]/g, "a")
			.replace(/[Бб]/g, "b")
			.replace(/[Вв]/g, "v")
			.replace(/[Гг]/g, "g")
			.replace(/[Дд]/g, "d")
			.replace(/[ЕеЁё]/g, "e")
			.replace(/[Жж]/g, "zh")
			.replace(/[Зз]/g, "z")
			.replace(/[Ии]/g, "i")
			.replace(/[Йй]/g, "y")
			.replace(/[Кк]/g, "k")
			.replace(/[Лл]/g, "l")
			.replace(/[Мм]/g, "m")
			.replace(/[Нн]/g, "n")
			.replace(/[Оо]/g, "o")
			.replace(/[Пп]/g, "p")
			.replace(/[Рр]/g, "r")
			.replace(/[Сс]/g, "s")
			.replace(/[Тт]/g, "t")
			.replace(/[Уу]/g, "u")
			.replace(/[Фф]/g, "f")
			.replace(/[Хх]/g, "kh")
			.replace(/[Цц]/g, "ts")
			.replace(/[Чч]/g, "ch")
			.replace(/[Шш]/g, "sh")
			.replace(/[Щщ]/g, "shch")
			.replace(/[ЪъЬь]/g, "") // hard/soft signs removed
			.replace(/[Ыы]/g, "y")
			.replace(/[Ээ]/g, "e")
			.replace(/[Юю]/g, "yu")
			.replace(/[Яя]/g, "ya")

			// Final cleanup: keep only letters, numbers, spaces, and colons
			.replace(/[^a-z0-9 :]/gi, '');
	},
	type2Stops (arrival, route, ctx, start, yOffset){
		let i2 = 0;
		let platPos = 0;
		let end = route.size() - 1;

		for (let i = start; i < route.size(); i ++) { //Gets the position in the list of the current stop by comparing the platform ID of the current platform, and the IDs of those in the list
			let platId = route.get(i).getPlatformId();
			let curPlatId = arrival.platformId();

			if (platId == curPlatId) {
				platPos = i;
			}
		}

		if (end > (platPos + 12)) {
			end = platPos + 11;
		}
	

		for (let i = start; i <= end; i ++) { //Loops through all stops in route
			if (i > platPos) { //Starts after current station
				let stop = TextUtil.cycleString(route.get(i).getStationName());
				let stopAscii = PIDSUtil.makeAscii(stop);
				//let stopAscii = stop;
				
				if (i2 == 11) {
					Text.create("Continues... (to be removed in multiple page update)")
					.text("Continues...")
					.pos(6.2, (yOffset + (i2 * 7.5)))
					.size(102, 5.4)
					.marquee()
					.scale(0.6)
					.font("minecraft:ukpids")
					.color(0xff9900)
					.draw(ctx);
				}	else if (i == (route.size() - 1)) {
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

			i2 = i2 + 1;

			} 
		}
	},
	tocIndicator(ctx, arrival) {
		let routeName = arrival.routeName();
		let text = routeName.match(/\[(.*?)\]/); //Uses some stackoverflow regex magic to get text within square brackets
		
		if (text != null) {
			text = text[1]; //Gets extracted TOC name from regex kerfuffle
		} else {
			text = "Minecraft Transit Rail";
		}

		Text.create("tocDisp")
		.text(text)
		.pos(6.1, 137.2)
		.size(132.5, 5.4)
		.marquee()
		.scale(0.7)
		.font("minecraft:luheavy")
		.color(0xff9900)
		.draw(ctx);
	}
}