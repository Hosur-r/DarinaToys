import "./modalStyle.css"
import React from "react";

const ProductModal = ({ isVisible = false, title, content, footer, onClose }) => {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className="productModal" onClick={onClose}>
            <div className="productModal-dialog" onClick={e => e.stopPropagation()}>
                <div className="productModal-header">
                    <h3 className="productModal-title">{title}</h3>
                </div>
                <div className="productModal-body">
                    <div className="productModal-content">{content}</div>
                </div>
                {footer && <div className="productModal-footer">{footer}</div>}
            </div>
        </div>
    );
};

export default ProductModal