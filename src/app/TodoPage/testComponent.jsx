import { useContextMenuPosition } from '@/hooks/useContextMenuPosition';
import React, { useRef, useEffect } from 'react';

const ElementWithMousePosition = () => {
    const elementRef = useContextMenuPosition();

    return (
        <div ref={elementRef} style={{ position: 'absolute', width: '100px', height: '100px', backgroundColor: 'red', left: '0', top: '0' }}>
            Element
        </div>
    );
};

export default ElementWithMousePosition;
