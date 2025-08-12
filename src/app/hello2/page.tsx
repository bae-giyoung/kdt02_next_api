'use client';
import { useState, useEffect } from "react";
//import { useSearchParams } from "next/navigation";
//import { Suspense } from "react";

type helloT = {
    msg: string
}

export default function Hello2Page () {
  const [tdata, setTdata] = useState<helloT[] | null>(null);
  //const searchParams = useSearchParams();
  //const msg = searchParams.get('msg');
  //console.log(msg);
  
  const getFetchData = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/hello`);
    const data = await resp.json();
    setTdata(data);
  }

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center font-extrabold text-5xl'>
      {tdata && tdata.map((item:helloT, idx) => <p key={idx}>{item.msg}</p>)}
    </div>
  );
}