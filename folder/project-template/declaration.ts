declare module '*.css' {
    const content: string;
    export default content;
  }
  
  
  declare module '*.png' {
    const content: Record<string, string>;
    export default content;
  }