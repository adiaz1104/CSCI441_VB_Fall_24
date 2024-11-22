import React, { useState, useEffect } from 'react';

const DocumentUpload = () => {
  // State for documents stored in localStorage
  const [documents, setDocuments] = useState(() => {
    const savedDocs = localStorage.getItem('documents');
    return savedDocs ? JSON.parse(savedDocs) : [];
  });

  // UI state
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [uploadForm, setUploadForm] = useState({
    name: '',
    user: '',
    category: ''
  });

  // Get unique users and categories for filters
  const users = [...new Set(documents.map(doc => doc.user))];
  const categories = [...new Set(documents.map(doc => doc.category))];

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const userMatch = !selectedUser || doc.user === selectedUser;
    const categoryMatch = !selectedCategory || doc.category === selectedCategory;
    return userMatch && categoryMatch;
  });

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('documents', JSON.stringify(documents));
  }, [documents]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        setUploadForm(prev => ({
          ...prev,
          file: {
            name: file.name,
            type: file.type,
            size: formatFileSize(file.size),
            content: reader.result
          }
        }));
        setError('');
      } catch (error) {
        setError('Error processing file');
        console.error('File processing error:', error);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
      console.error('FileReader error:', reader.error);
    };

    reader.readAsDataURL(file);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.file || !uploadForm.user || !uploadForm.category) {
      setError('Please fill in all fields');
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: uploadForm.name,
      fileName: uploadForm.file.name,
      fileType: uploadForm.file.type,
      fileContent: uploadForm.file.content,
      user: uploadForm.user,
      category: uploadForm.category,
      uploadDate: new Date().toISOString().split('T')[0],
      size: uploadForm.file.size
    };

    setDocuments(prev => [...prev, newDocument]);
    setUploadForm({ name: '', user: '', category: '' });
    setShowUploadForm(false);
    setSuccess('Document uploaded successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Fixed download function
  const handleDownload = (doc) => {
    try {
      const link = window.document.createElement('a');
      link.href = doc.fileContent;
      link.download = doc.fileName;
      link.style.display = 'none';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      setError('Error downloading file');
    }
  };

  // Handle document deletion
  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      setSuccess('Document deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
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
      {success && <div className="success-message">{success}</div>}

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
              <input
                type="text"
                id="user"
                name="user"
                value={uploadForm.user}
                onChange={handleInputChange}
                className="form-input"
                required
              />
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