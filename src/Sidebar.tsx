import React from 'react';
import './Sidebar.css';

interface SidebarProps {
    currentChannel: string;
    setCurrentChannel: (channel: string) => void;
    channels: string[];
    openModal: () => void;
    deleteChannel: (channel: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentChannel, setCurrentChannel, channels, openModal, deleteChannel }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>ICP Chat</h2>
            </div>
            <div className="sidebar-channels">
                <div className="channels-header">
                    <h3>채널 목록</h3>
                    <button className="add-channel-button" onClick={openModal}>
                        Add Chanel
                    </button>
                </div>
                <ul>
                    {channels.map(channel => (
                        <li
                            key={channel}
                            className={currentChannel === channel ? 'active' : ''}
                            onClick={() => setCurrentChannel(channel)}
                        >
                            <span># {channel}</span>
                            <button className="delete-channel-button" onClick={() => deleteChannel(channel)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
