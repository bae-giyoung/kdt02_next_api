'use client';
import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
    item: Product,
}

export default function ProductCard2 ({item} : ProductCardProps) {
    return (
        <div className="relative mb-2 bg-white border-1 border-gray-500 p-3 box-border">
            <Link href={`/products2/${item.id}`}>
                <p
                    className="text-2xl font-bold mb-2">
                    {item.name}
                </p>
                <p
                    className="absolute right-3 top-3 inline-block rounded-3xl px-2
                                bg-blue-900 text-white">
                    {item.category}
                </p>
                <p>
                    {item.price.toLocaleString('ko-Kr')}
                </p>
                <p>
                    {item.description}
                </p>
            </Link>
        </div>
    );
}