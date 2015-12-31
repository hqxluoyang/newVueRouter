/*
    hqx
    2016/1231
*/
import channelControl from './channelControl'
import allComp from './allComp'
import appEnter from './appEnter'
import load from './load'

export default {
    start () {
        channelControl.setChannel();
        allComp.startInit();
        appEnter.initStart();
        load.initStart();
    },

}