const express = require("express");
const authRoute = require("./routes/auth-routes.js"); //import router from auth-route (users)
const adminRoute = require("./routes/admin-routes.js");
const productRoute = require("./routes/product-routes.js");
const uploadRoute = require("./routes/upload-route.js");
const cartRoute = require("./routes/cart-routes.js");
const userRoute = require("./routes/user-routes.js");
const wishlistRoute = require("./routes/wishlist-route.js");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const https = require("https");
const { URL } = require("url");

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true })); //using extended keyword you can ensure that nested object can be created
app.use(express.static("public")); //for images or videos

//for secure cookie (only read by the server) to be saved in the browser of users
app.use(cookieParser());

const originUrls = [
  "http://localhost:5173",
  "http://172.26.112.1:5173",
  "http://192.168.174.1:5173",
  "http://192.168.216.43:5173",
  "http://192.168.1.109:5173",
  "http://192.168.216.43:5173",
  "https://*.ngrok-free.app",
  // Add more URLs as needed
];

// Function to check if a URL is accessible
const checkUrlAccessibility = (url, timeout = 5000) => {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;
      
      const req = protocol.request({
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname,
        method: 'HEAD',
        timeout: timeout
      }, (res) => {
        // Consider URL accessible if we get any response (even 404)
        resolve(true);
      });

      req.on('error', () => {
        resolve(false);
      });

      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });

      req.setTimeout(timeout);
      req.end();
    } catch (error) {
      resolve(false);
    }
  });
};

// Function to get all working URLs
const getWorkingUrls = async (urls) => {
  console.log('🔍 Checking URL accessibility...');
  
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const isWorking = await checkUrlAccessibility(url);
      return { url, isWorking };
    })
  );

  const workingUrls = results
    .map(result => result.value)
    .filter(result => result && result.isWorking)
    .map(result => result.url.replace(/\/$/, '')); // Remove trailing slash

  const nonWorkingUrls = results
    .map(result => result.value)
    .filter(result => result && !result.isWorking)
    .map(result => result.url);

  // Only display if there are URLs in each category
  if (workingUrls.length > 0) {
    console.log('✅ Connected URLs:', workingUrls);
  }
  
  if (nonWorkingUrls.length > 0) {
    console.log('❌ Not Working URLs:', nonWorkingUrls);
  }

  return workingUrls;
};

// Function to setup CORS with working URLs
const setupCorsWithWorkingUrls = async () => {
  try {
    const workingUrls = await getWorkingUrls(originUrls);
    
    if (workingUrls.length === 0) {
      console.log('⚠️  No working URLs found, using fallback configuration');
      // Fallback to allow all origins in development
      app.use(cors({
        origin: true,
        credentials: true,
      }));
    } else {
      app.use(cors({
        origin: workingUrls,
        credentials: true,
      }));
      console.log('🌐 CORS configured with working origins:', workingUrls);
    }
  } catch (error) {
    console.error('❌ Error setting up CORS:', error);
    // Fallback CORS configuration
    app.use(cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    }));
  }
};

// Function to periodically refresh working URLs (optional)
const refreshWorkingUrls = async (intervalMinutes = 30) => {
  setInterval(async () => {
    console.log('🔄 Refreshing working URLs...');
    const workingUrls = await getWorkingUrls(originUrls);
    
    // Note: Express doesn't allow dynamic CORS reconfiguration easily
    // This is mainly for logging purposes
    console.log('📊 Current working URLs:', workingUrls);
  }, intervalMinutes * 60 * 1000);
};

// Initialize CORS setup
const initializeApp = async () => {
  await setupCorsWithWorkingUrls();
  
  // Setup routes after CORS is configured
  app.use("/api/auth", authRoute); //route for users
  app.use("/api", adminRoute); //for admin handling user
  app.use("/api", userRoute); //for managing user profile
  app.use("/api", productRoute); //for products
  app.use("/api/cart", cartRoute);
  app.use("/api/wishlist", wishlistRoute); //routes for wishlist
  app.use("/api", uploadRoute); //route to upload files (cloudinary setup)
  app.use("/uploads", express.static("src/uploads")); //public url for uploaded images

  // Optional: Start periodic URL checking
  // refreshWorkingUrls(30); // Check every 30 minutes
  
  console.log('🚀 Application initialized successfully');
};

// API endpoint to manually check working URLs
app.get('/api/check-origins', async (req, res) => {
  try {
    const workingUrls = await getWorkingUrls(originUrls);
    res.json({
      success: true,
      workingUrls: workingUrls,
      totalChecked: originUrls.length,
      workingCount: workingUrls.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Initialize the application
initializeApp().catch(console.error);

module.exports = app;