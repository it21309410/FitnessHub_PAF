import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';

export const navigationMenu = [
    {
        title: "Home",
        icon: <HomeIcon />,
        path: "/"
    },
    {
        title: "Message",
        icon: <MessageIcon />,
        path: "/messages" // Example path for messages
    },
    {
        title: "Lists",
        icon: <ListAltIcon />,
        path: "/lists" // Example path for lists
    },
    {
        title: "Community",
        icon: <GroupIcon />,
        path: "/community" // Example path for community
    },
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        path: "/profile" // Example path for profile
    },
];

const NavigationMenu = () => {
    return (
        <div>
            {navigationMenu.map((item, index) => (
                <Link to={item.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
                        {item.icon}
                        <span>{item.title}</span>
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default NavigationMenu;
