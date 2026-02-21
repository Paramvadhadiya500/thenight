// global.d.ts

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      "ios-src"?: string;
      alt?: string;
      ar?: boolean;
      "ar-modes"?: string;
      "ar-scale"?: string;
      "ar-placement"?: string;
      "environment-image"?: string;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      "shadow-intensity"?: string;
      "interaction-prompt"?: string;
    };
  }
}