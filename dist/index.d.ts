import React from 'react';
interface CKEditorMathProps {
    value?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
    readOnly?: boolean;
}
declare const CKEditorMath: React.FC<CKEditorMathProps>;
export default CKEditorMath;
