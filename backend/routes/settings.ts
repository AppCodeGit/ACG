import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Default settings values - REMOVED max_concurrent_sessions AND prevent_duplicate_registrations
const defaultSettings = [
  // System Settings
  { category: "system", key: "maintenance_mode", value: "false", description: "Shows maintenance page to everyone except admins" },
  { category: "system", key: "allow_registrations", value: "true", description: "Allows new student signups" },
  { category: "system", key: "session_lifetime_hours", value: "24", description: "Hours before auto-logout (12/24/48/72)" },
  
  // Security Settings
  { category: "security", key: "max_login_attempts", value: "5", description: "Max failed login attempts before lock (3/5)" },
  { category: "security", key: "account_lock_duration_minutes", value: "30", description: "Minutes account stays locked (15/30/60)" },
];

// Initialize default settings if not exist
async function initializeSettings() {
  for (const setting of defaultSettings) {
    const exists = await prisma.systemSetting.findUnique({
      where: { key: setting.key }
    });
    
    if (!exists) {
      await prisma.systemSetting.create({
        data: setting
      });
    }
  }
}

// Call initialization on route load
initializeSettings();

// ==============================
// 1️⃣ GET ALL SETTINGS
// ==============================
router.get("/", async (req: Request, res: Response) => {
  try {
    const settings = await prisma.systemSetting.findMany({
      orderBy: [
        { category: 'asc' },
        { key: 'asc' }
      ]
    });
    
    // Group settings by category
    const groupedSettings = {
      system: {} as Record<string, string>,
      security: {} as Record<string, string>
    };
    
    settings.forEach(setting => {
      if (setting.category === "system") {
        groupedSettings.system[setting.key] = setting.value;
      } else if (setting.category === "security") {
        groupedSettings.security[setting.key] = setting.value;
      }
    });
    
    res.json({
      success: true,
      data: groupedSettings
    });
  } catch (err) {
    console.error("Error fetching settings:", err);
    res.status(500).json({ success: false, message: "Failed to fetch settings" });
  }
});

// ==============================
// 2️⃣ UPDATE SETTINGS
// ============================== 
router.put("/", async (req: Request, res: Response) => {
  try {
    const { system, security } = req.body;
    
    // Update System Settings
    if (system) {
      for (const [key, value] of Object.entries(system)) {
        await prisma.systemSetting.update({
          where: { key },
          data: { value: String(value) }
        });
      }
    }
    
    // Update Security Settings
    if (security) {
      for (const [key, value] of Object.entries(security)) {
        await prisma.systemSetting.update({
          where: { key },
          data: { value: String(value) }
        });
      }
    }
    
    res.json({
      success: true,
      message: "Settings saved successfully"
    });
  } catch (err) {
    console.error("Error saving settings:", err);
    res.status(500).json({ success: false, message: "Failed to save settings" });
  }
});

// ==============================
// 3️⃣ GET SINGLE SETTING (for other parts of app)
// ==============================
router.get("/:key", async (req: Request, res: Response) => {
  try {
    // Fix: Ensure key is a string, not an array
    const key = String(req.params.key);
    
    const setting = await prisma.systemSetting.findUnique({
      where: { key }
    });
    
    if (!setting) {
      return res.status(404).json({ success: false, message: "Setting not found" });
    }
    
    res.json({
      success: true,
      data: { key: setting.key, value: setting.value }
    });
  } catch (err) {
    console.error("Error fetching setting:", err);
    res.status(500).json({ success: false, message: "Failed to fetch setting" });
  }
});

export default router;