<p align="center">
  <img src="https://raw.githubusercontent.com/Fivlas/hackhaton-boilerplate/refs/heads/main/public/Logo.svg" alt="project-image" width="25%">
</p>
<h1 align="center" id="title">Hackhaton Boilerplate</h1>
<h3 align="center">Hackathon Boilerplate is a powerful Next.js starter kit designed to accelerate your development process with a robust set of features.</h3>
<br><br>
  
  
<h2>🧐 Why hackhaton-boilerplate?</h2>

<p>This project aims to provide a
comprehensive foundation for building scalable web applications quickly and efficiently. The core features include:</p>

*   **⚙ Next.js Configuration:** Streamlines development with customizable settings enhancing performance and adherence to best practices.
*   **🔒 Authentication Middleware:** Ensures secure access to protected routes improving user experience through seamless session management.
*   **🎨 Tailwind CSS Integration:** Facilitates responsive design with a utility-first approach making styling efficient and maintainable.
*   **👥 Robust User Management:** Includes user authentication account linking and subscription management enhancing user interactions.
*   **🔄 Dynamic Components:** Offers reusable Ul components for navigation forms and feedback promoting a cohesive user experience.
*   **📁 File Upload Functionality:** Simplifies file management with integrated upload capabilities enhancing overall application functionality.

<h2>🛠️ Installation Steps:</h2>
<p>This project requires the following dependencies:</p>

*   **Runtime:** nodeJS


<p>1. Clone the repository:</p>

```bash
git clone
```

<p>2. Navigate to the project directory:</p>

```bash
cd hackhaton-boilerplate
```

<p>3. Install the dependiences</p>

```bash
npm install
```

<p>4. Create and fill .env file</p>

```env
DATABASE_URL=


BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

SMTP_SERVER_USERNAME=
SMTP_SERVER_PASSWORD=
SMTP_SERVER_HOST=
#Defail reciver of email
SITE_MAIL_RECIEVER=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

#From https://uploadthing.com/
UPLOADTHING_TOKEN=
UPLOADTHING_SECRET=
```

<p>5. Run Stripe webhook</p>

```bash
stripe listen --forward-to localhost:3000/api/auth/stripe/webhook
```

<p>6. Run Project</p>

```bash
npm run dev
```
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   NextJs
*   TypeScript
*   Prisma
*   ShadCN
*   BetterAuth
*   TailwindCSS
*   Stripe
*   React Hook Form
*   zod
*   nodemailer
*   motion.js

<h2>🛡️ License:</h2>

This project is licensed under the MIT
