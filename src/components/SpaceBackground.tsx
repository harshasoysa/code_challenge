"use client";

import { useEffect, useRef } from "react";
import "@/scss/SpaceBackground.scss";

export default function SpaceBackground() {
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!starsRef.current) return;

        const stars = starsRef.current;
        const center = {
            x: stars.clientWidth / 2,
            y: stars.clientHeight / 2,
        };

        for (let i = 1; i <= 360; i++) {
            const star = document.createElement("span");
            star.style.top = `${center.y}px`;
            star.style.left = `${center.x}px`;
            star.classList.add("star", Math.random() > 0.5 ? "size2" : "size1", `axis-${i}`);
            stars.appendChild(star);
        }

        return () => stars.replaceChildren();
    }, []);

    return (
        <div className="sky" aria-hidden="true">
            <div className="nebula nebula--violet" />
            <div className="nebula nebula--blue" />

            <div className="moon">
                <span className="moon__crater moon__crater--one" />
                <span className="moon__crater moon__crater--two" />
                <span className="moon__crater moon__crater--three" />
            </div>

            <div className="planet planet--distant" />
            <div className="planet planet--ringed">
                <span className="planet__ring" />
            </div>

            <span className="shooting-star shooting-star--one" />
            <span className="shooting-star shooting-star--two" />
            <div ref={starsRef} className="sky__stars" />
        </div>
    );
}
