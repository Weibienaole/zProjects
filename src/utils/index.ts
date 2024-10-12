import storage from "./storage";
import * as coreApi from "../api/core";
import useCoreStore from "../store/core";

export type IUrlParams = { [key: string]: any };

interface envs {
  baseUrl: string;
  wxAppId: string;
  filePath: string;
  env: "dev" | "prod";
}
export interface IResourceItem {
  alias: string;
  resourceId: number;
  type: 1 | 2; // 数量 ｜ 布尔
  unit: string;
}
export interface IUserHasResourceItem {
  resourceId: number;
  quantity: number | boolean | string; // IResourceItem.type决定
  userId?: string;
  status?: string | number | null;
}

class Utils {
  baseDevEnvs: envs = {
    baseUrl: "https://baidu.com/api/",
    wxAppId: "appid",
    filePath: "http://baidu.com:5600/applet/",
    env: "dev",
  };
  baseProdEnvs: envs = {
    baseUrl: "https://baidu.com/api/",
    wxAppId: "appid",
    filePath: "http://baidu.com:5600/applet/",
    env: "prod",
  };
  // 深拷贝
  deepClone<T>(target: T): T {
    let result: any;
    if (typeof target === "object") {
      if (Array.isArray(target)) {
        result = [];
        for (let i in target) {
          result.push(this.deepClone(target[i]));
        }
      } else if (target === null) {
        result = null;
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        result = {};
        for (let i in target) {
          result[i] = this.deepClone(target[i]);
        }
      }
    } else {
      result = target;
    }
    return result;
  }
  // 是否为手机号校验
  isPhone(phone: string): boolean {
    return /^1(3\d|4\d|5\d|6\d|7\d|8\d|9\d)\d{8}$/g.test(phone);
  }

  // 前往page下的，某一页面 path: pages下起步 params：参数 type: 跳转类型，前往，重定向
  goTargetPage(
    path: string,
    params: IUrlParams = {},
    type: "navigateTo" | "redirectTo" = "navigateTo"
  ) {
    let url = `/src/pages/${path}`;
    const enCodeParams = encodeURIComponent(JSON.stringify(params));
    let paramsArs = Object.entries(params);
    if (paramsArs.length > 0) {
      // 单个传参 h5会出现样式丢失
      url += "?p=" + enCodeParams;
    }
    if (type === "navigateTo") {
      uni.navigateTo({
        url,
      });
    } else {
      uni.redirectTo({
        url,
      });
    }
  }
  // 解析url传递的参数
  parseParams(params: string): IUrlParams {
    return params ? JSON.parse(decodeURIComponent(params)) : "";
  }
  // 判断是否为微信浏览器
  isWxBrowser() {
    if (navigator) {
      let ua = navigator.userAgent.toLowerCase();
      const match = ua.match(/MicroMessenger/i);
      if (match && match[0] == "micromessenger") {
        //是
        return true;
      }
    }
    return false;
  }
  // 上传图片
  uploadPic(url: string, reqUrl: string) {
    return new Promise((res, rej) => {
      uni.uploadFile({
        filePath: url,
        url: this.returnEnvConstants("baseUrl") + reqUrl,
        name: "file",
        header: {
          Authorization: storage.get("token", ""),
        },
        success: (r) => {
          let o = r.data;
          if (typeof o === "string") {
            o = JSON.parse(o);
          }
          res(o);
        },
        fail: (err) => {
          rej(err);
        },
      });
    });
  }
  // 时间戳转化为当前时间
  formatNowTime(time: number) {
    function add0(m: number) {
      return m < 10 ? "0" + m : m;
    }
    const newtime = new Date(time);
    var y = newtime.getFullYear();
    var m = newtime.getMonth() + 1;
    var d = newtime.getDate();
    var h = newtime.getHours();
    var mm = newtime.getMinutes();
    var s = newtime.getSeconds();
    return (
      y +
      "-" +
      add0(m) +
      "-" +
      add0(d) +
      " " +
      add0(h) +
      ":" +
      add0(mm) +
      ":" +
      add0(s)
    );
  }
  // 返回当前环境变量
  returnEnvConstants(key: keyof envs) {
    // #ifdef DEV
    return this.baseDevEnvs[key];
    // #endif

    // #ifdef PROD
    return this.baseProdEnvs[key];
    // #endif
  }
  // 统一支付调用函数
  handlePay(buyId: string, type: "1" | "2"): Promise<any> {
    const coreStore = useCoreStore();
    const isMpWx = coreStore.isMpWx;
    const isH5Wx = this.isWxBrowser();

    return new Promise(async (resolve, reject) => {
      // 微信小程序、h5支付
      if (isMpWx || isH5Wx) {
        const { data: payParams } = await coreApi.getPayParams({
          buyId,
          type,
          payClient: isMpWx ? "1" : "2",
        });
        if (isMpWx) {
          // @ts-ignore
          uni.requestPayment({
            provider: "wxpay",
            timeStamp: payParams.timestamp,
            nonceStr: payParams.nonceStr,
            package: payParams.prepayId,
            signType: payParams.signType,
            paySign: payParams.paySign,
            success(res) {
              uni.showToast({
                icon: "success",
                title: "支付成功！",
              });
              resolve(res);
            },
            fail() {
              console.log("pay error,close order...");
              coreApi.closeOrder(payParams.orderId);
              reject();
            },
          });
        } else {
          const appId = this.returnEnvConstants("wxAppId");
          window.wxBrowserJs.error((err) => {
            console.log("js-sdk初始化失败！！！！！", err);
          });
          window.wxBrowserJs.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp: payParams.timestamp, // 必填，生成签名的时间戳
            nonceStr: payParams.nonceStr, // 必填，生成签名的随机串
            signature: payParams.paySign, // 必填，签名
            jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表
          });
          window.wxBrowserJs.ready(() => {
            console.log("wx js pay ready");
            window.wxBrowserJs.chooseWXPay({
              appId,
              timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32
              package: payParams.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: payParams.paySign,
              success(r) {
                uni.showToast({
                  icon: "success",
                  title: "支付成功！",
                });
                resolve(r);
              },
              cancel(e) {
                console.log("wx h5 pay error,close order...");
                coreApi.closeOrder(payParams.orderId);
                reject(e);
              },
            });
          });
        }
      } else {
        // h5
        const res = await coreApi.defualtH5Pay({
          buyId,
          type,
        });
        const url = res.data.url;
        // window.open(url)
        window.location.href = url;
        // 跳转后开始
        uni.showModal({
          title: "支付状态",
          content: "该订单是否已支付？",
          showCancel: true,
          cancelText: "未支付",
          success: ({ confirm }) => {
            if (confirm) {
              uni.showToast({
                icon: "success",
                title: "支付成功！",
              });
            } else {
              uni.showToast({
                icon: "error",
                title: "您已取消支付，请重新支付！",
              });
              coreApi.defualtH5ClosePay(res.data.orderId);
            }
          },
        });
        // 由于没有确认支付失败的机制，所以在未成功之前只能不断轮询，后期有支付失败标识再加入
        // const bol = await this.confirmIsPay(res.data.orderId)
        // if (bol) {
        // uni.showToast({
        // 	icon: 'success',
        // 	title: '支付成功！'
        // })
        // } else {
        // uni.showToast({
        // 	icon: 'error',
        // 	title: '支付失败，请重新支付！'
        // })
        // }
      }
    });
  }
  // 轮询确认支付状态
  private async confirmIsPay(
    id: string,
    nowCount: number = 0
  ): Promise<boolean> {
    const { data: result } = await coreApi.defualtH5PayQueryOrder(id);
    console.log(result, "pay result");
    const that = this;
    const MAX_COUNT = 60; // 购买回调判定次数，2s判定一次，120s总判定时间
    if (result.status === "NOTPAY") {
      if (MAX_COUNT === nowCount) {
        // 支付超时，关闭订单
        return false;
      } else {
        return new Promise((rej) => {
          const timer = setTimeout(async () => {
            rej(await that.confirmIsPay(id, ++nowCount));
            clearTimeout(timer);
          }, 2000);
        });
      }
    } else if (result.status === "SUCCESS") {
      return true;
    } else {
      // 支付失败，关闭订单
      return false;
    }
  }
}
const utils = new Utils();

export default utils;
