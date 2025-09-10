import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename);

export const sendEmail = async (subject, send_to, reply_to, template, send_from, invatedUsername, ownerUsername, context) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        },
    });

    const handlebarsOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve(__dirname, '../../views'),
            defaultLayout: false
        },
        viewPath: path.resolve(__dirname, '../../views'),
        extName: '.handlebars'
    };

    transporter.use('compile', hbs(handlebarsOptions));

    const mailOptions = {
        subject,
        from: send_from,
        to: send_to,
        replyTo: reply_to,
        template,
        context: {
            invatedUsername,
            ownerUsername,
            ...context,
        },
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.log('Error sending email:', error);
        throw error;
    }
};
