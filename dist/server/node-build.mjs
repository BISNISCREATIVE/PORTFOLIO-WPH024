import path from "path";
import "dotenv/config";
import * as express from "express";
import express__default from "express";
import cors from "cors";
import * as nodemailer from "nodemailer";
const handleDemo = (req, res) => {
  const response = {
    message: "Hello from Express server"
  };
  res.status(200).json(response);
};
const emailConfig = {
  host: "smtp.padin.my.id",
  port: 465,
  secure: true,
  // true for 465, false for other ports
  auth: {
    user: "admin@padin.my.id",
    pass: process.env.EMAIL_PASSWORD || ""
    // Set this in environment variables
  }
};
console.log("Email configuration loaded:");
console.log("Host:", emailConfig.host);
console.log("Port:", emailConfig.port);
console.log("User:", emailConfig.auth.user);
console.log("Password set:", !!emailConfig.auth.pass);
console.log("Password length:", emailConfig.auth.pass.length);
const transporter = nodemailer.createTransport(emailConfig);
async function sendContactEmail(contactData) {
  try {
    const mailOptions = {
      from: "admin@padin.my.id",
      to: "admin@padin.my.id",
      // You can change this to forward to another email
      subject: `New Contact Form Message from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3A0764;">New Contact Form Message</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #3A0764;">
              ${contactData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Message

Name: ${contactData.name}
Email: ${contactData.email}
Message: ${contactData.message}

Time: ${(/* @__PURE__ */ new Date()).toLocaleString()}
      `
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
async function handleContact(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required"
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }
    const emailSent = await sendContactEmail({ name, email, message });
    if (emailSent) {
      res.status(200).json({
        success: true,
        message: "Message sent successfully! I will get back to you soon."
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later."
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
}
function createServer() {
  const app2 = express__default();
  app2.use(cors());
  app2.use(express__default.json());
  app2.use(express__default.urlencoded({ extended: true }));
  app2.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });
  app2.get("/api/demo", handleDemo);
  app2.post("/api/contact", handleContact);
  return app2;
}
const app = createServer();
const port = process.env.PORT || 3e3;
const __dirname = import.meta.dirname;
const distPath = path.join(__dirname, "../spa");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(port, () => {
  console.log(`🚀 Fusion Starter server running on port ${port}`);
  console.log(`📱 Frontend: http://localhost:${port}`);
  console.log(`🔧 API: http://localhost:${port}/api`);
});
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  process.exit(0);
});
//# sourceMappingURL=node-build.mjs.map
