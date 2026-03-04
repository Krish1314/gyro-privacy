import React from 'react';

const PermissionGate = ({ permissionGranted, requestPermission, isSupported, children }) => {
    if (!isSupported) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Device Orientation Not Supported</h2>
                <p>Your device does not support the required sensors for this full demo.</p>
                <button onClick={requestPermission} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                    Bypass for Desktop Demo
                </button>
            </div>
        );
    }

    if (!permissionGranted) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                fontFamily: 'sans-serif'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Hardware Privacy Screen</h2>
                <p style={{ maxWidth: '400px', marginBottom: '30px', color: '#555', lineHeight: '1.5' }}>
                    This application mimics a hardware privacy screen (like Samsung's Vision Booster).
                    We need access to your device's gyroscope to detect viewing angles.
                </p>
                <button
                    onClick={requestPermission}
                    style={{
                        padding: '16px 32px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        background: '#0a84ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px 0 rgba(10, 132, 255, 0.39)'
                    }}
                >
                    Enable Gyroscope
                </button>
                <p style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
                    By enabling, you agree to allow motion sensor access.
                </p>
            </div>
        );
    }

    return children;
};

export default PermissionGate;