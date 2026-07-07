const customPIDSUtil = {
	//Draws background layer
	drawBackground (ctx) {
		Texture.create("Background")
		.texture("jsblock:textures/background.png")
		.size(76, 152)
		.draw(ctx);
	},
	//Draws LCD screens
	lcdBackgrounds(ctx, startY, num) {
		for (let i = 0; i < num; i++) {
			Texture.create("")
			.texture("jsblock:textures/orangebkg.png")
			.size(64.4, 5.4)
			.pos(5.8, startY + (i * 7.5))
			.draw(ctx);
		}
	},
	//Select which upcoming departures to show
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
	//Converts text to ASCII
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
	//Shows "On Time" or "Est xx:xx"
	delayIndicator(arrival) {
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

		return text;
	},
	//Returns scheduled time of arrival
	scheduledTime(arrival) {
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

		return [schedueledDepHrs, schedueledDepMins];
	}
}