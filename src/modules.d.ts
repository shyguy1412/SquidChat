declare module '*.module.css' {
  const style: Record<string, string>;
  export default style;
}

declare module '@env' {
  export default Record<string, string>;
}