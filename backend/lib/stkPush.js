const generateTimestamp =()=>{
    const date = new Date();
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export async function stkPush(accessToken, phoneNumber, amount, 
    productName) {
    try {
        const shortcode = process.env.MPESA_SHORTCODE
        const passkey = process.env.MPESA_PASSKEY
        const callbackurl = process.env.MPESA_CALLBACK_URL
    
        const timestamp = generateTimestamp()
    
        const password = Buffer.from(shortcode+passkey+timestamp).toString('base64')
        
    
        const requestBody = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount:Number(amount),
            PartyA: Number(phoneNumber),
            PhoneNumber:Number(phoneNumber),
            PartyB:shortcode,
            CallBackURL: callbackurl,
            AccountReference: "Dukani E-commerce",
            TransactionDesc: `Payment for purchase of ${productName}`
    
        }
    
        const response = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
            method: 'POST',
            headers: {
                'Authorization':`Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
    
        const data = await response.json()
    
        return data
    } catch (error) {
        console.error(error.message)
        
    }
}