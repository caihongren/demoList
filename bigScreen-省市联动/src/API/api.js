import axios from 'axios'


import {
  get,
  postwww
} from './http'


// 预约
export const insert=params=>postwww('api/insert2', params)

// 渠道排名
export const getBoardChannel=params=>get('api/jeecg-boot/board/quartzJob/getBoardChannel', params)

// 看板信息

export const getBoardInfo=params=>get('api/jeecg-boot/board/quartzJob/getBoardInfo', params)

// 地图排名

export const getBoardMap=params=>get('api/jeecg-boot/board/quartzJob/getBoardMap', params)


//日均活跃
export const getDayActive=params=>get('api/jeecg-boot/board/quartzJob/getDayActive', params)

// 报警排行榜
export const getBoardWarn=params=>get('api/jeecg-boot/board/quartzJob/getBoardWarn', params)






