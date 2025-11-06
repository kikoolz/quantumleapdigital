export default function PlaceholderImage({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-white/3"
    >
      <rect width={width} height={height} fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1_1" transform="scale(0.01)" />
        </pattern>
      </defs>
    </svg>
  );
}
