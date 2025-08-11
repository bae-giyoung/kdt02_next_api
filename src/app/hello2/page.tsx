'use client';
import { useState, useEffect } from "react";

type helloT = {
    msg: string
}

export default function Hello2Page () {
  const [tdata, setTdata] = useState<helloT[] | null>(null);

  const getFetchData = async () => {
    const resp = await fetch('http://localhost:3000/api/hello');
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