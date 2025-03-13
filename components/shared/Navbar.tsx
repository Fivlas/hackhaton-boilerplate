"use client";
import { useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import Link from "next/link";
import DynamicIcon from "./DynamicIcon";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const menuItems = [
    {
        name: "Security",
        icon: "shield" as keyof typeof dynamicIconImports,
        redirect: "/",
    },
    {
        name: "Learn",
        icon: "zap" as keyof typeof dynamicIconImports,
        redirect: "/",
    },
    {
        name: "Explore",
        icon: "globe" as keyof typeof dynamicIconImports,
        redirect: "/",
    },
    {
        name: "Support",
        icon: "message-square" as keyof typeof dynamicIconImports,
        redirect: "/",
    },
];

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<number | null>(null);

    return (
        <header className="absolute inset-0 z-10">
            <div className="flex justify-between w-full mx-auto md:px-12 md:py-6 px-3 py-5">
                <div className="flex gap-32">
                    <Link href={"/"} className="flex rounded-4xl items-center">
                        LOGO
                    </Link>
                    <nav className="relative md:flex items-center hidden">
                        <ul className="flex items-start list-none relative">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative transition-all duration-300 ease-in-out"
                                    onMouseEnter={() => setActiveTab(index)}
                                    onMouseLeave={() => setActiveTab(null)}
                                >
                                    <Link
                                        href={item.redirect}
                                        className="relative flex items-center py-2 px-[38] rounded-4xl transition-all duration-300 ease-in-out"
                                    >
                                        {activeTab === index && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    stiffness: 150,
                                                }}
                                                className="absolute left-6 flex items-center bottom-0 top-0"
                                            >
                                                <DynamicIcon
                                                    name={item.icon}
                                                    className="w-5 h-auto"
                                                />
                                            </motion.span>
                                        )}
                                        <span
                                            className={`inline-block transition-transform duration-300 ${
                                                activeTab === index
                                                    ? "translate-x-3.5"
                                                    : ""
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                    {activeTab === index && (
                                        <motion.div
                                            className="absolute inset-0 bg-[#e2dffe] rounded-4xl -z-10"
                                            layoutId="hoverPill"
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 150,
                                                damping: 25,
                                                mass: 1,
                                                velocity: 2,
                                            }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="relative">
                    <div className="flex items-center gap-2">
                        <Link
                            href={"/"}
                            className="flex items-center justify-center bg-[#ab9ff2] text-[#1c1c1c] gap-2.5 rounded-4xl py-4 px-8 transition-all hover:bg-[#e2dffe] text-sm md:text-base duration-200 hover:scale-95"
                        >
                            Panel
                        </Link>
                        <Button className="rounded-full size-12 bg-white hover:bg-white md:hidden" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              key={isMobileMenuOpen ? 'open' : 'closed'}
                              transition={{
                                type: "spring",
                                stiffness: 150,
                                damping: 20
                              }}
                            >
                              {isMobileMenuOpen ? (
                                <X className="text-black size-6"/>
                              ) : (
                                <Menu className="text-black size-6"/>
                              )}
                            </motion.span>
                        </Button>
                    </div>
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                            >
                                <nav className="flex flex-col">
                                    {menuItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.redirect}
                                            className="flex items-center gap-2 px-4 py-2 text-gray-800"
                                        >
                                            <DynamicIcon name={item.icon} className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
