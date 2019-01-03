let mobileUrl = process.env.URL.mobile
console.log(mobileUrl)
export const apis = {
    apply: mobileUrl + '/interface-service-bdcard/apply',//申请绑定电子健康卡接口
    cardList: mobileUrl + '/interface-service-bdcard/cardList',//电子健康卡列表接口
    getBarCode: mobileUrl + '/interface-service-bdcard/getBarCode',//获取二维码信息接口
    getGraphicVerificationCode: mobileUrl + '/interface-service-bdcard/getGraphicVerificationCode',//获取图形验证码接口
    getSmsVerificationCode: mobileUrl + '/interface-service-bdcard/getSmsVerificationCode',//获取短信验证码接口
    getnation: mobileUrl +'/interface-service-dictionaries/nation',//民族
    authorize: mobileUrl +'/interface-service-bdcard/authorize',//获取授权,扫码获取token
    removecard: mobileUrl +'/interface-service-bdcard/remove',//解绑卡
}