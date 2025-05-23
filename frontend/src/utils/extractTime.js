export function extractTime(dateString) {
	const date = new Date(dateString);
	const now = new Date();

	const isToday = isSameDay(date, now);
	const isYesterday = isSameDay(date, new Date(now.setDate(now.getDate() - 1)));
	const time = format12HourTime(date);

	if (isToday) {
		return time;
	} else if (isYesterday) {
		return `Yesterday, ${time}`;
	} else if (isThisWeek(date)) {
		const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
		return `${dayName}, ${time}`;
	} else {
		const datePart = date.toLocaleDateString("en-GB"); // DD/MM/YYYY
		return `${datePart}, ${time}`;
	}
}

function format12HourTime(date) {
	let hours = date.getHours();
	const minutes = padZero(date.getMinutes());
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	return `${padZero(hours)}:${minutes} ${ampm}`;
}

function padZero(number) {
	return number.toString().padStart(2, "0");
}

function isSameDay(date1, date2) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

function isThisWeek(date) {
	const now = new Date();
	const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)

	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - dayOfWeek);
	startOfWeek.setHours(0, 0, 0, 0);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	return date >= startOfWeek && date <= endOfWeek;
}
