/// <reference types="vite/client" />

declare module '*.jsx' {
  import React from 'react';
  const Component: React.FC;
  export default Component;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2'; 