'use client';
import { useEffect, useState } from "react";
import Card from "./Card";
import type { FoodData } from "@/types/fooddata";


export default function () {
    const [tdata, setTdata] = useState<FoodData[]>([]);
    
    const getFoodData = async() => {
        const apikey = process.env.NEXT_PUBLIC_API_KEY;
        const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`;
    
        const resp = await fetch(url);
        const json = await resp.json();
    
        const data: FoodData[] = json.getFoodKr.item;
        setTdata(data);
    }

    useEffect(() => {
        getFoodData();
    }, []);
    
    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold">부산 맛짐</h1>
            <h3 className="text-xl mt-2">부산 맛집 리스트</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                {
                    tdata && tdata.map((item, idx) =>
                        <Card key={idx} foodItem={item}/>
                    )
                }
            </div>
        </div>
    );
}