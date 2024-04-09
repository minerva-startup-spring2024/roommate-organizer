"use client";

import { useState, useEffect } from 'react';
const CreateAnnouncement = ({ senderId, roomId, role, buildingId }) => {
    const [content, setContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const [isToManager, setIsToManager] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buildingOptions, setBuildingOptions] = useState([]);

    useEffect(() => {
        if (role === 'MANAGER') {
            fetch(`/api/buildings?buildingId=${buildingId}`)
                .then((res) => res.json())
                .then((data) => {
                    setBuildingOptions(data.rooms);
                })
                .catch((error) => console.error("Error:", error));
        }
    }, [buildingId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiEndpoint = role === 'MANAGER' ? '/api/announcements/buildings' : '/api/announcements';

        const payload = {
            senderId,
            content,
            toManager: isToManager,
            roomId: role === 'MANAGER' ? recipient : roomId,
        };

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert('Message sent!');
            setContent('');
            setRecipient('');
            setIsToManager('');
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
                        value={recipient}
                        onChange={(e) => {
                            const value = e.target.value;
                            
                            setRecipient(value);
                            setIsToManager(value === 'manager');
                        }}
                    >
                        <option value="" disabled>Select the recipient</option>
                        {role === 'ROOMMATE' ? (
                            <>
                                <option value="manager">Manager</option>
                                <option value="roomId1">My Room</option>
                            </>
                        ) : (
                            <>
                                {buildingOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name} || {}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
                Send Message
            </button>
        </form>
    );
};

export default CreateAnnouncement;

