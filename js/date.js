//	*** This is the functions used to determine the current time and date in proper format ***

var date = new Date();
var n = new Array();
n[0] = "Januar";
n[1] = "Februar";
n[2] = "Marts";
n[3] = "April";
n[4] = "Maj";
n[5] = "Juni";
n[6] = "Juli";
n[7] = "August";
n[8] = "September";
n[9] = "Oktober";
n[10] = "November";
n[11] = "December";

function provideDate() {
	return(date.getDate()+". "+n[date.getMonth()]);
}

function provideDay() {
	return(date.getDate());
}

function provideMonth() {
	return(n[date.getMonth()]);
}