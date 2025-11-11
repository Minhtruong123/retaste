import pug from 'pug';
import path from 'path';
const brevo = require('@getbrevo/brevo');
const apiInstance = new brevo.TransactionalEmailsApi();
import env from '~/configs/environments';

const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = env.BREVO_API_KEY;

const templatePath = path.resolve(__dirname, '../templates/verify-account.pug');

const verifyAccount = async (email: string, verifyToken: string) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = 'Verify your email';
  sendSmtpEmail.htmlContent = pug.renderFile(templatePath, { verifyToken });

  sendSmtpEmail.sender = {
    name: env.EMAIL_NAME,
    email: env.EMAIL_ADDRESS
  };

  sendSmtpEmail.to = [{ email }];

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};
const verifyShop = async (email: string) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = 'Verify your email';
  sendSmtpEmail.htmlContent = pug.renderFile(templatePath);

  sendSmtpEmail.sender = {
    name: env.EMAIL_NAME,
    email: env.EMAIL_ADDRESS
  };

  sendSmtpEmail.to = [{ email }];

  return apiInstance.sendTransacEmail(sendSmtpEmail);
};
export const BrevoProvider = {
  verifyAccount,
  verifyShop
};
