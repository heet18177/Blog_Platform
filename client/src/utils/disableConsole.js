// Utility to disable console logs in production or when requested
// console.log = function () {};
// console.warn = function () {};
// console.error = function () {};

// Explicitly disabling console.log as per request
console.log = () => {};
console.warn = () => {};
// Keeping console.error for critical issues if needed, or disable it too if "all" implies strictly everything.
// The user asked to hide "all console.logs". Usually this means 'log'.
// But I will disable 'log' and 'warn'. Leaving error active is safer, but I'll add 'error' commented out or active depending on strictness.
// Let's hide log and warn.
