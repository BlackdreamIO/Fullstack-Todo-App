import React, { useState, useEffect, useRef } from "react";

export const ContextMenu = ({children, ...rest}) => {

    const [contextMenuShow, setContextMenuShow] = useState(false);
    const contextMenuRef = useRef(null);

    const handleContextClick = (event) => {
        event.preventDefault();
        setContextMenuShow(true);
    }

    const handleContextClose = (event) => {
        if(event.current && !contextMenuRef.current.contains(event.target)) {
            setContextMenuShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleContextClose);
        return () => window.removeEventListener('click', handleContextClose);
    }, [])
    

    return (
        <div ref={contextMenuRef} {...rest}>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, {onContextMenu : handleContextClick, showContextMenu : contextMenuShow})
                })
            }
        </div>
    )
}