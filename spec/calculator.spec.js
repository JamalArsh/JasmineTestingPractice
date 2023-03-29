describe("Description", () => {
  let calc;
  beforeEach(function () {
    calc = new Calculator();
  });

  // toBe
  it("should 2", () => {
    const calc = new Calculator();
    calc.add(2);
    expect(calc.total).toBe(2);
  });

  // toEqual
  it("should be equal", () => {
    let person1 = { name: "leela" };
    let person2 = { name: "leela" };

    expect(person1).toEqual(person2);
    expect(person1).toEqual(person2);
  });

  // ToBe truthy or falsy
  it("should br true and false", () => {
    const calc = new Calculator();
    const calc2 = new Calculator();
    expect(calc).toBeTruthy();
    expect(calc2.total).toBeFalsy();
  });

  // Not
  it("Not", () => {
    const calc = new Calculator();
    const calc2 = new Calculator();
    expect(calc).not.toBe(calc2);
  });

  //ToBeUndefined
  it("Undefined and defined", () => {
    const calc = new Calculator();
    const calc2 = new Calculator();
    let c;
    expect(c).toBeUndefined();
    expect(calc).toBeDefined();
  });

  //Null
  it("Null", () => {
    let arr = null;
    expect(arr).toBeNull();
  });

  //toContain
  it("Contain", () => {
    let arr = [1, 2, 3, 4, 5];
    expect(arr).toContain(4);
  });

  //Nan
  it("NaN", () => {
    let arr = "hello" / 3;
    expect(arr).toBeNaN();
  });

  //toThrow
  it("should throw", () => {
    const calc = new Calculator();
    calc.total = 10;

    expect(function () {
      calc.divide(0);
    }).toThrow();
  });

  //toThrow
  it("should throw error", () => {
    const calc = new Calculator();
    calc.total = 10;

    expect(function () {
      calc.divide(0);
    }).toThrowError();
  });

  //toMatch
  it("should match", () => {
    expect("other").toMatch("her");
  });

  //Asymmetric matcher
  it("should match with anything", () => {
    const calc = new Calculator();
    calc.total = 10;
    expect(calc.total).toEqual(jasmine.anything());
    expect(calc.total).toEqual(jasmine.any(Number));
  });

  //custom matcher
  it("custom matcher", () => {
    jasmine.addMatchers(CustomMatcher);
    const calc = new Calculator();
    expect(calc).toBeCalculator();
    expect(calc.total).not.toBeCalculator();
  });

  // spyOn method
  describe("Calculator", () => {
    it("validate expression if the first number is invalid", () => {
      spyOn(window, "updateResult").and.stub();
      calculate("a+4");
      expect(window.updateResult).toHaveBeenCalled();
    });

    it("validate expression if the second number is invalid", () => {
      spyOn(window, "updateResult").and.stub();
      calculate("3+a");
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(
        "Operation not recognised"
      );
    });

    it("validate expression if the operation is invalid", () => {
      spyOn(window, "updateResult").and.stub();
      calculate("3_3");
      expect(window.updateResult).toHaveBeenCalled();
    });

    it("validate expression is valid", () => {
      spyOn(window, "updateResult"); // and.stub is the default one and can be omitted
      calculate("3+3");
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(6);
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("spy on calculator object", () => {
      const spy = spyOn(Calculator.prototype, "add");
      calculate("3+3");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it("spy on calculator object - subtract method", () => {
      const spy = spyOn(Calculator.prototype, "substract");
      calculate("4-3");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).not.toHaveBeenCalledWith(4);
    });

    it("calls updateResult - call through", () => {
      spyOn(window, "updateResult");
      const spy = spyOn(Calculator.prototype, "multiply").and.callThrough();
      calculate("3*3");
      expect(spy).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(9);
    });

    // call fake
    it("calls updateResult - call fake", () => {
      spyOn(window, "updateResult");
      const spy = spyOn(Calculator.prototype, "multiply").and.callFake(
        function () {
          return 9;
        }
      );
      calculate("3*3");
      expect(spy).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(9);
    });

    // return value
    it("calls updateResult - return value", () => {
      spyOn(window, "updateResult");
      const spy = spyOn(Calculator.prototype, "multiply").and.returnValue(9);
      calculate("3*3");
      expect(spy).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(9);
    });

    // multiple return value
    it("calls updateResult - multiple return value", () => {
      spyOn(window, "updateResult");
      const spy = spyOn(Calculator.prototype, "multiply").and.returnValues(
        "",
        "second call"
      );
      calculate("3*3");
      expect(spy).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith("");
    });

    it("does not handle error", function () {
      spyOn(Calculator.prototype, "multiply").and.throwError("some error");
      expect(function () {
        calculate("3*3");
      }).toThrowError("some error");
    });
  });

  // getter
  describe("show version", function () {
    it("Should call the showVersion() method", function () {
      spyOn(document, "getElementById").and.returnValue({
        innerText: null,
      });
      const spy = spyOnProperty(Calculator.prototype, "version", "get");
      showVersion();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Asyn functions", function () {
    it("should fetches version from external source", function (done) {
      Calculator.version.then(function (version) {
        expect(version).toBe("0.1");
        done();
      });
    });
  });
});
