import { useState, useEffect, useCallback } from 'react';

export const useGyroscope = () => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [gamma, setGamma] = useState(0); // Left/Right tilt (-90 to 90)
    const [baseline, setBaseline] = useState(null);
    const [privacyLevel, setPrivacyLevel] = useState(0); // 0 to 1
    const [isSupported, setIsSupported] = useState(true);

    // Request permission for iOS 13+ devices
    const requestPermission = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permissionState = await DeviceOrientationEvent.requestPermission();
                if (permissionState === 'granted') {
                    setPermissionGranted(true);
                } else {
                    console.warn('Permission to access device orientation was denied');
                    setPermissionGranted(false);
                    alert("Permission to access device orientation was denied. The privacy screen won't work without it.");
                }
            } catch (error) {
                console.error('Error requesting device orientation permission:', error);
            }
        } else {
            // Non-iOS 13+ devices or desktop
            setPermissionGranted(true);
        }
    };

    const handleOrientation = useCallback((event) => {
        let currentGamma = event.gamma; // In degrees in the range [-90,90]

        // If we're not receiving data (e.g. desktop without emulation)
        if (currentGamma === null) {
            return; // Keep existing defaults
        }

        setGamma(currentGamma);

        // Auto-calibrate baseline on very first valid read
        setBaseline((prevBaseline) => {
            if (prevBaseline === null) {
                return currentGamma;
            }
            return prevBaseline;
        });
    }, []);

    useEffect(() => {
        if (permissionGranted) {
            window.addEventListener('deviceorientation', handleOrientation);
            // Check if we actually get data to mark unsupported if needed
            const timeout = setTimeout(() => {
                if (gamma === 0 && baseline === null) {
                    // We might not have a gyroscope
                    console.log("No orientation data received yet.");
                }
            }, 2000);

            return () => {
                window.removeEventListener('deviceorientation', handleOrientation);
                clearTimeout(timeout);
            };
        }
    }, [permissionGranted, handleOrientation, gamma, baseline]);

    // Calculate privacy level based on tilt
    useEffect(() => {
        if (baseline !== null && gamma !== null) {
            // Calculate how far we've tilted from our initial resting angle
            const diff = Math.abs(gamma - baseline);

            // If diff is > 45 degrees, max privacy (1).
            // If diff is < 15 degrees, min privacy (0).
            let level = 0;
            if (diff > 45) {
                level = 1;
            } else if (diff > 15) {
                level = (diff - 15) / 30; // Scale 0 to 1
            }
            setPrivacyLevel(level);
        }
    }, [gamma, baseline]);

    return {
        permissionGranted,
        requestPermission,
        gamma,
        baseline,
        privacyLevel,
        isSupported,
        setPrivacyLevelManual: setPrivacyLevel // For desktop demoing slider
    };
};
