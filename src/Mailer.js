import React from 'react';
import emailjs from 'emailjs-com';

export const ContactUs = () => {

    const sendEmail = () => {
        emailjs.send("service_97n2swa", "template_va863h5", {
            name: 'Võ Đức Huy',
            email: 'huyvoduc77@gmail.com',
            subject: 'abc',
            message: 'hello2'
        }, 'user_iacEpezHMPueNSO3W3Ub4');
    }

    return (
        <button onClick={sendEmail}></button>
    );
};