import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
    feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
    const p = genRandomPattern(undefined, feature.title);

    return (
        <div className={cn('relative overflow-hidden p-6 border border-dashed border-nourx-gray-200 bg-white hover:border-nourx-gray-300 transition-colors duration-300', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-nourx-gray-50/50 to-nourx-gray-100/30 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="absolute inset-0 h-full w-full mix-blend-overlay fill-nourx-gray-100/50 stroke-nourx-gray-200/75"
                    />
                </div>
            </div>
            <feature.icon className="size-6 text-nourx-black/75" strokeWidth={1} aria-hidden />
            <h3 className="mt-10 text-sm md:text-base font-semibold text-nourx-black">{feature.title}</h3>
            <p className="relative z-20 mt-2 text-xs font-light text-nourx-gray-600 leading-relaxed">{feature.description}</p>
        </div>
    );
}

function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
    const patternId = React.useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y], index) => (
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}

// Deterministic PRNG seeded by a string to keep SSR/CSR markup identical
function stringToSeed(str: string): number {
    let h = 2166136261 >>> 0; // FNV-1a like hash
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(a: number) {
    return function () {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function genRandomPattern(length?: number, seedKey: string = 'default'): number[][] {
    const len = length ?? 5;
    const rng = mulberry32(stringToSeed(seedKey));
    return Array.from({ length: len }, () => [
        Math.floor(rng() * 4) + 7, // x between 7 and 10
        Math.floor(rng() * 6) + 1, // y between 1 and 6
    ]);
}
