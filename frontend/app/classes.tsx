export class Article {
    code: string;
    name: string;
    description: string;
    color: {
      code: string;
      text: string;
      rgbColor: string;
    };
    whitePrice: {
      price: number;
      currency: string;
    };
    galleryDetails: Array<any>;
    careInstructions: string[];
    compositions: {
      materials: {
        name: string;
        percentage: string;
      }[];
      compositionType: string;
    }[];
    materialDetails: {
      name: string;
      description: string;
    }[];
    variantsList: {
      code: string;
      size: {
        name: string;
      };
    }[];
    articleCountryOfProduction: string;

    constructor(data: any = {}) {
      this.code = data.code;
      this.name = data.name;
      this.description = data.description;
      this.color = data.color;
      this.whitePrice = data.whitePrice;
      this.galleryDetails = data.galleryDetails;
      this.careInstructions = data.careInstructions || [];
      this.compositions = data.compositions || [];
      this.materialDetails = data.materialDetails || [];
      this.variantsList = data.variantsList || [];
      this.articleCountryOfProduction = data.articleCountryOfProduction || '';
    }
  }
export class ProductData {
    code: string;
    name: string;
    description: string;
    color?: any;
    whitePrice?: any;
    articlesList: any[];
    galleryDetails: any[];
    careInstructions?: string[];
    compositions?: any[];
    materialDetails?: any[];
    variantsList?: any[];
    colors: any[];
    articleCountryOfProduction?: string | null;
    categoryId?: number | null;
    constructor(data: any = {}){
      this.code = data.code;
      this.name = data.name;
      this.description = data.description;
      this.color = data.color;
      this.whitePrice = data.whitePrice;
      this.articlesList = data.articlesList || [];
      this.galleryDetails = data.galleryDetails;
      this.careInstructions = data.careInstructions || [];
      this.compositions = data.compositions || [];
      this.materialDetails = data.materialDetails || [];
      this.variantsList = data.variantsList || [];
      this.colors = data.colors || [];
      this.articleCountryOfProduction = data.articleCountryOfProduction || '';
      this.categoryId = data.categoryId || '';
    }
  }


export class ProductGeneral {
  img: string | undefined;
  code: string | undefined;
  price: number | undefined;
  currency: string | undefined;
  name: string | undefined;
  colorRgb: string | undefined;
  colorName: string | undefined;
  size: string | undefined;
  ammount: number;

  constructor(
    img?: string,
    code?: string,
    price?: number,
    currency?:string,
    name?: string,
    colorRgb?: string,
    colorName?: string,
    size?: string,
    ammount: number=1
  ) {
    this.img = img;
    this.code = code;
    this.price = price;
    this.currency = currency;
    this.name = name;
    this.colorRgb = colorRgb;
    this.colorName = colorName;
    this.size = size;
    this.ammount = ammount;
  }
}