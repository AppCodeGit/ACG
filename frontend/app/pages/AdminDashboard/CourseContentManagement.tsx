"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import ModuleManagement from "./ModuleManagement";
import "./style/CourseContentManagement.css";

// Types
interface ModuleItem {
  id: number;
  title: string;
  type: "video" | "document" | "assignment";
  duration?: string;
  status: "draft" | "published" | "archived";
  fileUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  programName: string;
  moduleId?: number;
  order: number;
  createdAt: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  status: string;
  contents: ModuleItem[];
}

interface ContentStats {
  videos: number;
  documents: number;
  assignments: number;
}

interface Notification {
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: number;
}

// Confirmation Modal Component
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  title: string; 
  message: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <h3>{title}</h3>
          <button className="confirm-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="confirm-modal-body">
          <p>{message}</p>
        </div>
        <div className="confirm-modal-footer">
          <button className="confirm-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="confirm-btn-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

/* =====================
   API FUNCTIONS
===================== */
const getCourseContent = async (programName: string): Promise<ModuleItem[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/courses/${encodeURIComponent(programName)}/content`,
  );
  if (!response.ok) throw new Error("Failed to fetch course content");
  const data = await response.json();
  return data.content;
};

const getModules = async (programName: string): Promise<Module[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/modules/${encodeURIComponent(programName)}`,
  );
  if (!response.ok) throw new Error("Failed to fetch modules");
  const data = await response.json();
  return data.modules;
};

const assignContentToModule = async (
  contentId: number,
  moduleId: number | null,
): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/content/${contentId}/assign-module`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moduleId }),
    },
  );
  if (!response.ok) throw new Error("Failed to assign content");
  return response.json();
};

const getContentById = async (contentId: number): Promise<ModuleItem> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/content/${contentId}`,
  );
  if (!response.ok) throw new Error("Failed to fetch content details");
  const data = await response.json();
  return data.content;
};

const deleteContent = async (contentId: number): Promise<void> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/courses/content/${contentId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) throw new Error("Failed to delete content");
};

const updateContentStatus = async (
  contentId: number,
  status: string,
): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/courses/content/${contentId}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );
  if (!response.ok) throw new Error("Failed to update status");
  return response.json();
};

const updateContent = async (
  contentId: number,
  data: Partial<ModuleItem>,
): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/courses/content/${contentId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) throw new Error("Failed to update content");
  return response.json();
};

const uploadContent = async (formData: FormData): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(`${API_URL}/api/content-files/upload-content`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to upload content");
  }
  return response.json();
};

// Modal Component
const ContentModal = ({
  content,
  onClose,
  isOpen,
}: {
  content: ModuleItem | null;
  onClose: () => void;
  isOpen: boolean;
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !content) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return "play_circle";
      case "document":
        return "description";
      case "assignment":
        return "assignment";
      default:
        return "file_present";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "#e9691e";
      case "document":
        return "#3b82f6";
      case "assignment":
        return "#4caf50";
      default:
        return "#e9691e";
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="modal-header-section">
          {content.type === "video" && content.thumbnailUrl ? (
            <div className="modal-thumbnail">
              <img src={content.thumbnailUrl} alt={content.title} />
            </div>
          ) : (
            <div
              className="modal-icon-circle"
              style={{ background: `${getTypeColor(content.type)}15` }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: getTypeColor(content.type), fontSize: "48px" }}
              >
                {getTypeIcon(content.type)}
              </span>
            </div>
          )}
          <h2 className="modal-title">{content.title}</h2>
          <div className="modal-badges">
            <span className={`modal-badge type-${content.type}`}>
              {content.type}
            </span>
            <span className={`modal-badge status-${content.status}`}>
              {content.status}
            </span>
          </div>
        </div>
        <div className="modal-body-section">
          {content.description && (
            <div className="modal-info-group">
              <label>Description</label>
              <p>{content.description}</p>
            </div>
          )}
          <div className="modal-details-grid">
            <div className="modal-detail-item">
              <span className="material-symbols-outlined">folder</span>
              <div>
                <label>Program</label>
                <p>{content.programName}</p>
              </div>
            </div>
            {content.duration && (
              <div className="modal-detail-item">
                <span className="material-symbols-outlined">schedule</span>
                <div>
                  <label>Duration</label>
                  <p>{content.duration}</p>
                </div>
              </div>
            )}
            <div className="modal-detail-item">
              <span className="material-symbols-outlined">calendar_today</span>
              <div>
                <label>Created</label>
                <p>{formatDate(content.createdAt)}</p>
              </div>
            </div>
            <div className="modal-detail-item">
              <span className="material-symbols-outlined">badge</span>
              <div>
                <label>Content ID</label>
                <p>#{content.id}</p>
              </div>
            </div>
          </div>
          {content.fileUrl && (
            <div className="modal-action-buttons">
              <a
                href={content.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-btn modal-btn-primary"
              >
                <span className="material-symbols-outlined">open_in_new</span>
                Open File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Component
const Notification = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      default:
        return "#3b82f6";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: getBackgroundColor(),
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 9999,
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <span style={{ fontSize: "20px" }}>{getIcon()}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          marginLeft: "10px",
          fontSize: "18px",
        }}
      >
        ✕
      </button>
    </div>
  );
};

// Accordion Module Item Component
const AccordionModuleItem = ({ 
  module, 
  isOpen, 
  onToggle,
  onViewDetails,
  onEditClick,
  onDeleteClick,
  onStatusChange
}: { 
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
  onViewDetails: (id: number) => void;
  onEditClick: (item: ModuleItem) => void;
  onDeleteClick: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "#f59e0b";
      case "published": return "#4caf50";
      case "archived": return "#f44336";
      default: return "#666";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return "🎬";
      case "document": return "📄";
      case "assignment": return "📋";
      default: return "📄";
    }
  };

  return (
    <div className="accordion-module-wrapper">
      <div className="accordion-module-header" onClick={onToggle}>
        <div className="accordion-title-section">
          <span className="accordion-icon">📦</span>
          <div>
            <h4>{module.title}</h4>
            <p className="accordion-description">{module.description || "No description"}</p>
          </div>
        </div>
        <div className="accordion-stats-section">
          <span className="accordion-arrow">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="accordion-module-content">
          {module.contents && module.contents.length > 0 ? (
            module.contents.map((item) => (
              <div key={item.id} className="module-item">
                <div className="module-icon">
                  {item.type === "video" && item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="video-thumbnail"
                      onClick={() => onViewDetails(item.id)}
                    />
                  ) : (
                    <span className="material-symbols-outlined">
                      {item.type === "video" ? "play_circle" : item.type === "document" ? "description" : "assignment"}
                    </span>
                  )}
                </div>
                <div className="module-details">
                  <h6 className="module-title">{item.title}</h6>
                  <div className="module-meta">
                    <span className="module-type">{item.type}</span>
                    {item.duration && (
                      <span className="module-duration">{item.duration}</span>
                    )}
                    <span className={`module-status ${item.status === "draft" ? "status-draft" : item.status === "published" ? "status-published" : "status-archived"}`}>
                      {item.status}
                    </span>
                  </div>
                  {item.description && (
                    <p className="module-description">{item.description}</p>
                  )}
                  {item.fileUrl && (
                    <button
                      className="file-link-btn"
                      onClick={() => onViewDetails(item.id)}
                    >
                      <span className="material-symbols-outlined">visibility</span> View Details
                    </button>
                  )}
                </div>
                <div className="module-actions">
                  <select
                    className="status-select"
                    value={item.status}
                    onChange={(e) => onStatusChange(item.id, e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    className="icon-btn edit"
                    title="Edit content"
                    onClick={() => onEditClick(item)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="icon-btn delete"
                    title="Delete content"
                    onClick={() => onDeleteClick(item.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-module-contents">
              <p>No content yet. Upload video, document, and assignment for this module.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Component
const CourseContentManagement = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [contentType, setContentType] = useState<
    "video" | "document" | "assignment"
  >("video");
  const [contentTitle, setContentTitle] = useState<string>("");
  const [contentDescription, setContentDescription] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [moduleItems, setModuleItems] = useState<ModuleItem[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editingItem, setEditingItem] = useState<ModuleItem | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<ModuleItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [contentToDelete, setContentToDelete] = useState<number | null>(null);
  const [openModules, setOpenModules] = useState<{ [key: number]: boolean }>({});

  const programOptions = [
    "Software Engineering",
    "Cloud Engineering",
    "Cyber Security",
    "Data Analytics",
    "Digital Marketing",
    "Forex Trading",
  ];

  const addNotification = (
    message: string,
    type: "success" | "error" | "info" | "warning",
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { message, type, id }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleModule = (moduleId: number) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const fetchModules = async (programName: string) => {
    try {
      const fetchedModules = await getModules(programName);
      setModules(fetchedModules);
      // Initialize all modules as closed
      const initialOpenState: { [key: number]: boolean } = {};
      fetchedModules.forEach(module => {
        initialOpenState[module.id] = false;
      });
      setOpenModules(initialOpenState);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchCourseContent = async (programName: string) => {
    setIsLoading(true);
    try {
      const content = await getCourseContent(programName);
      setModuleItems(content);
    } catch (error) {
      console.error("Error fetching course content:", error);
      addNotification("Failed to load course content.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgramChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const programName = e.target.value;
    setSelectedProgram(programName);
    setSelectedModuleId(null);
    if (programName) {
      await fetchModules(programName);
      await fetchCourseContent(programName);
    }
    if (isEditing) handleCancelEdit();
  };

  const handleViewDetails = async (contentId: number) => {
    try {
      const content = await getContentById(contentId);
      setSelectedContent(content);
      setIsModalOpen(true);
    } catch (error) {
      addNotification("Failed to load content details", "error");
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleStatusChange = async (contentId: number, newStatus: string) => {
    try {
      await updateContentStatus(contentId, newStatus);
      await fetchCourseContent(selectedProgram);
      await fetchModules(selectedProgram);
      addNotification(`Status updated to ${newStatus}`, "success");
    } catch (error) {
      addNotification("Failed to update status", "error");
    }
  };

  const handleEditClick = (item: ModuleItem) => {
    setEditingItem(item);
    setContentTitle(item.title);
    setContentDescription(item.description || "");
    setContentType(item.type);
    setSelectedModuleId(item.moduleId || null);
    setIsEditing(true);
    document
      .querySelector(".upload-card")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setContentTitle("");
    setContentDescription("");
    setContentType("video");
    setSelectedFile(null);
    setSelectedModuleId(null);
    setIsEditing(false);
    const fileInput = document.getElementById(
      "content-file",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    if (selectedModuleId !== editingItem.moduleId && selectedModuleId) {
      const canAssign = await checkModuleContentLimit(
        selectedModuleId,
        editingItem.type,
      );
      if (!canAssign) return;
    }

    setIsUploading(true);
    try {
      const updateData: any = {
        title: contentTitle,
        description: contentDescription,
        type: contentType,
      };
      await updateContent(editingItem.id, updateData);
      if (selectedModuleId !== editingItem.moduleId) {
        await assignContentToModule(editingItem.id, selectedModuleId);
      }
      await fetchCourseContent(selectedProgram);
      await fetchModules(selectedProgram);
      handleCancelEdit();
      addNotification("Content updated successfully!", "success");
    } catch (error: any) {
      addNotification(error.message || "Failed to update content", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const checkModuleContentLimit = async (
    moduleId: number,
    contentType: string,
  ): Promise<boolean> => {
    const selectedModule = modules.find((m) => m.id === moduleId);
    if (!selectedModule) return true;

    const existingContents = selectedModule.contents || [];

    const videoCount = existingContents.filter(
      (c) => c.type === "video",
    ).length;
    const documentCount = existingContents.filter(
      (c) => c.type === "document",
    ).length;
    const assignmentCount = existingContents.filter(
      (c) => c.type === "assignment",
    ).length;

    if (contentType === "video" && videoCount >= 1) {
      addNotification(
        `Module "${selectedModule.title}" already has a video. Each module can only have 1 video.`,
        "error",
      );
      return false;
    }
    if (contentType === "document" && documentCount >= 1) {
      addNotification(
        `Module "${selectedModule.title}" already has a document. Each module can only have 1 document.`,
        "error",
      );
      return false;
    }
    if (contentType === "assignment" && assignmentCount >= 1) {
      addNotification(
        `Module "${selectedModule.title}" already has an assignment. Each module can only have 1 assignment.`,
        "error",
      );
      return false;
    }

    return true;
  };

 const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!selectedProgram) {
    addNotification("Please select a program first", "warning");
    return;
  }
  if (!contentTitle) {
    addNotification("Please enter a title for your content", "warning");
    return;
  }
  if (!selectedFile) {
    addNotification("Please select a file to upload", "warning");
    return;
  }
  
  // NEW: Check if module is selected
  if (!selectedModuleId) {
    addNotification("Please select a module first. Content must be assigned to a module.", "error");
    return;
  }

    if (selectedModuleId) {
      const canUpload = await checkModuleContentLimit(
        selectedModuleId,
        contentType,
      );
      if (!canUpload) return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("programName", selectedProgram);
    formData.append("title", contentTitle);
    formData.append("type", contentType);
    formData.append("description", contentDescription);
    formData.append("file", selectedFile);
    if (selectedModuleId) {
      formData.append("moduleId", selectedModuleId.toString());
    }
    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      await uploadContent(formData);
      clearInterval(progressInterval);
      setUploadProgress(100);
      await fetchCourseContent(selectedProgram);
      await fetchModules(selectedProgram);

      setContentTitle("");
      setContentDescription("");
      setSelectedFile(null);
      setSelectedModuleId(null);
      const fileInput = document.getElementById(
        "content-file",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      addNotification("Content uploaded successfully!", "success");
    } catch (error: any) {
      addNotification(error.message || "Failed to upload content", "error");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (isEditing) {
      await handleUpdate(e);
    } else {
      await handleUpload(e);
    }
  };

  const handleDeleteClick = (id: number) => {
    setContentToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (contentToDelete) {
      try {
        await deleteContent(contentToDelete);
        await fetchCourseContent(selectedProgram);
        await fetchModules(selectedProgram);
        addNotification("Content deleted successfully!", "success");
      } catch (error) {
        addNotification("Failed to delete content", "error");
      } finally {
        setShowConfirmModal(false);
        setContentToDelete(null);
      }
    }
  };

  const getStatusColor = (status: ModuleItem["status"]): string => {
    const colors = {
      draft: "status-draft",
      published: "status-published",
      archived: "status-archived",
    };
    return colors[status];
  };

  const getTypeIcon = (type: ModuleItem["type"]): string => {
    const icons = {
      video: "play_circle",
      document: "description",
      assignment: "assignment",
    };
    return icons[type];
  };

  const stats: ContentStats = {
    videos: moduleItems.filter((item) => item.type === "video").length,
    documents: moduleItems.filter((item) => item.type === "document").length,
    assignments: moduleItems.filter((item) => item.type === "assignment")
      .length,
  };

  return (
    <div className="management-container content-management">
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Content"
        message="Are you sure you want to delete this content? This action cannot be undone."
      />
      <ContentModal
        content={selectedContent}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContent(null);
        }}
        isOpen={isModalOpen}
      />
      {notifications.map((n) => (
        <Notification
          key={n.id}
          message={n.message}
          type={n.type}
          onClose={() => removeNotification(n.id)}
        />
      ))}

      <div className="content-layout">
        <div className="content-sidebar">
          <div className="upload-card">
            <h4 className="upload-title">
              {isEditing ? "Edit Content" : "Upload New Content"}
            </h4>

            <div className="form-group">
              <label className="form-label">Select Program</label>
              <select
                className="form-select"
                value={selectedProgram}
                onChange={handleProgramChange}
                disabled={isEditing}
              >
                <option value="">Choose a program</option>
                {programOptions.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Content Type</label>
              <div className="content-type-selector">
                <button
                  type="button"
                  className={`type-btn ${contentType === "video" ? "active" : ""}`}
                  onClick={() => setContentType("video")}
                >
                  <span className="material-symbols-outlined">play_circle</span>{" "}
                  Video
                </button>
                <button
                  type="button"
                  className={`type-btn ${contentType === "document" ? "active" : ""}`}
                  onClick={() => setContentType("document")}
                >
                  <span className="material-symbols-outlined">description</span>{" "}
                  Document
                </button>
                <button
                  type="button"
                  className={`type-btn ${contentType === "assignment" ? "active" : ""}`}
                  onClick={() => setContentType("assignment")}
                >
                  <span className="material-symbols-outlined">assignment</span>{" "}
                  Assignment
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label className="form-label">Content Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={contentTitle}
                  onChange={(e) => setContentTitle(e.target.value)}
                  placeholder="Enter content title"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={contentDescription}
                  onChange={(e) => setContentDescription(e.target.value)}
                  placeholder="Enter content description"
                />
              </div>

              {!isEditing && (
                <div className="form-group">
                  <label className="form-label">
                    {contentType === "video"
                      ? "Video File"
                      : contentType === "document"
                        ? "Document File"
                        : "Assignment Instructions"}
                  </label>
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="content-file"
                      className="file-input"
                      onChange={handleFileSelect}
                      accept={
                        contentType === "video"
                          ? "video/*"
                          : contentType === "document"
                            ? ".pdf,.doc,.docx"
                            : "*"
                      }
                      required
                    />
                    <label htmlFor="content-file" className="file-upload-label">
                      <span className="material-symbols-outlined">
                        cloud_upload
                      </span>
                      <span className="file-text">
                        {selectedFile
                          ? selectedFile.name
                          : "Choose file or drag & drop here"}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Assign to Module</label>
                <select
                  className="form-select"
                  value={selectedModuleId || ""}
                  onChange={(e) =>
                    setSelectedModuleId(
                      e.target.value ? parseInt(e.target.value) : null,
                    )
                  }
                >
                  <option value="">-- No Module (Unassigned) --</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {isEditing && (
                <div className="edit-mode-indicator">
                  <span className="material-symbols-outlined">edit</span>
                  <span>
                    Editing: <strong>{editingItem?.title}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {isUploading && !isEditing && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="progress-text">
                    Uploading... {uploadProgress}% complete
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-upload"
                disabled={
                  isUploading ||
                  !selectedProgram ||
                  !contentTitle ||
                  (!isEditing && !selectedFile)
                }
              >
                {isUploading ? (
                  <>
                    <div className="upload-spinner" />
                    {isEditing ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">
                      {isEditing ? "save" : "cloud_upload"}
                    </span>
                    {isEditing ? "Update Content" : "Upload Content"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="content-main">
          <ModuleManagement
            programName={selectedProgram}
            onModuleChange={() => {
              fetchModules(selectedProgram);
              fetchCourseContent(selectedProgram);
            }}
            onNotification={addNotification}
          />
          <div className="content-list-card">
            <div className="content-header">
              <h4 className="content-title">
                {selectedProgram
                  ? `${selectedProgram} - Course Content`
                  : "Course Content"}
              </h4>
              {selectedProgram && moduleItems.length > 0 && (
                <span className="content-count">
                  {moduleItems.length} items
                </span>
              )}
            </div>

            {!selectedProgram ? (
              <div className="empty-state">
                <span className="material-symbols-outlined">info</span>
                <p>Please select a program to view its content.</p>
              </div>
            ) : isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner" />
                <p>Loading content...</p>
              </div>
            ) : modules.length > 0 ? (
              <div className="accordion-container">
                {modules.map((module) => (
                  <AccordionModuleItem
                    key={module.id}
                    module={module}
                    isOpen={openModules[module.id] || false}
                    onToggle={() => toggleModule(module.id)}
                    onViewDetails={handleViewDetails}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteClick}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : moduleItems.length > 0 ? (
              <div className="module-list">
                {moduleItems.map((item) => (
                  <div key={item.id} className="module-item">
                    <div className="module-icon">
                      {item.type === "video" && item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.title}
                          className="video-thumbnail"
                          onClick={() => handleViewDetails(item.id)}
                        />
                      ) : (
                        <span className="material-symbols-outlined">
                          {getTypeIcon(item.type)}
                        </span>
                      )}
                    </div>
                    <div className="module-details">
                      <h6 className="module-title">{item.title}</h6>
                      <div className="module-meta">
                        <span className="module-type">{item.type}</span>
                        {item.duration && (
                          <span className="module-duration">
                            {item.duration}
                          </span>
                        )}
                        <span
                          className={`module-status ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      {item.description && (
                        <p className="module-description">{item.description}</p>
                      )}
                      {item.fileUrl && (
                        <button
                          className="file-link-btn"
                          onClick={() => handleViewDetails(item.id)}
                        >
                          <span className="material-symbols-outlined">
                            visibility
                          </span>{" "}
                          View Detail
                        </button>
                      )}
                    </div>
                    <div className="module-actions">
                      <select
                        className="status-select"
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                      <button
                        className="icon-btn edit"
                        title="Edit content"
                        onClick={() => handleEditClick(item)}
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        className="icon-btn delete"
                        title="Delete content"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="material-symbols-outlined">folder_off</span>
                <p>
                  No content uploaded yet. Use the form to add course content.
                </p>
              </div>
            )}
          </div>

          {moduleItems.length > 0 && (
            <div className="content-stats">
              <h5 className="stats-title">Content Statistics</h5>
              <div className="stats-grid">
                <div className="content-stat">
                  <div className="stat-icon video">
                    <span className="material-symbols-outlined">
                      play_circle
                    </span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.videos}</div>
                    <div className="stat-label">Videos</div>
                  </div>
                </div>
                <div className="content-stat">
                  <div className="stat-icon document">
                    <span className="material-symbols-outlined">
                      description
                    </span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.documents}</div>
                    <div className="stat-label">Documents</div>
                  </div>
                </div>
                <div className="content-stat">
                  <div className="stat-icon assignment">
                    <span className="material-symbols-outlined">
                      assignment
                    </span>
                  </div>
                  <div className="stat-content">
                    <div className="stat-value">{stats.assignments}</div>
                    <div className="stat-label">Assignments</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentManagement;