import Link from "next/link"

export default function Page({ }) {
  return (
    <nav className="header">
        <div>
            <Link href="/" passHref>
                <a>Fast Fridge 🍕 </a>
            </Link>
        </div>
    </nav>
  )
}