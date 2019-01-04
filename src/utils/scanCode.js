import { post, get } from './request'
import { apis } from './api'
import { cache, cacheKey } from './cache'
import router from '@/router'
const wxConfig =(data) =>{
    wx.config({ 
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。   
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonce_str, // 必填，生成签名的随机串
        signature: data.signature,// 必填，签名，见附录1
        jsApiList:  [ 'checkJsApi', 'startRecord', 'stopRecord','translateVoice','scanQRCode', 'openCard' ]
    }); 
}

const scanCode = () =>{//页面点击扫码按钮
    // router.push({path:'/myCardList'})
    wx.ready(function() {
        wx.checkJsApi({
            jsApiList : ['scanQRCode'],
            success : function(res) {
                 wx.scanQRCode({
                    needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success : function(res) {
                        let data = JSON.parse(res.resultStr);
                        cache.set('token',data.token)
                        router.push({path:'/myCardList'})
                        return;
                    },
                    fail : function(){
                        console.log('出错了');
                    }
                });
            }
        });
    });
}
const getjsSign = () =>{
    var url = location.href;
    if (location.hash.length) {
        url = url.substr(0, url.indexOf(location.hash));
    }
    post({
        url:apis.getjsSign,
        param:{
            userId:cache.get(cacheKey.userId),
            openId:cache.get(cacheKey.openId),
            hospitalId:cache.get(cacheKey.hospitalId),
            projectId:cache.get(cacheKey.projectId),
            url:url
        }
    }).then(res =>{
        wxConfig(res.data)
    })
}
export {
    getjsSign,
    scanCode,
    wxConfig
}