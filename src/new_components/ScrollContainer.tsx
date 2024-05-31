// src/ScrollContainer.tsx
import React, { useRef } from 'react';

interface ScrollContainerProps {
    id: string;
    syncScroll: (event: React.UIEvent<HTMLDivElement>) => void;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ id, syncScroll }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id={id}
            className="scroll-container"
            ref={containerRef}
            onScroll={syncScroll}
        >
            <div className="content">Content for {id}</div>
        </div>
    );
};

export default ScrollContainer;
