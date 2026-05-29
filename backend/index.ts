import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { initSocket } from "./socket";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/auth";
import s3UploadRoutes from "./routes/s3_upload";
import studentFormsRoutes from "./routes/studentforms";
import studentPortalRoutes from "./routes/studentPortalRoutes";
import feesPaymentRoutes from './routes/feesPaymentRoutes';
import studentProfileRoutes from './routes/studentProfile';
import forgotpasswordRoutes from './routes/forgotpassword';
import paymentInfoRoutes from './routes/paymentInfo';
import adminRoutes from './routes/adminRoute/adminRoutes';
import courseContentRoutes from './routes/courseContentRoute';
import videoProgressRoutes from "./routes/videoProgress";
import assignmentRoutes from "./routes/assignments";
import studentManagementRoutes from "./routes/studentManagement";
import adminPaymentsRoutes from "./routes/adminPayments";
import adminCoursesRoutes from "./routes/adminCourses";
import dashboardOverviewRoutes from "./routes/dashboardOverview";
import reportsRoutes from "./routes/reports";
import settingsRoutes from "./routes/settings";
import coursePerformanceRoutes from "./routes/coursePerformance";



const app = express();
const prisma = new PrismaClient();

// Create HTTP server FIRST
const server = createServer(app);

// CORS configuration - MUST come BEFORE Socket.io
const allowedOrigins = [
  "https://main.d2qiaka43ozgqd.amplifyapp.com",
  "https://e5s4hxpbwy.us-east-1.awsapprunner.com",
  "http://localhost:5000",
  "http://localhost:3000",
];
 
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log('Blocked origin:', origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: '2gb' }));
app.use(express.urlencoded({ extended: true, limit: '2gb' }));

// Initialize Socket.io AFTER CORS, using the same server
const io = initSocket(server);
console.log("✅ Socket.io initialized");

// Test database connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log("✅ Database query test passed:", result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Database connection failed:", errorMessage);
  }
}

testDatabaseConnection();

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "School Management System API is running",
    status: "ok",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT NOW() as current_time, version() as pg_version`;
    res.json({
      success: true,
      message: "Database connected successfully!",
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

app.get("/api/db-tables", async (req, res) => {
  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    res.json({
      success: true,
      tables: tables,
      count: Array.isArray(tables) ? tables.length : 0
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}); 

app.get("/api/delete-all-data", async (req, res) => {
  try {
    const deletedData = {};
    const tablesInOrder = ["Payment", "Student", "User"];
    
    for (const table of tablesInOrder) {
      const result = await prisma.$queryRawUnsafe(
        `DELETE FROM "${table}" RETURNING *`
      );
      deletedData[table] = {
        count: Array.isArray(result) ? result.length : 0,
        data: result
      };
    }
    
    res.json({
      message: "All data deleted successfully",
      deletedData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ 
      error: error.message,
      hint: "Check foreign key constraints - tables must be deleted in correct order"
    });
  }
});

// Register routes
app.use("/api", authRoute);
app.use("/api/upload", s3UploadRoutes);
app.use("/api/forms", studentFormsRoutes);
app.use("/api", studentPortalRoutes);
app.use("/api/fees", feesPaymentRoutes);
app.use("/api/admin/payments", adminPaymentsRoutes);
app.use("/api", studentProfileRoutes);
app.use("/api", forgotpasswordRoutes);
app.use("/api/payment-info", paymentInfoRoutes);
app.use("/api/admin", adminRoutes);  
app.use("/api/content-files", courseContentRoutes);
app.use("/api/video-progress", videoProgressRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/student-management", studentManagementRoutes); 
app.use("/api/admin/courses", adminCoursesRoutes);
app.use("/api/dashboard", dashboardOverviewRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/course-performance", coursePerformanceRoutes);


// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('========== ERROR ==========');
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  console.error('===========================');
  
  res.status(500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start the server using the SAME server that has Socket.io attached
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ WebSocket server ready on port ${PORT}`);
});