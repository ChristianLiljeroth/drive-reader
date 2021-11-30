//	*** This is the functions used to connect to the Google API and fetch the data needed from Google Drive ***

// Client ID and API key from the Developer Console,authorization scopes and discovery doc URLs required by the API.
var CLIENT_ID = 'your_client_id';
var API_KEY = 'your_api_key';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';

// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

//Initializes the API client library and sets up sign-in state listeners.
function initClient() {
	gapi.client.init({
		apiKey: API_KEY,
		clientId: CLIENT_ID,
		discoveryDocs: DISCOVERY_DOCS,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		handleAuthClick();
	}, function(error) {
		console.log(JSON.stringify(error, null, 2));
	});
}

// Sign in the user upon button click.
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

// Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		findFilesOfCurrentMonth();
	}
}

// Find all files of current month.
function findFilesOfCurrentMonth() {
	gapi.client.drive.files.list({
		'pageSize': 1000,
		'fields': "nextPageToken, files(id, name)"
	}).then(function(response) {
		var files = response.result.files;
		if (files && files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (file.name.toLowerCase().includes(provideMonth().toLowerCase())) {
					printFile(file.id);
				}
			}
		}
	});
}

// Print a file's metadata.
function printFile(fileID) {
  var request = gapi.client.drive.files.get({
    fileId: fileID,
	alt: 'media'
  });
  request.then(function(resp) {
    sendToWhatsApp(resp.body);
  });
}