<template>
  <div class="container-fluid">
    <header class="w-100 position-relative">
      <h6 class="position-absolute" style="">可用网络</h6>
      <div class="position-absolute" @click="get_wifi_list"></div>
    </header>
    <ul class="w-100">
      <li v-for="wifi in wifi_list">
        <wifi_icon class="wifi_icon" :wifi_data="wifi"></wifi_icon>
        <div class="text">{{ wifi.name }}</div>
        <div class="connected" v-if="wifi.is_connected" @click="disconnect_wifi(wifi)"></div>
        <div class="can_connect" v-if="!wifi.is_connected" @click="open_wifi_link(wifi)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import wifi_icon from '@/components/wifi_icon';

  function get_wifi_list(vm) {
    vm.$ajax.get(`${vm.host}/api/operation_system/get_wifis`)
      .then(resp => {
        vm.wifi_list = resp.data;
        for (let i = 0; i < vm.wifi_list.length; i++) {
          if (vm.wifi_list[i].is_connected) {
            let temp = vm.wifi_list.splice(i, 1)[0];
            vm.wifi_list.splice(0, 0, temp);
            break;
          }
        }
      }).catch(error => {
      vm.$root.alert.fail.message = '获取wifi列表失败';
      vm.$root.alert.fail.is_show = true;
    }).finally(() => {
      // vm.lan_data = vm.lans[0];
    });
  }

  export default {
    name: 'Wifi',
    components: {wifi_icon},
    data() {
      return {
        wifi_list: [
          {
            name: '别连我dsfasefwagewt',
            is_lock: true,
            key_type: 'WPA2',
            strength: 1,
            is_connected: true,
          },
          {
            name: 'hahaha',
            is_lock: true,
            key_type: 'WPA2',
            strength: 2,
            is_connected: false,
          },
          {
            name: '嘻嘻嘻',
            is_lock: false,
            key_type: 'WPA2',
            strength: 4,
            is_connected: false,
          },
        ]
      }
    },
    methods: {
      get_wifi_list() {
        const vm = this;

        get_wifi_list(vm)
      },
      open_wifi_link(wifi) {
        const vm = this;
        // 打开wifi连接窗口并关闭本窗口
        vm.$emit('open_wifi_connect_win', wifi);
        vm.$emit('close_wifi_list')
      },

      disconnect_wifi(wifi) {
        const vm = this;
        vm.$ajax.post(
          `${vm.host}/api/operation_system/disconnect_wifi`,
          vm.$qs.stringify(wifi),
        ).then(function (response) {
          wifi.is_connected = false;
          console.log(response);
        }).catch(function (error) {
          vm.$root.alert.fail.message = '断开wifi失败，请联系管理员';
          vm.$root.alert.fail.is_show = true;
        });
      }


    },
    beforeCreate() {
      let vm = this;
      // $.get(`${vm.host}/api/operation_system/get_lans`,
      //   function (resp) {
      //     vm.lans = resp;
      //     vm.lan_data = vm.lans[0];
      //   });
      get_wifi_list(vm)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /*@import "../../static/css/base";*/
  @import "../assets/sass/base";

  .container-fluid {
    padding: 0;
    position: fixed;
    z-index: 9999;
    bottom: 1em;
    right: 2em;
    width: 280px;
    height: 550px;
    background-color: $color-withe;
    border-radius: 0.5em;

    header {
      height: 46px;
      h6 {
        line-height: 46px;
        top: 0;
        left: 1em;
      }
      div {
        top: 0.8em;
        right: 1em;
        height: 1em;
        width: 1em;
        background: {
          position: center;
          repeat: no-repeat;
          size: contain;
          image: url("/static/img/later-images-01/yzm_36_01.png");
        }
        &:hover {
          background: {
            image: url("/static/img/later-images-01/yzm_36_02.png");
          }
        }
      }
    }

    ul {
      padding: 10px;
      height: 400px;
      overflow-y: scroll;
      li {
        width: 100%;
        height: 40px;
        list-style-type: none;
        padding: 0 0.5em;
        position: relative;
        top: 0;
        left: 0;
        border-bottom: {
          style: solid;
          width: 1px;
          color: $primary;
        }

        &:hover {
          background-color: #eeeeee;
          cursor: pointer;
          .connected {
            background-image: url("/static/img/later-images-01/yzm_38_01.png");
          }
        }
        .wifi_icon {
          /*width: 1em;*/
          /*height: 1em;*/
          position: absolute;
          left: 0.5em;
          top: 0.5em;
        }
        .text {
          text-align: left;
          position: absolute;
          left: 2em;
          top: 0;
          height: 40px;
          line-height: 40px;
        }

        .connected, .can_connect {
          position: absolute;
          right: 0.5em;
          top: 10px;
          width: 1em;
          height: 1em;
          background: {
            position: center;
            repeat: no-repeat;
            size: contain;
          }
        }
        .connected {
          background-image: url("/static/img/later-images-01/yzm_37.png");
          &:hover {
            background-image: url("/static/img/later-images-01/yzm_38_02.png");
          }
        }
        .can_connect {
          background-image: url("/static/img/later-images-01/yzm_40_01.png");
          &:hover {
            background-image: url("/static/img/later-images-01/yzm_40_02.png");
          }
        }

      }
    }
  }
</style>
