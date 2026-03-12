fetch("http://localhost:3000")
.then(r => r.text())
.then(data => {
    document.body.innerHTML += "<pre>" + data + "</pre>";
});
