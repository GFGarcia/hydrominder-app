export function todayFormattedDate() {
	return new Date().toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
