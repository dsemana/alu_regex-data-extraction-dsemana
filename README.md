# Regex Data Extraction — Junior Frontend Developer Assignment

## Overview

This project extracts structured data from raw text input using **JavaScript and regex**, handling realistic variations while ensuring **security and privacy**. The program processes API-like logs, masks sensitive information, and ignores unsafe input.

---

## Extracted Data Types

1. **Emails**  
   - Captures valid emails; ignores malformed ones.  
   - Masked for privacy: first two letters visible.  
   - Example: `divin.semana@gmail.com → di***@gmail.com`.

2. **URLs**  
   - Captures `http` and `https` URLs only.  
   - Ignores unsafe schemes (`javascript:`, `data:`).  
   - Example: `https://www.example.com`.

3. **Phone Numbers**  
   - Handles multiple formats: `(xxx) xxx-xxx`, `xxx-xxx-xxx`, `xxx.xxx.xxx`.  
   - Masks middle digits for privacy.  
   - Example: `(250) 788-123-456 → 250***123456`.

4. **Credit Cards**  
   - Captures valid 16-digit numbers with spaces/dashes.  
   - Masks all digits except last 4.  
   - Example: `4539 1488 0343 6467 → ****-****-****-6467`.

---

## Security & Validation

- **Unsafe input ignored**: malicious scripts, invalid emails/URLs, broken phone numbers.  
- **Sensitive data masked**: emails, phone numbers, and credit cards.  
- **Validation ensures** that extraction only includes well-formed, safe data.

---

## Sample Input & Output

- Input: `sampleInput.txt` (messy API-like logs)  
- Output: Structured JSON (printed to console or saved), e.g.:

```json
{
  "emails": ["di***@gmail.com", "di***@students.alu.edu"],
  "urls": ["https://www.example.com", "http://subdomain.company.co.uk/page?id=42"],
  "phoneNumbers": ["250***123456", "250***123456"],
  "creditCards": ["****-****-****-6467", "****-****-****-6467"]
}

## How to Run

Follow these steps to execute the data extraction program:

1. **Install Node.js**  
   Make sure [Node.js](https://nodejs.org/) is installed on your system.

2. **Clone the repository**  
```bash
git clone https://github.com/dsemana/alu_regex-data-extraction-dsemana.git

3. **Navigate to the project folder**
```bash
cd alu_regex-data-extraction-dsemana.git

4. **Run the script**
```bash
node script.js