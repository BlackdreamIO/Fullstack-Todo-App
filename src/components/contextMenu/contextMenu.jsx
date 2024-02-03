import React, { useState, useRef } from "react";
import { useOutsideClick } from '../../hooks/hooksExporter'

export const ContextMenu = ({enableContextMenu=false, onContextShow, onContextHide, children, ...rest}) => {

    const [contextMenuShow, setContextMenuShow] = useState(enableContextMenu);
    const contextMenuRef = useRef(null);

    const handleContextClick = (event) => {
        event.preventDefault();
        setContextMenuShow(true);
        if(onContextShow) { onContextShow() }
    }
    
    const handleContextClose = () => {
        setContextMenuShow(false);
        if(onContextHide) { onContextHide() }
    }

    useOutsideClick(contextMenuRef, () => handleContextClose());

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