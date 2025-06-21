import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccountDeletion = () => {
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { deleteAccount, user } = useAuth();
  const navigate = useNavigate();

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm account deletion');
      return;
    }
    
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await deleteAccount(password);
      if (result.success) {
        setMessage(result.message || 'Your account has been deleted successfully.');
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setError(result.message || 'Failed to delete account');
      }
    } catch (err) {
      setError('An error occurred while deleting your account');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="account-deletion-container">
        <h2>Delete Account</h2>
        <p>Please log in to delete your account.</p>
      </div>
    );
  }

  return (
    <div className="account-deletion-container">
      <h2>Delete Your Account</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      
      {!showConfirmation ? (
        <>
          <div className="warning-box">
            <h3>Warning: This action cannot be undone</h3>
            <p>
              Deleting your account will permanently remove all your data from our system, including:
            </p>
            <ul>
              <li>Your profile information</li>
              <li>Order history</li>
              <li>Saved addresses</li>
              <li>Wishlist items</li>
              <li>Reviews you've posted</li>
            </ul>
            <p>
              If you're sure you want to proceed, click the button below.
            </p>
          </div>
          
          <form onSubmit={handleInitialSubmit}>
            <button 
              type="submit" 
              className="btn btn-danger" 
            >
              I want to delete my account
            </button>
          </form>
        </>
      ) : (
        <form onSubmit={handleDeleteAccount}>
          <div className="form-group">
            <label htmlFor="password">Enter your password to confirm</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmText">Type DELETE to confirm</label>
            <input
              type="text"
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              required
              placeholder="Type DELETE in all caps"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => setShowConfirmation(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="btn btn-danger" 
              disabled={isSubmitting || confirmText !== 'DELETE'}
            >
              {isSubmitting ? 'Deleting...' : 'Permanently Delete Account'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AccountDeletion; 