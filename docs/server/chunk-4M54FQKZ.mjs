import './polyfills.server.mjs';
import{a as f}from"./chunk-JPJNH6RG.mjs";import{C as p,I as l,N as a,T as h,Y as s,ca as u,g as n,l as o,z as c}from"./chunk-BM5IXIIB.mjs";var m={production:!1,apiUrl:"https://api.coingecko.com/api/v3/coins/"};var C=(()=>{let t=class t{constructor(){this.selectedCurrency$=new n("INR"),this.currency$=this.selectedCurrency$.asObservable(),this.baseUrl=m.apiUrl,this.http=u(f)}setCurrency(e){this.selectedCurrency$.next(e)}getCurrency(e){return this.http.get(`${this.baseUrl}markets?vs_currency=${e}&order=market_cap_desc&sparkline=false`).pipe(a())}getTrendingCurrency(e){return this.http.get(`${this.baseUrl}markets?vs_currency=${e}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`).pipe(a())}getGraphicalCurrencyData(e,i,d){return this.http.get(`${this.baseUrl}${e}/market_chart?vs_currency=${i}&days=${d}`).pipe(a())}getCurrencyById(e){return this.http.get(`${this.baseUrl}${e}`).pipe(a())}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=s({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();var x=(()=>{let t=class t{constructor(){this.loadingSubject=new n(!1),this.loading$=this.loadingSubject.asObservable()}showLoadingUntilCompleted(e){return o(null).pipe(h(()=>{this.loadingOn()}),p(()=>e),l(()=>this.loadingOf()))}loadingOn(){this.loadingSubject.next(!0)}loadingOf(){this.loadingSubject.next(!1)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=s({token:t,factory:t.\u0275fac});let r=t;return r})();var S=(()=>{let t=class t{constructor(){this.subject=new n([]),this.errors$=this.subject.asObservable().pipe(c(e=>e&&e.length>0))}showErrors(...e){this.subject.next(e)}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=s({token:t,factory:t.\u0275fac});let r=t;return r})();export{C as a,x as b,S as c};
