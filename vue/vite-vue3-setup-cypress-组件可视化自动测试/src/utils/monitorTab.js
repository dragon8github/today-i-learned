const is = (type, val) => ![, null].includes(val) && val.constructor === type

/**
 * 监听 tab 开关 ...
 *
 // const openMiniMap  = () => { console.log('openMiniMap') }
 // const closeMiniMap = () => { console.log('closeMiniMap') }
 // const trigger = monitorTab(openMiniMap, closeMiniMap)
 */
export const monitorTab = (openHandler = () => {}, closeHandler = () => {}, status = false) => {
    // validate
    is(Function, openHandler)  || (openHandler = () => {})
    is(Function, closeHandler) || (closeHandler = () => {})
    is(Boolean,  status)       || (status = false)

    // switch
    const trigger = v => status = v == null ? !status : v

    // 使用 window.onkeydown 代替 window.addEventListener("keydown") 因为前者一次只能绑定一个。
    window.onkeydown = e => {
        // 监听 esc
        if (e.keyCode === 27) {
            // ...
            status = false
            // ...
            closeHandler()
        }

        // 监听 tab
        if (e.keyCode === 9) {
            // 切换开关并且执行 handler
            trigger() ? openHandler() : closeHandler()
            // 取消默认行为
            e.preventDefault()
        }
    }

    // 返回开关
    return { 
        trigger, 
        open: () => status = true,
        close: () => status = false, 
    }
}