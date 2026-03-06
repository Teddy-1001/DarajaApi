import express, { json } from 'express'
import dotenv from 'dotenv'
import { getAccessToken } from './lib/auth.js'
import { stkPush } from './lib/stkPush.js'
dotenv.config()

const app = express()
app.use(express.json())

//initiate stk--

app.get('/', (req,res)=>{
    console.log('Api working')
})

app.post('/initiate', async (req,res)=>{
    try {
        //phone number, amount, product_name
        const {phoneNumber, amount, productName} = req.body

        //db logic to store transaction details
        //TABLE :Transaction
        ///status be pending

        //initiate stk push
        //1.getaccessToken

        const accessToken = await getAccessToken()
        
        //2. Initiate stk push
        const initiateStkResponse = await stkPush(accessToken, phoneNumber, amount, productName)
          console.log("STK Push Response:", initiateStkResponse);
        res.json({
            success: true,
            initiateStkResponse
        })
    

    } catch (error) {
        res.status(500).json({success:false, error: error.message || "Failed to initite payment"})
    }
})

//callback endpoint--
app.post('/callback', async(req,res)=>{
    try {
        const stkCallbackData = req.body.Body;

        let status = null
        if(stkCallbackData.ResultCode === 0){
            status = "Success"
        }else{
            status = 'Failed'
        }
        //database logic to update the transaction status.


        res.json({status, stkCallbackData})

    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
})


app.listen(3000, ()=> console.log('Server running'))