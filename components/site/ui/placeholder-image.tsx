import Image from "next/image";

export function PlaceholderImage({
  alt,
  className = "object-cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
  src = "/images/placeholder.jpg",
  priority = false,
}: {
  alt: string;
  className?: string;
  sizes?: string;
  src?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      placeholder="empty"
      priority={priority}
    />
  );
}
