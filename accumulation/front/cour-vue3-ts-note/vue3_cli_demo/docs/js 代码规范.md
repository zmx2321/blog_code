## 一、必要的

### 1、强类型检查 ===  代替 ==

```js
0 == false // true
0 === false // false
2 == "2" // true
2 === "2" // false

// 例子
const value = "500";
if (value === 500) {
  console.log(value);
  // 没打印出来
}

if (value === "500") {
  console.log(value);
  // 打印出来了
}
```


### 2、变量
 1. 给变量命名时，应该要使变量名具有代表意图的象征，使人易于搜索和理解

**反例**

```javascript
let daysSLV = 10;
let y = new Date().getFullYear();

let ok;
if (user.age > 30) {
  ok = true;
}
// y, ok这些什么玩意儿呢，30又是什么意思呢？
```

**正例**

```javascript
const MAX_AGE = 30;
let daysSinceLastVisit = 10;
let currentYear = new Date().getFullYear();
```

2. 不要在变量中增加没必要的额外的单词

**反例**

```javascript
let nameValue;
let theProduct;
```

**正例**

```js
let name;
let product;
```

3. 不要强制记忆变量名的上下文

**反例**

```javascript
const users = ["John", "Marco", "Peter"];
users.forEach(u => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  register(u);
});
```

**正例**

```js
const users = ["John", "Marco", "Peter"];
users.forEach(user => {
  doSomething();
  doSomethingElse();
  // ...
  // ...
  // ...
  // ...
  register(user);
});
```

4. 变量名不要加上下文重复的单词

**反例**

```javascript
const user = {
  userName: "John",
  userSurname: "Doe",
  userAge: "28"
};
...
user.userName;
```

**正例**

```js
const user = {
  name: "John",
  surname: "Doe",
  age: "28"
};
...
user.name;
```

### 3、函数相关

1. 函数名应该是动词或者短语，代表某种行为，描述它们在做什么

**反例**

```javascript
function notif(user) {
  // implementation
}
```

**正例**

```javascript
function notifyUser(emailAddress) {
  // implementation
}
```

2. 避免使用大量的参数，理想的情况就是用两个或者更少的参数。参数越少，测试就越容易

**反例**

```javascript
function getUsers(fields, fromDate, toDate) {
  // implementation
}
```

**正例**

```javascript
function getUsers({ fields, fromDate, toDate }) {
  // implementation
}

getUsers({
  fields: ['name', 'surname', 'email'],
  fromDate: '2019-01-01',
  toDate: '2019-01-18'
});
```

3. 函数应该使用默认参数，而不是条件语句

**反例**

```javascript
function createShape(type) {
  const shapeType = type || "cube";
  // ...
}
```

**正例**

```javascript
function createShape(type = "cube") {
  // ...
}
```

4. 一个函数应该做一件事，避免在一个函数中执行多个操作。

**反例**

```javascript
function notifyUsers(users) {
  users.forEach(user => {
    const userRecord = database.lookup(user);
    if (userRecord.isVerified()) {
      notify(user);
    }
  });
}
```

**正例**

```javascript
function notifyVerifiedUsers(users) {
  users.filter(isUserVerified).forEach(notify);
}

function isUserVerified(user) {
  const userRecord = database.lookup(user);
  return userRecord.isVerified();
}
```

5. 使用Object.assign设置默认对象

**正例**
```js
const shapeConfig = {
  type: "cube",
  width: 200,
  height: null
};

function createShape(config) {
  config.type = config.type || "cube";
  config.width = config.width || 250;
  config.height = config.width || 250;
}

createShape(shapeConfig);
```

**反例**

```js
const shapeConfig = {
  type: "cube",
  width: 200
  // Exclude the 'height' key
};

function createShape(config) {
  config = Object.assign(
    {
      type: "cube",
      width: 250,
      height: 250
    },
    config
  );

  ...
}
```


6. 不要使用标志记作为参数，因为它们告诉你该函数正在做的比它应该做的更多

**反例**

```js
function createFile(name, isPublic) {
  if (isPublic) {
    fs.create(`./public/${name}`);
  } else {
    fs.create(name);
  }
}
```

**正例**

```js
function createFile(name) {
  fs.create(name);
}

function createPublicFile(name) {
  createFile(`./public/${name}`);
}
```

7. 不要污染全局变量。如果需要扩展现有对象，请使用ES6类和继承，而不是在现有对象的原型链上创建函数

**反例**

```js
Array.prototype.myFunc = function myFunc() {
  // implementation
};
```

**正例**

```js
class SuperArray extends Array {
  myFunc() {
    // implementation
  }
}
```

### 4. 条件语句

1. 避免负面条件

**反例**

```js
function isUserNotBlocked(user) {
  // implementation
}

if (!isUserNotBlocked(user)) {
  // implementation
}
```

**正例**

```js
function isUserBlocked(user) {
  // implementation
}

if (isUserBlocked(user)) {
  // implementation
}
```

2. 使用条件语句尽量短点。这可能是微不足道的，但值得一提。此方法仅用于布尔值，并且如果您确定该值不是未定义的或为null。

**反例**

```js
if (isValid === true) {
  // do something...
}

if (isValid === false) {
  // do something...
}
```

**正例**

```js
if (isValid) {
  // do something...
}

if (!isValid) {
  // do something...
}
```

3. 尽可能避免switch分支，请改用多态和继承。

**反例**

```js
class Car {
  // ...
  getMaximumSpeed() {
    switch (this.type) {
      case "Ford":
        return this.someFactor() + this.anotherFactor();
      case "Mazda":
        return this.someFactor();
      case "McLaren":
        return this.someFactor() - this.anotherFactor();
    }
  }
}
```

**正例**

```js
class Car {
  // ...
}

class Ford extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor() + this.anotherFactor();
  }
}

class Mazda extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor();
  }
}

class McLaren extends Car {
  // ...
  getMaximumSpeed() {
    return this.someFactor() - this.anotherFactor();
  }
}
```


### 4. Es6类

1. 类是JavaScript中的新语法糖，跟原型对象一样，只是它现在看起来不同，你应该更喜欢它们而不是ES5的使用构造函数。

**反例**

```js
const Person = function(name) {
  if (!(this instanceof Person)) {
    throw new Error("Instantiate Person with `new` keyword");
  }

  this.name = name;
};

Person.prototype.sayHello = function sayHello() { /**/ };

const Student = function(name, school) {
  if (!(this instanceof Student)) {
    throw new Error("Instantiate Student with `new` keyword");
  }

  Person.call(this, name);
  this.school = school;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.printSchoolName = function printSchoolName() { /**/ };
```

**正例**

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    /* ... */
  }
}

class Student extends Person {
  constructor(name, school) {
    super(name);
    this.school = school;
  }

  printSchoolName() {
    /* ... */
  }
}
```

2. 使用方法链接，许多库如jQuery和Lodash都使用这种模式。因此，您的代码将不那么冗长。在你的类中，只需在每个函数的末尾返回它，你就可以将更多的类方法链接到它上面。

**反例**

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  setSurname(surname) {
    this.surname = surname;
  }

  setAge(age) {
    this.age = age;
  }

  save() {
    console.log(this.name, this.surname, this.age);
  }
}

const person = new Person("John");
person.setSurname("Doe");
person.setAge(29);
person.save();
```

**正例**

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  setSurname(surname) {
    this.surname = surname;
    // Return this for chaining
    return this;
  }

  setAge(age) {
    this.age = age;
    // Return this for chaining
    return this;
  }

  save() {
    console.log(this.name, this.surname, this.age);
    // Return this for chaining
    return this;
  }
}

const person = new Person("John")
    .setSurname("Doe")
    .setAge(29)
    .save();
```