import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget } from '@ckeditor/ckeditor5-widget';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui';
import { Collection } from '@ckeditor/ckeditor5-utils';

declare global {
    interface Window {
        MathJax: any;
    }
}

export class MathPlugin extends Plugin {
    static get requires() {
        return [Widget];
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
        editor.ui.componentFactory.add('math', (locale: any) => {
            const dropdownView = createDropdown(locale);
            dropdownView.set({
                label: t('Math'),
                tooltip: true,
                withText: true
            });

            const items = new Collection();

            items.add({
                type: 'button',
                model: {
                    label: t('Insert Math'),
                    withText: true,
                    action: () => {
                        const mathInput = prompt('Enter math expression (LaTeX format):');
                        if (mathInput) {
                            editor.model.change((writer: any) => {
                                const mathElement = writer.createElement('math', {
                                    math: mathInput
                                });
                                editor.model.insertContent(mathElement);
                            });
                        }
                    }
                }
            });

            addListToDropdown(dropdownView, items);
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
            view: (modelElement: any, viewWriter: any) => {
                const math = modelElement.getAttribute('math');
                
                const container = viewWriter.createContainerElement('div', {
                    class: 'math-container'
                });

                const mathElement = viewWriter.createRawElement('div', {
                    class: 'math-display'
                }, function(domElement: any) {
                    domElement.innerHTML = `$$${math}$$`;
                    if (window.MathJax) {
                        window.MathJax.typesetPromise([domElement]).catch((err: Error) => console.error('MathJax error:', err));
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
            model: (viewElement: any, modelWriter: any) => {
                const mathElement = viewElement.getChild(0);
                const math = mathElement.getAttribute('data-math');

                return modelWriter.createElement('math', {
                    math: math
                });
            }
        });
    }
} 