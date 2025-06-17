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

export interface CarSpecs {
  msrp?: number;
  estPayment?: number;
  range?: number;
  mpge?: number;
  mpg?: number;
  motorTrendScore?: number;
  rank?: string;
}

export interface CarModel extends CarSpecs {
  id: string;
  name: string;
  year: number;
  imageUrl?: string;
}

export interface CarMake {
  id: string;
  name: string;
  imageUrl?: string;
  models: CarModel[];
}

export const carMakes: CarMake[] = [
  {
    id: "rivian",
    name: "Rivian",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457708afc700082e5cff/rivian.png",
    models: [
      { 
        id: "rivian-r1s-2025", 
        name: "R1S", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b8d2d9e5f2c20008e9d8c9/2025-rivian-r1s-front-view.jpg",
        msrp: 76000,
        estPayment: 1291,
        range: 410,
        mpge: 115,
        motorTrendScore: 8.9,
        rank: "#1 in Electric SUV"
      }
    ]
  },
  {
    id: "make-1",
    name: "Honda",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457a4c8dec000802a951/honda.png",
    models: [
      { id: "honda-1", name: "Civic", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/22-2025-honda-civic-type-r-front-view.jpg" },
      { id: "honda-2", name: "Accord", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d37a87ff34400082301e0/14-2025-honda-accord-front-view.jpg" },
      { id: "honda-3", name: "CR-V", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6787f2342a8b790008a4202b/2025-honda-cr-v-front-view-1.jpg" },
      { id: "honda-4", name: "Pilot", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65f803940315ac000873e138/01-2025-honda-pilot-black-edition.jpg" },
      { id: "honda-5", name: "HR-V", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66c3b54505d26600081bc60f/014-2024-honda-hrv.jpg" }
    ]
  },
  {
    id: "make-2",
    name: "Toyota",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45794c8dec000802a950/toyota.png",
    models: [
      { id: "toyota-1", name: "Camry", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67119893ced0040008e16ca8/005-2025-toyota-camry-xse-awd.jpg" },
      { id: "toyota-2", name: "Corolla", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/680a9c93e126350008309198/001-2025-toyota-corolla-fx-lead.jpg" },
      { id: "toyota-3", name: "RAV4", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67081cf6b03e490008de792c/2025toyotarav4hybridfrontthreequarters.jpgg" },
      { id: "toyota-4", name: "Highlander", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66e9d8988a5ca70008dc2db3/3-2025-toyota-highlander-turbo-front-view.jpg" },
      { id: "toyota-5", name: "Tacoma", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67620e07e41c1100086b14c7/1-2025-toyota-tacoma-trailhunter-front-view.jpgg" }
    ]
  },
  {
    id: "make-3",
    name: "Ford",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457808afc700082e5d00/ford.png",
    models: [
      { id: "ford-1", name: "F-150", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/675b76362025cd0008d6d19e/007-2025-ford-f-150-raptor.jpg" },
      { id: "ford-2", name: "Mustang", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/668fe41a96736e0008669212/2025fordmustanggtdgoodwood4.png" },
      { id: "ford-3", name: "Explorer", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/669ebeaf99efbc0005648da1/007-2025-ford-explorer-st-in-motion.jpg" },
      { id: "ford-4", name: "Escape", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6696e0058e17c500084cf572/005-2025-ford-escape-hybrid-front-view.jpg" },
      { id: "ford-5", name: "Bronco", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/68224cd0ccb2eb0008800a19/2025fordperformancebroncocoastalpackage14.jpg" }
    ]
  },
  {
    id: "make-4",
    name: "Chevrolet",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45782e7f6f000803b314/chevrolet.png",
    models: [
      { id: "chevy-1", name: "Silverado", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66cf7fd6e70e9300086e2d35/027-2025-chevy-silverado-zr2-1500-diesel-front-view.jpg" },
      { id: "chevy-2", name: "Equinox", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66a011567acadb0008051256/chevyequinoxphevchina5.png" },
      { id: "chevy-3", name: "Malibu", year: 2024, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/663ccc99b53e720008808318/2025chevymalibugenerator10.png" },
      { id: "chevy-4", name: "Tahoe", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c3cac496927700083f0c2b/2021-chevy-tahoe-front-three-quarter-view.jpg" },
      { id: "chevy-5", name: "Corvette", year: 2025, imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/679d31ae0c91990008185451/2025-chevrolet-corvette-front-view.jpg" }
    ]
  },
  {
    id: "make-5",
    name: "BMW" ,
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457a4b63af0008dc047c/bmw.png",
    models: [
      { id: "bmw-1", name: "3 Series", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6745000c6bcac100085cf2fc/3-2025-bmw-x3-30-xdrive-front-view.jpg"},
      { id: "bmw-2", name: "5 Series", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6815019737e1e80008ed36f9/037-2025-bmw-m5-touring.jpg"},
      { id: "bmw-3", name: "X3", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67ed9ccb54184b00081c3e93/2025-bmw-x3-30-xdrive-5.jpg"},
      { id: "bmw-4", name: "X5", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/681e4063e1c1d900089ccfdd/26-2026-bmw-x5-front-view.jpg"},
      { id: "bmw-5", name: "i4", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6835e0c40e1d380008f5caf8/88-2026bmwm2cs-oem.jpg"}
    ]
  },
  {
    id: "make-6",
    name: "Mercedes-Benz",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457708afc700082e5cfe/mb.png",
    models: [
      { id: "mb-1", name: "C-Class", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65dcc0c5a8e94f0008f511bc/2019-mercedes-benz-c-class-coupe-front-01.jpg"},
      { id: "mb-2", name: "E-Class", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6733a77e5a73d7000877442b/026-2025-mercedes-benz-e-class.jpg"},
      { id: "mb-3", name: "GLC", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67cb96dc2bc9a500093a10e9/19-2025-mercedes-benz-amg-glc63-front-view.jpg"},
      { id: "mb-4", name: "GLE", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67046ecacbb9f900087d42be/9-2025-mercedes-benz-amg-gle-53-coupe-front-view.jpg"},
      { id: "mb-5", name: "EQS", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65a1cf2dcd4dad0008d30b9c/2022-mercedes-benz-eqs-450-front-three-quarter.jpg"}
    ]
  },
  {
    id: "make-7",
    name: "Audi",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a465e7f373f0008eaf287/audi.png",
    models: [
      { id: "audi-1", name: "A4", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66da3b82d371a900088c1b0e/1-2025-audi-a4-front-view.jpg"},
      { id: "audi-2", name: "A6", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67fd44a00ae5030008c74275/2026audia6sedaneurospec10.jpg"},
      { id: "audi-3", name: "Q5", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66eb2d835a71c90008009cb9/2-2025-audi-q5-sportback-front-view.jpg"},
      { id: "audi-4", name: "Q7", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6785abfb24039f00084f7c69/4-2025-audi-q3-front-view.jpg"},
      { id: "audi-5", name: "e-tron", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67ec4be2624dc20008881862/34-2025-audi-rs-e-tron-gt-performance-first-drive.jpg"}
    ]
  },
  {
    id: "make-8",
    name: "Subaru",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45762e7f6f000803b313/subaru.png",
    models: [
      { id: "subaru-1", name: "Outback", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6765a89a821dc500082c23ae/002-2025-subaru-outback-touring-xt.jpg"},
      { id: "subaru-2", name: "Forester", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67ed83a47a9e17000853bc02/2025-subaru-forester-hybrid-first-drive-005-action-front-three-quarter.jpg"},
      { id: "subaru-3", name: "Crosstrek", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6797ff5be43dae0008ab317c/1-2026-subaru-crosstrek-front-view.jpg"},
      { id: "subaru-4", name: "Legacy", year: 2024 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66c4e6ebf5511100082acb4a/2-2025-subaru-legacy-front-view.jpg"},
      { id: "subaru-5", name: "Impreza", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65b873ee93c01200084c6a98/2017-subaru-impreza-20i-sport-5-door-side-in-motion-02.jpg"}
    ]
  },
  {
    id: "make-9",
    name: "Kia", 
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a457508afc700082e5cfd/kia.png",
    models: [
      { id: "kia-1", name: "Telluride", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6737df4b82412a000866555b/14-2025-kia-telluride-front-view.jpg"},
      { id: "kia-2", name: "Sorento", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/665e438fb5d8ac00082037e1/020-2024-kia-sorento-x-line.jpg"},
      { id: "kia-3", name: "Sportage", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/673f971999a2ed0008407a91/10-2026-kia-sportage-phev-front-view.jpg"},
      { id: "kia-4", name: "K5", year: 2024 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6837742a310c340008367a16/007-2025-kia-k4.jpg"},
      { id: "kia-5", name: "EV6", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/673fcb5f5c864e0008954d29/2025kiaev6laautoshow2.png"}
    ]
  },
  {
    id: "make-10",
    name: "Hyundai",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45762e7f6f000803b311/hyundai.png",
    models: [
      { id: "hyundai-1", name: "Tucson", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6766000bde52190008d6dc58/001-2025-hyundai-tucson-hybrid.jpg"},
      { id: "hyundai-2", name: "Santa Fe", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/66bbf45cd056c200081f379b/23-2025-hyundai-santa-fe-xrt-front-view.jpg"},
      { id: "hyundai-3", name: "Elantra", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6839cc6968e67e00082737e8/2025hyundaielantrasedan.jpg"},
      { id: "hyundai-4", name: "Palisade", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67fef5646facdc000868ba43/004-2026-hyundai-palisade-xrt.jpg"},
      { id: "hyundai-5", name: "IONIQ 5", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b7d7ac76fd890008af0108/001-2025-hyundai-ioniq-5-n-012825.jpg"}
    ]
  },
  {
    id: "make-11",
    name: "Mazda",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45744c8dec000802a94c/mazda.png",
    models: [
      { id: "mazda-1", name: "CX-5", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/659fde2a846d4800085393c3/2022-mazda-cx5-turbo-023.jpg"},
      { id: "mazda-2", name: "CX-9", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65c487cb4a2b1b0008d585b3/2021-mazda-cx-5-signature-awd-turbo-9.jpg"},
      { id: "mazda-3", name: "Mazda3", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67939b5aaae6b600083f4b97/2025-mazda-mx-5-35th-anniversary-edition-36.jpg"},
      { id: "mazda-4", name: "Mazda6", year: 2024 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/65bbe650898e0a00083e0562/2018-mazda6-signature-25t-front-three-quarter-in-motion.jpg"},
      { id: "mazda-5", name: "MX-5 Miata", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67ab99ed5cbd3000082a869a/003-electrogenic-mazda-miata.jpg"}
    ]
  },
  {
    id: "make-12",
    name: "Nissan",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/683a45737f373f0008eaf285/nissan.png",
    models: [
      { id: "nissan-1", name: "Altima", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67ab99ed5cbd3000082a869a/003-electrogenic-mazda-miata.jpg"},
      { id: "nissan-2", name: "Rogue", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/673e1df26facf8000829251f/009-2025-nissan-rogue-rock-creek.jpg"},
      { id: "nissan-3", name: "Pathfinder", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/676370aa8f15860008e1af84/21-2025-nissan-pathfinder-front-view.jpg"},
      { id: "nissan-4", name: "Frontier", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67e5dec95067fc0008a938a5/04-2025-nissan-frontier-pro-4x.jpg"},
      { id: "nissan-5", name: "Ariya", year: 2025 , imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67afe4e50a4efc0008c300dc/1-2025-nissan-ariya-front-view.jpg"}
    ]
  },
  {
    id: "make-13",
    name: "Tesla",
    imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b8d2d9e5f2c20008e9d8c9/tesla-logo.png",
    models: [
      { 
        id: "tesla-1", 
        name: "Model 3", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b6575d66bfb8000847395d/29-2025-tesla-model-3-front-view.jpg",
        msrp: 38990,
        estPayment: 629,
        range: 272,
        mpge: 132,
        motorTrendScore: 8.8,
        rank: "#2 in Electric Sedan"
      },
      { 
        id: "tesla-2", 
        name: "Model Y", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b65c0a261b1300083ef8f6/2-2025-tesla-model-x-front-view.jpg",
        msrp: 44990,
        estPayment: 729,
        range: 320,
        mpge: 122,
        motorTrendScore: 9.1,
        rank: "#1 in Electric SUV"
      },
      { 
        id: "tesla-3", 
        name: "Model S", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/6793fa7df3811f0008acd379/1-2025-tesla-model-s-front-view.jpg",
        msrp: 84990,
        estPayment: 1399,
        range: 410,
        mpge: 120,
        motorTrendScore: 9.0,
        rank: "#1 in Luxury Electric Sedan"
      },
      { 
        id: "tesla-4", 
        name: "Model X", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b65c31261b1300083ef8ff/14-2025-tesla-model-x-front-view.jpg",
        msrp: 89990,
        estPayment: 1479,
        range: 352,
        mpge: 102,
        motorTrendScore: 8.9,
        rank: "#1 in Luxury Electric SUV"
      },
      { 
        id: "tesla-5", 
        name: "Cybertruck", 
        year: 2025, 
        imageUrl: "https://d2kde5ohu8qb21.cloudfront.net/files/67b8d2d9e5f2c20008e9d8c9/2025-tesla-cybertruck-front-view.jpg",
        msrp: 99990,
        estPayment: 1649,
        range: 340,
        mpge: 105,
        motorTrendScore: 8.7,
        rank: "#1 in Electric Truck"
      }
    ]
  }
];
