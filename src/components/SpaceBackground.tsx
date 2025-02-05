"use client";

import { useEffect, useRef } from "react";
import "@/scss/SpaceBackground.scss"; // Import SCSS file

export default function SpaceBackground() {
    const skyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!skyRef.current) return;

        const sky = skyRef.current;
        sky.innerHTML = ""; // Clear existing stars

        const center = {
            x: sky.clientWidth / 2,
            y: sky.clientHeight / 2,
        };

        const createStar = (i: number) => {
            const size = Math.random() > 0.5 ? 'size2' : 'size1';
            const star = document.createElement("span");
            star.style.top = `${center.y}px`;
            star.style.left = `${center.x}px`;
            star.classList.add('star', size, `axis-${i}`);
            return star;
        };

        for (let i = 0; i < 360; i++) {
            sky.appendChild(createStar(i));
        }
    }, []);

    return <div ref={skyRef} className={'sky'}></div>;
}
