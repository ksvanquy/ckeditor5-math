"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
const ckeditor5_build_classic_1 = __importDefault(require("@ckeditor/ckeditor5-build-classic"));
const math_plugin_1 = require("./math-plugin");
const CKEditorMath = ({ value = '', onChange, placeholder = 'Type your content here...', readOnly = false, }) => {
    const [editor, setEditor] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Initialize the editor with math plugin
        const initEditor = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const editor = yield ckeditor5_build_classic_1.default.create(document.createElement('div'), {
                    plugins: [math_plugin_1.MathPlugin],
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'math',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo'
                    ],
                    placeholder: placeholder,
                    readOnly: readOnly,
                });
                setEditor(editor);
            }
            catch (error) {
                console.error('Failed to initialize editor:', error);
            }
        });
        initEditor();
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [placeholder, readOnly]);
    const handleEditorChange = (_event, editor) => {
        const data = editor.getData();
        onChange === null || onChange === void 0 ? void 0 : onChange(data);
    };
    if (!editor) {
        return react_1.default.createElement("div", null, "Loading editor...");
    }
    return (react_1.default.createElement("div", { className: "ckeditor-math-container" },
        react_1.default.createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor5_build_classic_1.default, data: value, onChange: handleEditorChange, config: {
                plugins: [math_plugin_1.MathPlugin],
                toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'math',
                    'blockQuote',
                    'insertTable',
                    'undo',
                    'redo'
                ],
                placeholder: placeholder,
                readOnly: readOnly,
            } }),
        react_1.default.createElement("style", { jsx: true, global: true }, `
        .math-container {
          margin: 1em 0;
          padding: 1em;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .math-display {
          overflow-x: auto;
          padding: 0.5em;
        }
      `)));
};
exports.default = CKEditorMath;
