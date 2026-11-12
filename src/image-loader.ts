export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const widths = [640, 960, 1280, 1920];
  const chosen = widths.find((size) => size >= width) ?? widths[widths.length - 1];
  const file = src.split("/").pop() ?? src;
  const id = file.replace(/\.[^.]+$/, "");
  return `/images/${id}-${chosen}.webp`;
}
