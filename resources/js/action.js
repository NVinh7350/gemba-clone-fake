export const formatDateTime = (isoDateTime) => {
	const date = new Date(isoDateTime);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

	return formattedDateTime;
};

export const isoToDatetimeLocal = (isoDateTime) => {
	const date = new Date(isoDateTime);
	const formattedDatetimeLocal = date.toISOString().slice(0, -8); // "yyyy-mm-ddThh:mm"
	return formattedDatetimeLocal;
};

export const datetimeLocalToIso = (datetimeLocalValue) => {
	const isoDateTime = new Date(datetimeLocalValue + ":00Z").toISOString(); // Add ":00Z" to indicate UTC
	return isoDateTime;
};
