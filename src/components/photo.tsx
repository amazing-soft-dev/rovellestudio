import Image from "next/image";

export function Photo({
  name,
  alt,
  sizes,
  className = "object-cover",
  priority = false,
}: {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image src={`/photos/${name}`} alt={alt} fill sizes={sizes} priority={priority} className={className} />
  );
}
