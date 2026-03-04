import React from 'react';

const SensitiveData = ({ privacyLevel, children, block = false }) => {
    // privacyLevel is between 0 and 1
    // We want to progressively black out the element.

    // Custom exponential curve so it gets dark faster at higher angles
    const opacity = Math.min(1, Math.pow(privacyLevel, 0.8) * 1.2);

    const wrapperStyle = {
        position: 'relative',
        display: block ? 'block' : 'inline-block',
        overflow: 'hidden',
        borderRadius: '6px' // keep rounded corners for the overlay
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: opacity,
        pointerEvents: 'none',
        transition: 'opacity 0.1s linear',
        zIndex: 10
    };

    return (
        <span style={wrapperStyle}>
            {children}
            <span style={overlayStyle} />
        </span>
    );
};

export default SensitiveData;
