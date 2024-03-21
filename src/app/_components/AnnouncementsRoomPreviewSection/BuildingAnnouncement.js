import React, { useState } from 'react';


function AnnouncementForm({ roomId, sentById }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);



    const response = await fetch('/api/buildings/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomId, content}),
    });

    if (response.ok) {
      alert('Announcement posted!');
  
      setContent('');
    } else {
      const errorData = await response.json();
      alert(`Failed to post announcement: ${errorData.message}`);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit" disabled={isSubmitting}>
        Post Announcement
      </button>
    </form>
  );
}


export default AnnouncementForm;