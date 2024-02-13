// Fetch the HTML content of the specified URL
fetch('https://m2.test/customer/account/edit/')
  .then(response => response.text())
  .then(html => {
    // Create a temporary container to hold the HTML content
    const container = document.createElement('div');
    container.innerHTML = html;

    // Extract the value from the "current-password" input field
    const passwordValue = container.querySelector('#current-password').value;

    // Log or use the value as needed
    console.log(passwordValue);
  })
  .catch(error => console.error('Error fetching data:', error));
