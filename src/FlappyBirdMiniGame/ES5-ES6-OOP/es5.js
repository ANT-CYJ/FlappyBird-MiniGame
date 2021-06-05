(function () {
  "use strict";
  //函数声明，会导致变量提升
  // function Animal() {}

  var Animal = function (name, age) {
    this.name = name;
    this.age = age;
    // this.say = function () {
    //   console.log(this.name + " " + this.age);
    // };
  };
  Animal.prototype.say = function () {
    console.log(this.name + " " + this.age);
  };
  // var cat = new Animal("小猫", 3);
  // cat.say();

  //寄生组合继承
  //call() apply()
  //调用一个对象的一个方法，用另一个对象替换当前对象
  // Animal.prototype.say.call(cat);
  // Animal.prototype.say.apply(cat);

  // var params = {
  //   name: "小猫2",
  //   age: 4,
  // };
  // cat.say.call(params);

  var Cat = function (name, age) {
    //继承除了原型链之外的其他内容
    // Animal.apply(this, arguments);
    // Animal.call(this, name, age);
    Animal.apply(this, [name, age]);
  };
  //继承原型链内容,相当于浅克隆
  Cat.prototype = Object.create(Animal.prototype);
  //区分
  // Cat.prototype = new Animal();
  Cat.prototype.say = function () {
    var p = {
      name: "父类名字",
      age: 10,
    };
    Animal.prototype.say.apply(p); //调用父类方法
    console.log("这是子类的名字" + this.name);
  };

  var cat1 = new Cat("子猫", 3);
  cat1.say();
})();
