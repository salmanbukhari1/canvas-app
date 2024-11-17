const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";
const frontEndUrl = "https://canvas-app-besx.vercel.app";

const corsOptions = {
  origin: isEmulator ? "*" : frontEndUrl, // Frontend URL
  methods: ["GET", "POST"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

module.exports = corsOptions;