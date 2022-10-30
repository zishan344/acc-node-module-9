const formData = require("form-data");
const Mailgun = require("mailgun.js");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,

  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

exports.sendMailWithGmail = async (data) => {
  const accessToken = await oAuth2Client.getAccessToken();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_MAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const mailData = {
    from: process.env.SENDER_MAIL,
    to: data.to,
    subject: data.subject,
    text: data.text,
  };
  console.log(mailData);
  let info = await transporter.sendMail(mailData);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info.messageId;
};

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAIL_GUN_API_KEY,
});

exports.sendMailWithMailGun = async (data) => {
  //   console.log(data);
  const result = await mg.messages.create(
    "sandboxe6e6b429f859407b90e76fe48780541c.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandboxe6e6b429f859407b90e76fe48780541c.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );
  // .then((msg) => console.log(msg)) // logs response data
  // .catch((err) => console.log(err)); // logs any error`;
  //   console.log(result);
  //   console.log(result?.id);
  return result.id;
};

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.

// clien id: 515139186540-l5pfcacmnce0ogu6vscvhu0qkbo78re0.apps.googleusercontent.com   ,
//client secreate: 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
