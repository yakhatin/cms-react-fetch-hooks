(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CmsFetchData = {}, global.React));
}(this, (function (exports, React) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    /**
     * REST запрос
     * @param restName - наименование route из api
     * @param method - тип запроса (GET, POST, PUT, DELETE)
     * @param data - данные для rest запроса
     * @param dataType - тип тела запроса (JSON, FormData)
     */
    const fetchData = async (restName, method, data, dataType = 'JSON') => {
        let additionalLink = '';
        let body;
        const headers = new Headers();
        headers.append('accept', 'application/json');
        if (typeof data === 'string' || typeof data === 'number') {
            additionalLink = `${data}`;
        }
        if (typeof data !== 'string' && typeof data === 'object') {
            if (dataType === 'JSON') {
                headers.append('content-type', 'application/json');
                body = JSON.stringify(data);
            }
            if (dataType === 'FormData') {
                body = data;
            }
        }
        try {
            const response = await fetch(`${restName}${additionalLink}`, {
                method,
                body,
                headers,
                credentials: 'same-origin',
            });
            if (response.ok === false) {
                if (response.status === 401) {
                    throw new Error('Ошибка авторизации пользователя.');
                }
                else {
                    throw new Error(`${response.url} (${response.status})`);
                }
            }
            try {
                const json = await response.json();
                return json;
            }
            catch (err) {
                throw new Error(err);
            }
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                message: err,
                data: null,
            };
        }
    };

    const defaultHook = (params) => {
        const [loading, setLoading] = React.useState(false);
        const [data, setData] = React.useState(params.defaultValue);
        const [errorMessage, setErrorMessage] = React.useState(null);
        const getData = async () => {
            setLoading(true);
            const result = await fetchData(params.rest.name, params.rest.method, params.rest.body);
            if (result.success && result.data) {
                setData(result.data);
            }
            else if (result.success === false) {
                setErrorMessage(result.message);
            }
            setLoading(false);
        };
        React.useEffect(() => {
            getData();
        }, [params.rest.body]);
        return {
            data,
            error: errorMessage,
            loading,
        };
    };

    function t(t){for(var n=arguments.length,r=Array(n>1?n-1:0),e=1;e<n;e++)r[e-1]=arguments[e];{var i=Y[t],o=i?"function"==typeof i?i.apply(null,r):i:"unknown error nr: "+t;throw Error("[Immer] "+o)}}function n(t){return !!t&&!!t[Q]}function r(t){return !!t&&(function(t){if(!t||"object"!=typeof t)return !1;var n=Object.getPrototypeOf(t);return !n||n===Object.prototype}(t)||Array.isArray(t)||!!t[L]||!!t.constructor[L]||s(t)||v(t))}function i(t,n,r){void 0===r&&(r=!1),0===o(t)?(r?Object.keys:Z)(t).forEach((function(e){r&&"symbol"==typeof e||n(e,t[e],t);})):t.forEach((function(r,e){return n(e,r,t)}));}function o(t){var n=t[Q];return n?n.i>3?n.i-4:n.i:Array.isArray(t)?1:s(t)?2:v(t)?3:0}function u(t,n){return 2===o(t)?t.has(n):Object.prototype.hasOwnProperty.call(t,n)}function a(t,n){return 2===o(t)?t.get(n):t[n]}function f(t,n,r){var e=o(t);2===e?t.set(n,r):3===e?(t.delete(n),t.add(r)):t[n]=r;}function c(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n}function s(t){return X&&t instanceof Map}function v(t){return q&&t instanceof Set}function p(t){return t.o||t.t}function l(t){if(Array.isArray(t))return Array.prototype.slice.call(t);var n=tt(t);delete n[Q];for(var r=Z(n),e=0;e<r.length;e++){var i=r[e],o=n[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(n[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:t[i]});}return Object.create(Object.getPrototypeOf(t),n)}function d(t,e){return void 0===e&&(e=!1),y(t)||n(t)||!r(t)?t:(o(t)>1&&(t.set=t.add=t.clear=t.delete=h),Object.freeze(t),e&&i(t,(function(t,n){return d(n,!0)}),!0),t)}function h(){t(2);}function y(t){return null==t||"object"!=typeof t||Object.isFrozen(t)}function b(n){var r=nt[n];return r||t(18,n),r}function _(){return U||t(0),U}function j(t,n){n&&(b("Patches"),t.u=[],t.s=[],t.v=n);}function g(t){w(t),t.p.forEach(S),t.p=null;}function w(t){t===U&&(U=t.l);}function O(t){return U={p:[],l:U,h:t,m:!0,_:0}}function S(t){var n=t[Q];0===n.i||1===n.i?n.j():n.g=!0;}function P(n,e){e._=e.p.length;var i=e.p[0],o=void 0!==n&&n!==i;return e.h.O||b("ES5").S(e,n,o),o?(i[Q].P&&(g(e),t(4)),r(n)&&(n=M(e,n),e.l||x(e,n)),e.u&&b("Patches").M(i[Q],n,e.u,e.s)):n=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),n!==H?n:void 0}function M(t,n,r){if(y(n))return n;var e=n[Q];if(!e)return i(n,(function(i,o){return A(t,e,n,i,o,r)}),!0),n;if(e.A!==t)return n;if(!e.P)return x(t,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(n,i){return A(t,e,o,n,i,r)})),x(t,o,!1),r&&t.u&&b("Patches").R(e,r,t.u,t.s);}return e.o}function A(e,i,o,a,c,s){if(c===o&&t(5),n(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!n(v))return;e.m=!1;}if(r(c)&&!y(c)){if(!e.h.N&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(t,n,r){void 0===r&&(r=!1),t.h.N&&t.m&&d(n,r);}function z(t,n){var r=t[Q];return (r?p(r):t)[n]}function I(t,n){if(n in t)for(var r=Object.getPrototypeOf(t);r;){var e=Object.getOwnPropertyDescriptor(r,n);if(e)return e;r=Object.getPrototypeOf(r);}}function k(t){t.P||(t.P=!0,t.l&&k(t.l));}function E(t){t.o||(t.o=l(t.t));}function R(t,n,r){var e=s(n)?b("MapSet").T(n,r):v(n)?b("MapSet").F(n,r):t.O?function(t,n){var r=Array.isArray(t),e={i:r?1:0,A:n?n.A:_(),P:!1,I:!1,D:{},l:n,t:t,k:null,o:null,j:null,C:!1},i=e,o=rt;r&&(i=[e],o=et);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(n,r):b("ES5").J(n,r);return (r?r.A:_()).p.push(e),e}function D(e){return n(e)||t(22,e),function t(n){if(!r(n))return n;var e,u=n[Q],c=o(n);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=N(n,c),u.I=!1;}else e=N(n,c);return i(e,(function(n,r){u&&a(u.t,n)===r||f(e,n,t(r));})),3===c?new Set(e):e}(e)}function N(t,n){switch(n){case 2:return new Map(t);case 3:return Array.from(t)}return l(t)}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(t){return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+t},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(t){return "Cannot apply patch, path doesn't resolve: "+t},16:'Sets cannot have "replace" patches.',17:function(t){return "Unsupported patch operation: "+t},18:function(t){return "The plugin for '"+t+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+t+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(t){return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+t+"'"},22:function(t){return "'current' expects a draft, got: "+t},23:function(t){return "'original' expects a draft, got: "+t},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames,tt=Object.getOwnPropertyDescriptors||function(t){var n={};return Z(t).forEach((function(r){n[r]=Object.getOwnPropertyDescriptor(t,r);})),n},nt={},rt={get:function(t,n){if(n===Q)return t;var e=p(t);if(!u(e,n))return function(t,n,r){var e,i=I(n,r);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(t.k):void 0}(t,e,n);var i=e[n];return t.I||!r(i)?i:i===z(t.t,n)?(E(t),t.o[n]=R(t.A.h,i,t)):i},has:function(t,n){return n in p(t)},ownKeys:function(t){return Reflect.ownKeys(p(t))},set:function(t,n,r){var e=I(p(t),n);if(null==e?void 0:e.set)return e.set.call(t.k,r),!0;if(!t.P){var i=z(p(t),n),o=null==i?void 0:i[Q];if(o&&o.t===r)return t.o[n]=r,t.D[n]=!1,!0;if(c(r,i)&&(void 0!==r||u(t.t,n)))return !0;E(t),k(t);}return t.o[n]=r,t.D[n]=!0,!0},deleteProperty:function(t,n){return void 0!==z(t.t,n)||n in t.t?(t.D[n]=!1,E(t),k(t)):delete t.D[n],t.o&&delete t.o[n],!0},getOwnPropertyDescriptor:function(t,n){var r=p(t),e=Reflect.getOwnPropertyDescriptor(r,n);return e?{writable:!0,configurable:1!==t.i||"length"!==n,enumerable:e.enumerable,value:r[n]}:e},defineProperty:function(){t(11);},getPrototypeOf:function(t){return Object.getPrototypeOf(t.t)},setPrototypeOf:function(){t(12);}},et={};i(rt,(function(t,n){et[t]=function(){return arguments[0]=arguments[0][0],n.apply(this,arguments)};})),et.deleteProperty=function(n,r){return isNaN(parseInt(r))&&t(13),rt.deleteProperty.call(this,n[0],r)},et.set=function(n,r,e){return "length"!==r&&isNaN(parseInt(r))&&t(14),rt.set.call(this,n[0],r,e,n[0])};var it=function(){function e(t){this.O=B,this.N=!0,"boolean"==typeof(null==t?void 0:t.useProxies)&&this.setUseProxies(t.useProxies),"boolean"==typeof(null==t?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),this.produce=this.produce.bind(this),this.produceWithPatches=this.produceWithPatches.bind(this);}var i=e.prototype;return i.produce=function(n,e,i){if("function"==typeof n&&"function"!=typeof e){var o=e;e=n;var u=this;return function(t){var n=this;void 0===t&&(t=o);for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];return u.produce(t,(function(t){var r;return (r=e).call.apply(r,[n,t].concat(i))}))}}var a;if("function"!=typeof e&&t(6),void 0!==i&&"function"!=typeof i&&t(7),r(n)){var f=O(this),c=R(this,n,void 0),s=!0;try{a=e(c),s=!1;}finally{s?g(f):w(f);}return "undefined"!=typeof Promise&&a instanceof Promise?a.then((function(t){return j(f,i),P(t,f)}),(function(t){throw g(f),t})):(j(f,i),P(a,f))}if(!n||"object"!=typeof n){if((a=e(n))===H)return;return void 0===a&&(a=n),this.N&&d(a,!0),a}t(21,n);},i.produceWithPatches=function(t,n){var r,e,i=this;return "function"==typeof t?function(n){for(var r=arguments.length,e=Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];return i.produceWithPatches(n,(function(n){return t.apply(void 0,[n].concat(e))}))}:[this.produce(t,n,(function(t,n){r=t,e=n;})),r,e]},i.createDraft=function(e){r(e)||t(8),n(e)&&(e=D(e));var i=O(this),o=R(this,e,void 0);return o[Q].C=!0,w(i),o},i.finishDraft=function(n,r){var e=n&&n[Q];(e&&e.C||t(9),e.I&&t(10));var i=e.A;return j(i,r),P(void 0,i)},i.setAutoFreeze=function(t){this.N=t;},i.setUseProxies=function(n){n&&!B&&t(20),this.O=n;},i.applyPatches=function(t,r){var e;for(e=r.length-1;e>=0;e--){var i=r[e];if(0===i.path.length&&"replace"===i.op){t=i.value;break}}var o=b("Patches").$;return n(t)?o(t,r):this.produce(t,(function(t){return o(t,r.slice(e+1))}))},e}(),ot=new it,ut=ot.produce;ot.produceWithPatches.bind(ot);ot.setAutoFreeze.bind(ot);ot.setUseProxies.bind(ot);ot.applyPatches.bind(ot);ot.createDraft.bind(ot);ot.finishDraft.bind(ot);

    const fetchDataContextStorageDefaultValues = {
        createAdditionalState: () => { },
        state: {
            catalogs: {
                data: [],
                loading: true,
                setters: {
                    setData: () => { },
                    setLoading: () => { },
                },
            },
            appConfig: {
                data: undefined,
                loading: true,
                setters: {
                    setData: () => { },
                    setLoading: () => { },
                },
            },
        }
    };

    const InitialHooksWrapper = ({ children }) => {
        useCatalogs();
        return children;
    };

    const FetchDataContextStorage = React__default['default'].createContext(fetchDataContextStorageDefaultValues);
    const FetchDataContextStorageWrapper = ({ children }) => {
        const [catalogs, setCatalogs] = React.useState([]);
        const [catalogsLoading, setCatalogsLoading] = React.useState(true);
        const [appConfig, setAppConfig] = React.useState();
        const [appConfigLoading, setAppConfigLoading] = React.useState(true);
        const [additionalState, setAdditionalState] = React.useState({});
        const setDataOfAdditionalState = (key, data) => {
            const nextState = ut(additionalState, (draft) => {
                draft[key].data = data;
            });
            setAdditionalState(nextState);
        };
        const setLoadingOfAdditionalState = (key, value) => {
            const nextState = ut(additionalState, (draft) => {
                draft[key].loading = value;
            });
            setAdditionalState(nextState);
        };
        const createAdditionalState = (key, defaultValue) => {
            if (typeof additionalState[key] === 'undefined') {
                const nextState = ut(additionalState, (draft) => {
                    draft[key] = {
                        data: defaultValue,
                        loading: true,
                        setters: {
                            setData: (v) => setDataOfAdditionalState(key, v),
                            setLoading: (v) => setLoadingOfAdditionalState(key, v),
                        }
                    };
                });
                setAdditionalState(nextState);
            }
        };
        const contextValue = {
            createAdditionalState,
            state: Object.assign({ catalogs: {
                    data: catalogs,
                    loading: catalogsLoading,
                    setters: {
                        setData: setCatalogs,
                        setLoading: setCatalogsLoading,
                    },
                }, appConfig: {
                    data: appConfig,
                    loading: appConfigLoading,
                    setters: {
                        setData: setAppConfig,
                        setLoading: setAppConfigLoading,
                    },
                } }, additionalState)
        };
        return (React__default['default'].createElement(FetchDataContextStorage.Provider, { value: contextValue },
            React__default['default'].createElement(InitialHooksWrapper, null, children)));
    };

    const useFetchContext = (params) => {
        const context = React.useContext(FetchDataContextStorage);
        const [errorMessage, setErrorMessage] = React.useState(null);
        const getData = async () => {
            context.state[params.key].setters.setLoading(true);
            const result = await fetchData(params.rest.name, params.rest.method, params.rest.body);
            if (result.success && result.data) {
                context.state[params.key].setters.setData(result.data);
            }
            else if (result.success === false) {
                setErrorMessage(result.message);
            }
            context.state[params.key].setters.setLoading(false);
        };
        React.useEffect(() => {
            if (context) {
                if (context.state[params.key] && typeof context.state[params.key] === "object") {
                    getData();
                }
                else {
                    context.createAdditionalState(params.key, params.defaultValue);
                }
            }
        }, [params.rest]);
        return {
            data: context && context.state[params.key] ? context.state[params.key].data : params.defaultValue,
            error: errorMessage,
            loading: context && context.state[params.key]
                ? context.state[params.key].loading
                : false,
        };
    };

    const useCatalogs = (body) => defaultHook({
        defaultValue: [],
        rest: {
            name: 'catalogs/list',
            method: 'POST',
            body
        }
    });
    const useCatalogsWithContext = (body) => useFetchContext({
        defaultValue: [],
        rest: {
            name: 'catalogs/list',
            method: 'POST',
            body
        },
        key: 'catalogs'
    });

    exports.FetchDataContextStorage = FetchDataContextStorage;
    exports.FetchDataContextStorageWrapper = FetchDataContextStorageWrapper;
    exports.useCatalogs = useCatalogs;
    exports.useCatalogsWithContext = useCatalogsWithContext;
    exports.useFetchContext = useFetchContext;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.development.js.map
