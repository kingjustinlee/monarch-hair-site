/* ============================================================
   BOOK PAGE — form logic
   ============================================================
   - Pre-selects budget tier from URL (?tier=monarch-4 etc)
   - Validates required fields
   - Formats phone input as (XXX) XXX-XXXX
   - Submits to form handler (currently placeholder)
   - Shows success/error messaging inline

   TO WIRE UP GHL:
   Replace the value of FORM_ENDPOINT with your GHL webhook URL.
   The form payload matches standard GHL contact fields.
   ============================================================ */

(function () {
    'use strict';

    // --- CONFIGURATION ---
    // When GHL is ready, paste the webhook URL here.
    // Until then, submissions are captured to console and user sees confirmation.
    const FORM_ENDPOINT = ''; // e.g. 'https://services.leadconnectorhq.com/hooks/...'
    const NOTIFICATION_EMAIL = 'hello@monarch.hair'; // fallback email for early launch

    const form = document.getElementById('bookForm');
    if (!form) return;

    const statusBox = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const phoneInput = document.getElementById('phone');

    // --- Pre-select budget tier based on URL ?tier=monarch-6 ---
    const urlParams = new URLSearchParams(window.location.search);
    const tier = urlParams.get('tier');
    if (tier) {
        const tierToBudget = {
            'monarch-4': '350-450',
            'monarch-5': '350-450',
            'monarch-6': '350-450',
            'monarch-8': '450-675',
            'monarch-12': '450-675'
        };
        const budgetVal = tierToBudget[tier];
        if (budgetVal) {
            const radio = form.querySelector(`input[name="budget"][value="${budgetVal}"]`);
            if (radio) radio.checked = true;
        }
    }

    // --- Phone formatting: (XXX) XXX-XXXX as user types ---
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let digits = e.target.value.replace(/\D/g, '').slice(0, 10);
            let formatted = '';
            if (digits.length === 0) {
                formatted = '';
            } else if (digits.length < 4) {
                formatted = `(${digits}`;
            } else if (digits.length < 7) {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
            } else {
                formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
            }
            e.target.value = formatted;
        });
    }

    // --- Validation helpers ---
    function showFieldError(field, message) {
        field.classList.add('is-invalid');
        let errorEl = field.parentElement.querySelector('.field__error');
        if (!errorEl) {
            errorEl = document.createElement('p');
            errorEl.className = 'field__error';
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorEl = field.parentElement.querySelector('.field__error');
        if (errorEl) errorEl.remove();
    }

    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach(function (el) {
        el.addEventListener('input', function () { clearFieldError(el); });
        el.addEventListener('change', function () { clearFieldError(el); });
    });

    // --- Submission ---
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate required fields
        let hasError = false;
        ['firstName', 'lastName', 'email', 'phone'].forEach(function (name) {
            const field = form.querySelector(`[name="${name}"]`);
            if (!field) return;
            const val = field.value.trim();
            if (!val) {
                showFieldError(field, 'This field is required');
                hasError = true;
            }
        });

        // Validate email format
        const emailField = form.querySelector('[name="email"]');
        const emailVal = emailField.value.trim();
        if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            showFieldError(emailField, 'Please enter a valid email address');
            hasError = true;
        }

        // Validate phone has at least 10 digits
        const phoneVal = phoneInput.value.replace(/\D/g, '');
        if (phoneVal && phoneVal.length < 10) {
            showFieldError(phoneInput, 'Please enter a complete 10-digit phone number');
            hasError = true;
        }

        if (hasError) {
            // Scroll to first error
            const firstError = form.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus({ preventScroll: true });
            }
            return;
        }

        // Gather form data
        const formData = new FormData(form);
        const availability = formData.getAll('availability');
        const payload = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            concern: formData.get('concern'),
            budget: formData.get('budget'),
            source: formData.get('source'),
            availability: availability.join(', '),
            smsConsent: formData.get('smsConsent') === 'on',
            submittedAt: new Date().toISOString(),
            referrer: document.referrer || 'direct'
        };

        // Submission state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusBox.className = 'form-status';
        statusBox.textContent = '';

        try {
            if (FORM_ENDPOINT) {
                // Live submission to webhook (GHL or other)
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) throw new Error('Submission failed');
            } else {
                // Fallback: no endpoint configured yet.
                // Log to console so Justin can see data shape during dev.
                // Simulate small delay so UX feels consistent.
                console.log('[Monarch Book] Submission captured (no endpoint configured):', payload);
                await new Promise(r => setTimeout(r, 700));
            }

            // Success UX
            showSuccess(payload.firstName);

        } catch (err) {
            console.error('Form submission error:', err);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send my request';
            statusBox.className = 'form-status form-status--error';
            statusBox.innerHTML = `
                Something went wrong sending your request. Please try again,
                or call us directly at <a href="tel:9133263852">913.326.3852</a>.
            `;
        }
    });

    function showSuccess(firstName) {
        // Replace the entire form with a warm confirmation
        const formWrap = document.querySelector('.book__form-wrap');
        if (!formWrap) return;

        formWrap.innerHTML = `
            <div class="eyebrow">
                <span class="eyebrow__dot"></span>
                Received
            </div>
            <h2 class="book__form-headline">
                Thanks, ${firstName || 'friend'}.<br>
                <span class="serif-italic gold">We've got it.</span>
            </h2>
            <div class="book__success">
                <p>Your note just landed with Justin directly. Not a form queue, not an auto-responder &mdash; he reads these himself.</p>
                <p>You'll hear from us within one business day to set up your consultation. Usually sooner.</p>
                <div class="book__success-meta">
                    <div>
                        <div class="book__success-label">If it's urgent</div>
                        <a href="tel:9133263852" class="book__success-phone">913.326.3852</a>
                    </div>
                    <div>
                        <div class="book__success-label">Or email</div>
                        <a href="mailto:hello@monarch.hair" class="book__success-email">hello@monarch.hair</a>
                    </div>
                </div>
                <a href="index.html" class="link-arrow book__success-back">Back to home</a>
            </div>
        `;

        // Scroll to confirmation
        formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
})();
