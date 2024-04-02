"use client";

import React, { useState } from 'react';

function MessageForm({ senderId }) {
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('manager'); // Default to sending to manager
  const [isToManager, setIsToManager] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let payload = {
        senderId,
        content,
        toManager: isToManager,
    };

    // If sending to a room, adjust the payload accordingly
    if (!isToManager) {
      payload = { senderId, ...payload, toManager: false };
    }

    const response = await fetch( '/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert('Message sent!');
      setContent('');
      setRecipient('manager'); // Reset back to default
      setIsToManager(true); // Reset back to default
    } else {
      const errorData = await response.json();
      alert(`Failed to send message: ${errorData.message}`);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Message Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
      </div>
      <div>
        <label>
          Send To:
          <select
            value={isToManager ? 'manager' : recipient}
            onChange={(e) => {
              const value = e.target.value;
              setIsToManager(value === 'manager');
              setRecipient(value);
            }}
          >
            <option value="manager">Manager</option>
            {/* Populate this with actual room IDs and names */}
            <option value="roomId1">My room</option>
          </select>
        </label>
      </div>
      <button type="submit" disabled={isSubmitting}>
        Send Message
      </button>
    </form>
  );
}

export default MessageForm;
