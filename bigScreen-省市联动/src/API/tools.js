// 流量转换

export function flowUnit(num) {
    if (num == 0 || num == '0') return "0"
    if (num == '' || num == null || num == undefined) {
        return
    }

    if (num < 1024) {
        return num + 'KB'
    } else if (num > +1024 && num < 1024 * 1024) {
        return (num / 1024).toFixed(2) + 'M'
    } else if (num >= 1024 * 1024) {
        return (num / (1024 * 1024)).toFixed(2) + 'G'
    } else {
        return
    }
}


// 卡状态
export function statusType(type) {
    if (type >= 0) {
        // 0：其他 1：待激活2：沉默期（库存） 3：测试期 4：正常 5：停机 6：已销号
        switch (type) {
            case 0:
                return '其他'
            case 1:
                return '待激活'
            case 2:
                return '沉默期（库存）'
            case 3:
                return '测试期'
            case 4:
                return '正常'
            case 5:
                return '停机'
            case 6:
                return '已销号'
        }
    } else {
        return
    }

}

// 包体类型 0-月包 1-季包 2-半年包 3-年包 4-加油包
export function packageType(type) {

    if (type >= 0) {
        // 0-月包 1-季包 2-半年包 3-年包 4-加油包
        switch (type) {
            case 0:
                return '月包'
            case 1:
                return '季包'
            case 2:
                return '半年包'
            case 3:
                return '年包'
            case 4:
                return '加油包'

        }
    } else {
        return
    }


}

// 生效类型effectType  0-支持立即生效 1-支持次月生效 2-支持到期生效
export function effectType(type) {

    if (type >= 0) {
        // 0-支持立即生效 1-支持次月生效 2-支持到期生效
        switch (type) {
            case 0:
                return '立即生效'
            case 1:
                return '次月生效'
            case 2:
                return '到期生效'
        }
    } else {
        return
    }


}

// ** 订单状态
// *  待支付 1 父订单：已创建，未支付                         子订单：已创建，未支付
// *  成功   2 父订单：已充值成功（包括所有子订单）              子订单：已创建：已充值成
// *  失败   3 父订单：充值失败（只要有一笔子订单失败，则算失败）   子订单：支付成功，充值失败  （继续充值，申请退款）
// *  已退款 4 父订单：退款（所有子订单均已退款）                子订单：退款
// *  充值中 5 父订单：正在处理（所有子订单都在充值中）           子订单：正在做充值处理
// *  未确认 6 父订单：处理结果一直未返回（只要有一笔子订单未确认） 子订单：在规定时间内，处理结果一直未返回 更新状态（成功、失败）
// * */

export function orderType(type) {
    if (type >= 0) {

        switch (type) {


            case 1:
                return '待支付'
            case 2:
                return '成功'
            case 1:
                return '失败'
            case 2:
                return '已退款'
            case 1:
                return '充值中'
            case 2:
                return '未确认'
        }
    } else {
        return
    }
}
// 转换输出大写
export function dayString(type) {
    if (type >= 0) {

        switch (type) {


            case 0:
                return '星期日'
            case 1:
                return '星期一'
            case 2:
                return '星期二'
            case 3:
                return '星期三'
            case 4:
                return '星期四'
            case 5:
                return '星期五'
            case 6:
                return '星期六'
        }
    } else {
        return
    }
}



// 随机Uuid
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// 获取url参数
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);

    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}