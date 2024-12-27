"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-intersection-observer";
exports.ids = ["vendor-chunks/react-intersection-observer"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-intersection-observer/react-intersection-observer.modern.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-intersection-observer/react-intersection-observer.modern.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   InView: () => (/* binding */ InView),\n/* harmony export */   defaultFallbackInView: () => (/* binding */ defaultFallbackInView),\n/* harmony export */   observe: () => (/* binding */ observe),\n/* harmony export */   useInView: () => (/* binding */ useInView)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\n\nfunction _extends() {\n  _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nfunction _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nconst observerMap = new Map();\nconst RootIds = new WeakMap();\nlet rootId = 0;\nlet unsupportedValue = undefined;\n/**\r\n * What should be the default behavior if the IntersectionObserver is unsupported?\r\n * Ideally the polyfill has been loaded, you can have the following happen:\r\n * - `undefined`: Throw an error\r\n * - `true` or `false`: Set the `inView` value to this regardless of intersection state\r\n * **/\n\nfunction defaultFallbackInView(inView) {\n  unsupportedValue = inView;\n}\n/**\r\n * Generate a unique ID for the root element\r\n * @param root\r\n */\n\nfunction getRootId(root) {\n  if (!root) return '0';\n  if (RootIds.has(root)) return RootIds.get(root);\n  rootId += 1;\n  RootIds.set(root, rootId.toString());\n  return RootIds.get(root);\n}\n/**\r\n * Convert the options to a string Id, based on the values.\r\n * Ensures we can reuse the same observer when observing elements with the same options.\r\n * @param options\r\n */\n\n\nfunction optionsToId(options) {\n  return Object.keys(options).sort().filter(key => options[key] !== undefined).map(key => {\n    return `${key}_${key === 'root' ? getRootId(options.root) : options[key]}`;\n  }).toString();\n}\n\nfunction createObserver(options) {\n  // Create a unique ID for this observer instance, based on the root, root margin and threshold.\n  let id = optionsToId(options);\n  let instance = observerMap.get(id);\n\n  if (!instance) {\n    // Create a map of elements this observer is going to observe. Each element has a list of callbacks that should be triggered, once it comes into view.\n    const elements = new Map();\n    let thresholds;\n    const observer = new IntersectionObserver(entries => {\n      entries.forEach(entry => {\n        var _elements$get;\n\n        // While it would be nice if you could just look at isIntersecting to determine if the component is inside the viewport, browsers can't agree on how to use it.\n        // -Firefox ignores `threshold` when considering `isIntersecting`, so it will never be false again if `threshold` is > 0\n        const inView = entry.isIntersecting && thresholds.some(threshold => entry.intersectionRatio >= threshold); // @ts-ignore support IntersectionObserver v2\n\n        if (options.trackVisibility && typeof entry.isVisible === 'undefined') {\n          // The browser doesn't support Intersection Observer v2, falling back to v1 behavior.\n          // @ts-ignore\n          entry.isVisible = inView;\n        }\n\n        (_elements$get = elements.get(entry.target)) == null ? void 0 : _elements$get.forEach(callback => {\n          callback(inView, entry);\n        });\n      });\n    }, options); // Ensure we have a valid thresholds array. If not, use the threshold from the options\n\n    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);\n    instance = {\n      id,\n      observer,\n      elements\n    };\n    observerMap.set(id, instance);\n  }\n\n  return instance;\n}\n/**\r\n * @param element - DOM Element to observe\r\n * @param callback - Callback function to trigger when intersection status changes\r\n * @param options - Intersection Observer options\r\n * @param fallbackInView - Fallback inView value.\r\n * @return Function - Cleanup function that should be triggered to unregister the observer\r\n */\n\n\nfunction observe(element, callback, options = {}, fallbackInView = unsupportedValue) {\n  if (typeof window.IntersectionObserver === 'undefined' && fallbackInView !== undefined) {\n    const bounds = element.getBoundingClientRect();\n    callback(fallbackInView, {\n      isIntersecting: fallbackInView,\n      target: element,\n      intersectionRatio: typeof options.threshold === 'number' ? options.threshold : 0,\n      time: 0,\n      boundingClientRect: bounds,\n      intersectionRect: bounds,\n      rootBounds: bounds\n    });\n    return () => {// Nothing to cleanup\n    };\n  } // An observer with the same options can be reused, so lets use this fact\n\n\n  const {\n    id,\n    observer,\n    elements\n  } = createObserver(options); // Register the callback listener for this element\n\n  let callbacks = elements.get(element) || [];\n\n  if (!elements.has(element)) {\n    elements.set(element, callbacks);\n  }\n\n  callbacks.push(callback);\n  observer.observe(element);\n  return function unobserve() {\n    // Remove the callback from the callback list\n    callbacks.splice(callbacks.indexOf(callback), 1);\n\n    if (callbacks.length === 0) {\n      // No more callback exists for element, so destroy it\n      elements.delete(element);\n      observer.unobserve(element);\n    }\n\n    if (elements.size === 0) {\n      // No more elements are being observer by this instance, so destroy it\n      observer.disconnect();\n      observerMap.delete(id);\n    }\n  };\n}\n\nconst _excluded = [\"children\", \"as\", \"triggerOnce\", \"threshold\", \"root\", \"rootMargin\", \"onChange\", \"skip\", \"trackVisibility\", \"delay\", \"initialInView\", \"fallbackInView\"];\n\nfunction isPlainChildren(props) {\n  return typeof props.children !== 'function';\n}\n/**\r\n ## Render props\r\n\n To use the `<InView>` component, you pass it a function. It will be called\r\n whenever the state changes, with the new value of `inView`. In addition to the\r\n `inView` prop, children also receive a `ref` that should be set on the\r\n containing DOM element. This is the element that the IntersectionObserver will\r\n monitor.\r\n\n If you need it, you can also access the\r\n [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)\r\n on `entry`, giving you access to all the details about the current intersection\r\n state.\r\n\n ```jsx\r\n import { InView } from 'react-intersection-observer';\r\n\n const Component = () => (\r\n <InView>\r\n {({ inView, ref, entry }) => (\r\n      <div ref={ref}>\r\n        <h2>{`Header inside viewport ${inView}.`}</h2>\r\n      </div>\r\n    )}\r\n </InView>\r\n );\r\n\n export default Component;\r\n ```\r\n\n ## Plain children\r\n\n You can pass any element to the `<InView />`, and it will handle creating the\r\n wrapping DOM element. Add a handler to the `onChange` method, and control the\r\n state in your own component. Any extra props you add to `<InView>` will be\r\n passed to the HTML element, allowing you set the `className`, `style`, etc.\r\n\n ```jsx\r\n import { InView } from 'react-intersection-observer';\r\n\n const Component = () => (\r\n <InView as=\"div\" onChange={(inView, entry) => console.log('Inview:', inView)}>\r\n <h2>Plain children are always rendered. Use onChange to monitor state.</h2>\r\n </InView>\r\n );\r\n\n export default Component;\r\n ```\r\n */\n\n\nclass InView extends react__WEBPACK_IMPORTED_MODULE_0__.Component {\n  constructor(props) {\n    super(props);\n    this.node = null;\n    this._unobserveCb = null;\n\n    this.handleNode = node => {\n      if (this.node) {\n        // Clear the old observer, before we start observing a new element\n        this.unobserve();\n\n        if (!node && !this.props.triggerOnce && !this.props.skip) {\n          // Reset the state if we get a new node, and we aren't ignoring updates\n          this.setState({\n            inView: !!this.props.initialInView,\n            entry: undefined\n          });\n        }\n      }\n\n      this.node = node ? node : null;\n      this.observeNode();\n    };\n\n    this.handleChange = (inView, entry) => {\n      if (inView && this.props.triggerOnce) {\n        // If `triggerOnce` is true, we should stop observing the element.\n        this.unobserve();\n      }\n\n      if (!isPlainChildren(this.props)) {\n        // Store the current State, so we can pass it to the children in the next render update\n        // There's no reason to update the state for plain children, since it's not used in the rendering.\n        this.setState({\n          inView,\n          entry\n        });\n      }\n\n      if (this.props.onChange) {\n        // If the user is actively listening for onChange, always trigger it\n        this.props.onChange(inView, entry);\n      }\n    };\n\n    this.state = {\n      inView: !!props.initialInView,\n      entry: undefined\n    };\n  }\n\n  componentDidUpdate(prevProps) {\n    // If a IntersectionObserver option changed, reinit the observer\n    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {\n      this.unobserve();\n      this.observeNode();\n    }\n  }\n\n  componentWillUnmount() {\n    this.unobserve();\n    this.node = null;\n  }\n\n  observeNode() {\n    if (!this.node || this.props.skip) return;\n    const {\n      threshold,\n      root,\n      rootMargin,\n      trackVisibility,\n      delay,\n      fallbackInView\n    } = this.props;\n    this._unobserveCb = observe(this.node, this.handleChange, {\n      threshold,\n      root,\n      rootMargin,\n      // @ts-ignore\n      trackVisibility,\n      // @ts-ignore\n      delay\n    }, fallbackInView);\n  }\n\n  unobserve() {\n    if (this._unobserveCb) {\n      this._unobserveCb();\n\n      this._unobserveCb = null;\n    }\n  }\n\n  render() {\n    if (!isPlainChildren(this.props)) {\n      const {\n        inView,\n        entry\n      } = this.state;\n      return this.props.children({\n        inView,\n        entry,\n        ref: this.handleNode\n      });\n    }\n\n    const _this$props = this.props,\n          {\n      children,\n      as\n    } = _this$props,\n          props = _objectWithoutPropertiesLoose(_this$props, _excluded);\n\n    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(as || 'div', _extends({\n      ref: this.handleNode\n    }, props), children);\n  }\n\n}\n\n/**\r\n * React Hooks make it easy to monitor the `inView` state of your components. Call\r\n * the `useInView` hook with the (optional) [options](#options) you need. It will\r\n * return an array containing a `ref`, the `inView` status and the current\r\n * [`entry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry).\r\n * Assign the `ref` to the DOM element you want to monitor, and the hook will\r\n * report the status.\r\n *\r\n * @example\r\n * ```jsx\r\n * import React from 'react';\r\n * import { useInView } from 'react-intersection-observer';\r\n *\r\n * const Component = () => {\r\n *   const { ref, inView, entry } = useInView({\r\n *       threshold: 0,\r\n *   });\r\n *\r\n *   return (\r\n *     <div ref={ref}>\r\n *       <h2>{`Header inside viewport ${inView}.`}</h2>\r\n *     </div>\r\n *   );\r\n * };\r\n * ```\r\n */\n\nfunction useInView({\n  threshold,\n  delay,\n  trackVisibility,\n  rootMargin,\n  root,\n  triggerOnce,\n  skip,\n  initialInView,\n  fallbackInView,\n  onChange\n} = {}) {\n  var _state$entry;\n\n  const [ref, setRef] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);\n  const callback = react__WEBPACK_IMPORTED_MODULE_0__.useRef();\n  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({\n    inView: !!initialInView,\n    entry: undefined\n  }); // Store the onChange callback in a `ref`, so we can access the latest instance\n  // inside the `useEffect`, but without triggering a rerender.\n\n  callback.current = onChange;\n  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {\n    // Ensure we have node ref, and that we shouldn't skip observing\n    if (skip || !ref) return;\n    let unobserve;\n    unobserve = observe(ref, (inView, entry) => {\n      setState({\n        inView,\n        entry\n      });\n      if (callback.current) callback.current(inView, entry);\n\n      if (entry.isIntersecting && triggerOnce && unobserve) {\n        // If it should only trigger once, unobserve the element after it's inView\n        unobserve();\n        unobserve = undefined;\n      }\n    }, {\n      root,\n      rootMargin,\n      threshold,\n      // @ts-ignore\n      trackVisibility,\n      // @ts-ignore\n      delay\n    }, fallbackInView);\n    return () => {\n      if (unobserve) {\n        unobserve();\n      }\n    };\n  }, // We break the rule here, because we aren't including the actual `threshold` variable\n  // eslint-disable-next-line react-hooks/exhaustive-deps\n  [// If the threshold is an array, convert it to a string, so it won't change between renders.\n  // eslint-disable-next-line react-hooks/exhaustive-deps\n  Array.isArray(threshold) ? threshold.toString() : threshold, ref, root, rootMargin, triggerOnce, skip, trackVisibility, fallbackInView, delay]);\n  const entryTarget = (_state$entry = state.entry) == null ? void 0 : _state$entry.target;\n  const previousEntryTarget = react__WEBPACK_IMPORTED_MODULE_0__.useRef();\n\n  if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {\n    // If we don't have a node ref, then reset the state (unless the hook is set to only `triggerOnce` or `skip`)\n    // This ensures we correctly reflect the current state - If you aren't observing anything, then nothing is inView\n    previousEntryTarget.current = entryTarget;\n    setState({\n      inView: !!initialInView,\n      entry: undefined\n    });\n  }\n\n  const result = [setRef, state.inView, state.entry]; // Support object destructuring, by adding the specific values.\n\n  result.ref = result[0];\n  result.inView = result[1];\n  result.entry = result[2];\n  return result;\n}\n\n\n//# sourceMappingURL=react-intersection-observer.modern.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyL3JlYWN0LWludGVyc2VjdGlvbi1vYnNlcnZlci5tb2Rlcm4ubWpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQStCOztBQUUvQjtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyx1QkFBdUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxjQUFjLElBQUksR0FBRyx3REFBd0Q7QUFDN0UsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtSEFBbUg7O0FBRW5IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSyxZQUFZOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQjtBQUNsQjtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQkFBMkI7O0FBRS9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVSxTQUFTOztBQUVuQjtBQUNBO0FBQ0EsRUFBRSxHQUFHLG9CQUFvQjtBQUN6QixnQkFBZ0IsSUFBSTtBQUNwQixhQUFhLDBCQUEwQixPQUFPLEdBQUc7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVUsU0FBUzs7QUFFbkI7QUFDQSw0QkFBNEIsa0RBQWtEO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLHFCQUFxQiw0Q0FBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUEsV0FBVyxnREFBbUI7QUFDOUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QjtBQUNBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCLGNBQWMsMEJBQTBCLE9BQU8sR0FBRztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQSx3QkFBd0IsMkNBQWM7QUFDdEMsbUJBQW1CLHlDQUFZO0FBQy9CLDRCQUE0QiwyQ0FBYztBQUMxQztBQUNBO0FBQ0EsR0FBRyxHQUFHO0FBQ047O0FBRUE7QUFDQSxFQUFFLDRDQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHlDQUFZOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTZEO0FBQzdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1wb3J0Zm9saW8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyL3JlYWN0LWludGVyc2VjdGlvbi1vYnNlcnZlci5tb2Rlcm4ubWpzPzY1ODQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICB2YXIgdGFyZ2V0ID0ge307XG4gIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgdmFyIGtleSwgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3Qgb2JzZXJ2ZXJNYXAgPSBuZXcgTWFwKCk7XG5jb25zdCBSb290SWRzID0gbmV3IFdlYWtNYXAoKTtcbmxldCByb290SWQgPSAwO1xubGV0IHVuc3VwcG9ydGVkVmFsdWUgPSB1bmRlZmluZWQ7XG4vKipcclxuICogV2hhdCBzaG91bGQgYmUgdGhlIGRlZmF1bHQgYmVoYXZpb3IgaWYgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIGlzIHVuc3VwcG9ydGVkP1xyXG4gKiBJZGVhbGx5IHRoZSBwb2x5ZmlsbCBoYXMgYmVlbiBsb2FkZWQsIHlvdSBjYW4gaGF2ZSB0aGUgZm9sbG93aW5nIGhhcHBlbjpcclxuICogLSBgdW5kZWZpbmVkYDogVGhyb3cgYW4gZXJyb3JcclxuICogLSBgdHJ1ZWAgb3IgYGZhbHNlYDogU2V0IHRoZSBgaW5WaWV3YCB2YWx1ZSB0byB0aGlzIHJlZ2FyZGxlc3Mgb2YgaW50ZXJzZWN0aW9uIHN0YXRlXHJcbiAqICoqL1xuXG5mdW5jdGlvbiBkZWZhdWx0RmFsbGJhY2tJblZpZXcoaW5WaWV3KSB7XG4gIHVuc3VwcG9ydGVkVmFsdWUgPSBpblZpZXc7XG59XG4vKipcclxuICogR2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIHRoZSByb290IGVsZW1lbnRcclxuICogQHBhcmFtIHJvb3RcclxuICovXG5cbmZ1bmN0aW9uIGdldFJvb3RJZChyb290KSB7XG4gIGlmICghcm9vdCkgcmV0dXJuICcwJztcbiAgaWYgKFJvb3RJZHMuaGFzKHJvb3QpKSByZXR1cm4gUm9vdElkcy5nZXQocm9vdCk7XG4gIHJvb3RJZCArPSAxO1xuICBSb290SWRzLnNldChyb290LCByb290SWQudG9TdHJpbmcoKSk7XG4gIHJldHVybiBSb290SWRzLmdldChyb290KTtcbn1cbi8qKlxyXG4gKiBDb252ZXJ0IHRoZSBvcHRpb25zIHRvIGEgc3RyaW5nIElkLCBiYXNlZCBvbiB0aGUgdmFsdWVzLlxyXG4gKiBFbnN1cmVzIHdlIGNhbiByZXVzZSB0aGUgc2FtZSBvYnNlcnZlciB3aGVuIG9ic2VydmluZyBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG9wdGlvbnMuXHJcbiAqIEBwYXJhbSBvcHRpb25zXHJcbiAqL1xuXG5cbmZ1bmN0aW9uIG9wdGlvbnNUb0lkKG9wdGlvbnMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpLnNvcnQoKS5maWx0ZXIoa2V5ID0+IG9wdGlvbnNba2V5XSAhPT0gdW5kZWZpbmVkKS5tYXAoa2V5ID0+IHtcbiAgICByZXR1cm4gYCR7a2V5fV8ke2tleSA9PT0gJ3Jvb3QnID8gZ2V0Um9vdElkKG9wdGlvbnMucm9vdCkgOiBvcHRpb25zW2tleV19YDtcbiAgfSkudG9TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucykge1xuICAvLyBDcmVhdGUgYSB1bmlxdWUgSUQgZm9yIHRoaXMgb2JzZXJ2ZXIgaW5zdGFuY2UsIGJhc2VkIG9uIHRoZSByb290LCByb290IG1hcmdpbiBhbmQgdGhyZXNob2xkLlxuICBsZXQgaWQgPSBvcHRpb25zVG9JZChvcHRpb25zKTtcbiAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJNYXAuZ2V0KGlkKTtcblxuICBpZiAoIWluc3RhbmNlKSB7XG4gICAgLy8gQ3JlYXRlIGEgbWFwIG9mIGVsZW1lbnRzIHRoaXMgb2JzZXJ2ZXIgaXMgZ29pbmcgdG8gb2JzZXJ2ZS4gRWFjaCBlbGVtZW50IGhhcyBhIGxpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgc2hvdWxkIGJlIHRyaWdnZXJlZCwgb25jZSBpdCBjb21lcyBpbnRvIHZpZXcuXG4gICAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwKCk7XG4gICAgbGV0IHRocmVzaG9sZHM7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICB2YXIgX2VsZW1lbnRzJGdldDtcblxuICAgICAgICAvLyBXaGlsZSBpdCB3b3VsZCBiZSBuaWNlIGlmIHlvdSBjb3VsZCBqdXN0IGxvb2sgYXQgaXNJbnRlcnNlY3RpbmcgdG8gZGV0ZXJtaW5lIGlmIHRoZSBjb21wb25lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydCwgYnJvd3NlcnMgY2FuJ3QgYWdyZWUgb24gaG93IHRvIHVzZSBpdC5cbiAgICAgICAgLy8gLUZpcmVmb3ggaWdub3JlcyBgdGhyZXNob2xkYCB3aGVuIGNvbnNpZGVyaW5nIGBpc0ludGVyc2VjdGluZ2AsIHNvIGl0IHdpbGwgbmV2ZXIgYmUgZmFsc2UgYWdhaW4gaWYgYHRocmVzaG9sZGAgaXMgPiAwXG4gICAgICAgIGNvbnN0IGluVmlldyA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIHRocmVzaG9sZHMuc29tZSh0aHJlc2hvbGQgPT4gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPj0gdGhyZXNob2xkKTsgLy8gQHRzLWlnbm9yZSBzdXBwb3J0IEludGVyc2VjdGlvbk9ic2VydmVyIHYyXG5cbiAgICAgICAgaWYgKG9wdGlvbnMudHJhY2tWaXNpYmlsaXR5ICYmIHR5cGVvZiBlbnRyeS5pc1Zpc2libGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gVGhlIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IEludGVyc2VjdGlvbiBPYnNlcnZlciB2MiwgZmFsbGluZyBiYWNrIHRvIHYxIGJlaGF2aW9yLlxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBlbnRyeS5pc1Zpc2libGUgPSBpblZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICAoX2VsZW1lbnRzJGdldCA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpKSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnRzJGdldC5mb3JFYWNoKGNhbGxiYWNrID0+IHtcbiAgICAgICAgICBjYWxsYmFjayhpblZpZXcsIGVudHJ5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LCBvcHRpb25zKTsgLy8gRW5zdXJlIHdlIGhhdmUgYSB2YWxpZCB0aHJlc2hvbGRzIGFycmF5LiBJZiBub3QsIHVzZSB0aGUgdGhyZXNob2xkIGZyb20gdGhlIG9wdGlvbnNcblxuICAgIHRocmVzaG9sZHMgPSBvYnNlcnZlci50aHJlc2hvbGRzIHx8IChBcnJheS5pc0FycmF5KG9wdGlvbnMudGhyZXNob2xkKSA/IG9wdGlvbnMudGhyZXNob2xkIDogW29wdGlvbnMudGhyZXNob2xkIHx8IDBdKTtcbiAgICBpbnN0YW5jZSA9IHtcbiAgICAgIGlkLFxuICAgICAgb2JzZXJ2ZXIsXG4gICAgICBlbGVtZW50c1xuICAgIH07XG4gICAgb2JzZXJ2ZXJNYXAuc2V0KGlkLCBpbnN0YW5jZSk7XG4gIH1cblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG4vKipcclxuICogQHBhcmFtIGVsZW1lbnQgLSBET00gRWxlbWVudCB0byBvYnNlcnZlXHJcbiAqIEBwYXJhbSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHRyaWdnZXIgd2hlbiBpbnRlcnNlY3Rpb24gc3RhdHVzIGNoYW5nZXNcclxuICogQHBhcmFtIG9wdGlvbnMgLSBJbnRlcnNlY3Rpb24gT2JzZXJ2ZXIgb3B0aW9uc1xyXG4gKiBAcGFyYW0gZmFsbGJhY2tJblZpZXcgLSBGYWxsYmFjayBpblZpZXcgdmFsdWUuXHJcbiAqIEByZXR1cm4gRnVuY3Rpb24gLSBDbGVhbnVwIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIHRyaWdnZXJlZCB0byB1bnJlZ2lzdGVyIHRoZSBvYnNlcnZlclxyXG4gKi9cblxuXG5mdW5jdGlvbiBvYnNlcnZlKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zID0ge30sIGZhbGxiYWNrSW5WaWV3ID0gdW5zdXBwb3J0ZWRWYWx1ZSkge1xuICBpZiAodHlwZW9mIHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlciA9PT0gJ3VuZGVmaW5lZCcgJiYgZmFsbGJhY2tJblZpZXcgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY2FsbGJhY2soZmFsbGJhY2tJblZpZXcsIHtcbiAgICAgIGlzSW50ZXJzZWN0aW5nOiBmYWxsYmFja0luVmlldyxcbiAgICAgIHRhcmdldDogZWxlbWVudCxcbiAgICAgIGludGVyc2VjdGlvblJhdGlvOiB0eXBlb2Ygb3B0aW9ucy50aHJlc2hvbGQgPT09ICdudW1iZXInID8gb3B0aW9ucy50aHJlc2hvbGQgOiAwLFxuICAgICAgdGltZTogMCxcbiAgICAgIGJvdW5kaW5nQ2xpZW50UmVjdDogYm91bmRzLFxuICAgICAgaW50ZXJzZWN0aW9uUmVjdDogYm91bmRzLFxuICAgICAgcm9vdEJvdW5kczogYm91bmRzXG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHsvLyBOb3RoaW5nIHRvIGNsZWFudXBcbiAgICB9O1xuICB9IC8vIEFuIG9ic2VydmVyIHdpdGggdGhlIHNhbWUgb3B0aW9ucyBjYW4gYmUgcmV1c2VkLCBzbyBsZXRzIHVzZSB0aGlzIGZhY3RcblxuXG4gIGNvbnN0IHtcbiAgICBpZCxcbiAgICBvYnNlcnZlcixcbiAgICBlbGVtZW50c1xuICB9ID0gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucyk7IC8vIFJlZ2lzdGVyIHRoZSBjYWxsYmFjayBsaXN0ZW5lciBmb3IgdGhpcyBlbGVtZW50XG5cbiAgbGV0IGNhbGxiYWNrcyA9IGVsZW1lbnRzLmdldChlbGVtZW50KSB8fCBbXTtcblxuICBpZiAoIWVsZW1lbnRzLmhhcyhlbGVtZW50KSkge1xuICAgIGVsZW1lbnRzLnNldChlbGVtZW50LCBjYWxsYmFja3MpO1xuICB9XG5cbiAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuICByZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCkge1xuICAgIC8vIFJlbW92ZSB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgY2FsbGJhY2sgbGlzdFxuICAgIGNhbGxiYWNrcy5zcGxpY2UoY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spLCAxKTtcblxuICAgIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBObyBtb3JlIGNhbGxiYWNrIGV4aXN0cyBmb3IgZWxlbWVudCwgc28gZGVzdHJveSBpdFxuICAgICAgZWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpO1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICAvLyBObyBtb3JlIGVsZW1lbnRzIGFyZSBiZWluZyBvYnNlcnZlciBieSB0aGlzIGluc3RhbmNlLCBzbyBkZXN0cm95IGl0XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICBvYnNlcnZlck1hcC5kZWxldGUoaWQpO1xuICAgIH1cbiAgfTtcbn1cblxuY29uc3QgX2V4Y2x1ZGVkID0gW1wiY2hpbGRyZW5cIiwgXCJhc1wiLCBcInRyaWdnZXJPbmNlXCIsIFwidGhyZXNob2xkXCIsIFwicm9vdFwiLCBcInJvb3RNYXJnaW5cIiwgXCJvbkNoYW5nZVwiLCBcInNraXBcIiwgXCJ0cmFja1Zpc2liaWxpdHlcIiwgXCJkZWxheVwiLCBcImluaXRpYWxJblZpZXdcIiwgXCJmYWxsYmFja0luVmlld1wiXTtcblxuZnVuY3Rpb24gaXNQbGFpbkNoaWxkcmVuKHByb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgcHJvcHMuY2hpbGRyZW4gIT09ICdmdW5jdGlvbic7XG59XG4vKipcclxuICMjIFJlbmRlciBwcm9wc1xyXG5cbiBUbyB1c2UgdGhlIGA8SW5WaWV3PmAgY29tcG9uZW50LCB5b3UgcGFzcyBpdCBhIGZ1bmN0aW9uLiBJdCB3aWxsIGJlIGNhbGxlZFxyXG4gd2hlbmV2ZXIgdGhlIHN0YXRlIGNoYW5nZXMsIHdpdGggdGhlIG5ldyB2YWx1ZSBvZiBgaW5WaWV3YC4gSW4gYWRkaXRpb24gdG8gdGhlXHJcbiBgaW5WaWV3YCBwcm9wLCBjaGlsZHJlbiBhbHNvIHJlY2VpdmUgYSBgcmVmYCB0aGF0IHNob3VsZCBiZSBzZXQgb24gdGhlXHJcbiBjb250YWluaW5nIERPTSBlbGVtZW50LiBUaGlzIGlzIHRoZSBlbGVtZW50IHRoYXQgdGhlIEludGVyc2VjdGlvbk9ic2VydmVyIHdpbGxcclxuIG1vbml0b3IuXHJcblxuIElmIHlvdSBuZWVkIGl0LCB5b3UgY2FuIGFsc28gYWNjZXNzIHRoZVxyXG4gW2BJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5YF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ludGVyc2VjdGlvbk9ic2VydmVyRW50cnkpXHJcbiBvbiBgZW50cnlgLCBnaXZpbmcgeW91IGFjY2VzcyB0byBhbGwgdGhlIGRldGFpbHMgYWJvdXQgdGhlIGN1cnJlbnQgaW50ZXJzZWN0aW9uXHJcbiBzdGF0ZS5cclxuXG4gYGBganN4XHJcbiBpbXBvcnQgeyBJblZpZXcgfSBmcm9tICdyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXInO1xyXG5cbiBjb25zdCBDb21wb25lbnQgPSAoKSA9PiAoXHJcbiA8SW5WaWV3PlxyXG4geyh7IGluVmlldywgcmVmLCBlbnRyeSB9KSA9PiAoXHJcbiAgICAgIDxkaXYgcmVmPXtyZWZ9PlxyXG4gICAgICAgIDxoMj57YEhlYWRlciBpbnNpZGUgdmlld3BvcnQgJHtpblZpZXd9LmB9PC9oMj5cclxuICAgICAgPC9kaXY+XHJcbiAgICApfVxyXG4gPC9JblZpZXc+XHJcbiApO1xyXG5cbiBleHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XHJcbiBgYGBcclxuXG4gIyMgUGxhaW4gY2hpbGRyZW5cclxuXG4gWW91IGNhbiBwYXNzIGFueSBlbGVtZW50IHRvIHRoZSBgPEluVmlldyAvPmAsIGFuZCBpdCB3aWxsIGhhbmRsZSBjcmVhdGluZyB0aGVcclxuIHdyYXBwaW5nIERPTSBlbGVtZW50LiBBZGQgYSBoYW5kbGVyIHRvIHRoZSBgb25DaGFuZ2VgIG1ldGhvZCwgYW5kIGNvbnRyb2wgdGhlXHJcbiBzdGF0ZSBpbiB5b3VyIG93biBjb21wb25lbnQuIEFueSBleHRyYSBwcm9wcyB5b3UgYWRkIHRvIGA8SW5WaWV3PmAgd2lsbCBiZVxyXG4gcGFzc2VkIHRvIHRoZSBIVE1MIGVsZW1lbnQsIGFsbG93aW5nIHlvdSBzZXQgdGhlIGBjbGFzc05hbWVgLCBgc3R5bGVgLCBldGMuXHJcblxuIGBgYGpzeFxyXG4gaW1wb3J0IHsgSW5WaWV3IH0gZnJvbSAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJztcclxuXG4gY29uc3QgQ29tcG9uZW50ID0gKCkgPT4gKFxyXG4gPEluVmlldyBhcz1cImRpdlwiIG9uQ2hhbmdlPXsoaW5WaWV3LCBlbnRyeSkgPT4gY29uc29sZS5sb2coJ0ludmlldzonLCBpblZpZXcpfT5cclxuIDxoMj5QbGFpbiBjaGlsZHJlbiBhcmUgYWx3YXlzIHJlbmRlcmVkLiBVc2Ugb25DaGFuZ2UgdG8gbW9uaXRvciBzdGF0ZS48L2gyPlxyXG4gPC9JblZpZXc+XHJcbiApO1xyXG5cbiBleHBvcnQgZGVmYXVsdCBDb21wb25lbnQ7XHJcbiBgYGBcclxuICovXG5cblxuY2xhc3MgSW5WaWV3IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5ub2RlID0gbnVsbDtcbiAgICB0aGlzLl91bm9ic2VydmVDYiA9IG51bGw7XG5cbiAgICB0aGlzLmhhbmRsZU5vZGUgPSBub2RlID0+IHtcbiAgICAgIGlmICh0aGlzLm5vZGUpIHtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIG9sZCBvYnNlcnZlciwgYmVmb3JlIHdlIHN0YXJ0IG9ic2VydmluZyBhIG5ldyBlbGVtZW50XG4gICAgICAgIHRoaXMudW5vYnNlcnZlKCk7XG5cbiAgICAgICAgaWYgKCFub2RlICYmICF0aGlzLnByb3BzLnRyaWdnZXJPbmNlICYmICF0aGlzLnByb3BzLnNraXApIHtcbiAgICAgICAgICAvLyBSZXNldCB0aGUgc3RhdGUgaWYgd2UgZ2V0IGEgbmV3IG5vZGUsIGFuZCB3ZSBhcmVuJ3QgaWdub3JpbmcgdXBkYXRlc1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgaW5WaWV3OiAhIXRoaXMucHJvcHMuaW5pdGlhbEluVmlldyxcbiAgICAgICAgICAgIGVudHJ5OiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLm5vZGUgPSBub2RlID8gbm9kZSA6IG51bGw7XG4gICAgICB0aGlzLm9ic2VydmVOb2RlKCk7XG4gICAgfTtcblxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlID0gKGluVmlldywgZW50cnkpID0+IHtcbiAgICAgIGlmIChpblZpZXcgJiYgdGhpcy5wcm9wcy50cmlnZ2VyT25jZSkge1xuICAgICAgICAvLyBJZiBgdHJpZ2dlck9uY2VgIGlzIHRydWUsIHdlIHNob3VsZCBzdG9wIG9ic2VydmluZyB0aGUgZWxlbWVudC5cbiAgICAgICAgdGhpcy51bm9ic2VydmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1BsYWluQ2hpbGRyZW4odGhpcy5wcm9wcykpIHtcbiAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgU3RhdGUsIHNvIHdlIGNhbiBwYXNzIGl0IHRvIHRoZSBjaGlsZHJlbiBpbiB0aGUgbmV4dCByZW5kZXIgdXBkYXRlXG4gICAgICAgIC8vIFRoZXJlJ3Mgbm8gcmVhc29uIHRvIHVwZGF0ZSB0aGUgc3RhdGUgZm9yIHBsYWluIGNoaWxkcmVuLCBzaW5jZSBpdCdzIG5vdCB1c2VkIGluIHRoZSByZW5kZXJpbmcuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGluVmlldyxcbiAgICAgICAgICBlbnRyeVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgaXMgYWN0aXZlbHkgbGlzdGVuaW5nIGZvciBvbkNoYW5nZSwgYWx3YXlzIHRyaWdnZXIgaXRcbiAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpblZpZXcsIGVudHJ5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluVmlldzogISFwcm9wcy5pbml0aWFsSW5WaWV3LFxuICAgICAgZW50cnk6IHVuZGVmaW5lZFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgLy8gSWYgYSBJbnRlcnNlY3Rpb25PYnNlcnZlciBvcHRpb24gY2hhbmdlZCwgcmVpbml0IHRoZSBvYnNlcnZlclxuICAgIGlmIChwcmV2UHJvcHMucm9vdE1hcmdpbiAhPT0gdGhpcy5wcm9wcy5yb290TWFyZ2luIHx8IHByZXZQcm9wcy5yb290ICE9PSB0aGlzLnByb3BzLnJvb3QgfHwgcHJldlByb3BzLnRocmVzaG9sZCAhPT0gdGhpcy5wcm9wcy50aHJlc2hvbGQgfHwgcHJldlByb3BzLnNraXAgIT09IHRoaXMucHJvcHMuc2tpcCB8fCBwcmV2UHJvcHMudHJhY2tWaXNpYmlsaXR5ICE9PSB0aGlzLnByb3BzLnRyYWNrVmlzaWJpbGl0eSB8fCBwcmV2UHJvcHMuZGVsYXkgIT09IHRoaXMucHJvcHMuZGVsYXkpIHtcbiAgICAgIHRoaXMudW5vYnNlcnZlKCk7XG4gICAgICB0aGlzLm9ic2VydmVOb2RlKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy51bm9ic2VydmUoKTtcbiAgICB0aGlzLm5vZGUgPSBudWxsO1xuICB9XG5cbiAgb2JzZXJ2ZU5vZGUoKSB7XG4gICAgaWYgKCF0aGlzLm5vZGUgfHwgdGhpcy5wcm9wcy5za2lwKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgdGhyZXNob2xkLFxuICAgICAgcm9vdCxcbiAgICAgIHJvb3RNYXJnaW4sXG4gICAgICB0cmFja1Zpc2liaWxpdHksXG4gICAgICBkZWxheSxcbiAgICAgIGZhbGxiYWNrSW5WaWV3XG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5fdW5vYnNlcnZlQ2IgPSBvYnNlcnZlKHRoaXMubm9kZSwgdGhpcy5oYW5kbGVDaGFuZ2UsIHtcbiAgICAgIHRocmVzaG9sZCxcbiAgICAgIHJvb3QsXG4gICAgICByb290TWFyZ2luLFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdHJhY2tWaXNpYmlsaXR5LFxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZGVsYXlcbiAgICB9LCBmYWxsYmFja0luVmlldyk7XG4gIH1cblxuICB1bm9ic2VydmUoKSB7XG4gICAgaWYgKHRoaXMuX3Vub2JzZXJ2ZUNiKSB7XG4gICAgICB0aGlzLl91bm9ic2VydmVDYigpO1xuXG4gICAgICB0aGlzLl91bm9ic2VydmVDYiA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICghaXNQbGFpbkNoaWxkcmVuKHRoaXMucHJvcHMpKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGluVmlldyxcbiAgICAgICAgZW50cnlcbiAgICAgIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW4oe1xuICAgICAgICBpblZpZXcsXG4gICAgICAgIGVudHJ5LFxuICAgICAgICByZWY6IHRoaXMuaGFuZGxlTm9kZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgX3RoaXMkcHJvcHMgPSB0aGlzLnByb3BzLFxuICAgICAgICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgYXNcbiAgICB9ID0gX3RoaXMkcHJvcHMsXG4gICAgICAgICAgcHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShfdGhpcyRwcm9wcywgX2V4Y2x1ZGVkKTtcblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGFzIHx8ICdkaXYnLCBfZXh0ZW5kcyh7XG4gICAgICByZWY6IHRoaXMuaGFuZGxlTm9kZVxuICAgIH0sIHByb3BzKSwgY2hpbGRyZW4pO1xuICB9XG5cbn1cblxuLyoqXHJcbiAqIFJlYWN0IEhvb2tzIG1ha2UgaXQgZWFzeSB0byBtb25pdG9yIHRoZSBgaW5WaWV3YCBzdGF0ZSBvZiB5b3VyIGNvbXBvbmVudHMuIENhbGxcclxuICogdGhlIGB1c2VJblZpZXdgIGhvb2sgd2l0aCB0aGUgKG9wdGlvbmFsKSBbb3B0aW9uc10oI29wdGlvbnMpIHlvdSBuZWVkLiBJdCB3aWxsXHJcbiAqIHJldHVybiBhbiBhcnJheSBjb250YWluaW5nIGEgYHJlZmAsIHRoZSBgaW5WaWV3YCBzdGF0dXMgYW5kIHRoZSBjdXJyZW50XHJcbiAqIFtgZW50cnlgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeSkuXHJcbiAqIEFzc2lnbiB0aGUgYHJlZmAgdG8gdGhlIERPTSBlbGVtZW50IHlvdSB3YW50IHRvIG1vbml0b3IsIGFuZCB0aGUgaG9vayB3aWxsXHJcbiAqIHJlcG9ydCB0aGUgc3RhdHVzLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgYGBqc3hcclxuICogaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuICogaW1wb3J0IHsgdXNlSW5WaWV3IH0gZnJvbSAncmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyJztcclxuICpcclxuICogY29uc3QgQ29tcG9uZW50ID0gKCkgPT4ge1xyXG4gKiAgIGNvbnN0IHsgcmVmLCBpblZpZXcsIGVudHJ5IH0gPSB1c2VJblZpZXcoe1xyXG4gKiAgICAgICB0aHJlc2hvbGQ6IDAsXHJcbiAqICAgfSk7XHJcbiAqXHJcbiAqICAgcmV0dXJuIChcclxuICogICAgIDxkaXYgcmVmPXtyZWZ9PlxyXG4gKiAgICAgICA8aDI+e2BIZWFkZXIgaW5zaWRlIHZpZXdwb3J0ICR7aW5WaWV3fS5gfTwvaDI+XHJcbiAqICAgICA8L2Rpdj5cclxuICogICApO1xyXG4gKiB9O1xyXG4gKiBgYGBcclxuICovXG5cbmZ1bmN0aW9uIHVzZUluVmlldyh7XG4gIHRocmVzaG9sZCxcbiAgZGVsYXksXG4gIHRyYWNrVmlzaWJpbGl0eSxcbiAgcm9vdE1hcmdpbixcbiAgcm9vdCxcbiAgdHJpZ2dlck9uY2UsXG4gIHNraXAsXG4gIGluaXRpYWxJblZpZXcsXG4gIGZhbGxiYWNrSW5WaWV3LFxuICBvbkNoYW5nZVxufSA9IHt9KSB7XG4gIHZhciBfc3RhdGUkZW50cnk7XG5cbiAgY29uc3QgW3JlZiwgc2V0UmVmXSA9IFJlYWN0LnVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBjYWxsYmFjayA9IFJlYWN0LnVzZVJlZigpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlKHtcbiAgICBpblZpZXc6ICEhaW5pdGlhbEluVmlldyxcbiAgICBlbnRyeTogdW5kZWZpbmVkXG4gIH0pOyAvLyBTdG9yZSB0aGUgb25DaGFuZ2UgY2FsbGJhY2sgaW4gYSBgcmVmYCwgc28gd2UgY2FuIGFjY2VzcyB0aGUgbGF0ZXN0IGluc3RhbmNlXG4gIC8vIGluc2lkZSB0aGUgYHVzZUVmZmVjdGAsIGJ1dCB3aXRob3V0IHRyaWdnZXJpbmcgYSByZXJlbmRlci5cblxuICBjYWxsYmFjay5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gRW5zdXJlIHdlIGhhdmUgbm9kZSByZWYsIGFuZCB0aGF0IHdlIHNob3VsZG4ndCBza2lwIG9ic2VydmluZ1xuICAgIGlmIChza2lwIHx8ICFyZWYpIHJldHVybjtcbiAgICBsZXQgdW5vYnNlcnZlO1xuICAgIHVub2JzZXJ2ZSA9IG9ic2VydmUocmVmLCAoaW5WaWV3LCBlbnRyeSkgPT4ge1xuICAgICAgc2V0U3RhdGUoe1xuICAgICAgICBpblZpZXcsXG4gICAgICAgIGVudHJ5XG4gICAgICB9KTtcbiAgICAgIGlmIChjYWxsYmFjay5jdXJyZW50KSBjYWxsYmFjay5jdXJyZW50KGluVmlldywgZW50cnkpO1xuXG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgdHJpZ2dlck9uY2UgJiYgdW5vYnNlcnZlKSB7XG4gICAgICAgIC8vIElmIGl0IHNob3VsZCBvbmx5IHRyaWdnZXIgb25jZSwgdW5vYnNlcnZlIHRoZSBlbGVtZW50IGFmdGVyIGl0J3MgaW5WaWV3XG4gICAgICAgIHVub2JzZXJ2ZSgpO1xuICAgICAgICB1bm9ic2VydmUgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSwge1xuICAgICAgcm9vdCxcbiAgICAgIHJvb3RNYXJnaW4sXG4gICAgICB0aHJlc2hvbGQsXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0cmFja1Zpc2liaWxpdHksXG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBkZWxheVxuICAgIH0sIGZhbGxiYWNrSW5WaWV3KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHVub2JzZXJ2ZSkge1xuICAgICAgICB1bm9ic2VydmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCAvLyBXZSBicmVhayB0aGUgcnVsZSBoZXJlLCBiZWNhdXNlIHdlIGFyZW4ndCBpbmNsdWRpbmcgdGhlIGFjdHVhbCBgdGhyZXNob2xkYCB2YXJpYWJsZVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIFsvLyBJZiB0aGUgdGhyZXNob2xkIGlzIGFuIGFycmF5LCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nLCBzbyBpdCB3b24ndCBjaGFuZ2UgYmV0d2VlbiByZW5kZXJzLlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIEFycmF5LmlzQXJyYXkodGhyZXNob2xkKSA/IHRocmVzaG9sZC50b1N0cmluZygpIDogdGhyZXNob2xkLCByZWYsIHJvb3QsIHJvb3RNYXJnaW4sIHRyaWdnZXJPbmNlLCBza2lwLCB0cmFja1Zpc2liaWxpdHksIGZhbGxiYWNrSW5WaWV3LCBkZWxheV0pO1xuICBjb25zdCBlbnRyeVRhcmdldCA9IChfc3RhdGUkZW50cnkgPSBzdGF0ZS5lbnRyeSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9zdGF0ZSRlbnRyeS50YXJnZXQ7XG4gIGNvbnN0IHByZXZpb3VzRW50cnlUYXJnZXQgPSBSZWFjdC51c2VSZWYoKTtcblxuICBpZiAoIXJlZiAmJiBlbnRyeVRhcmdldCAmJiAhdHJpZ2dlck9uY2UgJiYgIXNraXAgJiYgcHJldmlvdXNFbnRyeVRhcmdldC5jdXJyZW50ICE9PSBlbnRyeVRhcmdldCkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYSBub2RlIHJlZiwgdGhlbiByZXNldCB0aGUgc3RhdGUgKHVubGVzcyB0aGUgaG9vayBpcyBzZXQgdG8gb25seSBgdHJpZ2dlck9uY2VgIG9yIGBza2lwYClcbiAgICAvLyBUaGlzIGVuc3VyZXMgd2UgY29ycmVjdGx5IHJlZmxlY3QgdGhlIGN1cnJlbnQgc3RhdGUgLSBJZiB5b3UgYXJlbid0IG9ic2VydmluZyBhbnl0aGluZywgdGhlbiBub3RoaW5nIGlzIGluVmlld1xuICAgIHByZXZpb3VzRW50cnlUYXJnZXQuY3VycmVudCA9IGVudHJ5VGFyZ2V0O1xuICAgIHNldFN0YXRlKHtcbiAgICAgIGluVmlldzogISFpbml0aWFsSW5WaWV3LFxuICAgICAgZW50cnk6IHVuZGVmaW5lZFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gW3NldFJlZiwgc3RhdGUuaW5WaWV3LCBzdGF0ZS5lbnRyeV07IC8vIFN1cHBvcnQgb2JqZWN0IGRlc3RydWN0dXJpbmcsIGJ5IGFkZGluZyB0aGUgc3BlY2lmaWMgdmFsdWVzLlxuXG4gIHJlc3VsdC5yZWYgPSByZXN1bHRbMF07XG4gIHJlc3VsdC5pblZpZXcgPSByZXN1bHRbMV07XG4gIHJlc3VsdC5lbnRyeSA9IHJlc3VsdFsyXTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IHsgSW5WaWV3LCBkZWZhdWx0RmFsbGJhY2tJblZpZXcsIG9ic2VydmUsIHVzZUluVmlldyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVhY3QtaW50ZXJzZWN0aW9uLW9ic2VydmVyLm1vZGVybi5tanMubWFwXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-intersection-observer/react-intersection-observer.modern.mjs\n");

/***/ })

};
;