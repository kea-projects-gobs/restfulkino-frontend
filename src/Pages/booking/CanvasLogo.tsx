type CanvasLogoProps = {
  isLarge: boolean;
};

export default function CanvasLogo({ isLarge }: CanvasLogoProps) {
  const className = isLarge
    ? "w-[360px] lg:w-[500px] mx-auto pb-4"
    : "w-[360px] lg:w-[360px] mx-auto pb-4";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 746 66"
      className={className}
    >
      <path
        fill="gray"
        d="M5.68,63.78,0,36.61A2,2,0,0,1,1.6,34.24C110.33,11.84,238.7,0,373,0S635.67,11.84,744.4,34.24A2,2,0,0,1,746,36.61l-5.64,27.17A2,2,0,0,1,738,65.33c-106.65-22-232.8-33.58-365-33.58S114.69,43.36,8,65.33A2,2,0,0,1,5.68,63.78Z"
      ></path>
    </svg>
  );
}
