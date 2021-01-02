<template>
  <div class="center">
    <div class="ding">
      <van-nav-bar
        :fixed="true"
        title="个人中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="top">
      <img
        class="top11"
        src="http://static.smartisanos.cn/mobilenew/img/head.4b81d150.png"
      />
      <div class="top111" v-if="!userinfo.mobile">
        <span @click="dl">登录</span> /<span @click="zc">注册</span>
      </div>
      <div class="top111" v-if="userinfo.mobile">
        <span>{{ userinfo.mobile }}</span>
      </div>
    </div>
    <div>
      <van-tabbar v-model="active" :fixed="false">
        <van-tabbar-item>
          <van-icon
            class="iconfont icon-dingdan"
            slot="icon"
            size="20px"
          ></van-icon>
          <span>全部订单</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon
            class="iconfont icon-daifukuan"
            slot="icon"
            size="20px"
          ></van-icon>
          <span>待付款</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon
            class="iconfont icon-dengdaishouhuo"
            slot="icon"
            size="20px"
          ></van-icon>
          <span>待收货</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon
            class="iconfont icon-icon4"
            slot="icon"
            size="20px"
          ></van-icon>
          <span>待评价</span>
        </van-tabbar-item>
        <van-tabbar-item>
          <van-icon
            class="iconfont icon-shouhoufuwu"
            slot="icon"
            size="30px"
          ></van-icon>
          <span>售后</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>

    <div class="nav">
      <ul class="nav1">
        <li @click="ye()">
          余额
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="nav2">
        <li>
          我的优惠券
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul>
        <li>
          优先购买码
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
    </div>

    <div class="zhong">
      <ul class="zhong1">
        <li>
          零售门店
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="zhong2">
        <li>
          以旧换新
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="zhong3">
        <li>
          常见问题
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul>
        <li>
          服务支持
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
    </div>

    <div class="foot">
      <ul class="foot1">
        <li>
          意外碎屏保修服务
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="foot2">
        <li>
          延长保修服务
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="foot3">
        <li>
          协议政策
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul class="foot4">
        <li>
          资质证照
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
      <ul>
        <li>
          活动说明
          <span>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAiCAYAAACwaJKDAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAITSURBVHgBtZVPS8NAEMV3k0BP6kEtWHu0tZ+hHhWP9ui3VNGPY4WKf0DQU7Qo2Mb30pkwhKTNVn0wnWy2+8vLzmbXuX9QXHHvAPGN+HJ/AU2SZDifz09x2UPcrgu2UAKHURS5LMtavwErdChBoCPYe99C9NAOBkfFRRRlEjkbrjPkjTiOz5HbLkDq9AGOthBtOlW3ohbaA+QJ4iMESo0RW4DtKhjhEXQfIx2i/74JuLykxnSMvCsFKxxjfhMBTxDTEKg63uRUCIzzi+T5EP5/JTiuuX9HMB0LjHAn18kqcB20ANMxVwVNy4rwMk7neBoCVTCrv0e3VnhQYoo3DYE6GUR1DTCf5zrHTaDUo+R9/pRck9G34KZQBXvjOJ9fupbiETwhOASq4MKxdS0fSO44FEo9Se4KrFhydIx2P3HriWs433xQsPwGs7SzdaAniIEF6qeMNrfIi8iFSYH51igfBcX2J4GI18ZQHDXHBIoj25WJw0sCecM3Q7oCKNJxdErglQJt51IgXnNgCmH7UnGYuoonVomH3xGBbNiiyHUqDtPyQL8EOELslDvkUExns1klsA7awmE3wqAyULe9WoeqpAqIL2NbIGWtBFLREqCuQ41GQMob4BleebvmfwRduwZASl9/SIfmrHfijpV+DwFa6JucP+W1GAykdOt7cYup6GSLDVKrfOMCgRZKPUvuiMO1gNQPm18nYBaJHDEAAAAASUVORK5CYII"
              alt=""
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Tabbar,
  TabbarItem,
  Icon,
  IndexBar,
  IndexAnchor,
  Cell,
  NavBar,
} from "vant";

import "../../assets/icon/font_2294339_t53igrmyrrq/iconfont.css";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(NavBar);

export default {
  data() {
    return {
      active: 0,
      indexList: [],
      userinfo: {},
    };
  },
  created() {
    let jwt = this.$store.state.jwt;
    console.log(jwt)
    if (jwt) {
      this.$http.get("/v1/info").then((ret) => {
        console.log(ret)
        if (ret.code == 0) {
          this.userinfo = ret.userinfo;
        }
      });
    }
  },
  methods: {
    dl() {
      this.$router.push("/login");
    },
    zc() {
      this.$router.push("/register");
    },
    onClickLeft() {
      this.$router.push("/");
    },
    ye() {
      this.$router.push("/yue");
    },
  },
};
</script>

<style lang = "scss" scoped>
.center {
  margin-bottom: 50px;
  margin-top: 50px;
}

.ding {
  z-index: 100;
}

.top {
  width: 100%;
  height: 130px;
  display: flex;
  border-radius: 5px;
  background: rgb(236, 236, 236);
}
.top .top11 {
  width: 70px;
  height: 70px;
  margin-left: 30px;
  margin-top: 30px;
}
.top .top111 {
  padding-left: 20px;
  padding-top: 55px;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  font-weight: bold;
}

.nav {
  height: 200px;
  margin-top: 15px;
  border-radius: 5px;
  background: rgb(236, 236, 236);
}
.nav ul li {
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  margin-left: 15px;
}
.nav ul li span img {
  width: 9px;
  height: 13px;
  float: right;
  margin-top: 26px;
  margin-right: 15px;
}
.nav .nav1 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.nav .nav2 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}

.zhong {
  height: 265px;
  margin-top: 15px;
  border-radius: 5px;
  background: rgb(236, 236, 236);
}
.zhong ul li {
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  margin-left: 15px;
}
.zhong ul li span img {
  width: 9px;
  height: 13px;
  float: right;
  margin-top: 26px;
  margin-right: 15px;
}
.zhong .zhong1 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.zhong .zhong2 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.zhong .zhong3 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}

.foot {
  height: 330px;
  margin-top: 15px;
  border-radius: 5px;
  background: rgb(236, 236, 236);
}
.foot ul li {
  height: 65px;
  line-height: 65px;
  font-size: 18px;
  margin-left: 15px;
}
.foot ul li span img {
  width: 9px;
  height: 13px;
  float: right;
  margin-top: 26px;
  margin-right: 15px;
}
.foot .foot1 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.foot .foot2 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.foot .foot3 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
.foot .foot4 {
  border-bottom: 1px rgb(192, 191, 191) solid;
}
</style>