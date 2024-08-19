export class Product {
    private Id: number;
    private Name: string;
    private Price:string;
    private src:string;
    private url:string;
    private type:string;
    constructor(Id:number,Name:string,Price:string,src:string,url:string,type:string){
        this.Id=Id;
        this.Name=Name;
        this.Price=Price;
        this.src=src;
        this.url=url;
        this.type=type;
    }
    
    getId(): number {
        return this.Id;
    }

    getName(): string {
        return this.Name;
    }

    getPrice(): string {
        return this.Price;
    }

    getSrc(): string {
        return this.src;
    }

    getUrl(): string {
        return this.url;
    }

    getType(): string {
        return this.type;
    }
    toString(): string {
        return `Product ${this.Id}: ${this.Name}, Price: ${this.Price}, Type: ${this.type}`;
    }
  }