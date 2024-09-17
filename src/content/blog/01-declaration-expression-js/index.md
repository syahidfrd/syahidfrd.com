---
title: "Function Declaration v.s. Expression pada JavaScript"
description: "Perbedaan utama antara fungsi deklarasi dan ekspresi pada JavaScript"
date: "Apr 19 2020"
draft: false
---

Pada Javascript, dikenal dua jenis fungsi yaitu Function Decalration dan Function Expression, yang mana keduanya memiliki fungsi yang sama seperti fungsi pada umumnya yaitu untuk mengeksekusi beberapa block code dan menghasilkan nilai, lalu apa yang membedakan dua jenis fungsi tersebut? 🤔

### Function Declaration

Secara sederhana Function Declaration merupakan sebuah fungsi yang disimpan dan akan dieksekusi ketika dipanggil.

```js
function foo() {
  return "bar";
}

console.log(foo()); // return "bar";
```

Function Decalration menggunakan awalan "function" untuk mendeklarasikan fungsinya. Selain itu fungsi akan dideklarasikan terlebih dahulu daripada baris code yang lainnya, bisa kita buktikan dengan memanggil fungsi `foo()` sebelum mendeklarasikannya.

```js
console.log(foo()); // return "bar"

function foo() {
  return "bar";
}
```

### Function Expression

Berbeda dengan Function Declaration, Function Expression merupakan fungsi yang disimpan di dalam variable, dan tidak membutuhkan nama fungsi atau yang kita kenal sebagai Anonymous Function. Function Expression akan dipanggil dengan cara memanggil nama variablenya.

```js
const foo = function () {
  return "bar";
};

console.log(foo()); // return "bar";
```

Atau, apabila menggunakan Arrow Function di ES6:

```js
const foo = () => "bar";
console.log(foo()); // return "bar"
```

Pada Function Expression, fungsi diawali dengan deklarasi variable (const, let atau var), karena sejatinya fungsi ini disimpan di dalam variable. Sehingga fungsi ini dideklarasikan ketika baris code telah dieksekusi. Mari kita buktikan lagi dengan memanggil fungsi `foo()` sebelum mendeklarasikannya menggunakan Function Expression.

```js
console.log(foo()); // return undefined;

const foo = function () {
  return "bar";
};
```

Oke, sampai disini kita tahu perbedaan dari dua fungsi tersebut, yaitu dari waktu dan cara fungsi itu dideklarasikan. Semoga bermanfaat 😁.
