"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");

            if (anchor && anchor.hash && anchor.origin === window.location.origin && anchor.pathname === window.location.pathname) {
                if (anchor.hash === "#") {
                    e.preventDefault();
                    lenis.scrollTo(0, { duration: 1.5 });
                } else {
                    const targetElement = document.querySelector(anchor.hash);
                    if (targetElement) {
                        e.preventDefault();
                        lenis.scrollTo(targetElement as HTMLElement, {
                            offset: -80, // Offset for fixed navbar
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    return null;
}
