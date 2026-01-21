# Salman Farsi - Portfolio Website

## About Me

Welcome to my personal portfolio! This website showcases my work, skills, and projects related to AI, Machine Learning, Data Science, and Web Development. Explore my experience in building intelligent systems, and find details about my research and industry projects.

## Features

- Interactive **AI Assistant** to explore my portfolio.
- Highlighted **AI/ML projects** and **Data Science** work.
- Functional **contact form** that sends emails directly to my inbox.
- Contact information for professional inquiries.

## Technologies Used

- **React 19** for building the frontend.
- **Vite 6** for fast development and building.
- **Tailwind CSS v4** for styling.
- **Groq API** for AI-driven chatbot functionality.
- **Formspree** for contact form submissions.
- **Netlify** for hosting and deployment.

## How to Run Locally

To run this project locally, clone the repository and run the following commands:

```bash
git clone https://github.com/salmanfarsi01/salmanfarsiportfolio.git
cd salman-farsi-portfolio
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 2. Formspree Setup (for Contact Form):
The contact form is already configured to use Formspree. The form endpoint is: `https://formspree.io/f/mgvzzpka`

Formspree will automatically send form submissions to your email. No additional configuration needed!

### 3. Testing Setup:
Run the configuration test:
```bash
node test-formspree.js
```

This will check if all required environment variables are set.
     {{message}}

     Best regards,
     Portfolio Contact Form
     ```
4. **Get your IDs**:
   - Service ID: Found in Email Services
   - Template ID: Found in Email Templates  
   - Public Key: Found in Account → General

## Deployment to Netlify

### 1. Environment Variables Setup
In your Netlify dashboard:
1. Go to **Site Settings** > **Environment Variables**
2. Add the following variable:
   - **Key**: `VITE_GROQ_API_KEY` | **Value**: Your Groq API key

### 2. Form Submissions
The contact form uses Formspree to send emails directly to your inbox. The form is already configured with the endpoint `https://formspree.io/f/mgvzzpka`.

### 3. Deploy
Push your changes to the main branch, and Netlify will automatically rebuild and deploy your site.

## Contact

Feel free to reach out through the contact form on the website or directly at:
- **Email**: salmanf4545@gmail.com
- **Phone**: +880 1986809848
