import nodemailer from 'nodemailer';

const sendEmail = async function (email, subject, message) {

    // console.log(process.env.SMTP_USERNAME);  // Corrected
    // console.log(process.env.SMTP_PASSWORD);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,  // Corrected
            pass: process.env.SMTP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: '"रानी पद्मावती तारा योगतंत्र आदर्श संस्कृत महाविद्यालय" <kamlesh.jha@gmail.com>',
        to: "ayushm185@gmail.com",
        subject: subject,
        html: message,
    });

    
}

export default sendEmail;
