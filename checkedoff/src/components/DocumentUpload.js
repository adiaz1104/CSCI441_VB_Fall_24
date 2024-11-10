import React, { useState } from 'react';

const DocumentUpload = () => {
  // Sample initial documents with additional file data
  const initialDocuments = [
    {
      id: 1,
      name: "Family Vacation Plans",
      fileName: "vacation_2024.pdf",
      fileType: "application/pdf",
      fileContent: "base64_content_here", // In a real app, this would be actual file data
      user: "Tara",
      uploadDate: "2024-10-15",
      category: "Travel",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "School Permission Slip",
      fileName: "field_trip_permission.pdf",
      fileType: "application/pdf",
      fileContent: "base64_content_here",
      user: "Adam",
      uploadDate: "2024-10-14",
      category: "School",
      size: "156 KB"
    }
  ];

  // State management
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [error, setError] = useState('');
  const [uploadForm, setUploadForm] = useState({
    name: '',
    file: null,
    user: '',
    category: ''
  });

  // Filter documents
  const users = [...new Set(documents.map(doc => doc.user))];
  const categories = [...new Set(documents.map(doc => doc.category))];
  const filteredDocuments = documents.filter(doc => {
    const userMatch = !selectedUser || doc.user === selectedUser;
    const categoryMatch = !selectedCategory || doc.category === selectedCategory;
    return userMatch && categoryMatch;
  });

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      setUploadForm(prev => ({
        ...prev,
        file
      }));
      setError('');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.file || !uploadForm.user || !uploadForm.category) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = () => {
        const newDocument = {
          id: documents.length + 1,
          name: uploadForm.name,
          fileName: uploadForm.file.name,
          fileType: uploadForm.file.type,
          fileContent: reader.result,
          user: uploadForm.user,
          category: uploadForm.category,
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(uploadForm.file.size / (1024 * 1024)).toFixed(2)} MB`
        };

        setDocuments(prev => [...prev, newDocument]);
        setUploadForm({
          name: '',
          file: null,
          user: '',
          category: ''
        });
        setShowUploadForm(false);
        setError('');
      };
      reader.readAsDataURL(uploadForm.file);
    } catch (error) {
      setError('Error uploading file');
    }
  };

  // Handle document download
  const handleDownload = (document) => {
    try {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = document.fileContent; // Use the base64 content
      link.download = document.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Error downloading file');
    }
  };

  // Handle document deletion
  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    }
  };

  return (
    <div className="document-upload-container">
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="user-filter" className="filter-label">
            Filter by user:
          </label>
          <select
            id="user-filter"
            className="filter-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <label htmlFor="category-filter" className="filter-label">
            Filter by category:
          </label>
          <select
            id="category-filter"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="upload-button"
        >
          {showUploadForm ? 'Cancel' : 'Upload Document'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showUploadForm && (
        <div className="upload-form-container">
          <h3 className="form-title">Upload New Document</h3>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Document Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={uploadForm.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="user" className="form-label">User:</label>
              <select
                id="user"
                name="user"
                value={uploadForm.user}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={uploadForm.category}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="file" className="form-label">File (max 10MB):</label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="form-file-input"
                required
              />
            </div>

            <button type="submit" className="submit-button">Upload</button>
          </form>
        </div>
      )}

      <div className="documents-grid">
        {filteredDocuments.map(doc => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <h4 className="document-title">{doc.name}</h4>
              <span className="document-user">{doc.user}</span>
            </div>
            <div className="document-info">
              <p className="document-filename">{doc.fileName}</p>
              <p className="document-meta">
                <span className="document-category">{doc.category}</span>
                <span className="document-size">{doc.size}</span>
              </p>
              <p className="document-date">Uploaded: {doc.uploadDate}</p>
            </div>
            <div className="document-actions">
              <button 
                className="action-button download-btn"
                onClick={() => handleDownload(doc)}
              >
                Download
              </button>
              <button 
                className="action-button delete-btn"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredDocuments.length === 0 && (
          <p className="no-documents">
            No documents found{selectedUser ? ` for ${selectedUser}` : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;