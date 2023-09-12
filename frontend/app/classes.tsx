export class Article {
    code: string;
    name: string;
    description: string;
    sellingAttributes: any[]; // Puedes reemplazar 'any[]' con un tipo específico si es necesario
    color: {
      code: string;
      text: string;
      rgbColor: string;
    };
    whitePrice: {
      price: number;
      currency: string;
      referenceFlag: boolean;
      startDate: number;
      endDate: number;
    };
    redPrice: {
      price: number;
      currency: string;
      referenceFlag: boolean;
      startDate: number;
      endDate: number;
    };
    colourDescription: string;
    pattern: string;
    lengthCollection: Array<any>;
    showPriceMarker: boolean;
    percentageDiscount: string;
    disclaimer: Array<any>;
    lightNeeds: Array<any>;
    wateringNeeds: Array<any>;
    plantType: Array<any>;
    plantAndFlowerStyle: Array<any>;
    salesMode: Array<any>;
    seats: Array<any>;
    stuffingMaterial: Array<any>;
    firmness: Array<any>;
    galleryDetails: Array<any>;
    fabricSwatchThumbnails: {
      id: string;
      mimeType: string;
      baseUrl: string;
      url: string;
      assetType: string;
    }[];
    styleWith: {
      code: string;
      lengthCollection: any[];
      showPriceMarker: boolean;
      styleWithOrigin: string;
      parentProductCode: string;
      inStore: boolean;
      productTransparencyEnabled: boolean;
      suppliersDetailEnabled: boolean;
      comingSoon: boolean;
      external: boolean;
      palette: boolean;
      travelSize: boolean;
      semiBulky: boolean;
    }[];
    functions: any[];
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
    graphicalAppearanceDesc: string;
    genericDescription: string;
    variantsList: {
      code: string;
      size: {
        sizeCode: string;
        name: string;
        sizeScaleCode: string;
        sizeScaleDescription: string;
        sizeOrder: number;
        sizeFilter: string;
        market: string;
      };
    }[];
    concepts: string[];
    parentProductCode: string;
    styleWithScenario: string;
    inStore: boolean;
    productTransparencyEnabled: boolean;
    suppliersDetailEnabled: boolean;
    suppliersSectionDisabledReason: string;
    comingSoon: boolean;
    external: boolean;
    articleType: string;
    brandName: string;
    palette: boolean;
    travelSize: boolean;
    corporateBrandId: number;
    woodCompositions: any[];
    articleCountryOfProduction: string;
    semiBulky: boolean;
    availabilityOnlineDate: number;

    constructor(data: any = {}) {
      this.code = data.code;
      this.name = data.name;
      this.description = data.description;
      this.sellingAttributes = data.sellingAttributes || [];
      this.color = data.color;
      this.whitePrice = data.whitePrice;
      this.redPrice = data.redPrice;
      this.colourDescription = data.colourDescription;
      this.pattern = data.pattern;
      this.lengthCollection = data.lelengthCollection;
      this.showPriceMarker = data.showPriceMarker;
      this.percentageDiscount = data.percentageDiscount;
      this.disclaimer = data.disclaimer;
      this.lightNeeds = data.lightNeeds;
      this.wateringNeeds = data.wateringNeeds;
      this.plantType = data.plantType;
      this.plantAndFlowerStyle = data.plantAndFlowerStyle;
      this.salesMode = data.salesMode;
      this.seats = data.seats;
      this.stuffingMaterial = data.stuffingMaterial;
      this.firmness = data.firmness;
      this.galleryDetails = data.galleryDetails;
      this.fabricSwatchThumbnails = data.fabricSwatchThumbnails || [];
      this.styleWith = data.styleWith || [];
      this.functions = data.functions || [];
      this.careInstructions = data.careInstructions || [];
      this.compositions = data.compositions || [];
      this.materialDetails = data.materialDetails || [];
      this.graphicalAppearanceDesc = data.graphicalAppearanceDesc || '';
      this.genericDescription = data.genericDescription || '';
      this.variantsList = data.variantsList || [];
      this.concepts = data.concepts || [];
      this.parentProductCode = data.parentProductCode || '';
      this.styleWithScenario = data.styleWithScenario || '';
      this.inStore = data.inStore || false;
      this.productTransparencyEnabled = data.productTransparencyEnabled || false;
      this.suppliersDetailEnabled = data.suppliersDetailEnabled || false;
      this.suppliersSectionDisabledReason = data.suppliersSectionDisabledReason || '';
      this.comingSoon = data.comingSoon || false;
      this.external = data.external || false;
      this.articleType = data.articleType || '';
      this.brandName = data.brandName || '';
      this.palette = data.palette || false;
      this.travelSize = data.travelSize || false;
      this.corporateBrandId = data.corporateBrandId || 0;
      this.woodCompositions = data.woodCompositions || [];
      this.articleCountryOfProduction = data.articleCountryOfProduction || '';
      this.semiBulky = data.semiBulky || false;
      this.availabilityOnlineDate = data.availabilityOnlineDate || 0;
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