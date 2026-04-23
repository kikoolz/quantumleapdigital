const requiredEnvVars = {
  DATABASE_URL: process.env.DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
} as const;

function validateEnv() {
  const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvVars.length > 0 && process.env.NODE_ENV === "production") {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }

  if (missingEnvVars.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn(
      `Warning: Missing environment variables: ${missingEnvVars.join(", ")}`
    );
  }
}

// Only validate at runtime, not during build
if (typeof window === "undefined" && process.env.NEXT_PHASE !== "phase-production-build") {
  validateEnv();
}

export const env = requiredEnvVars as {
  [K in keyof typeof requiredEnvVars]: string;
};
