import React from 'react';
import { FaClock } from 'react-icons/fa';

const ComingSoon: React.FC = () => {
    return (
        <div style={styles.container}>
            <FaClock style={styles.icon} />
            <h1 style={styles.heading}>Coming Soon</h1>
            <p style={styles.text}>We are working hard to bring you this page. Stay tuned!</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center' as 'center',
        backgroundColor: '#f0f0f0',
    },
    icon: {
        fontSize: '5rem',
        color: '#333',
        marginBottom: '1rem',
    },
    heading: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1.25rem',
        color: '#666',
    },
};

export default ComingSoon;
