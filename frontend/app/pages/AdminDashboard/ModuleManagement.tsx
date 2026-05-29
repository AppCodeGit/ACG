"use client";

import { useState, useEffect } from "react";

interface ModuleItem {
  id: number;
  title: string;
  type: "video" | "document" | "assignment";
  duration?: string;
  status: string;
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

interface Notification {
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: number;
}

// API functions
const getModules = async (programName: string): Promise<Module[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/modules/${encodeURIComponent(programName)}`,
  );
  if (!response.ok) throw new Error("Failed to fetch modules");
  const data = await response.json();
  return data.modules;
};

const createModule = async (data: {
  title: string;
  description: string;
  programName: string;
}): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(`${API_URL}/api/content-files/modules`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create module");
  return response.json();
};

const updateModule = async (moduleId: number, data: { title?: string; description?: string; order?: number; status?: string }): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(`${API_URL}/api/content-files/modules/${moduleId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update module");
  return response.json();
};

const deleteModule = async (moduleId: number): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(
    `${API_URL}/api/content-files/modules/${moduleId}`,
    {
      method: "DELETE",
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete module");
  return data;
};

interface ModuleManagementProps {
  programName: string;
  onModuleChange: () => void;
  onNotification: (message: string, type: "success" | "error" | "info" | "warning") => void;
}

const ModuleManagement = ({
  programName,
  onModuleChange,
  onNotification,
}: ModuleManagementProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");

  const fetchModules = async () => {
    if (!programName) return;
    setIsLoading(true);
    try {
      const fetchedModules = await getModules(programName);
      setModules(fetchedModules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      onNotification("Failed to fetch modules", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [programName]);

  const handleCreateModule = async () => {
    if (!moduleTitle.trim()) {
      onNotification("Please enter a module title", "warning");
      return;
    }
    try {
      await createModule({
        title: moduleTitle,
        description: moduleDescription,
        programName,
      });
      setModuleTitle("");
      setModuleDescription("");
      setShowForm(false);
      await fetchModules();
      onModuleChange();
      onNotification("Module created successfully!", "success");
    } catch (error) {
      console.error("Error creating module:", error);
      onNotification("Failed to create module", "error");
    }
  };

  const handleModuleStatusChange = async (moduleId: number, status: string) => {
    try {
      await updateModule(moduleId, { status });
      await fetchModules();
      onModuleChange();
      onNotification(`Module status updated to ${status}`, "success");
    } catch (error) {
      console.error("Error updating module status:", error);
      onNotification("Failed to update module status", "error");
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    const moduleToDelete = modules.find(m => m.id === moduleId);
    
    // Check if module has content
    if (moduleToDelete && moduleToDelete.contents && moduleToDelete.contents.length > 0) {
      onNotification(
        `Cannot delete "${moduleToDelete.title}"! It contains ${moduleToDelete.contents.length} item(s). Please delete all content first.`,
        "error"
      );
      return;
    }

    try {
      await deleteModule(moduleId);
      await fetchModules();
      onModuleChange();
      onNotification("Module deleted successfully!", "success");
    } catch (error: any) {
      console.error("Error deleting module:", error);
      onNotification(error.message || "Failed to delete module", "error");
    }
  };

  const handleRefresh = () => {
    fetchModules();
    onModuleChange();
    onNotification("Modules refreshed!", "info");
  };

  // Helper to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft': return '#f59e0b';
      case 'published': return '#4caf50';
      case 'archived': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="module-management-section">
      <div className="module-header">
        <h4>📦 Course Modules</h4>
        <div className="header-buttons">
          <button
            className="btn-refresh"
            onClick={handleRefresh}
            title="Refresh modules"
          >
            🔄 Refresh
          </button>
          <button className="btn-add-module" onClick={() => setShowForm(true)}>
            + Add Module
          </button>
        </div>
      </div>

      {showForm && (
        <div className="module-form">
          <input
            type="text"
            placeholder="Module Title (e.g., Module 1: Introduction)"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <textarea
            placeholder="Module Description"
            value={moduleDescription}
            onChange={(e) => setModuleDescription(e.target.value)}
            rows={2}
          />
          <div className="form-actions">
            <button className="btn-create" onClick={handleCreateModule}>
              Create
            </button>
            <button className="btn-cancel" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="modules-container">
        {isLoading ? (
          <div className="loading-modules">Loading modules...</div>
        ) : modules.length === 0 ? (
          <div className="no-modules">
            No modules yet. Click "Add Module" to create one.
          </div>
        ) : (
          modules.map((module, idx) => (
            <div key={module.id} className="module-card">
              <div className="module-card-header">
                <span className="module-order">Module {idx + 1}</span>
                <div className="module-header-actions">
                  <select
                    value={module.status}
                    onChange={(e) => handleModuleStatusChange(module.id, e.target.value)}
                    className="module-status-select"
                    style={{ borderColor: getStatusBadgeColor(module.status) }}
                  >
                    <option value="draft">📝 Draft</option>
                    <option value="published">✅ Published</option>
                    <option value="archived">📦 Archived</option>
                  </select>
                  <button
                    className="delete-module"
                    onClick={() => handleDeleteModule(module.id)}
                    title="Delete module (must be empty)"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <h5>{module.title}</h5>
              <p>{module.description || "No description"}</p>
              <div className="module-stats">
                <span
                  className={
                    module.contents?.filter((c) => c.type === "video").length >=
                    1
                      ? "full"
                      : ""
                  }
                >
                  📹{" "}
                  {module.contents?.filter((c) => c.type === "video").length ||
                    0}
                  /1 Videos
                </span>
                <span
                  className={
                    module.contents?.filter((c) => c.type === "document")
                      .length >= 1
                      ? "full"
                      : ""
                  }
                >
                  📄{" "}
                  {module.contents?.filter((c) => c.type === "document")
                    .length || 0}
                  /1 Documents
                </span>
                <span
                  className={
                    module.contents?.filter((c) => c.type === "assignment")
                      .length >= 1
                      ? "full"
                      : ""
                  }
                >
                  📋{" "}
                  {module.contents?.filter((c) => c.type === "assignment")
                    .length || 0}
                  /1 Assignments
                </span>
              </div>
              <div className="module-status-badge" style={{ backgroundColor: getStatusBadgeColor(module.status) }}>
                {module.status}
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .module-management-section {
          background: white;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .module-header h4 {
          margin: 0;
          color: #333;
          font-size: 18px;
        }
        .header-buttons {
          display: flex;
          gap: 10px;
        }
        .btn-refresh {
          background: #17a2b8;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-refresh:hover {
          background: #138496;
          transform: translateY(-1px);
        }
        .btn-add-module {
          background: #e9691e;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-add-module:hover {
          background: #d55a1a;
          transform: translateY(-1px);
        }
        .module-form {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .module-form input,
        .module-form textarea {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
        }
        .module-form input:focus,
        .module-form textarea:focus {
          outline: none;
          border-color: #e9691e;
        }
        .form-actions {
          display: flex;
          gap: 10px;
        }
        .btn-create {
          background: #e9691e;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-cancel {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .modules-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .module-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          border-left: 4px solid #e9691e;
          transition: all 0.3s ease;
          position: relative;
        }
        .module-card:hover {
          transform: translateX(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .module-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .module-order {
          font-size: 11px;
          color: #e9691e;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .module-header-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .module-status-select {
          padding: 4px 8px;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-size: 12px;
          cursor: pointer;
          background: white;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .module-status-select:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .delete-module {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          padding: 4px 8px;
          border-radius: 6px;
        }
        .delete-module:hover {
          opacity: 1;
          background: #fdecea;
        }
        .module-card h5 {
          margin: 0 0 8px 0;
          font-size: 16px;
          color: #333;
        }
        .module-card p {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #666;
        }
        .module-stats {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #666;
          flex-wrap: wrap;
        }
        .module-stats span.full {
          color: #e9691e;
          font-weight: 500;
        }
        .module-status-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .loading-modules,
        .no-modules {
          text-align: center;
          padding: 20px;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default ModuleManagement;