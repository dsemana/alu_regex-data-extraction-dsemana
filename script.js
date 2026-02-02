const fs = require("fs");

const rawText = fs.readFileSync("sampleInput.txt", "utf-8");


function extractEmails(text) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];
  //Mask email output before returning
  const maskedEmails = emails.map(email => {
    const [localPart, domain] = email.split('@');
    return `${localPart.substring(0, 2)}***@${domain}`;
  });

  return maskedEmails;
}

function extractURLs(rawText) {
    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    
    const urls = rawText.match(urlRegex) || [];
    
    const safeUrls = urls
        .filter(url => !url.toLowerCase().includes("javascript:") && !url.toLowerCase().includes("data:"))
        .map(url => url.replace(/[.,)]+$/, ""));
    
    return safeUrls;
}


function extractPhoneNumbers(rawText) {
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}/g
;
    const phoneMatches = rawText.match(phoneRegex) || [];

    const safePhones = phoneMatches
        .map(phone => phone.replace(/\D/g, ''))
        .filter(digits => digits.length === 10 || digits.length === 12)
        .map(digits => { 
            // for privacy, mask the middle digits
            return digits.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2'); 
        });

    return safePhones;
}


function extractCreditCards(rawText) {
    const creditCardRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g;
    const creditCardsMatches = rawText.match(creditCardRegex) || [];
    const maskedCreditCards = creditCardsMatches.map(creditcard => {
        // Remove spaces and dashes to confirm the number of digits
        const cleaned = creditcard.replace(/[-\s]/g, '');
        // If it's a valid 16-digit card, keep only the last 4 digits visible
        if (cleaned.length === 16) {
            return '****-****-****-' + cleaned.slice(-4);
        }
        return creditcard;});
    return maskedCreditCards;
}

// ===================== MAIN EXECUTION =====================

function main() {
  const results = {
    emails: extractEmails(rawText),
    urls: extractURLs(rawText),
    phoneNumbers: extractPhoneNumbers(rawText),
    creditCards: extractCreditCards(rawText),
  };

  console.log("Extraction Results:");
  console.log(JSON.stringify(results, null, 2));
}

main();
