"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathPlugin = void 0;
const ckeditor5_core_1 = require("@ckeditor/ckeditor5-core");
const ckeditor5_widget_1 = require("@ckeditor/ckeditor5-widget");
const ckeditor5_ui_1 = require("@ckeditor/ckeditor5-ui");
const ckeditor5_utils_1 = require("@ckeditor/ckeditor5-utils");
class MathPlugin extends ckeditor5_core_1.Plugin {
    static get requires() {
        return [ckeditor5_widget_1.Widget];
    }
    init() {
        const editor = this.editor;
        const t = editor.t;
        // Load MathJax
        if (!window.MathJax) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
            script.async = true;
            document.head.appendChild(script);
        }
        // Add math button to toolbar
        editor.ui.componentFactory.add('math', locale => {
            const dropdownView = (0, ckeditor5_ui_1.createDropdown)(locale);
            dropdownView.set({
                label: t('Math'),
                tooltip: true,
                withText: true
            });
            const items = new ckeditor5_utils_1.Collection();
            items.add({
                type: 'button',
                model: {
                    label: t('Insert Math'),
                    withText: true,
                    action: () => {
                        const mathInput = prompt('Enter math expression (LaTeX format):');
                        if (mathInput) {
                            editor.model.change(writer => {
                                const mathElement = writer.createElement('math', {
                                    math: mathInput
                                });
                                editor.model.insertContent(mathElement);
                            });
                        }
                    }
                }
            });
            (0, ckeditor5_ui_1.addListToDropdown)(dropdownView, items);
            return dropdownView;
        });
        // Define math element schema
        editor.model.schema.extend('$text', { allowAttributes: 'math' });
        editor.model.schema.register('math', {
            inheritAllFrom: '$block',
            allowAttributes: ['math']
        });
        // Convert math element to view
        editor.conversion.for('downcast').elementToElement({
            model: 'math',
            view: (modelElement, viewWriter) => {
                const math = modelElement.getAttribute('math');
                const container = viewWriter.createContainerElement('div', {
                    class: 'math-container'
                });
                const mathElement = viewWriter.createRawElement('div', {
                    class: 'math-display'
                }, function (domElement) {
                    domElement.innerHTML = `$$${math}$$`;
                    if (window.MathJax) {
                        window.MathJax.typesetPromise([domElement]).catch((err) => console.error('MathJax error:', err));
                    }
                });
                viewWriter.insert(viewWriter.createPositionAt(container, 0), mathElement);
                return container;
            }
        });
        // Convert view to math element
        editor.conversion.for('upcast').elementToElement({
            view: {
                name: 'div',
                classes: 'math-container'
            },
            model: (viewElement, modelWriter) => {
                const mathElement = viewElement.getChild(0);
                const math = mathElement.getAttribute('data-math');
                return modelWriter.createElement('math', {
                    math: math
                });
            }
        });
    }
}
exports.MathPlugin = MathPlugin;
