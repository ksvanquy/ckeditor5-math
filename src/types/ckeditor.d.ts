declare module '@ckeditor/ckeditor5-react' {
    import { Component } from 'react';
    import { Editor } from '@ckeditor/ckeditor5-core';

    export interface CKEditorProps {
        editor: any;
        data?: string;
        onChange?: (event: any, editor: Editor) => void;
        config?: any;
    }

    export class CKEditor extends Component<CKEditorProps> {}
}

declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditor: any;
    export default ClassicEditor;
}

declare module '@ckeditor/ckeditor5-core';
declare module '@ckeditor/ckeditor5-widget';
declare module '@ckeditor/ckeditor5-ui';
declare module '@ckeditor/ckeditor5-utils'; 