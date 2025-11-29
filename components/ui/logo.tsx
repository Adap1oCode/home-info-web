import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Property Search Solutions">
      <Image
        src="/images/logo.png"
        alt="Home Information SEARCHES"
        width={120}
        height={40}
        className="h-auto w-auto"
        priority
      />
    </Link>
  );
}
