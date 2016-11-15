<template>
    <div id="app">
        <chat />
    </div>
</template>

<script>
import Chat from './components/Chat'

export default {
    name: 'app',
    components: {
        Chat
    }
}
</script>

<style lang="stylus">
@require 'styles/colors'

body
    font-family "open sans", sans-serif
    font-weight 300
    font-size 16px
    line-height 1.3rem

#app
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    background linear-gradient(to bottom right, $main-1 0%, $main-2 100%)
    background-size cover
    min-height 100vh
    min-width 100vw
</style>
