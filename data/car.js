export class Car{

    constructor(brand,model){
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }
    getCarInfo(){
        return `${this.brand} ${this.model}, Speed: ${this.speed} km/hr`;
    }
    go(){
        this.speed += 5;
        if (this.speed > 200) {
        this.speed = 200;
        }
    }
    brake(){
        this.speed -= 5;
        if (this.speed < 0) {
        this.speed = 0;
        }
    }
}
const obj1 = new Car('Toyota','Corolla');
const obj2 = new Car('Tesla','Model 3');
console.log(obj1);
console.log(obj2);
;
console.log(obj2.getCarInfo());

obj1.go();
obj1.go();
obj1.brake();
console.log(obj1.getCarInfo());




