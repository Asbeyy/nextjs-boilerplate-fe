export function validateCreditCard(cardNumber: string): { isValid: boolean; cardType: string | null } {
    // Remove spaces or dashes from the input
    cardNumber = cardNumber.replace(/[\s-]/g, "");

    // Define regex patterns for Visa and Mastercard
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/; // American Express
    const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/; // Discover

    // Detect card type
    let cardType: string | null = null;
    if (visaRegex.test(cardNumber)) {
        cardType = "visa";
    } else if (mastercardRegex.test(cardNumber)) {
        cardType = "mastercard";
    } else if (amexRegex.test(cardNumber)) {
        cardType = "amex";
    } else if (discoverRegex.test(cardNumber)) {
        cardType = "discover";
    }

    // If card type is not recognized, return invalid
    if (!cardType) {
        return { isValid: false, cardType: null };
    }

    // Apply Luhn algorithm for validity check
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    const isValid = sum % 10 === 0;
    return { isValid, cardType };
}

