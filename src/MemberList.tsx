import React, { useState } from 'react';
import './MemberList.css';

interface MemberListProps {
    members: string[];
    channelLeader: string | null;
    setChannelLeader: (member: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, channelLeader, setChannelLeader }) => {
    const [contextMenu, setContextMenu] = useState<{ visible: boolean, x: number, y: number, member: string | null }>({ visible: false, x: 0, y: 0, member: null });

    const handleRightClick = (event: React.MouseEvent, member: string) => {
        event.preventDefault();
        setContextMenu({ visible: true, x: event.clientX, y: event.clientY, member });
    };

    const handleSetLeader = () => {
        if (contextMenu.member) {
            setChannelLeader(contextMenu.member);
            setContextMenu({ visible: false, x: 0, y: 0, member: null });
        }
    };

    const handleCloseContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, member: null });
    };

    return (
        <div className="member-list" onClick={handleCloseContextMenu}>
            <br />
            <br />
            <br />
            <h3>Members</h3>
            <ul>
                {members.map((member, index) => (
                    <li
                        key={index}
                        onContextMenu={(event) => handleRightClick(event, member)}
                        className={channelLeader === member ? 'leader' : ''}
                    >
                        {member}
                    </li>
                ))}
            </ul>
            {contextMenu.visible && (
                <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    <button onClick={handleSetLeader}>Set as Channel Leader</button>
                </div>
            )}
        </div>
    );
}

export default MemberList;
