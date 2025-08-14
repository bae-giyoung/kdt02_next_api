export const dynamic = 'force-dynamic';
import type { FoodData } from "@/types/fooddata"
import Link from "next/link"

interface CardProps {
    foodItem: FoodData
}

export default function Card({foodItem}: CardProps) {
    return (
        <div className="">
            <Link href={`/restorants2/${foodItem.UC_SEQ}`}>
                <div className="">
                    <img src={foodItem.MAIN_IMG_THUMB} />
                </div>
                <div>
                    <p>{foodItem.TITLE}</p>
                    <p>{foodItem.GUGUN_NM}</p>
                    <p>{foodItem.ADDR1}</p>
                </div>
            </Link>
        </div>
    )
}
