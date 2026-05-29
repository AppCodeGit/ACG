// frontend/lib/settings.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface SettingsCache {
  [key: string]: string;
}

let settingsCache: SettingsCache = {};
let lastFetch: number = 0;
const CACHE_DURATION = 60000; // 1 minute

export async function getSetting(key: string): Promise<string> {
  // Check cache first
  if (settingsCache[key] && Date.now() - lastFetch < CACHE_DURATION) {
    return settingsCache[key];
  }
  
  // Fetch fresh settings
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/settings/${key}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" }
    });
    const result = await response.json();
    
    if (result.success) {
      settingsCache[key] = result.data.value;
      lastFetch = Date.now();
      return result.data.value;
    }
  } catch (error) {
    console.error("Error fetching setting:", error);
  }
  
  return "";
}

export async function getAllSettings() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/settings`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" }
    });
    const result = await response.json();
    
    if (result.success) {
      settingsCache = {
        ...result.data.system,
        ...result.data.security
      };
      lastFetch = Date.now();
      return result.data;
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
  return null;
}