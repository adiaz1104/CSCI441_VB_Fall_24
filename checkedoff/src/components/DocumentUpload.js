import React, { useState } from 'react';
import './DocumentUpload.css';

const Documents = () => {
  // Sample initial documents
  const initialDocuments = [
    {
      id: 1,
      name: "Family Vacation Plans",
      fileName: "vacation_2024.pdf",
      user: "Tara",
      uploadDate: "2024-10-15",
      category: "Travel",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "School Permission Slip",
      fileName: "field_trip_permission.pdf",
      user: "Adam",
      uploadDate: "2024-10-14",
      category: "School",
      size: "156 KB"
    },
    {
      id: 3,
      name: "Medical Records - Jake",
      fileName: "medical_records_2024.pdf",
      user: "Jake",
      uploadDate: "2024-10-13",
      category: "Medical",
      size: "3.1 MB"
    },
    {
      id: 4,
      name: "Monthly Budget Sheet",
      fileName: "budget_october.xlsx",
      user: "Tara",
      uploadDate: "2024-10-12",
      category: "Financial",
      size: "892 KB"
    },
    {
      id: 5,
      name: "Home Insurance Policy",
      fileName: "home_insurance_2024.pdf",
      user: "Adam",
      uploadDate: "2024-10-11",
      category: "Insurance",
      size: "1.8 MB"
    },
    {
      id: 6,
      name: "Soccer Team Schedule",
      fileName: "soccer_schedule.pdf",
      user: "Dylan",
      uploadDate: "2024-10-10",
      category: "Sports",
      size: "445 KB"
    },
    {
      id: 7,
      name: "Recipe Collection",
      fileName: "family_recipes.docx",
      user: "Tara",
      uploadDate: "2024-10-09",
      category: "Recipes",
      size: "1.2 MB"
    },
    {
      id: 8,
      name: "Car Maintenance Records",
      fileName: "car_maintenance.pdf",
      user: "Adam",
      uploadDate: "2024-10-08",
      category: "Vehicle",
      size: "756 KB"
    }
  ];

  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadForm, setUploadForm] = useState({
    name: '',
    file: null,
    user: '',
    category: ''
  });
  const [error, setError] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Get unique values for filters
  const users = [...new Set(documents.map(doc => doc.user))];
  const categories = [...new Set(documents.map(doc => doc.category))];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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
    if (!uploadForm.name || !uploadForm.file || !uploadForm.user || !uploadForm.category) {
      setError('Please fill in all fields');
      return;
    }

    const newDocument = {
      id: documents.length + 1,
      name: uploadForm.name,
      fileName: uploadForm.file.name,
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

  // Filter documents based on selected criteria
  const filteredDocuments = documents.filter(doc => {
    const userMatch = !selectedUser || doc.user === selectedUser;
    const categoryMatch = !selectedCategory || doc.category === selectedCategory;
    return userMatch && categoryMatch;
  });

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

            {error && <p className="error-message">{error}</p>}
            
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
              <button className="action-button download-btn">Download</button>
              <button className="action-button delete-btn">Delete</button>
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

export default Documents;