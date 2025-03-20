"use client";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    // 使用 useRef 钩子创建一个可变的 ref 对象，用于引用 HTMLDivElement 元素。
    // 这个 ref 对象将被用于在组件渲染完成后获取该元素的 DOM 节点，以便进行后续操作，如监听滚动事件等。
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);

        }
    }, [ref]);

    // 使用 useScroll 钩子来监听容器的滚动进度。
    // target 参数指定了要监听滚动事件的容器，这里使用 containerRef 引用的元素。
    // offset 参数定义了滚动进度的起始和结束偏移量，这里从容器顶部的 10% 开始，到容器底部的 50% 结束。
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    // 使用 useTransform 钩子将滚动进度转换为高度值。
    // 当滚动进度为 0 时，高度为 0；当滚动进度为 1 时，高度为之前获取的容器高度。
    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

    // 使用 useTransform 钩子将滚动进度转换为透明度值。
    // 当滚动进度在 0 到 0.1 之间时，透明度从 0 过渡到 1。
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="relative w-full font-sans bg-white dark:bg-neutral-950 md:px-10"
            ref={containerRef}
        >

            <div ref={ref} className="relative pb-20 mx-auto max-w-7xl">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-20 md:gap-10"
                    >
                        <div className="flex sticky top-20 z-40 flex-col items-center self-start max-w-xs md:flex-row lg:max-w-sm md:w-full">
                            <div className="flex absolute left-3 justify-center items-center w-10 h-10 bg-white rounded-full md:left-3 dark:bg-black">
                                <div className="p-2 w-4 h-4 bg-gradient-to-t from-[#ffaa40] via-[#22c55e] rounded-full border" />
                            </div>
                            <h3 className="hidden text-xl font-bold cursor-default md:block md:pl-20 md:text-3xl text-neutral-500 dark:text-neutral-500">
                                <AnimatedGradientText>{item.title}</AnimatedGradientText>
                            </h3>
                        </div>

                        <div className="relative pr-4 pl-20 w-full md:pl-4">
                            <h3 className="block mb-4 text-2xl font-bold text-left md:hidden text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: "100%",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden  w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            
                            opacity: 1,
                        }}
                        className="absolute inset-x-0 h-full top-0 w-[2px] bg-gradient-to-t from-[#ffaa40] via-[#22c55e] to-transparent from-[0%] via-[10%] rounded-full z-50"
                    />
                </div>
            </div>
        </div>
    );
};
