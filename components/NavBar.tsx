"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home "},
    { href: "/bahay", label: "Bahay" },
    { href: "/kusina", label: "Kusina" },
    { href: "/ewan", label: "Ewan" },
];

export default function NavBar() {
    const pathname = usePathname();
    return(
        <nav className="flex items-center gap-6 border-b px-8 py-5">
            <span className="font-bold text-lg">StudyBoard</span>
            <div className="flex gap-5">
            {
                links.map((link) => {
                    const isActive = pathname === link.href;
                    return(
                        <Link
                        key={link.href}
                        href={link.href}
                        className={
                            isActive
                            ? "text-green-600"
                            : "text-gray-600"   

                        }
                        >
                        {link.label}
                    </Link>
                    )
                })
            }
        </div>

        </nav>
    )
}