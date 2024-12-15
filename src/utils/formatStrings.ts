export function formatCreditCardNumber(input: string): string {
    // Remove all spaces first to handle dynamic typing correctly
    const sanitizedInput = input.replace(/\s+/g, "");
    const chunkSize = 4;
    let formatted = "";

    for (let i = 0; i < sanitizedInput.length; i += chunkSize) {
        if (i > 0) {
            formatted += " "; // Add a space between chunks
        }
        formatted += sanitizedInput.slice(i, i + chunkSize);
    }

    return formatted;
}

