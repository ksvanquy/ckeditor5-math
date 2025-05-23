# Next.js CKEditor 5 with Math Support

A custom package that integrates CKEditor 5 with equation support for Next.js applications.

## Installation

```bash
npm install nextjs-ckeditor5-math
# or
yarn add nextjs-ckeditor5-math
```

## Usage

```tsx
import { CKEditorMath } from 'nextjs-ckeditor5-math';

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <CKEditorMath
      value={content}
      onChange={(data) => setContent(data)}
      placeholder="Start typing..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | The content of the editor |
| onChange | (data: string) => void | undefined | Callback when content changes |
| placeholder | string | 'Type your content here...' | Placeholder text |
| readOnly | boolean | false | Whether the editor is read-only |

## Features

- Full CKEditor 5 functionality
- Equation editor support
- TypeScript support
- Next.js compatibility
- Responsive design

## Requirements

- Next.js >= 12.0.0
- React >= 17.0.0
- React DOM >= 17.0.0

## License

MIT #   c k e d i t o r 5 - m a t h 
 
 
