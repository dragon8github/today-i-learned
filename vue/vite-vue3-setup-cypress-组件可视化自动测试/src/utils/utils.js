export const isNaN = obj => obj !== obj

export const doTry = (_try = () => {}, _catch = () => {}) => {
  let _err = null
  let _result = null

  try {
      _result = _try()
  } catch (err) {
      _err = err
      _catch(err)
  }

  return [_err, _result]
}


// toLocaleString('en-US') + toFixed()
export const toNumber = (val, decimal = 0) => {
  const n = parseFloat(val)
  if (isNaN(n)) return val
  const result = parseFloat(n.toFixed(decimal)).toLocaleString('en-US')
  return result
}

// 传入的就是万条了，所以 24415，就等于 2亿 4415万
/**
 var result = toYiWan(24415)
 console.log(result[0], result[1]) // => 2 4415

 var result = toYiWan(70226)
 console.log(result[0], result[1]) // =>  226
*/
export const toYiWan = n => {
	const result = []
	// 亿
	result[0] = parseFloat((n / 10000).toFixed())
	// 万
	result[1] = toNumber((n % 10000).toFixed())
	return result
}


export const division = (ary, num, container = {}) => {
    for (let page = 0; page < Math.ceil(ary.length / num); page++) {
      container[page] = ary.slice(page * num, (page + 1) * num)
    }
    return container
}



/**
 * （推荐）say something ...

 ;(async function(){
    const a = await waitWhen(_ => document.getElementById('1234'))
    console.log(20191212102924, a)
 }())
 */
export const waitWhen = (conditionFn = () => false, wait = 4000, interval = 10, startTime = Date.now()) => new Promise((resolve, reject) => {
  (function poll() {
      // 获取回调结果
      const result = conditionFn()

      // 获取是否超时
      const isTimeout = Date.now() - startTime > wait

      // 如果条件成立，那么立刻 resolve
      if (result) return resolve(result)

      // 如果时间超时，立刻 reject
      if (isTimeout) return reject(result)

      // 否则继续轮询
      setTimeout(poll, interval)
  }())
})

// 剪切板
export const copyToClipboard = text => {
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

/**
 * 简单的超时关闭函数 ...
 *
 * @param  {Function} 
 * @param  {Function} 
 * @param  {Number}   
 *
 * const close = killerQueen(
 *   () => console.log('开启打火机'),
 *   () => console.log('熄灭打火机'),
 *   10000,
 * )
 */
export const killerQueen = (fn = () => {}, cancel = () => {}, time = 10000) => {
  // 先执行操作
  fn()

  // 定时炸弹
  const timer = setTimeout(() => {
    // 败者食尘！
    cancel()
    // 消除痕迹
    cancel = () => console.warn(`Bite The Dust`)
  }, time)

  return () => {
    // 取消炸弹
    clearTimeout(timer)
    // 正常调用
    cancel()
  }
}

// 9位 简易版
export const MdUuid = () => Math.random().toString(36).slice(4)

// 解析路径
export const parsePath = (obj, path) => {
    const segments = path.split('.')
    for (let i = 0, len = segments.length; i < len; i++) {
        obj = obj[segments[i]]
    }
    return obj
}


// 简单对比双方是否相等，如果不等就赋值
// 为了解决 Vue.watch 监听引用类型总是更新的问题：无论你是否数据是否一致，由于引用类型的地址是不一致的，所以总会触发更新，这很浪费性能。
export const diffSet = function(leftPath, rightValue, key) {
  // news: left 可能传入一个路径，而不是简单的一个参数了。
  const leftValue = parsePath(this, leftPath)

  // 分别对 left/right 进行序列化
  const _left = JSON.stringify(leftValue), _right = JSON.stringify(rightValue)

  // 如果默认是空数据结构，那想都不用想就赋值吧
  const isEmpty = _left === '{}' || _left === '[]' || _left === 'null' || !_left

  // 内容不同才赋值
  if (isEmpty || _left != _right) {
    // 深度设置
    $deepSet(this, leftPath, rightValue)
  }
}

/**
 * 示例:
 * 
 * clickOutSide('.u-pointCard', cancel => {
 *     // 关闭弹窗
 *     this.points_html = ''
 *     // 取消事件本身
 *     cancel()
 * })
 */
export const clickOutSide = (className, fn) => {
  const _clickOutSide = e => {
    const el = document.querySelector(className)
    // 如果点击的不是指定的元素，那么执行回调，并且取消这个事件本身
    if (el && el.contains(e.target) === false) {
       // 执行函数，并且注入取消的回调
       fn(() => document.removeEventListener('mouseup', _clickOutSide))
    }
  }
  document.addEventListener('mouseup', _clickOutSide)
}

export const debug = (...args) => (console.log(...args), args[args.length - 1])

export const filterCity = (v = '') => v.replace(/街道|镇/g, '')

export const once = (func) => {
  var ran,
      result;

  if (!isFunction(func)) {
    throw new TypeError(funcErrorText);
  }
  return function() {
    if (ran) {
      return result;
    }
    ran = true;
    result = func.apply(this, arguments);

    // clear the `func` variable so the function may be garbage collected
    func = null;
    return result;
  };
}


// 折叠日志
export const logs = (info = '', ...args) => {
    console.groupCollapsed(info)
    args.forEach(_ => console.log(_))
    console.groupEnd()
}

// min（包含）～ max（包含）之间的随机数
export const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min


/**
 * Promise.all 的升级版本，如果异常也会自动返回
 * 
 * demo:
 
   const testA = new Promise((resolve, reject) => setTimeout(_ => resolve('success'), 3000))
   const testB = new Promise((resolve, reject) => setTimeout(_ => reject('fail'), 3500))

   ;(async function(){
       // ✖️
       // const result = await Promise.all([testA, testB])

       // ✔
       const result = await Promise.allSettled([testA, testB])
       console.log(20191215005254, result)
   }())
 */
Promise.allSettled = iterables => new Promise(resolve => {
    let result = []

    const callback = function (i, v) {
        // 模仿 Promise.all 对号入座原则
        result[i] = v

        // 是否全部执行完毕？
        if (result.length === iterables.length)
            // 收工咯~
            resolve(result)
    }

    iterables.forEach((p, i) => {
        // 注入索引
        const _callback = callback.bind(null, i)
        // 注入灵魂
        p.then(_callback).catch(_callback)
    })
})

/**
 * 自定义 partial 偏应用（_bind）
 * demo 示例
 * 
   // 期待有两个参数注入
   var a = function (a, b) { console.log(a, b, this) }
   // 我先注入第二个参数
   var aa = a.partial(undefined, 'god')
   // 被第三方执行，注入了第一个参数
   aa('shit') // => shit god
 */
export const partial = (fn, ...argv) => {
  // fixbug：震惊！argv也是一个引用类型，所以先复制一份出来。
  const _argv = argv.slice(0)

  // 返回已占位的函数（为了更方便的结合bind使用，本函数使用 function 而不适用箭头函数）
  return function (...args) {
       // 遍历占位符参数
       for (let [index, value] of _argv.entries()) {
           // 如果占位符为 undefined，说明需要补位的
           if (value === undefined) {
              argv[index] =  args[index]
           }
       }
       // 调用函数
       return fn.apply(this, argv)
   }
}


// is 家族
export const isFunction = v => Object.prototype.toString.call(v) === '[object Function]'
export const isString = input => Object.prototype.toString.call(input) === '[object String]'
export const isPromise = val => val && typeof val.then === 'function'

/**
 * map 方法只能返回一个参数，这个方法是用来返回多个的。
 * demo
   const list = [{ a: 'a1', b: 'b1' }, { a: 'a2', b: 'b2' }, ]
   const [a, b] = list.maps(_ => _.a, _ => _.b)
   console.log(a, b)
 */
Array.prototype.maps = function(...args) {
    // 初始化空数组，这是一个二维数组，长度与参数一致
    let ary = args.map(_ => [])

    // 开始遍历自身
    this.forEach((val, index, array) => {
        // 依次执行 fn
        for (let i = 0, len = args.length; i < len; i++) {
            // 获取当前函数
            const fn = args[i]
            // 调用函数，如果不是函数的话，就直接返回本身
            const result = isFunction(fn) ? fn(val, index, array) : fn
            // 插入第n个里边
            ary[i].push(result)
        }
    })

    // 返回最终结果
    return ary
}

Array.prototype.filters = function(...args) {
    // 初始化空数组，这是一个二维数组，长度与参数一致
    let ary = args.map(_ => [])

    // 开始遍历自身
    this.forEach((val, index, array) => {
        // 依次执行 fn
        for (let i = 0, len = args.length; i < len; i++) {
            // 获取当前函数
            const fn = args[i]

            if (fn(val, index, array)) {
               ary[i].push(val)
            }
        }
    })

    // 返回最终结果
    return ary
}

export const is = (type, val) => ![, null].includes(val) && val.constructor === type;


/**
 * 最简单且最安全的方法显示一个值，举个例子: 
 * var obj = {a: 123 }
   maybe(_=> obj.a, 0); // 123
   maybe(_=> obj.b, 0); // 0
   maybe(_=> obj.a.b.s.w.holy.shit.fuck.god, 0); // 0
 */
export const maybe = (fn, n = '') => {
    try {
        const result = fn()
        
        return (result && result === result && result !== 'NaN' && result !== 'undefined' && result !== 'Invalid date') ? result : n
    } catch (err) {
        return n
    }
}

/**
 * 获取数组最后一位
 */
Array.prototype.last = function () {
    return this[this.length - 1]
} 

/**
 * 获取数组第一位
 */
Array.prototype.first = function () {
    return this[0]
} 


/**
 * 判断对象是否是一个空的对象，既{}
 */
export const isEmptyObject = obj => {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 将对象转化为formdata格式
 */
export const obj2formdata = (json) => {
    var data = new FormData()
    if (json) {
        Object.keys(json).forEach(function(key) {
            data.append(key, json[key])
        });
    }
    return data
}


/**
 * 将对象转化为GET参数
 */
export const obj2formdatastr = (body) => {
    if (body) {
        let formparams = '';
        Object.keys(body).forEach(key => {
            if (formparams.length > 0) {
                formparams += '&';
            }
            formparams = formparams + key + '=' + body[key];
        });
        return formparams
    }
    return ''
}

/**
 * 函数节流（throttle）
 */
export const throttle = function(func, wait, options) {
  var timeout, context, args, result;
  // 标记时间戳
  var previous = 0;
  // options可选属性 leading: true/false 表示第一次事件马上触发回调/等待wait时间后触发
  // options可选属性 trailing: true/false 表示最后一次回调触发/最后一次回调不触发
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : +(new Date());
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    // 记录当前时间戳
    var now = +(new Date());
    // 如果是第一次触发且选项设置不立即执行回调
    if (!previous && options.leading === false)
    // 将记录的上次执行的时间戳置为当前
    previous = now;
    // 距离下次触发回调还需等待的时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 等待时间 <= 0或者不科学地 > wait（异常情况）
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
          // 清除定时器
        clearTimeout(timeout);
        // 解除引用
        timeout = null;
      }
      // 将记录的上次执行的时间戳置为当前
      previous = now;

      // 触发回调
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    // 在定时器不存在且选项设置最后一次触发需要执行回调的情况下
    // 设置定时器，间隔remaining时间后执行later
    else if (!timeout && options.trailing !== false)    {
      timeout = setTimeout(later, remaining);
    }
   return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};


// Array Remove - By John Resig (MIT Licensed)
/**
 * // 移除数组中的第二项
 * array.remove(1);
 * // 移除数组中的倒数第二项
 * array.remove(-2);
 * // 移除数组中的第二项和第三项（从第二项开始，删除2个元素）
 * array.remove(1,2);
 * // 移除数组中的最后一项和倒数第二项（数组中的最后两项）
 * array.remove(-2,-1);
 *
 */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  this.push.apply(this, rest);
  return this
};

 /**
 * 深度递归搜索
 * @param {Array} arr 你要搜索的数组
 * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
 * @param {String} children 子数组的key
 */
export const deepFind = (arr, condition, children) => {
    // 即将返回的数组
    let main = []

    // 用try方案方便直接中止所有递归的程序
    try {
        // 开始轮询
        (function poll(arr, level, cb) {
            // 如果传入非数组
            if (!Array.isArray(arr)) return

            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 获取当前项
                const item = arr[i]

                // 先占位预设值
                main[level] = item

                // 扩展：如果是一个对象的话，添加一些标记属性
                if (Object.prototype.toString.call(item) === '[object Object]') {
                  item.__INDEX__ = i
                  item.__LEVEL__ = level
                }

                // 检验是否已经找到了
                const isFind = condition && condition(item, i, level) || false

                // 自杀函数
                const kill = () => {
                // 删除占位预设值
                  main.length = main.length - 1
                  // 触发回调
                  cb && cb()
                }

                // 如果已经找到了
                if (isFind) {
                    // 直接抛出错误中断所有轮询
                    throw Error
                // 如果存在children，那么深入递归
                } else if (children && item[children] && item[children].length) {
                    poll(item[children], level + 1,
                      // 如果本函数被触发，说明children还是找不到。
                      () => {
                      // 那么如果我是最后一条，那么我也自杀吧
                      if (i === arr.length - 1) {
                        kill()
                      }
                    })
                // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
                } else if (i === arr.length - 1) {
                  // 找不到，羞愧自杀
                  kill()
                }
            }
        })(arr, 0)
    // 使用try/catch是为了中止所有轮询中的任务
    } catch (err) {}

    // 返回最终数组
    return main
}

/**
 * chunk 数组分块函数
 * 对数组进行分块，满足条件的分为hit组，不满足分到miss组
 *
 * const ary = [1, 2, 3, 4, 5, 6, 7, 8]
 * const result = chunk(ary, _ => _ > 1)
 * console.log(result)
 */
export const chunk = (ary, fn) => ary.reduce(({ hit, miss } = {}, v) => {
  fn(v) ? hit.push(v) : miss.push(v)
  return { hit, miss }
}, { hit: [], miss: [] })


export const poll = (conditionFn, callback, wait = 4, maxTimeout = 10, timeout = 0) => {
  // 请求是否超出阈值
  if (++timeout > maxTimeout * 1000 / wait) throw new Error('overtime')
  // 如果条件满足，那么执行，否则轮询
  conditionFn() ? callback() : setTimeout(() => {poll(conditionFn, callback, wait, maxTimeout, timeout) }, wait)
}


export const pureMap = (ary = [], validate = () => true, cb = () => undefined) => {
  // copy
  let _ary = JSON.parse(JSON.stringify(ary))

  // filter
  _ary = _ary.map(v => {
    // validate
      if (validate(v)) {
        // callback
        return cb(v) || v
      } else {
        // default
        return v
      }
  });

  // filter ary
  return _ary
}

export const addClass = (el, cls) => {
  
    if (el.classList) {
        el.classList.add(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' '
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim())
        }
    }
}

export const hasClass = (el, className) => {
  if (el.classList)
    el.classList.contains(className);
  else
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

export const getClassName = (el) => {
    return (el.className instanceof SVGAnimatedString ? el.className.baseVal : el.className)
}

export const removeClass = (el, cls) => {
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' ',
            tar = ' ' + cls + ' '
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ')
        }
        el.setAttribute('class', cur.trim())
    }
}

export const exclude = (obj, ...attribute) =>  {
  // copy
  let _ = JSON.parse(JSON.stringify(obj))
    // 删除属性
  for (let i = 0, len = attribute.length; i < len; i++) {
    const attr = attribute[i]
      delete _[attr]
  }
  // pure obj
  return _
}



/**
 * 反向递归
 * @param {*} key       需要匹配的值
 * @param {*} treeData  匹配的数组
 */
export function getTreeDeepArr(key, treeData) {
  let arr = []; // 在递归时操作的数组
  let returnArr = []; // 存放结果的数组
  let depth = 0; // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN; // 将执行的层级赋值 到 全局层级
      arr[depthN] = (childrenData[j].tagId);
      if (childrenData[j].tagId == key) {
        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j].childList) {
          depth++;
          childrenEach(childrenData[j].childList, depth);
        }
      }
    }
    return returnArr;
  }
  return childrenEach(treeData, depth);
}

// 补全
export const pad = (target, n) => {
    var zero = new Array(n).join('0');
    var str = zero + target;
    var result = str.substr(-n);
    return result;
}

// 获取24小时，从指定的时间开始
export const get24hourfrom = (start, count = 24) => {
  return [...Array(count)].map((v, index, array) => {
      return pad((index + start) % 24, 2)
  })
}

// 设置高亮
export const point = dom => {
  if (hasClass(dom, 'changing')) {
     removeClass(dom, 'changing')
  } else {
     addClass(dom, 'changing')
     addClass(dom, 'point')
     dom.addEventListener("webkitAnimationEnd", function() {
       removeClass(dom, 'changing')
     })
  }
}

// 缓存器
export const memoized = function (fn) {
  // 缓存队列
  var cache = {}
  return function () {
    // 以入参为key（todo:最好作为可配置）
    var __KEY__ = Array.prototype.slice.call(arguments)
    // 记录缓存
    return cache[__KEY__] || (cache[__KEY__] = fn.apply(this, arguments))
  }
}

export const dateYYYYMMDDHHmmss =  t => {
    const date = new Date(t)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minu = date.getMinutes()
    const second = date.getSeconds()
    const arr = [month, day, hours, minu, second].map((item, index) => item < 10 ? '0' + item : item)
    return year + '-' + arr[0] + '-' + arr[1] + ' ' + arr[2] + ':' + arr[3] + ':' + arr[4]
}

/**
 * 时间格式化  这个方法好像比上面上个更灵活一点
 * @param  {[type]} date 需要转换的时间
 * @param  {[type]} fmt  转换后的时间格式   如'yyyy-MM-dd hh:mm:ss'
 * @return Promise
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};


// 仿 Array.prototype.map 函数。兼容数组、对象的遍历
export const betterMap = (v, cb) => {
    let result = []
    for (var k in v) {
        result.push(cb && cb(v[k], k, v, result))
    }
    return result
};


// 仿 Array.prototype.filter 函数。兼容数组、对象的遍历
export const betterFilter = (v, cb) => {
    let result = []
    for (var k in v) {
        if (cb(v[k], k, v, result)) {
          result.push(v[k])
        }
    }
    return result
};
