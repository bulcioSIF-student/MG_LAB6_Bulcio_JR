import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// TypeScript interface for book request
interface BookRequest {
  id: number;
  studentName: string;
  studentId: string;
  bookTitle: string;
  author: string;
  reason: string;
  submittedAt: string;
}

function App() {
  // ============================================
  // CONTROLLED FORM STATE
  // ============================================
  const [controlledForm, setControlledForm] = useState({
    studentName: '',
    studentId: '',
    bookTitle: '',
    author: '',
    reason: ''
  });
  
  const [submittedRequests, setSubmittedRequests] = useState<BookRequest[]>([]);
  const [controlledErrors, setControlledErrors] = useState<string[]>([]);

  // ============================================
  // UNCONTROLLED FORM REFS
  // ============================================
  const uncontrolledNameRef = useRef<HTMLInputElement>(null);
  const uncontrolledIdRef = useRef<HTMLInputElement>(null);
  const uncontrolledTitleRef = useRef<HTMLInputElement>(null);
  const uncontrolledAuthorRef = useRef<HTMLInputElement>(null);
  const uncontrolledReasonRef = useRef<HTMLTextAreaElement>(null);

  // ============================================
  // CONTROLLED FORM HANDLERS
  // ============================================
  
  // Handle input changes for controlled form
  const handleControlledChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setControlledForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate controlled form
  const validateControlledForm = (): boolean => {
    const errors: string[] = [];
    
    if (!controlledForm.studentName.trim()) errors.push('Student Name is required');
    if (!controlledForm.studentId.trim()) errors.push('Student ID is required');
    if (!controlledForm.bookTitle.trim()) errors.push('Book Title is required');
    if (!controlledForm.author.trim()) errors.push('Author is required');
    if (!controlledForm.reason.trim()) errors.push('Reason for Request is required');
    
    setControlledErrors(errors);
    return errors.length === 0;
  };

  // Handle controlled form submission
  const handleControlledSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateControlledForm()) {
      return;
    }

    // Create new request object
    const newRequest: BookRequest = {
      id: Date.now(),
      studentName: controlledForm.studentName,
      studentId: controlledForm.studentId,
      bookTitle: controlledForm.bookTitle,
      author: controlledForm.author,
      reason: controlledForm.reason,
      submittedAt: new Date().toLocaleString()
    };

    // Add to submitted requests
    setSubmittedRequests(prev => [...prev, newRequest]);

    // Reset form
    setControlledForm({
      studentName: '',
      studentId: '',
      bookTitle: '',
      author: '',
      reason: ''
    });
    
    setControlledErrors([]);
  };

  // ============================================
  // UNCONTROLLED FORM HANDLERS
  // ============================================
  
  // Handle uncontrolled form submission
  const handleUncontrolledSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Access values via refs
    const formData = {
      studentName: uncontrolledNameRef.current?.value || '',
      studentId: uncontrolledIdRef.current?.value || '',
      bookTitle: uncontrolledTitleRef.current?.value || '',
      author: uncontrolledAuthorRef.current?.value || '',
      reason: uncontrolledReasonRef.current?.value || ''
    };

    // Simple validation - check if any field is empty
    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert(`Please fill in the following fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Log to console
    console.log('=== UNCONTROLLED FORM SUBMISSION ===');
    console.log('Book Request Data:', formData);
    console.log('Submitted at:', new Date().toLocaleString());
    console.log('=====================================');

    // Reset form using refs
    if (uncontrolledNameRef.current) uncontrolledNameRef.current.value = '';
    if (uncontrolledIdRef.current) uncontrolledIdRef.current.value = '';
    if (uncontrolledTitleRef.current) uncontrolledTitleRef.current.value = '';
    if (uncontrolledAuthorRef.current) uncontrolledAuthorRef.current.value = '';
    if (uncontrolledReasonRef.current) uncontrolledReasonRef.current.value = '';

    alert('Request logged to console successfully!');
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">
          📚 University Library Book Request System
        </h1>
        <p className="lead text-muted">
          Submit requests for books currently unavailable in the library
        </p>
      </header>

      <div className="row g-4">
        {/* ============================================
            CONTROLLED FORM SECTION
        ============================================ */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100 border-primary">
            <div className="card-header bg-primary text-white">
              <h2 className="h5 mb-0">📝 Controlled Form (useState)</h2>
            </div>
            <div className="card-body">
              {/* Validation Errors */}
              {controlledErrors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  <strong>Please fix the following errors:</strong>
                  <ul className="mb-0 mt-2">
                    {controlledErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <form onSubmit={handleControlledSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="c-studentName" className="form-label">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c-studentName"
                    name="studentName"
                    value={controlledForm.studentName}
                    onChange={handleControlledChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="c-studentId" className="form-label">
                    Student ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c-studentId"
                    name="studentId"
                    value={controlledForm.studentId}
                    onChange={handleControlledChange}
                    placeholder="e.g., 2021-00001"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="c-bookTitle" className="form-label">
                    Book Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c-bookTitle"
                    name="bookTitle"
                    value={controlledForm.bookTitle}
                    onChange={handleControlledChange}
                    placeholder="Enter book title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="c-author" className="form-label">
                    Author <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="c-author"
                    name="author"
                    value={controlledForm.author}
                    onChange={handleControlledChange}
                    placeholder="Enter author name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="c-reason" className="form-label">
                    Reason for Request <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="c-reason"
                    name="reason"
                    rows={3}
                    value={controlledForm.reason}
                    onChange={handleControlledChange}
                    placeholder="Explain why you need this book..."
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ============================================
            UNCONTROLLED FORM SECTION
        ============================================ */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100 border-success">
            <div className="card-header bg-success text-white">
              <h2 className="h5 mb-0">📝 Uncontrolled Form (useRef)</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleUncontrolledSubmit}>
                <div className="mb-3">
                  <label htmlFor="u-studentName" className="form-label">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="u-studentName"
                    ref={uncontrolledNameRef}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="u-studentId" className="form-label">
                    Student ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="u-studentId"
                    ref={uncontrolledIdRef}
                    placeholder="e.g., 2021-00001"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="u-bookTitle" className="form-label">
                    Book Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="u-bookTitle"
                    ref={uncontrolledTitleRef}
                    placeholder="Enter book title"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="u-author" className="form-label">
                    Author <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="u-author"
                    ref={uncontrolledAuthorRef}
                    placeholder="Enter author name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="u-reason" className="form-label">
                    Reason for Request <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="u-reason"
                    rows={3}
                    ref={uncontrolledReasonRef}
                    placeholder="Explain why you need this book..."
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Log to Console
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================
          SUBMITTED REQUESTS DISPLAY (CONTROLLED FORM)
      ============================================ */}
      {submittedRequests.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4 text-primary">📋 Submitted Requests (Controlled Form)</h3>
          <div className="row g-3">
            {submittedRequests.map((request) => (
              <div key={request.id} className="col-md-6 col-lg-4">
                <div className="card border-info h-100">
                  <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Request #{request.id.toString().slice(-4)}</span>
                    <small>{request.submittedAt}</small>
                  </div>
                  <div className="card-body">
                    <p className="mb-1"><strong>Student:</strong> {request.studentName}</p>
                    <p className="mb-1"><strong>ID:</strong> {request.studentId}</p>
                    <hr />
                    <p className="mb-1"><strong>Book:</strong> {request.bookTitle}</p>
                    <p className="mb-1"><strong>Author:</strong> {request.author}</p>
                    <p className="mb-0"><strong>Reason:</strong> {request.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {submittedRequests.length === 0 && (
        <div className="mt-5 text-center text-muted">
          <p className="lead">No requests submitted yet. Use the Controlled Form to submit a request.</p>
        </div>
      )}
    </div>
  );
}

export default App;