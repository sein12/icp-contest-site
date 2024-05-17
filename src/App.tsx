import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import MemberList from './MemberList';
import AddChannelModal from './AddChannelModal';
import ProfileModal from './ProfileModal';
import { AuthClient } from '@dfinity/auth-client';

interface Message {
  text: string;
  user: string;
  timestamp: string;
  avatar: string;
}

interface Channels {
  [key: string]: Message[];
}

interface Members {
  [key: string]: string[];
}

interface ChannelLeaders {
  [key: string]: string | null;
}

const App: React.FC = () => {
  const [currentChannel, setCurrentChannel] = useState<string>('welcome');
  const [channels, setChannels] = useState<Channels>({
    welcome: [],
    announcements: [],
    general: [],
    random: []
  });
  const [members, setMembers] = useState<Members>({
    welcome: ['Alice', 'Bob', 'Charlie'],
    announcements: ['Dave', 'Eve'],
    general: ['Frank', 'Grace', 'Heidi'],
    random: ['Ivan', 'Judy', 'Mallory']
  });
  const [channelLeaders, setChannelLeaders] = useState<ChannelLeaders>({
    welcome: null,
    announcements: null,
    general: null,
    random: null
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [identity, setIdentity] = useState<any>(null);

  useEffect(() => {
    authenticate();  // 애플리케이션이 시작될 때마다 인증 요청
  }, []);

  const authenticate = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: process.env.REACT_APP_IDENTITY_PROVIDER,
      onSuccess: () => {
        setIdentity(authClient.getIdentity());
      },
      windowOpenerFeatures: `width=500,height=500,left=${(window.innerWidth - 500) / 2},top=${(window.innerHeight - 500) / 2}`
    });
  };

  const handleSendMessage = (message: Message) => {
    setChannels({
      ...channels,
      [currentChannel]: [...channels[currentChannel], message]
    });
  };

  const addChannel = (channelName: string) => {
    if (channelName.trim() !== '' && !channels[channelName]) {
      setChannels({
        ...channels,
        [channelName]: []
      });
      setMembers({
        ...members,
        [channelName]: []
      });
      setChannelLeaders({
        ...channelLeaders,
        [channelName]: null
      });
      setCurrentChannel(channelName);
    }
  };

  const deleteChannel = (channelName: string) => {
    const newChannels = { ...channels };
    const newMembers = { ...members };
    const newChannelLeaders = { ...channelLeaders };
    delete newChannels[channelName];
    delete newMembers[channelName];
    delete newChannelLeaders[channelName];

    setChannels(newChannels);
    setMembers(newMembers);
    setChannelLeaders(newChannelLeaders);

    if (currentChannel === channelName) {
      const remainingChannels = Object.keys(newChannels);
      setCurrentChannel(remainingChannels.length > 0 ? remainingChannels[0] : '');
    }
  };

  const setChannelLeader = (channel: string, member: string) => {
    setChannelLeaders({
      ...channelLeaders,
      [channel]: member
    });
  };

  return (
    <div className="app">
      <Sidebar
        currentChannel={currentChannel}
        setCurrentChannel={setCurrentChannel}
        channels={Object.keys(channels)}
        openModal={() => setShowModal(true)}
        deleteChannel={deleteChannel}
      />
      <Chat messages={channels[currentChannel] || []} onSendMessage={handleSendMessage} />
      <MemberList
        members={members[currentChannel] || []}
        channelLeader={channelLeaders[currentChannel]}
        setChannelLeader={(member: string) => setChannelLeader(currentChannel, member)}
      />
      <button className="profile-button" onClick={() => setShowProfileModal(true)}>
        My Profile
      </button>
      {showModal && (
        <AddChannelModal
          closeModal={() => setShowModal(false)}
          addChannel={addChannel}
        />
      )}
      {showProfileModal && (
        <ProfileModal closeModal={() => setShowProfileModal(false)} />
      )}
    </div>
  );
}

export default App;
