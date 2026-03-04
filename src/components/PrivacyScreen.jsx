import React from 'react';

const PrivacyScreen = ({ privacyLevel, children }) => {
    // privacyLevel is between 0 and 1
    // We want to progressively blur and dim.
    // 0 = completely clear, 1 = maximum obscurity

    const blurAmount = privacyLevel * 12; // 0px to 12px blur
    const filterBrightness = 100 - (privacyLevel * 80); // 100% to 20% brightness

    const privacyStyle = {
        filter: `blur(${blurAmount}px) brightness(${filterBrightness}%)`,
        transition: 'filter 0.15s ease-out',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={privacyStyle}>
            {children}
        </div>
    );
};

export default PrivacyScreen;
