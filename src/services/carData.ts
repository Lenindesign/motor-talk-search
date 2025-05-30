
// Car makes and models data for autocomplete suggestions
export interface CarMake {
  id: string;
  name: string;
  imageUrl?: string;
  models: CarModel[];
}

export interface CarModel {
  id: string;
  name: string;
  year: number;
  imageUrl?: string;
}

export const carMakes: CarMake[] = [
  {
    id: "make-1",
    name: "Honda",
    imageUrl: "https://cdn.motortrend.com/logos/honda.png",
    models: [
      { id: "honda-1", name: "Civic", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/22-2025-honda-civic-type-r-front-view.jpg" },
      { id: "honda-2", name: "Accord", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-honda-accord-front-view.jpg" },
      { id: "honda-3", name: "CR-V", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-honda-crv-front-view.jpg" },
      { id: "honda-4", name: "Pilot", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-honda-pilot-front-view.jpg" },
      { id: "honda-5", name: "HR-V", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2024-honda-hrv-front-view.jpg" }
    ]
  },
  {
    id: "make-2",
    name: "Toyota",
    imageUrl: "https://cdn.motortrend.com/logos/toyota.png",
    models: [
      { id: "toyota-1", name: "Camry", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-toyota-camry-front-view.jpg" },
      { id: "toyota-2", name: "Corolla", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-toyota-corolla-front-view.jpg" },
      { id: "toyota-3", name: "RAV4", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-toyota-rav4-front-view.jpg" },
      { id: "toyota-4", name: "Highlander", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-toyota-highlander-front-view.jpg" },
      { id: "toyota-5", name: "Tacoma", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2024-toyota-tacoma-front-view.jpg" }
    ]
  },
  {
    id: "make-3",
    name: "Ford",
    imageUrl: "https://cdn.motortrend.com/logos/ford.png",
    models: [
      { id: "ford-1", name: "F-150", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-ford-f150-front-view.jpg" },
      { id: "ford-2", name: "Mustang", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-ford-mustang-front-view.jpg" },
      { id: "ford-3", name: "Explorer", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-ford-explorer-front-view.jpg" },
      { id: "ford-4", name: "Escape", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2024-ford-escape-front-view.jpg" },
      { id: "ford-5", name: "Bronco", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-ford-bronco-front-view.jpg" }
    ]
  },
  {
    id: "make-4",
    name: "Chevrolet",
    imageUrl: "https://cdn.motortrend.com/logos/chevrolet.png",
    models: [
      { id: "chevy-1", name: "Silverado", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-chevrolet-silverado-front-view.jpg" },
      { id: "chevy-2", name: "Equinox", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-chevrolet-equinox-front-view.jpg" },
      { id: "chevy-3", name: "Malibu", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2024-chevrolet-malibu-front-view.jpg" },
      { id: "chevy-4", name: "Tahoe", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-chevrolet-tahoe-front-view.jpg" },
      { id: "chevy-5", name: "Corvette", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-chevrolet-corvette-front-view.jpg" }
    ]
  },
  {
    id: "make-5",
    name: "BMW",
    models: [
      { id: "bmw-1", name: "3 Series", year: 2025 },
      { id: "bmw-2", name: "5 Series", year: 2025 },
      { id: "bmw-3", name: "X3", year: 2025 },
      { id: "bmw-4", name: "X5", year: 2025 },
      { id: "bmw-5", name: "i4", year: 2025 }
    ]
  },
  {
    id: "make-6",
    name: "Mercedes-Benz",
    models: [
      { id: "mb-1", name: "C-Class", year: 2025 },
      { id: "mb-2", name: "E-Class", year: 2025 },
      { id: "mb-3", name: "GLC", year: 2025 },
      { id: "mb-4", name: "GLE", year: 2025 },
      { id: "mb-5", name: "EQS", year: 2025 }
    ]
  },
  {
    id: "make-7",
    name: "Audi",
    models: [
      { id: "audi-1", name: "A4", year: 2025 },
      { id: "audi-2", name: "A6", year: 2025 },
      { id: "audi-3", name: "Q5", year: 2025 },
      { id: "audi-4", name: "Q7", year: 2025 },
      { id: "audi-5", name: "e-tron", year: 2025 }
    ]
  },
  {
    id: "make-8",
    name: "Subaru",
    models: [
      { id: "subaru-1", name: "Outback", year: 2025 },
      { id: "subaru-2", name: "Forester", year: 2025 },
      { id: "subaru-3", name: "Crosstrek", year: 2025 },
      { id: "subaru-4", name: "Legacy", year: 2024 },
      { id: "subaru-5", name: "Impreza", year: 2025 }
    ]
  },
  {
    id: "make-9",
    name: "Kia",
    models: [
      { id: "kia-1", name: "Telluride", year: 2025 },
      { id: "kia-2", name: "Sorento", year: 2025 },
      { id: "kia-3", name: "Sportage", year: 2025 },
      { id: "kia-4", name: "K5", year: 2024 },
      { id: "kia-5", name: "EV6", year: 2025 }
    ]
  },
  {
    id: "make-10",
    name: "Hyundai",
    models: [
      { id: "hyundai-1", name: "Tucson", year: 2025 },
      { id: "hyundai-2", name: "Santa Fe", year: 2025 },
      { id: "hyundai-3", name: "Elantra", year: 2025 },
      { id: "hyundai-4", name: "Palisade", year: 2025 },
      { id: "hyundai-5", name: "IONIQ 5", year: 2025 }
    ]
  },
  {
    id: "make-11",
    name: "Mazda",
    models: [
      { id: "mazda-1", name: "CX-5", year: 2025 },
      { id: "mazda-2", name: "CX-9", year: 2025 },
      { id: "mazda-3", name: "Mazda3", year: 2025 },
      { id: "mazda-4", name: "Mazda6", year: 2024 },
      { id: "mazda-5", name: "MX-5 Miata", year: 2025 }
    ]
  },
  {
    id: "make-12",
    name: "Nissan",
    models: [
      { id: "nissan-1", name: "Altima", year: 2025 },
      { id: "nissan-2", name: "Rogue", year: 2025 },
      { id: "nissan-3", name: "Pathfinder", year: 2025 },
      { id: "nissan-4", name: "Frontier", year: 2025 },
      { id: "nissan-5", name: "Ariya", year: 2025 }
    ]
  }
];
