import Image from "next/image";

export function PlaceholderImage({
  alt,
  className = "object-cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt={alt}
      fill
      sizes={sizes}
      className={className}
    />
  );
}
