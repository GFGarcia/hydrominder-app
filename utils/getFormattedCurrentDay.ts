export function getFormattedCurrentDay() {
	const weekDays = [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	];
	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	const currentDate = new Date();
	const diaSemana = weekDays[currentDate.getDay()];
	const dia = currentDate.getDate();
	const mes = months[currentDate.getMonth()];
	const ano = currentDate.getFullYear();

	return `${diaSemana}, ${dia} de ${mes} de ${ano}`;
}
