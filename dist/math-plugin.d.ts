import { Plugin } from '@ckeditor/ckeditor5-core';
declare global {
    interface Window {
        MathJax: any;
    }
}
export declare class MathPlugin extends Plugin {
    static get requires(): any[];
    init(): void;
}
