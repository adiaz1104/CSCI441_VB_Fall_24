import React, { useState } from 'react';

const DocumentUpload = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [uploadForm, setUploadForm] = useState({
      name: '',
      file: null,
      user: ''
    });
    const [error, setError] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);
  
    // Sample users - this would come from the backend
    const users = ['Adam', 'Tara', 'Jake', 'Dylan'];
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        if (file.size > 10 * 1024 * 1024) {
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
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUploadForm(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!uploadForm.name || !uploadForm.file || !uploadForm.user) {
        setError('Please fill in all fields');
        return;
      }
  
      const newDocument = {
        id: Date.now(),
        name: uploadForm.name,
        fileName: uploadForm.file.name,
        user: uploadForm.user,
        uploadDate: new Date().toLocaleDateString()
      };
  
      setDocuments(prev => [...prev, newDocument]);
      
      setUploadForm({
        name: '',
        file: null,
        user: ''
      });
      setShowUploadForm(false);
      setError('');
    };
  
    const filteredDocuments = selectedUser
      ? documents.filter(doc => doc.user === selectedUser)
      : documents;
  
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
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="upload-button"
          >
            {showUploadForm ? 'Cancel' : 'Upload Document'}
          </button>
        </div>
  
        {showUploadForm && (
          <div className="upload-form-container">
            <h3 className="form-title">Upload New Document</h3>
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Document Name:
                </label>
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
                <label htmlFor="user" className="form-label">
                  User:
                </label>
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
                <label htmlFor="file" className="form-label">
                  File (max 10MB):
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="form-file-input"
                  required
                />
              </div>
              {error && (
                <p className="error-message">{error}</p>
              )}
              <button
                type="submit"
                className="submit-button"
              >
                Upload
              </button>
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
              <p className="document-filename">{doc.fileName}</p>
              <p className="document-date">Uploaded: {doc.uploadDate}</p>
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