!function s(o,d,u){function c(t,e){if(!d[t]){if(!o[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(l)return l(t,!0);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}var r=d[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,s,o,d,u)}return d[t].exports}for(var l="function"==typeof require&&require,e=0;e<u.length;e++)c(u[e]);return c}({1:[function(e,t,n){"use strict";e("./navigation")},{"./navigation":2}],2:[function(e,t,n){"use strict";!function(){var e=document.getElementById("weitere-leistungen"),t=document.getElementById("weitere-leistungen-ziel"),n=document.getElementById("weitere-leistungen-dreieck");null!==e&&null!==t&&null!==n&&e.addEventListener("click",function(e){t.classList.contains("hidden")?(t.classList.remove("hidden"),n.classList.remove("rotate-90"),n.classList.add("-rotate-90")):(t.classList.add("hidden"),n.classList.remove("-rotate-90"),n.classList.add("rotate-90"))});var i=document.getElementById("burger"),r=document.getElementById("burger-ziel");null!==i&&null!==r&&i.addEventListener("click",function(e){r.classList.contains("hidden")?r.classList.remove("hidden"):r.classList.add("hidden")})}()},{}]},{},[1]);