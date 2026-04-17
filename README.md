# 🚀 PortGen: Elite Portfolio Generator

<div align="center">

[![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-generator-silk.vercel.app/)
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Generate a high-conversion, stunning developer portfolio in under 5 minutes.**

[Explore Live Demo ➔](https://portfolio-generator-silk.vercel.app/)

</div>

---

## ✨ Features

- **⚡ Multi-Step Wizard:** A frictionless experience to input your core professional details.
- **🎨 Premium Templates:** Choose from curated themes including Dark Mode, Glassmorphism, and 3D Elite layouts.
- **🛠️ GitHub Integration:** Automatically fetch and display your projects using just your username.
- **💳 Razorpay Integration:** Secure, production-grade payment gateway for unlocking premium tiers.
- **📦 Instant Export:** Download your entire portfolio as a production-ready ZIP file.
- **🔐 Secure Auth:** Robust signup/login system powered by Prisma and PostgreSQL (Supabase).
- **📱 Ultra Responsive:** Optimized for every device, from mobile to ultra-wide monitors.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router), React 19, Lucide Icons, Vanilla CSS (Glassmorphism).
- **Backend:** Next.js Server Actions, Node.js.
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase](https://supabase.com/)).
- **ORM:** [Prisma v7](https://www.prisma.io/) with custom driver adapters.
- **Payment:** [Razorpay Standard Checkout API](https://razorpay.com/).
- **Deployment:** [Vercel](https://vercel.com/).

---

## 🚀 Local Setup

Follow these steps to get the project running on your machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/WhyNotNarayan/Portfolio-Generator.git
   cd Portfolio-Generator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add:
   ```env
   # Database (Supabase)
   DATABASE_URL="your_postgresql_url"
   DIRECT_URL="your_direct_postgresql_url"

   # Razorpay Keys
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_ID="rzp_test_..."
   RAZORPAY_KEY_SECRET="your_secret_here"
   ```

4. **Initialize Database**
   ```bash
   npx prisma generate
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to see your app!

---

## 📦 Deployment

This app is optimized for **Vercel**. 

1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Add your `.env` variables in the Vercel Dashboard.
4. **Crucial:** Ensure `DATABASE_URL` and `DIRECT_URL` are set for Prisma v7 compatibility.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  Built with ❤️ by Aniket
</div>
