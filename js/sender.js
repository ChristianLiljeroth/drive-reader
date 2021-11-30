//	*** This is the functions used to send the script output to the userbase ***

function sendToWhatsApp(data) {
	if (screen.width < 800) {
		window.location.replace("whatsapp://send?text="+data);
	} else {
		console.log("whatsapp://send?text="+data);
	}
}