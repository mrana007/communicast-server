const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_REFRESH,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "CommuniCast email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-weight:600;color:#d61c4e"><img src="https://res.cloudinary.com/db5uzcggy/image/upload/v1705559804/CommuniCast-red-icon_kua8iy.png" alt="" style="width:50px"><span>Action require : Active your CommuniCast account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#ff5784;font-size:17px"><span>Hello ${name},</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on CommuniCast. To complete your registration, Please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#d61c4e;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#ff5784">CommuniCast allows to stay in touch with all your friends, once refistered on facebook, you can share photos,organize events and much more.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
