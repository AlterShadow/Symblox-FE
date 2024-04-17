import { useState, useEffect } from 'react';


/**
 * A custom React hook that determines the visibility of a component based on the user's scroll position.
 * @param elementId - The ID of the target component.
 * @param delay - Optional delay (in milliseconds) to introduce a debounce effect on scroll events.
 * @returns isVisible - A boolean indicating whether the target component is currently visible in the viewport.
 */
const useScrollVisibility = (elementId: string, delay?: number): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById(elementId);
            if (!element) return;

            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.scrollY;
            const scrollPosition = window.scrollY;

            // Check if the element is visible in the viewport
            // laptop
            if (window.innerWidth > 1024) {
                if (scrollPosition + window.innerHeight >= elementTop + elementRect.height / 4) {
                    if (delay) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                        return;
                    }
                    setIsVisible(true);
                }
            } else {
                if (scrollPosition + window.innerHeight >= elementTop) {
                    if (delay) {
                        setTimeout(() => {
                            setIsVisible(true);
                        }, delay);
                        return;
                    }
                    setIsVisible(true);
                }
            }

            // if (scrollPosition + window.innerHeight >= elementTop + elementRect.height / 2) {
            //     if (delay) {
            //         setTimeout(() => {
            //             setIsVisible(true);
            //         }, delay);
            //         return;
            //     }
            //     setIsVisible(true);
            // }
        };

        handleScroll(); // Check visibility on mount

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [elementId, delay]);

    return isVisible;
};

export default useScrollVisibility;