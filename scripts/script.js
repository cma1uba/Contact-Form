document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting normally
        event.preventDefault(); 
        
        // Reset all error states before validation
        clearErrors(); 
        
        // Run validation
        const isValid = validateForm();
        
        if (isValid) {
            
            //log form submission success
            
            console.log('Form submitted successfully!');
            alert('Form submitted successfully!');
            form.reset();
        }
    });
    
    function clearErrors() {
        document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.radio-group-container.error').forEach(el => el.classList.remove('error'));
        document.querySelectorAll('.consent-group.error').forEach(el => el.classList.remove('error'));
    }
    
    function showInputError(inputId, errorType = 'form-group') {
        let parentEl;
        
        if (errorType === 'query') {
            parentEl = document.querySelector('.radio-group-container');
        } else if (errorType === 'consent') {
            parentEl = document.getElementById('consent').closest('.consent-group');
        } else {
            
            
            parentEl = document.getElementById(inputId).closest('.form-group');
        }
        
        if (parentEl) {
            parentEl.classList.add('error');
        }
    }

  
    function validateForm() {
        let allValid = true;

        // 1. First Name and Last Name (Required)
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        
        if (firstName.value.trim() === '') {
            showInputError('firstName');
            allValid = false;
        }
        if (lastName.value.trim() === '') {
            showInputError('lastName');
            allValid = false;
        }

        // 2. Email Address (Required and Valid Format)
        const email = document.getElementById('email');
        // Simple regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
            showInputError('email');
     
            allValid = false;
        }

        // 3. Query Type (Required Radio Select)
        const queryRadios = document.querySelectorAll('input[name="queryType"]');
        let querySelected = Array.from(queryRadios).some(radio => radio.checked);
        
        if (!querySelected) {
            showInputError(null, 'query');
            allValid = false;
        }

        // 4. Message (Required)
        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            showInputError('message');
            allValid = false;
        }

        // 5. Consent Checkbox (Required)
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showInputError('consent', 'consent');
            allValid = false;
        }

        return allValid;
    }
});


