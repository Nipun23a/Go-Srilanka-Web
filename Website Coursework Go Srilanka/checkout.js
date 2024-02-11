function showMessage(){
    alert("Payment Succefully")
}

    const checkoutButton = document.querySelector('#checkout-button');

    checkoutButton.addEventListener('click', () => {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const cardNumberInput = document.querySelector('#card-number');
    const cvvInput = document.querySelector('#cvv');
    const addressInput=document.querySelector('#address');
    const postalcodeInput=document.querySelector('#postal-code');
    const cityInput=document.querySelector('#city');
    const expInput=document.querySelector('#exp-year');
    const expmonthInput=document.querySelector('#exp-month');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const cardNumber = cardNumberInput.value.trim();
    const cvv = cvvInput.value.trim();
    const address=addressInput.value.trim();
    const postal = postalcodeInput.value.trim();
    const city = cityInput.value.trim();
    const year = expInput.value.trim();
    const month=expmonthInput.value.trim();      

    if (name && email && cardNumber && cvv && address && postal && city && month && year) {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Payment successful!';
        document.body.appendChild(successMessage);
    } else {
        alert('Please fill in all required fields correctly.');
}
});
