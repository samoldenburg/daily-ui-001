<template>
    <div id="chat">
        <div id="chat-output" v-if="messages">

            <div v-for="message in messages">
                <div class="message" :data-from="message.user">
                    <div class="inner" v-html="message.message"></div>
                </div>
            </div>
            <div v-if="serverReplying">
                <div class="replying">
                    <span>{{ dots }}</span>
                </div>
            </div>
        </div>
        <div id="text-entry">
            <input id="text-input" type="text" placeholder="Type a message..." @keyup.enter="userSendMessage" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
    name: 'chat',
    data () {
        return {
            messages: null,
            serverReplying: true,
            dots: '...'
        }
    },
    created () {
        setInterval(() => {
            if (this.dots.length == 3) {
                this.dots = '.'
            }
            else {
                this.dots = this.dots + '.'
            }
        }, 333)

        this.$store.dispatch('serverSendMessage', "Hey there! I'm here to help guide you through the registration process.");
        setTimeout(() => {
            this.$store.dispatch('serverSendMessage', "First - Could you tell me your name?");
            this.$store.commit(types.SERVER_NOT_REPLYING)
        }, 2000)
    },
    computed: {
        ...mapGetters({
            messages: 'getMessages',
            serverReplying: 'getServerReplying'
        })
    },
    methods: {
        ...mapActions([
            'userSendMessage'
        ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@require '../styles/colors'
#chat
    position fixed
    top 50%
    left 50%
    transform translate(-50%, -50%)

    width 80%
    height 80%
    max-height 600px
    max-width 1000px

    background rgba(255,255,255,0.5)

    border-radius 10px
    box-shadow 10px 10px 50px rgba(0,0,0,0.25)

    padding 2rem
    box-sizing border-box

    overflow hidden


.message
    color white
    position relative
    margin-bottom 1rem

    &[data-from="server"]
        text-align left
        padding-left 51px

        &:before
            position absolute
            top 50%
            left 0
            transform translateY(-50%)
            content ''
            display inline-block
            border-radius 100%
            width 35px
            height 35px
            background-position center center
            background-size 35px
            background-image url('/static/robot.png')

        .inner
            background linear-gradient(to right, $main-5 0%, $main-4 100%)

            &:before
                content: ''
                position absolute
                top 50%
                left 0
                z-index -1
                transform translate(45px, -50%)
                width 0
                height 0
                border-style solid
                border-width 10px 10px 10px 0px
                border-color transparent $main-5 transparent transparent

    &[data-from="user"]
        text-align right
        padding-right 51px

        &:after
            position absolute
            top 50%
            right 0
            transform translateY(-50%)
            content ''
            display inline-block
            border-radius 100%
            width 35px
            height 35px
            background-position center center
            background-size 35px
            background-image url('/static/person.png')

        .inner
            background linear-gradient(to left, $main-5 0%, $main-4 100%)

            &:after
                content: ''
                position absolute
                top 50%
                right 0
                z-index -1
                transform translate(-45px, -50%)
                width 0
                height 0
                border-style solid
                border-width 10px 0 10px 10px
                border-color transparent transparent transparent $main-5

    .inner
        border-radius 1rem
        display inline-block
        padding 0.4rem 1rem
        box-shadow 3px 3px 10px rgba(0,0,0,0.1)
        max-width 45%

.replying
    background rgba(255,255,255,0.2)
    display inline-block
    padding 0.4rem 1rem
    border-radius 1rem
    line-height 0
    height 15px
    margin-left 53px
    width 23px

    span
        font-size 32px
        color rgba(0,0,0,0.5)

#text-entry
    position absolute
    bottom 0
    left 0
    width 100%

    input
        background rgba(255,255,255,0.5)
        border 0
        width 100%
        font-size 20px
        outline none

        padding 1rem 2rem
        border-top 1px solid rgba(0,0,0,0.1)
        transition all 0.25s ease

        color #666

        &:focus
            background rgba(255,255,255,0.5)
            border-top 1px solid $main-4
            box-shadow 0px 3px 15px $main-4

#chat-output
    position absolute
    height 100%
    width 100%
    top 0
    left 0
    padding 2rem 2rem 5rem 2rem
    box-sizing border-box
    overflow-x hidden
    overflow-y auto
</style>
