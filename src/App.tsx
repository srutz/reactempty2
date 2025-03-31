import { ReactNode, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { getWikipediaExcerpt, WikipediaExcerpt } from "./WikiExcerpt";

function Box({ title = "hello", children }: { title?: string; children: ReactNode }) {
    const [open, setOpen] = useState(true)
    return (
        <div className="m-4 p-4 rounded-lg bg-white shadow-xl border border-gray-300 flex flex-col gap-4">
            <div className="flex gap-1 border-b border-gray-400">
                <button onClick={() => setOpen(!open)}>
                    {open ? (
                        <MdArrowDropDown className="text-2xl" />
                    ) : (
                        <MdArrowRight className="text-2xl" />
                    )}
                </button>
                <Title>{title}</Title>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="overflow-hidden flex flex-col gap-4"
                        key="b1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function Title({ children }: { children: ReactNode }) {
    return <div className="font-bold">{children}</div>;
}

export function App() {
    return (
        <div className="w-[800px] flex flex-col">
            <Box title="My Box 123">
                <img className="self-center h-[300px]" src="/dom.jpg" alt="dom" />
                <div className="text-sm text-gray-700">Lorem ipsum one two three.</div>
            </Box>
        </div>
    )
}

