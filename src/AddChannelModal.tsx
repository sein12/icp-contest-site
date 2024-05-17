import React, { useState } from 'react';
import './AddChannelModal.css';

interface AddChannelModalProps {
    closeModal: () => void;
    addChannel: (channelName: string) => void;
}

const AddChannelModal: React.FC<AddChannelModalProps> = ({ closeModal, addChannel }) => {
    const [newChannel, setNewChannel] = useState<string>('');

    const handleAddChannel = () => {
        addChannel(newChannel);
        setNewChannel('');
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Channel</h2>
                <input
                    type="text"
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    placeholder="New channel name"
                />
                <button onClick={handleAddChannel}>Add</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
}

export default AddChannelModal;
