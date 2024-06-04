import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_SECRET as string)

const subject: { [key: string]: string } = {
  verifyEmail: 'Minløn - Verificer din email',
  forgotPassword: 'Minløn - Ser ud til at du glemt din adgangskode',
  payroll: 'Minløn - Din lønseddel er klar'
}

const template: { [key: string]: (link: string, data: Record<string, any>) => string } = {
    // add templates here
}

export default async (to: string, type: string, link: string, data: Record<string, any>) => {
  new Promise<boolean>((resolve, reject) => {
    const msg: MailDataRequired = {
      to: to,
      from: 'no-reply@minløn.dk',
      text: 'Besked fra Minløn.dk',
      html: template[type](link, data),
      subject: subject[type],
      mailSettings: process.env.NODE_ENV === "test" ? {
        sandboxMode: {
          enable: true
        }
      } : {}
    };
    sgMail.send(msg).then(() => {
      resolve(true)
    }).catch((error: any) => {
      reject(error)
    })
  })
}