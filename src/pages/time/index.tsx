import {useRafInterval, useRequest} from "ahooks";
import {getServerTime} from "../../apis";
import dayjs from "dayjs";
import React, {useEffect} from "react";

const Index = React.memo(() => {
  const {data, refresh} = useRequest(getServerTime);
  // 每秒刷新一次，todo 不用每次都取服务器时间，第一次取好作为基准就可以了
  const clear = useRafInterval(() => {
    refresh();
  }, 1000);
  useEffect(() => {
    return () => clear();
  }, [])
  return (
    <div>
      <div>服务器时间</div>
      <div>{dayjs(data?.data).format('YYYY/MM/DD HH:mm:ss')}</div>
    </div>
  )
})

export default Index;
