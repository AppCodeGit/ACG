"use client";

import "../Header/HeaderPage.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "./appcode.png";

/* =========================
   Types
========================= */

interface User {
  id?: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface CheckAuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

/* =========================
   Helper Functions
========================= */

const getInitials = (fullName: string): string => {
  if (!fullName) return "U";
  
  const names = fullName.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  if (names.length >= 2) return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  return "U";
};

const getAvatarUrl = (user: User | null, profileImageUrl?: string): string => {
  if (!user) {
    return "https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=User";
  }

  if (profileImageUrl && profileImageUrl.trim() !== "") {
    return profileImageUrl;
  }

  if (user.profileImage && user.profileImage.trim() !== "") {
    return user.profileImage;
  }

  const nameForAvatar = user.fullName || "User";
  return `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(nameForAvatar)}`;
};

// Utility function to safely fetch JSON
const fetchJSON = async <T,>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  
  // Check if response is ok
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText.substring(0, 200));
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }
  
  // Check content type
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await response.text();
    console.error("Expected JSON but got:", contentType);
    console.error("Response preview:", text.substring(0, 300));
    throw new Error("Invalid response format from server (expected JSON)");
  }
  
  return response.json();
};

const fetchUserProfileData = async (email: string): Promise<{ name: string; email: string; profileImage?: string } | null> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    
    const data = await fetchJSON<{ success: boolean; user?: { name: string; email: string; profileImage?: string } }>(
      `${API_URL}/api/profile/${email}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    
    if (data.success && data.user) {
      return {
        name: data.user.name,
        email: data.user.email,
        profileImage: data.user.profileImage
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

const fetchProfileImage = async (email: string): Promise<string | null> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    
    const data = await fetchJSON<{ success: boolean; profileImage?: string }>(
      `${API_URL}/api/profile/profile-image/${email}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    
    if (data.success && data.profileImage) {
      return data.profileImage;
    }
    return null;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return null;
  }
};

/* =========================
   Component
========================= */

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  /* =========================
     Effects
  ========================= */

  useEffect(() => {
    // Only check auth if not logging out
    if (!isLoggingOut) {
      checkAuthStatus();
    }
  }, [pathname, isLoggingOut]);

  useEffect(() => {
    if (user?.email && !isLoggingOut) {
      loadUserProfileData(user.email);
    }
  }, [user, isLoggingOut]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside as EventListener);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener,
      );
    };
  }, []);

  /* =========================
     Auth Logic
  ========================= */

  const loadUserProfileData = async (email: string) => {
    if (isLoggingOut) return;
    
    const profileData = await fetchUserProfileData(email);
    
    if (profileData && user) {
      const updatedUser = {
        ...user,
        fullName: profileData.name,
        email: profileData.email,
        profileImage: profileData.profileImage || user?.profileImage
      };
      
      setUser(updatedUser as User);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      if (profileData.profileImage) {
        setProfileImage(profileData.profileImage);
      } else {
        const image = await fetchProfileImage(email);
        if (image) {
          setProfileImage(image);
          const userWithImage = { ...updatedUser, profileImage: image };
          setUser(userWithImage as User);
          localStorage.setItem("user", JSON.stringify(userWithImage));
        }
      }
    }
  };

  const checkAuthStatus = async (): Promise<void> => {
    // Don't check auth if logging out
    if (isLoggingOut) {
      console.log("Skipping auth check - logging out");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const storedUserRaw = localStorage.getItem("user");

      // If no token and no stored user, not authenticated
      if (!token && !storedUserRaw) {
        setUser(null);
        setLoading(false);
        return;
      }

      // If we have a stored user but no token (or vice versa), clear everything
      if (!token || !storedUserRaw) {
        localStorage.clear();
        setUser(null);
        setLoading(false);
        return;
      }

      let storedUser: User;
      try {
        storedUser = JSON.parse(storedUserRaw);
      } catch (parseError) {
        console.error("Error parsing stored user:", parseError);
        localStorage.clear();
        setUser(null);
        setLoading(false);
        return;
      }

      // Check with backend to validate session
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      try {
        // Try to validate with backend
        const data = await fetchJSON<CheckAuthResponse>(`${API_URL}/api/auth/check-auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ email: storedUser.email }),
        });

        if (data.success && data.user) {
          // Session is valid - update user data if needed
          const mergedUser: User = {
            ...storedUser,
            ...data.user,
            role: storedUser.role || data.user.role || "student",
          };

          setUser(mergedUser);
          localStorage.setItem("user", JSON.stringify(mergedUser));
          
          if (mergedUser.profileImage) {
            setProfileImage(mergedUser.profileImage);
          }
        } else {
          // Session is invalid - clear everything
          console.log("Auth check failed:", data.message);
          localStorage.clear();
          sessionStorage.clear();
          setUser(null);
          setProfileImage("");
        }
      } catch (fetchError: any) {
        // Handle 404 specifically - endpoint doesn't exist
        if (fetchError.message?.includes("404")) {
          console.warn("Auth check endpoint not found (404). Using local session only.");
          // Since the endpoint doesn't exist, just use the stored user data
          // This is typical for development or when backend auth isn't fully implemented
          setUser(storedUser);
          if (storedUser.profileImage) {
            setProfileImage(storedUser.profileImage);
          }
        } else {
          console.error("Fetch error during auth check:", fetchError);
          // For other errors, keep existing user data but log the error
          if (storedUser) {
            console.log("Keeping existing session due to API error");
            setUser(storedUser);
          } else {
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      // Don't clear on error to prevent logout loops
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Network error - keep existing user data
        console.log("Network error - keeping existing session");
      } else {
        // Only clear on actual auth errors
        localStorage.removeItem("user");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Helpers
  ========================= */

  const isAdmin: boolean =
    user?.role?.toLowerCase() === "admin" ||
    user?.email?.toLowerCase() === "admin@appcode.com";

  const toggleSearch = (): void => {
    setIsSearchVisible((prev) => !prev);
  };

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async (e?: React.MouseEvent): Promise<void> => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Starting logout process...");
    
    // Set logging out flag to prevent re-authentication
    setIsLoggingOut(true);
    
    try {
      // Call logout endpoint if it exists
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          await fetch(`${API_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
        } catch (err) {
          // Ignore logout API errors - it's optional
          console.log("Logout API not available, proceeding with client-side logout");
        }
      }
    } catch (error) {
      console.error("Error calling logout API:", error);
    }
    
    // Clear all localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      if (name.trim()) {
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      }
    });
    
    // Reset all state
    setUser(null);
    setProfileImage("");
    setIsDropdownOpen(false);
    
    // Force hard redirect to login page
    window.location.replace("/login");
  };

  /* =========================
     Loading UI
  ========================= */

  if (loading) {
    return (
      <header className="site-header">
        <div className="container">
          <div className="loading-placeholder">Loading...</div>
        </div>
      </header>
    );
  }

  /* =========================
     Render
  ========================= */

  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo">
          <Image src={logo} alt="Logo" width={120} height={50} />
        </Link>

        <div className="header-contact">
          <div className="search-bar-container">
            {!isSearchVisible ? (
              <button
                className="search-icon-button"
                onClick={toggleSearch}
                type="button"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            ) : (
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <button
                  className="close-icon-button"
                  onClick={toggleSearch}
                  type="button"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            )}
          </div>

          <div className="login-container">
            {user ? (
              isAdmin ? (
                <div className="btn-container">
                  <Link href="/pages/AdminDashboard" className="btn admin-btn">
                    Admin
                  </Link>
                  <button
                    onClick={(e) => handleLogout(e)}
                    className="btn logout-btn"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <div
                    className="profile-tri"
                    onClick={toggleDropdown}
                    role="button"
                    onKeyDown={(e) => e.key === "Enter" && toggleDropdown()}
                    tabIndex={0}
                  >
                    <img
                      src={getAvatarUrl(user, profileImage)}
                      alt={user.fullName || "User"}
                      className="profile-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const initials = getInitials(user.fullName);
                        target.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(initials)}`;
                      }}
                    />
                    <span
                      className={`material-symbols-outlined arrow ${
                        isDropdownOpen ? "rotate" : ""
                      }`}
                    >
                      arrow_drop_down
                    </span>
                  </div>

                  {isDropdownOpen && (
                    <div className="dropdown-Menu show">
                      <div className="dropdown-header">
                        <img
                          src={getAvatarUrl(user, profileImage)}
                          alt={user.fullName || "User"}
                          className="dropdown-profile-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const initials = getInitials(user.fullName);
                            target.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(initials)}`;
                          }}
                        />
                        <div className="dropdown-user-info">
                          <h4>{user.fullName || "User"}</h4>
                          <p>{user.email}</p>
                        </div>
                      </div>

                      <div className="dropdown-divider" />

                      <Link
                        href="/pages/StudentPortal?modal=profile"
                        className="dropdown-item"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>

                      <Link
                        href="/pages/StudentPortal"
                        className="dropdown-item"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Student Portal
                      </Link>

                      <div className="dropdown-divider" />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLogout(e);
                        }}
                        className="dropdown-item"
                        type="button"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="btn-container">
                <Link href="/login" className="btn">
                  Login
                  <span className="material-symbols-outlined">login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}