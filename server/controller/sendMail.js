import nodemailer from "nodemailer"
import { getFileUrl } from "./fileUrl.js";


export const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    // const email = req.body;
    // console.log(email);
   
    //connect with the smtp
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amankumarnitkkr@gmail.com',
            pass: 'eqgpkynahrcuesxy'
        }
    });

    var mailOptions = {
        from: '<amankumar@gmail.com>', // sender address
        to: '<amankumarnitkkr@gmail.com>', // list of receivers
        subject: "Download Link", // Subject line
        text: `You can download your file by this link.
        ${getFileUrl()}`, // plain text body
        // html: "<b>Hello world?</b>",
    };
    transporter.sendMail(mailOptions, function(error, info)
    {
         if(error){
            console.log(error);
         }else{
            console.log('Email sent' + info.response);
         }
    });
};

// module.exports = sendMail;