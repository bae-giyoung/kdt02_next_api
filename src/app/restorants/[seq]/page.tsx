'use client'
import { FoodData } from "@/types/fooddata";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function () {
    const searchParams = useSearchParams();
    const seq = searchParams.get('seq');
    const [tdata, setTdata] = useState<FoodData[]>([]);

    const getTData = async (seq: number) => {
        const apikey = process.env.NEXT_PUBLIC_API_KEY;
        const baseUrl = 'https://apis.data.go.kr/6260000/FoodService/getFoodKr?';
        const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=10&resultType=json`;
    
        const resp = await fetch(url);
        const json = await resp.json();
    
        let data: FoodData[] = json.getFoodKr.item;
        data = data.filter(item => item.UC_SEQ == seq);
        setTdata(data);
    }

    useEffect(() => {
        seq && getTData(parseInt(seq));
    }, []);
    
    return (
        <div className="p-5">
            {
                tdata && 
                tdata.map((item, idx) => 
                    <div key={idx}>
                        <div>
                            <img src={item.MAIN_IMG_THUMB} alt={`${item.TITLE}`} />
                        </div>
                        <div>
                            <p>{item.TITLE}</p>
                            <p>{item.CNTCT_TEL}</p>
                            <p>{item.ADDR1}</p>
                            <p>{item.ITEMCNTNTS}</p>
                            <p>{item.RPRSNTV_MENU}</p>
                            <p>{item.USAGE_DAY_WEEK_AND_TIME}</p>
                        </div>
                    </div>
                )
            }
            <Link href='/restorants'>
                <div className="font-bold">
                    목록으로
                </div>
            </Link>
        </div>
    );
}