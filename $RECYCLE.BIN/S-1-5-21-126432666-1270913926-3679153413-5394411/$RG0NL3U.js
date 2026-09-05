const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

/**
 * Get authorization headers with JWT token
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
};

/**
 * Fetch all scheduled emails with pagination (admin only)
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Items per page (default: 7)
 * @param {string} status - Status filter (optional)
 */
export const fetchScheduledEmails = async (page = 1, limit = 10, status = "") => {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });
    
    // Only add status filter if it's not empty
    if (status && status.trim() !== "") {
      params.append('status', status);
    }

    const response = await fetch(`${API_BASE_URL}/email-logs?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching scheduled emails:', error);
    throw error;
  }
};