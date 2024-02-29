import { useEffect, useCallback } from "react";

export function useMouseEvent(button, mouseEvent='mousedown', callback) 
{
    const handleMouseEvent = (e) => {
        if (e.button == button && callback) {
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener(mouseEvent, handleMouseEvent);

        return () => {
            //document.removeEventListener(mouseEvent, handleMouseEvent);
        }
    }, [button, mouseEvent])
}
