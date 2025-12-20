"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        setLoading(true);

        const handleImagesLoaded = () => {
            const images = Array.from(document.images);
            const unloadedImages = images.filter((img) => !img.complete);

            if (unloadedImages.length === 0) {
                setLoading(false);
                return;
            }

            let loadedCount = 0;

            unloadedImages.forEach((img) => {
                img.onload = img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === unloadedImages.length) {
                        setLoading(false);
                    }
                };
            });

            // fallback timeout in case images hang
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        };

        const delay = setTimeout(handleImagesLoaded, 50); // wait for new DOM

        return () => clearTimeout(delay);
    }, [pathname]);

    return (
        <div className="relative">
            {/* Blur effect on content */}
            <div className={loading ? "blur-sm pointer-events-none transition-all duration-300" : "transition-all duration-300"}>
                {children}
            </div>

            {/* Spinner centered in viewport */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <div className="w-12 h-12 border-4 border-[#84373D] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
