const formData = require("form-data");
const Mailgun = require("mailgun.js");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

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
