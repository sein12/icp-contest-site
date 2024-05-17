import React, { useEffect, useState } from 'react';
import './ProfileModal.css';
import { AuthClient } from '@dfinity/auth-client';

interface ProfileModalProps {
    closeModal: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ closeModal }) => {
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const getIdentity = async () => {
            const authClient = await AuthClient.create();
            const identity = authClient.getIdentity();
            setUserId(identity.getPrincipal().toString());
        };

        getIdentity();
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>My Profile</h2>
                <p>User ID: {userId}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default ProfileModal;
