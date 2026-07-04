import Image from "next/image";

export function PlaceholderImage({
  alt,
  className = "object-cover",
  sizes = "(min-width: 768px) 50vw, 100vw",
  src = "/images/placeholder.jpg",
  priority = false,
  imagePosition = "center",
}: {
  alt: string;
  className?: string;
  sizes?: string;
  src?: string;
  priority?: boolean;
  imagePosition?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      style={{ objectPosition: imagePosition }}
      placeholder="empty"
      priority={priority}
    />
  );
}
