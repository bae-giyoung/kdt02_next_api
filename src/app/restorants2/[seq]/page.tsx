export const dynamic = 'force-dynamic';
import { getFoodData } from "../page";
import Link from "next/link";

export default async function ({params} : {params: Promise<{seq: number}>}) {
    const { seq } = await params;
    const data = await getFoodData(seq);

    return (
        <div className="p-5">
            {
                data && 
                data.map((item, idx) => 
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
            <Link href='/restorants2'>
                <div className="font-bold">
                    목록으로
                </div>
            </Link>
        </div>
    );
}