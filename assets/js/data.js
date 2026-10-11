// Data repository for StudentStay application

var APP_AUTH = {
  isLoggedIn: false,
  currentUser: null,
  sampleUsers: [
    { id: 'user-ama', name: 'Ama Konadu', email: 'ama.k@gcu.ac.uk', university: 'Glasgow Caledonian (GCU)', country: 'Ghana 🇬🇭', initials: 'AK', avatar: 'assets/images/ama.jpg' },
    { id: 'user-david', name: 'David Smith', email: 'david.smith@strath.ac.uk', university: 'Univ of Strathclyde', country: 'United Kingdom 🇬🇧', initials: 'DS', avatar: 'assets/images/james.jpg' },
    { id: 'user-priya', name: 'Priya Patel', email: 'priya.p@glasgow.ac.uk', university: 'University of Glasgow', country: 'India 🇮🇳', initials: 'PP', avatar: 'assets/images/meilin.jpg' },
    { id: 'user-chen', name: 'Chen Wei', email: 'chen.wei@ucl.ac.uk', university: 'UCL London', country: 'China 🇨🇳', initials: 'CW', avatar: 'assets/images/ravi.jpg' }
  ]
};

var APP_DATA = {
  currencies: {
    GBP: { symbol: '£', rate: 1.0, label: 'GBP (£)' },
    USD: { symbol: '$', rate: 1.28, label: 'USD ($)' },
    EUR: { symbol: '€', rate: 1.17, label: 'EUR (€)' },
    NGN: { symbol: '₦', rate: 2050, label: 'NGN (₦)' },
    INR: { symbol: '₹', rate: 107.5, label: 'INR (₹)' },
    CNY: { symbol: '¥', rate: 9.25, label: 'CNY (¥)' }
  },

  currentCurrency: 'GBP',

  residents: [
    {
      id: 'ama-k',
      name: 'Ama Konadu',
      origin: 'Accra, Ghana 🇬🇭',
      country: 'Ghana',
      flag: '🇬🇭',
      university: 'Glasgow Caledonian University (GCU)',
      course: 'MSc International Business & Data',
      propertyName: 'Buchanan View (Bronze En-suite)',
      avatar: 'assets/images/ama.jpg',
      isOnline: true,
      onlineStatus: 'Online Now',
      bio: 'Second-year international student from Ghana. I walk to GCU daily in under 8 mins. Ask me about winter heating, groceries, and safe arrival!',
      badge: 'Certified GCU Ambassador',
      helpTopics: ['Radiator Heating', 'Walking to GCU', 'African Groceries', 'CAS & Visa']
    },
    {
      id: 'david-s',
      name: 'David Smith',
      origin: 'Glasgow, UK 🇬🇧',
      country: 'UK',
      flag: '🇬🇧',
      university: 'University of Strathclyde',
      course: 'BSc Mechanical Engineering',
      propertyName: 'Merchant Studios (Silver Studio)',
      avatar: 'assets/images/james.jpg',
      isOnline: true,
      onlineStatus: 'Online Now',
      bio: 'Local Scottish resident ambassador. I help international flatmates with Scottish council tax exemption, Glasgow Subway, and budget food shopping.',
      badge: 'Verified Resident Host',
      helpTopics: ['Council Tax Exemption', 'Subway & Trains', 'Night Safety', 'Weather Gear']
    },
    {
      id: 'priya-p',
      name: 'Priya Patel',
      origin: 'Mumbai, India 🇮🇳',
      country: 'India',
      flag: '🇮🇳',
      university: 'University of Glasgow',
      course: 'MSc Data Science & AI',
      propertyName: 'Riverside Quay Student Residence',
      avatar: 'assets/images/meilin.jpg',
      isOnline: true,
      onlineStatus: 'Online Now',
      bio: 'International student from Mumbai. Commuting to Gilmorehill campus via subway is so convenient. Ask me about Indian groceries, quiet study spots, and bills!',
      badge: 'Verified UofG Ambassador',
      helpTopics: ['Subway Commute', 'Indian Spices & Groceries', 'Silent Study Desks', 'All Bills Included']
    },
    {
      id: 'sophie-m',
      name: 'Sophie Müller',
      origin: 'Munich, Germany 🇩🇪',
      country: 'Germany',
      flag: '🇩🇪',
      university: 'University of Edinburgh',
      course: 'MSc Sustainable Architecture',
      propertyName: 'Fountainbridge Village (Edinburgh)',
      avatar: 'assets/images/sophie.jpg',
      isOnline: false,
      onlineStatus: 'Active 10m ago',
      bio: 'Master student from Germany living in Edinburgh. Can advise on European student arrival, banking, and bike routes.',
      badge: 'Verified Edinburgh Ambassador',
      helpTopics: ['Edinburgh Campus', 'Bicycle Storage', 'EU Banking', 'Laundry Facilities']
    },
    {
      id: 'ravi-s',
      name: 'Ravi Sharma',
      origin: 'Kuala Lumpur, Malaysia 🇲🇾',
      country: 'Malaysia',
      flag: '🇲🇾',
      university: 'Glasgow Caledonian (GCU)',
      course: 'BSc Cyber Security',
      propertyName: 'Buchanan View (Block B)',
      avatar: 'assets/images/ravi.jpg',
      isOnline: false,
      onlineStatus: 'Active 25m ago',
      bio: 'From Malaysia studying cyber security. Buchanan View Wi-Fi is super fast (250Mbps LAN). Glad to help incoming Asian students!',
      badge: 'Verified Tech Ambassador',
      helpTopics: ['250Mbps Wi-Fi', 'Gym & Lounge', 'Airport Shuttle', 'Asian Supermarkets']
    }
  ],

  // Global Multi-Country Hierarchical Database (Country -> State/Province -> University)
  globalHierarchy: {
    uk: {
      name: 'United Kingdom 🇬🇧',
      code: 'uk',
      states: {
        scotland: {
          name: 'Scotland',
          universities: [
            { id: 'gcu', name: 'Glasgow Caledonian University (GCU)', city: 'Glasgow' },
            { id: 'strath', name: 'University of Strathclyde', city: 'Glasgow' },
            { id: 'uofg', name: 'University of Glasgow', city: 'Glasgow' },
            { id: 'uoe', name: 'University of Edinburgh', city: 'Edinburgh' },
            { id: 'uab', name: 'University of Aberdeen', city: 'Aberdeen' }
          ]
        },
        england: {
          name: 'England',
          universities: [
            { id: 'ucl', name: 'University College London (UCL)', city: 'London' },
            { id: 'kcl', name: 'King’s College London (KCL)', city: 'London' },
            { id: 'manchester', name: 'University of Manchester', city: 'Manchester' },
            { id: 'birmingham', name: 'University of Birmingham', city: 'Birmingham' }
          ]
        }
      }
    },
    usa: {
      name: 'United States 🇺🇸',
      code: 'usa',
      states: {
        ny: {
          name: 'New York',
          universities: [
            { id: 'columbia', name: 'Columbia University', city: 'New York City' },
            { id: 'nyu', name: 'New York University (NYU)', city: 'New York City' }
          ]
        },
        mass: {
          name: 'Massachusetts',
          universities: [
            { id: 'harvard', name: 'Harvard University', city: 'Boston / Cambridge' },
            { id: 'mit', name: 'MIT', city: 'Boston / Cambridge' }
          ]
        },
        california: {
          name: 'California',
          universities: [
            { id: 'berkeley', name: 'UC Berkeley', city: 'Berkeley' },
            { id: 'ucla', name: 'UCLA', city: 'Los Angeles' }
          ]
        }
      }
    },
    canada: {
      name: 'Canada 🇨🇦',
      code: 'canada',
      states: {
        ontario: {
          name: 'Ontario',
          universities: [
            { id: 'uoft', name: 'University of Toronto', city: 'Toronto' },
            { id: 'waterloo', name: 'University of Waterloo', city: 'Waterloo' }
          ]
        },
        bc: {
          name: 'British Columbia',
          universities: [
            { id: 'ubc', name: 'University of British Columbia', city: 'Vancouver' }
          ]
        }
      }
    },
    australia: {
      name: 'Australia 🇦🇺',
      code: 'australia',
      states: {
        nsw: {
          name: 'New South Wales',
          universities: [
            { id: 'usyd', name: 'University of Sydney', city: 'Sydney' },
            { id: 'unsw', name: 'UNSW Sydney', city: 'Sydney' }
          ]
        },
        vic: {
          name: 'Victoria',
          universities: [
            { id: 'unimelb', name: 'University of Melbourne', city: 'Melbourne' }
          ]
        }
      }
    },
    germany: {
      name: 'Germany 🇩🇪',
      code: 'germany',
      states: {
        bavaria: {
          name: 'Bavaria',
          universities: [
            { id: 'tum', name: 'Technical University of Munich (TUM)', city: 'Munich' },
            { id: 'lmu', name: 'LMU Munich', city: 'Munich' }
          ]
        },
        berlin: {
          name: 'Berlin',
          universities: [
            { id: 'hu-berlin', name: 'Humboldt University of Berlin', city: 'Berlin' }
          ]
        }
      }
    }
  },

  destinations: [
  {
    "id": "glasgow",
    "name": "Glasgow, Scotland",
    "country": "United Kingdom 🇬🇧",
    "count": 18
  },
  {
    "id": "edinburgh",
    "name": "Edinburgh, Scotland",
    "country": "United Kingdom 🇬🇧",
    "count": 14
  },
  {
    "id": "aberdeen",
    "name": "Aberdeen, Scotland",
    "country": "United Kingdom 🇬🇧",
    "count": 9
  },
  {
    "id": "london",
    "name": "London, England",
    "country": "United Kingdom 🇬🇧",
    "count": 32
  },
  {
    "id": "manchester",
    "name": "Manchester, England",
    "country": "United Kingdom 🇬🇧",
    "count": 16
  },
  {
    "id": "birmingham",
    "name": "Birmingham, England",
    "country": "United Kingdom 🇬🇧",
    "count": 12
  },
  {
    "id": "new-york",
    "name": "New York, USA",
    "country": "United States 🇺🇸",
    "count": 24
  },
  {
    "id": "boston",
    "name": "Boston / Cambridge, USA",
    "country": "United States 🇺🇸",
    "count": 18
  },
  {
    "id": "los-angeles",
    "name": "Los Angeles, USA",
    "country": "United States 🇺🇸",
    "count": 16
  },
  {
    "id": "berkeley",
    "name": "Berkeley, USA",
    "country": "United States 🇺🇸",
    "count": 14
  },
  {
    "id": "toronto",
    "name": "Toronto, Canada",
    "country": "Canada 🇨🇦",
    "count": 16
  },
  {
    "id": "waterloo",
    "name": "Waterloo, Canada",
    "country": "Canada 🇨🇦",
    "count": 11
  },
  {
    "id": "vancouver",
    "name": "Vancouver, Canada",
    "country": "Canada 🇨🇦",
    "count": 15
  },
  {
    "id": "sydney",
    "name": "Sydney, Australia",
    "country": "Australia 🇦🇺",
    "count": 19
  },
  {
    "id": "melbourne",
    "name": "Melbourne, Australia",
    "country": "Australia 🇦🇺",
    "count": 17
  },
  {
    "id": "munich",
    "name": "Munich, Germany",
    "country": "Germany 🇩🇪",
    "count": 15
  },
  {
    "id": "berlin",
    "name": "Berlin, Germany",
    "country": "Germany 🇩🇪",
    "count": 14
  }
],

  // Comprehensive Verified Properties Covering All Cities, States & Universities
  properties: [
  {
    "id": "buchanan-view",
    "title": "Buchanan View - Glasgow City Centre",
    "tagline": "Best for Glasgow Caledonian & Strathclyde students",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Glasgow",
    "district": "Glasgow",
    "address": "33 Calgary St, Glasgow G4 0XG, United Kingdom",
    "universityId": "gcu",
    "university": "gcu",
    "supportedUniversities": [
      "gcu",
      "strath",
      "uofg"
    ],
    "supportedUnis": [
      "gcu",
      "strath",
      "uofg"
    ],
    "universityName": "Glasgow Caledonian University (GCU)",
    "uniName": "Glasgow Caledonian (GCU)",
    "roomType": "studio",
    "roomTypeTitle": "Bronze En-suite Studio (18m²)",
    "pricePerWeekGBP": 189,
    "priceGBP": 189,
    "depositGBP": 150,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 142,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "8 min walk to GCU • 12 min walk to Strathclyde",
    "commutes": [
      {
        "dest": "Glasgow Caledonian University",
        "uniId": "gcu",
        "time": "8 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      },
      {
        "dest": "University of Strathclyde",
        "uniId": "strath",
        "time": "12 min walk",
        "distance": "0.7 mi",
        "type": "walk"
      },
      {
        "dest": "University of Glasgow",
        "uniId": "uofg",
        "time": "18 min subway",
        "distance": "1.9 mi",
        "type": "subway"
      }
    ],
    "featuredResidentId": "ama-k",
    "residentName": "Ama Konadu",
    "residentId": "ama-k",
    "tourData": {
      "panoImage": "assets/images/buchanan_360_panorama.jpg",
      "roomTypeTitle": "Bronze En-suite Studio (18m²)",
      "scenes": [
        {
          "id": "studio-bedroom",
          "name": "Studio Bedroom",
          "sub": "Bronze En-suite (18m²)",
          "image": "assets/images/buchanan_360_panorama.jpg",
          "isPano": true,
          "icon": "fa-bed"
        },
        {
          "id": "ensuite-bath",
          "name": "Private En-suite",
          "sub": "Power shower & heated rack",
          "image": "assets/images/bathroom.jpg",
          "isPano": false,
          "icon": "fa-shower"
        },
        {
          "id": "student-lounge",
          "name": "Social Lounge",
          "sub": "Resident study pods & games",
          "image": "assets/images/student_lounge.jpg",
          "isPano": false,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide-overview",
          "name": "360° Wide Overview",
          "shortName": "360° Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100% Wide",
          "description": "Full 360° wide perspective showing layout, bed, study desk, and kitchenette pod.",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        },
        {
          "id": "desk-angle",
          "name": "Ergonomic Study Desk",
          "shortName": "Study Desk",
          "icon": "fa-laptop",
          "zoomLevel": "200% Zoom",
          "description": "Inspection angle of study desk, task chair, high-speed Wi-Fi point.",
          "pitch": -13,
          "yaw": 24,
          "hfov": 50
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Buchanan View - Glasgow City Centre"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "the-foundry",
    "title": "The Foundry - Merchant City",
    "tagline": "Modern luxury student living in Glasgow cultural quarter",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Glasgow",
    "district": "Glasgow",
    "address": "47 High Street, Glasgow G1 1LX, United Kingdom",
    "universityId": "strath",
    "university": "strath",
    "supportedUniversities": [
      "strath",
      "gcu",
      "uofg"
    ],
    "supportedUnis": [
      "strath",
      "gcu",
      "uofg"
    ],
    "universityName": "University of Strathclyde",
    "uniName": "University of Strathclyde",
    "roomType": "studio",
    "roomTypeTitle": "Premium Studio with Skyline Views (22m²)",
    "pricePerWeekGBP": 215,
    "priceGBP": 215,
    "depositGBP": 150,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.95,
    "reviewsCount": 98,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "6 min walk to Strathclyde • 10 min bus to GCU",
    "commutes": [
      {
        "dest": "University of Strathclyde",
        "uniId": "strath",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      },
      {
        "dest": "Glasgow Caledonian University",
        "uniId": "gcu",
        "time": "11 min walk",
        "distance": "0.6 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Premium Studio with Skyline Views (22m²)",
      "scenes": [
        {
          "id": "studio-bedroom",
          "name": "Studio Bedroom",
          "sub": "Premium Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide-overview",
          "name": "360° Wide Overview",
          "shortName": "360° Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100% Wide",
          "description": "Wide studio view.",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "The Foundry - Merchant City"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kelvin-court",
    "title": "Kelvin Court - Glasgow West End",
    "tagline": "Quiet leafy West End living near University of Glasgow Gilmorehill",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Glasgow",
    "district": "Glasgow",
    "address": "25 University Ave, Glasgow G12 8QQ, United Kingdom",
    "universityId": "uofg",
    "university": "uofg",
    "supportedUniversities": [
      "uofg",
      "gcu",
      "strath"
    ],
    "supportedUnis": [
      "uofg",
      "gcu",
      "strath"
    ],
    "universityName": "University of Glasgow",
    "uniName": "University of Glasgow",
    "roomType": "ensuite",
    "roomTypeTitle": "Deluxe Ensuite in 4-Bed Flat (19m²)",
    "pricePerWeekGBP": 198,
    "priceGBP": 198,
    "depositGBP": 150,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (4 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 64,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "6 min walk to UofG • 12 min subway to GCU",
    "commutes": [
      {
        "dest": "University of Glasgow Main Quad",
        "uniId": "uofg",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      },
      {
        "dest": "Hillhead Subway Station",
        "uniId": "transit",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "priya-p",
    "residentName": "Priya Patel",
    "residentId": "priya-p",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Deluxe Ensuite in 4-Bed Flat (19m²)",
      "scenes": [
        {
          "id": "ensuite-bedroom",
          "name": "Ensuite Room",
          "sub": "Deluxe Ensuite",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide-overview",
          "name": "360° Wide Overview",
          "shortName": "360° Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100% Wide",
          "description": "Ensuite view.",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Kelvin Court - Glasgow West End"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "riverside-quay",
    "title": "Riverside Quay Student Residence - Glasgow",
    "tagline": "Scenic riverside student living with private fitness gym",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Glasgow",
    "district": "Glasgow",
    "address": "120 Clyde St, Glasgow G1 4JH, United Kingdom",
    "universityId": "uofg",
    "university": "uofg",
    "supportedUniversities": [
      "uofg",
      "strath",
      "gcu"
    ],
    "supportedUnis": [
      "uofg",
      "strath",
      "gcu"
    ],
    "universityName": "University of Glasgow",
    "uniName": "University of Glasgow",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Private Riverside Apartment (32m²)",
    "pricePerWeekGBP": 235,
    "priceGBP": 235,
    "depositGBP": 175,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.86,
    "reviewsCount": 115,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "12 min subway to Univ of Glasgow • 10 min walk to Strathclyde",
    "commutes": [
      {
        "dest": "University of Glasgow",
        "uniId": "uofg",
        "time": "12 min subway",
        "distance": "1.8 mi",
        "type": "subway"
      },
      {
        "dest": "University of Strathclyde",
        "uniId": "strath",
        "time": "10 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "ama-k",
    "residentName": "Ama Konadu",
    "residentId": "ama-k",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Private Riverside Apartment",
      "scenes": [
        {
          "id": "apt-living",
          "name": "Living Space",
          "sub": "Apartment",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide-overview",
          "name": "360° Overview",
          "shortName": "360° Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100% Wide",
          "description": "Apartment layout.",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Riverside Quay Student Residence - Glasgow"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "salisbury-court",
    "title": "Salisbury Court - Edinburgh Old Town",
    "tagline": "Historic Edinburgh charm, 9-minute walk to Central George Square campus",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Edinburgh",
    "district": "Edinburgh",
    "address": "22 Salisbury Place, Edinburgh EH9 1SH, United Kingdom",
    "universityId": "uoe",
    "university": "uoe",
    "supportedUniversities": [
      "uoe"
    ],
    "supportedUnis": [
      "uoe"
    ],
    "universityName": "University of Edinburgh",
    "uniName": "University of Edinburgh",
    "roomType": "ensuite",
    "roomTypeTitle": "Classic En-suite Room (20m²)",
    "pricePerWeekGBP": 228,
    "priceGBP": 228,
    "depositGBP": 160,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (5 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 84,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "9 min walk to Central George Square campus",
    "commutes": [
      {
        "dest": "University of Edinburgh George Sq",
        "uniId": "uoe",
        "time": "9 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      },
      {
        "dest": "Edinburgh Waverley Station",
        "uniId": "transit",
        "time": "18 min walk",
        "distance": "1.0 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Classic En-suite Room (20m²)",
      "scenes": [
        {
          "id": "ensuite-bedroom",
          "name": "Ensuite Room",
          "sub": "Classic Ensuite",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide-overview",
          "name": "360° Wide Overview",
          "shortName": "360° Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100% Wide",
          "description": "Room view.",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Salisbury Court - Edinburgh Old Town"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "fountainbridge-village",
    "title": "Fountainbridge Student Village - Edinburgh",
    "tagline": "Modern studio apartments with scenic views of Edinburgh Castle",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Edinburgh",
    "district": "Edinburgh",
    "address": "114 Fountainbridge, Edinburgh EH3 9QG, United Kingdom",
    "universityId": "uoe",
    "university": "uoe",
    "supportedUniversities": [
      "uoe"
    ],
    "supportedUnis": [
      "uoe"
    ],
    "universityName": "University of Edinburgh",
    "uniName": "University of Edinburgh",
    "roomType": "studio",
    "roomTypeTitle": "Castle View Executive Studio (22m²)",
    "pricePerWeekGBP": 245,
    "priceGBP": 245,
    "depositGBP": 180,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.92,
    "reviewsCount": 92,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "12 min walk to Central Campus • 5 min to Union Canal",
    "commutes": [
      {
        "dest": "University of Edinburgh George Sq",
        "uniId": "uoe",
        "time": "12 min walk",
        "distance": "0.7 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Castle View Executive Studio",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Executive Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "360° Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "Overview",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Fountainbridge Student Village - Edinburgh"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "silk-mill-edinburgh",
    "title": "The Silk Mill - Haymarket Edinburgh",
    "tagline": "Contemporary 1-bedroom apartments near Haymarket tram and train station",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Edinburgh",
    "district": "Edinburgh",
    "address": "162 Dundee St, Edinburgh EH11 1DQ, United Kingdom",
    "universityId": "uoe",
    "university": "uoe",
    "supportedUniversities": [
      "uoe"
    ],
    "supportedUnis": [
      "uoe"
    ],
    "universityName": "University of Edinburgh",
    "uniName": "University of Edinburgh",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Private Apartment (34m²)",
    "pricePerWeekGBP": 265,
    "priceGBP": 265,
    "depositGBP": 190,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 52,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "14 min tram/walk to Central Campus • 6 min to Princes St",
    "commutes": [
      {
        "dest": "University of Edinburgh",
        "uniId": "uoe",
        "time": "14 min walk",
        "distance": "0.8 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Private Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bedroom",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "The Silk Mill - Haymarket Edinburgh"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kings-links-lodge",
    "title": "King’s Links Student Lodge - Aberdeen",
    "tagline": "Coastal breezes and quick bus connection to King’s College Old Aberdeen",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Aberdeen",
    "district": "Aberdeen",
    "address": "Golf Road, Aberdeen AB24 1SL, United Kingdom",
    "universityId": "uab",
    "university": "uab",
    "supportedUniversities": [
      "uab"
    ],
    "supportedUnis": [
      "uab"
    ],
    "universityName": "University of Aberdeen",
    "uniName": "University of Aberdeen",
    "roomType": "ensuite",
    "roomTypeTitle": "Standard En-suite Room (18m²)",
    "pricePerWeekGBP": 165,
    "priceGBP": 165,
    "depositGBP": 120,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.84,
    "reviewsCount": 48,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "10 min walk to University of Aberdeen King’s College",
    "commutes": [
      {
        "dest": "University of Aberdeen King’s College",
        "uniId": "uab",
        "time": "10 min walk",
        "distance": "0.6 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Standard En-suite Room (18m²)",
      "scenes": [
        {
          "id": "ensuite",
          "name": "Ensuite",
          "sub": "Standard",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "King’s Links Student Lodge - Aberdeen"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "granite-city-studios",
    "title": "Granite City Studios - Old Aberdeen",
    "tagline": "Modern private studios right by University of Aberdeen Sir Duncan Rice Library",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Aberdeen",
    "district": "Aberdeen",
    "address": "Bedford Road, Aberdeen AB24 3AA, United Kingdom",
    "universityId": "uab",
    "university": "uab",
    "supportedUniversities": [
      "uab"
    ],
    "supportedUnis": [
      "uab"
    ],
    "universityName": "University of Aberdeen",
    "uniName": "University of Aberdeen",
    "roomType": "studio",
    "roomTypeTitle": "Bronze Studio with Kitchenette (20m²)",
    "pricePerWeekGBP": 178,
    "priceGBP": 178,
    "depositGBP": 130,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.87,
    "reviewsCount": 39,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "5 min walk to Old Aberdeen Campus & Library",
    "commutes": [
      {
        "dest": "University of Aberdeen Old Campus",
        "uniId": "uab",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Bronze Studio with Kitchenette",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Bronze Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Granite City Studios - Old Aberdeen"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "old-aberdeen-lofts",
    "title": "Dee View Student Apartments - Aberdeen",
    "tagline": "Spacious 1-bedroom apartments with separate study and living room",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "scotland",
    "stateName": "Scotland",
    "city": "Aberdeen",
    "district": "Aberdeen",
    "address": "King Street, Aberdeen AB24 5BH, United Kingdom",
    "universityId": "uab",
    "university": "uab",
    "supportedUniversities": [
      "uab"
    ],
    "supportedUnis": [
      "uab"
    ],
    "universityName": "University of Aberdeen",
    "uniName": "University of Aberdeen",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Executive Student Apartment (30m²)",
    "pricePerWeekGBP": 195,
    "priceGBP": 195,
    "depositGBP": 140,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.85,
    "reviewsCount": 31,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "8 min bus to University of Aberdeen • 5 min walk to City Centre",
    "commutes": [
      {
        "dest": "University of Aberdeen",
        "uniId": "uab",
        "time": "8 min bus",
        "distance": "1.1 mi",
        "type": "bus"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Executive Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Dee View Student Apartments - Aberdeen"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "bloomsbury-residence",
    "title": "Bloomsbury Student Quarters - Central London",
    "tagline": "Zone 1 location in the heart of London’s academic district",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "London",
    "district": "London",
    "address": "15 Woburn Place, Bloomsbury, London WC1H 0JJ, United Kingdom",
    "universityId": "ucl",
    "university": "ucl",
    "supportedUniversities": [
      "ucl",
      "kcl"
    ],
    "supportedUnis": [
      "ucl",
      "kcl"
    ],
    "universityName": "University College London (UCL)",
    "uniName": "UCL London",
    "roomType": "studio",
    "roomTypeTitle": "Zone 1 Private Studio (21m²)",
    "pricePerWeekGBP": 310,
    "priceGBP": 310,
    "depositGBP": 200,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (2 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.91,
    "reviewsCount": 160,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "6 min walk to UCL Main Quad • 15 min bus to King’s College Strand",
    "commutes": [
      {
        "dest": "UCL Main Quad Gower St",
        "uniId": "ucl",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      },
      {
        "dest": "King’s College London Strand",
        "uniId": "kcl",
        "time": "15 min bus",
        "distance": "1.1 mi",
        "type": "bus"
      }
    ],
    "featuredResidentId": "chen-w",
    "residentName": "Chen Wei",
    "residentId": "chen-w",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Zone 1 Private Studio (21m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Zone 1 Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Bloomsbury Student Quarters - Central London"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "chapter-spitalfields",
    "title": "Chapter Spitalfields - London City",
    "tagline": "Iconic 33-floor student tower with skyline views over London City",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "London",
    "district": "London",
    "address": "9 Frying Pan Alley, Spitalfields, London E1 7HS, United Kingdom",
    "universityId": "kcl",
    "university": "kcl",
    "supportedUniversities": [
      "kcl",
      "ucl"
    ],
    "supportedUnis": [
      "kcl",
      "ucl"
    ],
    "universityName": "King’s College London (KCL)",
    "uniName": "King’s College London (KCL)",
    "roomType": "studio",
    "roomTypeTitle": "Sky Studio with Panoramic Skyline (22m²)",
    "pricePerWeekGBP": 345,
    "priceGBP": 345,
    "depositGBP": 200,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 130,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "12 min tube to King’s College Strand • 16 min tube to UCL",
    "commutes": [
      {
        "dest": "King’s College London Strand",
        "uniId": "kcl",
        "time": "12 min tube",
        "distance": "1.9 mi",
        "type": "tube"
      }
    ],
    "featuredResidentId": "chen-w",
    "residentName": "Chen Wei",
    "residentId": "chen-w",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Sky Studio with Panoramic Skyline",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Sky Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Chapter Spitalfields - London City"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kings-cross-studios",
    "title": "Kings Cross Student Living - London Bloomsbury",
    "tagline": "Modern en-suite accommodation near St Pancras International and British Library",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "London",
    "district": "London",
    "address": "200 Pentonville Rd, London N1 9JP, United Kingdom",
    "universityId": "ucl",
    "university": "ucl",
    "supportedUniversities": [
      "ucl",
      "kcl"
    ],
    "supportedUnis": [
      "ucl",
      "kcl"
    ],
    "universityName": "University College London (UCL)",
    "uniName": "UCL London",
    "roomType": "ensuite",
    "roomTypeTitle": "Deluxe En-suite Room in Shared Flat (19m²)",
    "pricePerWeekGBP": 280,
    "priceGBP": 280,
    "depositGBP": 180,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 95,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "10 min walk to British Library • 14 min walk to UCL",
    "commutes": [
      {
        "dest": "UCL Bloomsbury",
        "uniId": "ucl",
        "time": "14 min walk",
        "distance": "0.8 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "chen-w",
    "residentName": "Chen Wei",
    "residentId": "chen-w",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Deluxe En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Kings Cross Student Living - London Bloomsbury"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "south-bank-tower",
    "title": "South Bank Student Suites - London",
    "tagline": "Riverside luxury 1-bedroom apartments directly across Waterloo Bridge",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "London",
    "district": "London",
    "address": "50 Stamford St, South Bank, London SE1 9LQ, United Kingdom",
    "universityId": "kcl",
    "university": "kcl",
    "supportedUniversities": [
      "kcl",
      "ucl"
    ],
    "supportedUnis": [
      "kcl",
      "ucl"
    ],
    "universityName": "King’s College London (KCL)",
    "uniName": "King’s College London (KCL)",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Private Apartment (35m²)",
    "pricePerWeekGBP": 360,
    "priceGBP": 360,
    "depositGBP": 220,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.94,
    "reviewsCount": 88,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "7 min walk to King’s Waterloo & Guy’s Campus • 12 min to Strand",
    "commutes": [
      {
        "dest": "King’s College Waterloo Campus",
        "uniId": "kcl",
        "time": "7 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "chen-w",
    "residentName": "Chen Wei",
    "residentId": "chen-w",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Private Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "South Bank Student Suites - London"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "oxford-road-lodge",
    "title": "Oxford Road Student Residence - Manchester",
    "tagline": "Right on Oxford Road university corridor, 5-minute walk to main campus",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Manchester",
    "district": "Manchester",
    "address": "140 Oxford Road, Manchester M13 9GP, United Kingdom",
    "universityId": "manchester",
    "university": "manchester",
    "supportedUniversities": [
      "manchester"
    ],
    "supportedUnis": [
      "manchester"
    ],
    "universityName": "University of Manchester",
    "uniName": "University of Manchester",
    "roomType": "studio",
    "roomTypeTitle": "Standard En-suite Studio (19m²)",
    "pricePerWeekGBP": 210,
    "priceGBP": 210,
    "depositGBP": 150,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (4 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 78,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "5 min walk to University of Manchester Main Quad",
    "commutes": [
      {
        "dest": "University of Manchester",
        "uniId": "manchester",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Standard En-suite Studio",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Standard",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Oxford Road Student Residence - Manchester"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "piccadilly-point",
    "title": "Piccadilly Point Quarters - Manchester City",
    "tagline": "Vibrant city centre student residence near Manchester Piccadilly Station",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Manchester",
    "district": "Manchester",
    "address": "2 Berry St, Manchester M1 2AD, United Kingdom",
    "universityId": "manchester",
    "university": "manchester",
    "supportedUniversities": [
      "manchester"
    ],
    "supportedUnis": [
      "manchester"
    ],
    "universityName": "University of Manchester",
    "uniName": "University of Manchester",
    "roomType": "ensuite",
    "roomTypeTitle": "Gold En-suite Room in Shared Apartment (18m²)",
    "pricePerWeekGBP": 185,
    "priceGBP": 185,
    "depositGBP": 140,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.86,
    "reviewsCount": 65,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "12 min walk / 6 min bus to Oxford Road campus",
    "commutes": [
      {
        "dest": "University of Manchester North Campus",
        "uniId": "manchester",
        "time": "8 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Gold En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Piccadilly Point Quarters - Manchester City"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "fallowfield-studios",
    "title": "Fallowfield Park Residences - South Manchester",
    "tagline": "Quiet suburban leafy student living with direct bus to campus",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Manchester",
    "district": "Manchester",
    "address": "Wilmslow Rd, Fallowfield, Manchester M14 6HD, United Kingdom",
    "universityId": "manchester",
    "university": "manchester",
    "supportedUniversities": [
      "manchester"
    ],
    "supportedUnis": [
      "manchester"
    ],
    "universityName": "University of Manchester",
    "uniName": "University of Manchester",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Garden Apartment (32m²)",
    "pricePerWeekGBP": 225,
    "priceGBP": 225,
    "depositGBP": 160,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.87,
    "reviewsCount": 54,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "10 min direct bus to University of Manchester along Oxford Rd",
    "commutes": [
      {
        "dest": "University of Manchester Main Quad",
        "uniId": "manchester",
        "time": "10 min bus",
        "distance": "1.4 mi",
        "type": "bus"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Garden Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Fallowfield Park Residences - South Manchester"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "selly-oak-living",
    "title": "Selly Oak Student Living - Birmingham",
    "tagline": "Popular student neighborhood right beside University of Birmingham campus",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Birmingham",
    "district": "Birmingham",
    "address": "560 Bristol Road, Selly Oak, Birmingham B29 6BE, United Kingdom",
    "universityId": "birmingham",
    "university": "birmingham",
    "supportedUniversities": [
      "birmingham"
    ],
    "supportedUnis": [
      "birmingham"
    ],
    "universityName": "University of Birmingham",
    "uniName": "University of Birmingham",
    "roomType": "studio",
    "roomTypeTitle": "Bronze En-suite Studio (18m²)",
    "pricePerWeekGBP": 195,
    "priceGBP": 195,
    "depositGBP": 140,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.87,
    "reviewsCount": 62,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "8 min walk to University of Birmingham Edgbaston Campus",
    "commutes": [
      {
        "dest": "University of Birmingham Main Quad",
        "uniId": "birmingham",
        "time": "8 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Bronze En-suite Studio",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Bronze",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Selly Oak Student Living - Birmingham"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "aston-brook-residence",
    "title": "Aston Brook Student Quarters - Birmingham",
    "tagline": "Modern and budget-friendly en-suite rooms with superfast Wi-Fi and study lounge",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Birmingham",
    "district": "Birmingham",
    "address": "Aston Brook St, Birmingham B6 4SL, United Kingdom",
    "universityId": "birmingham",
    "university": "birmingham",
    "supportedUniversities": [
      "birmingham"
    ],
    "supportedUnis": [
      "birmingham"
    ],
    "universityName": "University of Birmingham",
    "uniName": "University of Birmingham",
    "roomType": "ensuite",
    "roomTypeTitle": "Silver En-suite Room in 4-Bed Flat (18m²)",
    "pricePerWeekGBP": 165,
    "priceGBP": 165,
    "depositGBP": 130,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.83,
    "reviewsCount": 47,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "14 min train / bus to University of Birmingham",
    "commutes": [
      {
        "dest": "University of Birmingham",
        "uniId": "birmingham",
        "time": "14 min train",
        "distance": "2.1 mi",
        "type": "train"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Silver En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "Silver Ensuite",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Aston Brook Student Quarters - Birmingham"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "edgbaston-park-suites",
    "title": "Edgbaston Park Suites - Birmingham",
    "tagline": "Premium 1-bedroom apartments adjacent to Birmingham Botanical Gardens",
    "countryCode": "uk",
    "country": "uk",
    "countryName": "United Kingdom 🇬🇧",
    "stateCode": "england",
    "stateName": "England",
    "city": "Birmingham",
    "district": "Birmingham",
    "address": "Edgbaston Park Rd, Birmingham B15 2RA, United Kingdom",
    "universityId": "birmingham",
    "university": "birmingham",
    "supportedUniversities": [
      "birmingham"
    ],
    "supportedUnis": [
      "birmingham"
    ],
    "universityName": "University of Birmingham",
    "uniName": "University of Birmingham",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Parkside Apartment (32m²)",
    "pricePerWeekGBP": 220,
    "priceGBP": 220,
    "depositGBP": 160,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 38,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "6 min walk to University of Birmingham East Gate",
    "commutes": [
      {
        "dest": "University of Birmingham East Gate",
        "uniId": "birmingham",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "david-s",
    "residentName": "David Smith",
    "residentId": "david-s",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Parkside Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Edgbaston Park Suites - Birmingham"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "manhattan-student-loft",
    "title": "Manhattan Student Loft - Morningside Heights",
    "tagline": "Charming Manhattan loft 6-minute walk to Columbia University campus",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "ny",
    "stateName": "New York",
    "city": "New York City",
    "district": "New York City",
    "address": "610 W 114th St, New York, NY 10025, United States",
    "universityId": "columbia",
    "university": "columbia",
    "supportedUniversities": [
      "columbia"
    ],
    "supportedUnis": [
      "columbia"
    ],
    "universityName": "Columbia University",
    "uniName": "Columbia University",
    "roomType": "studio",
    "roomTypeTitle": "Private Loft Studio (23m²)",
    "pricePerWeekGBP": 360,
    "priceGBP": 360,
    "depositGBP": 250,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.92,
    "reviewsCount": 75,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "6 min walk to Columbia Morningside Campus • 18 min subway to Midtown",
    "commutes": [
      {
        "dest": "Columbia University Main Quad",
        "uniId": "columbia",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Private Loft Studio (23m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Manhattan Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Manhattan Student Loft - Morningside Heights"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "greenwich-village-suites",
    "title": "Greenwich Village Suites - NYU Washington Square",
    "tagline": "Heart of Greenwich Village, 5-minute walk to NYU Stern and Bobst Library",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "ny",
    "stateName": "New York",
    "city": "New York City",
    "district": "New York City",
    "address": "85 W 3rd St, New York, NY 10012, United States",
    "universityId": "nyu",
    "university": "nyu",
    "supportedUniversities": [
      "nyu"
    ],
    "supportedUnis": [
      "nyu"
    ],
    "universityName": "New York University (NYU)",
    "uniName": "New York University (NYU)",
    "roomType": "ensuite",
    "roomTypeTitle": "Village En-suite Private Room (19m²)",
    "pricePerWeekGBP": 340,
    "priceGBP": 340,
    "depositGBP": 240,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.94,
    "reviewsCount": 82,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "5 min walk to Washington Square Park & NYU Campus",
    "commutes": [
      {
        "dest": "NYU Washington Square Park",
        "uniId": "nyu",
        "time": "5 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Village En-suite Private Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "Village Ensuite",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Greenwich Village Suites - NYU Washington Square"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "columbia-heights",
    "title": "Morningside Heights Residences - New York",
    "tagline": "Spacious 1-bedroom apartment overlooking Riverside Park and Hudson River",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "ny",
    "stateName": "New York",
    "city": "New York City",
    "district": "New York City",
    "address": "540 W 122nd St, New York, NY 10027, United States",
    "universityId": "columbia",
    "university": "columbia",
    "supportedUniversities": [
      "columbia",
      "nyu"
    ],
    "supportedUnis": [
      "columbia",
      "nyu"
    ],
    "universityName": "Columbia University",
    "uniName": "Columbia University",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Private Apartment (36m²)",
    "pricePerWeekGBP": 385,
    "priceGBP": 385,
    "depositGBP": 260,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.95,
    "reviewsCount": 68,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "8 min walk to Columbia Quad • 22 min subway to NYU",
    "commutes": [
      {
        "dest": "Columbia University Quad",
        "uniId": "columbia",
        "time": "8 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Private Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Morningside Heights Residences - New York"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "cambridge-court-boston",
    "title": "Cambridge Common Student Residence - Boston",
    "tagline": "Steps away from Harvard Yard and Harvard Square Red Line subway",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "mass",
    "stateName": "Massachusetts",
    "city": "Boston / Cambridge",
    "district": "Boston / Cambridge",
    "address": "18 Garden St, Cambridge, MA 02138, United States",
    "universityId": "harvard",
    "university": "harvard",
    "supportedUniversities": [
      "harvard",
      "mit"
    ],
    "supportedUnis": [
      "harvard",
      "mit"
    ],
    "universityName": "Harvard University",
    "uniName": "Harvard University",
    "roomType": "studio",
    "roomTypeTitle": "Harvard Square Studio (22m²)",
    "pricePerWeekGBP": 350,
    "priceGBP": 350,
    "depositGBP": 240,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 56,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "4 min walk to Harvard Yard • 12 min Red Line to MIT",
    "commutes": [
      {
        "dest": "Harvard Yard & Square",
        "uniId": "harvard",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      },
      {
        "dest": "MIT Kendall Square",
        "uniId": "mit",
        "time": "12 min subway",
        "distance": "1.9 mi",
        "type": "subway"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Harvard Square Studio (22m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Harvard Studio",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Cambridge Common Student Residence - Boston"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kendall-square-lofts",
    "title": "Kendall Square Tech Suites - Cambridge / MIT",
    "tagline": "Modern tech-corridor student suites 5-minute walk to MIT campus",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "mass",
    "stateName": "Massachusetts",
    "city": "Boston / Cambridge",
    "district": "Boston / Cambridge",
    "address": "290 Main St, Cambridge, MA 02142, United States",
    "universityId": "mit",
    "university": "mit",
    "supportedUniversities": [
      "mit",
      "harvard"
    ],
    "supportedUnis": [
      "mit",
      "harvard"
    ],
    "universityName": "MIT",
    "uniName": "MIT",
    "roomType": "studio",
    "roomTypeTitle": "Kendall Innovation Studio (22m²)",
    "pricePerWeekGBP": 360,
    "priceGBP": 360,
    "depositGBP": 250,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.95,
    "reviewsCount": 64,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "5 min walk to MIT Dome & Computer Science labs",
    "commutes": [
      {
        "dest": "MIT Great Dome Quad",
        "uniId": "mit",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Kendall Innovation Studio",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "MIT Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Kendall Square Tech Suites - Cambridge / MIT"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "charles-river-apartments",
    "title": "Charles River View Student Residences - Boston",
    "tagline": "Riverfront 1-bedroom apartments with easy access to both MIT and Harvard",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "mass",
    "stateName": "Massachusetts",
    "city": "Boston / Cambridge",
    "district": "Boston / Cambridge",
    "address": "808 Memorial Dr, Cambridge, MA 02139, United States",
    "universityId": "harvard",
    "university": "harvard",
    "supportedUniversities": [
      "harvard",
      "mit"
    ],
    "supportedUnis": [
      "harvard",
      "mit"
    ],
    "universityName": "Harvard University",
    "uniName": "Harvard University",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Riverfront Apartment (35m²)",
    "pricePerWeekGBP": 390,
    "priceGBP": 390,
    "depositGBP": 260,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.91,
    "reviewsCount": 42,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "10 min walk to Harvard Business School • 15 min bus to MIT",
    "commutes": [
      {
        "dest": "Harvard Campus",
        "uniId": "harvard",
        "time": "10 min walk",
        "distance": "0.6 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Riverfront Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Charles River View Student Residences - Boston"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "westwood-quarters-la",
    "title": "Westwood Boulevard Student Residence - Los Angeles",
    "tagline": "Sunny Southern California living, 8-minute walk to UCLA campus",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Los Angeles",
    "district": "Los Angeles",
    "address": "10920 Wilshire Blvd, Westwood, Los Angeles, CA 90024, United States",
    "universityId": "ucla",
    "university": "ucla",
    "supportedUniversities": [
      "ucla"
    ],
    "supportedUnis": [
      "ucla"
    ],
    "universityName": "UCLA",
    "uniName": "UCLA",
    "roomType": "studio",
    "roomTypeTitle": "California Studio with Balcony (22m²)",
    "pricePerWeekGBP": 340,
    "priceGBP": 340,
    "depositGBP": 240,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 68,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "8 min walk to UCLA Royce Hall & Westwood Village",
    "commutes": [
      {
        "dest": "UCLA Royce Hall & Campus",
        "uniId": "ucla",
        "time": "8 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "California Studio with Balcony",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "UCLA Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Westwood Boulevard Student Residence - Los Angeles"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "bruin-walk-residences",
    "title": "Bruin Walk Student Living - Los Angeles",
    "tagline": "Modern en-suite rooms with pool and rooftop lounge in Westwood",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Los Angeles",
    "district": "Los Angeles",
    "address": "650 Gayley Ave, Los Angeles, CA 90024, United States",
    "universityId": "ucla",
    "university": "ucla",
    "supportedUniversities": [
      "ucla"
    ],
    "supportedUnis": [
      "ucla"
    ],
    "universityName": "UCLA",
    "uniName": "UCLA",
    "roomType": "ensuite",
    "roomTypeTitle": "Westwood En-suite Room in Shared Suite (20m²)",
    "pricePerWeekGBP": 295,
    "priceGBP": 295,
    "depositGBP": 210,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 52,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "6 min walk to UCLA Athletic Center & South Campus",
    "commutes": [
      {
        "dest": "UCLA South Campus",
        "uniId": "ucla",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Westwood En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Bruin Walk Student Living - Los Angeles"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "telegraph-ave-suites",
    "title": "Telegraph Avenue Suites - UC Berkeley",
    "tagline": "Vibrant student community 5-minute walk to UC Berkeley Sather Gate",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Berkeley",
    "district": "Berkeley",
    "address": "2400 Telegraph Ave, Berkeley, CA 94704, United States",
    "universityId": "berkeley",
    "university": "berkeley",
    "supportedUniversities": [
      "berkeley"
    ],
    "supportedUnis": [
      "berkeley"
    ],
    "universityName": "UC Berkeley",
    "uniName": "UC Berkeley",
    "roomType": "studio",
    "roomTypeTitle": "Telegraph Studio with Private Bath (21m²)",
    "pricePerWeekGBP": 335,
    "priceGBP": 335,
    "depositGBP": 230,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.91,
    "reviewsCount": 60,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "5 min walk to UC Berkeley Sather Gate & Sproul Plaza",
    "commutes": [
      {
        "dest": "UC Berkeley Sather Gate",
        "uniId": "berkeley",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Telegraph Studio with Private Bath",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Berkeley Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Telegraph Avenue Suites - UC Berkeley"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "berkeley-hills-living",
    "title": "Berkeley Hills Student Lofts - UC Berkeley",
    "tagline": "Scenic views of San Francisco Bay, 1-bedroom apartments near North Gate",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Berkeley",
    "district": "Berkeley",
    "address": "1800 Euclid Ave, Berkeley, CA 94709, United States",
    "universityId": "berkeley",
    "university": "berkeley",
    "supportedUniversities": [
      "berkeley"
    ],
    "supportedUnis": [
      "berkeley"
    ],
    "universityName": "UC Berkeley",
    "uniName": "UC Berkeley",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Bay View Apartment (34m²)",
    "pricePerWeekGBP": 370,
    "priceGBP": 370,
    "depositGBP": 250,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 44,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "7 min walk to UC Berkeley College of Engineering",
    "commutes": [
      {
        "dest": "UC Berkeley North Gate",
        "uniId": "berkeley",
        "time": "7 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Bay View Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Berkeley Hills Student Lofts - UC Berkeley"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "bay-street-suites",
    "title": "Bay & Bloor Student Residence - Toronto",
    "tagline": "Downtown Discovery District, 8-minute walk to UofT St. George campus",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Toronto",
    "district": "Toronto",
    "address": "88 Bloor St W, Toronto, ON M5S 1M5, Canada",
    "universityId": "uoft",
    "university": "uoft",
    "supportedUniversities": [
      "uoft"
    ],
    "supportedUnis": [
      "uoft"
    ],
    "universityName": "University of Toronto",
    "uniName": "University of Toronto",
    "roomType": "studio",
    "roomTypeTitle": "Downtown En-suite Studio (20m²)",
    "pricePerWeekGBP": 265,
    "priceGBP": 265,
    "depositGBP": 180,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (4 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 74,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "8 min walk to UofT St. George Campus • 3 min to Bay Subway",
    "commutes": [
      {
        "dest": "University of Toronto (St. George)",
        "uniId": "uoft",
        "time": "8 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Downtown En-suite Studio (20m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Toronto Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Bay & Bloor Student Residence - Toronto"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "varsity-commons-toronto",
    "title": "Varsity Commons Downtown - Toronto",
    "tagline": "Modern student rooms with shared gourmet kitchens and silent study pods",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Toronto",
    "district": "Toronto",
    "address": "253 College St, Toronto, ON M5T 1R5, Canada",
    "universityId": "uoft",
    "university": "uoft",
    "supportedUniversities": [
      "uoft"
    ],
    "supportedUnis": [
      "uoft"
    ],
    "universityName": "University of Toronto",
    "uniName": "University of Toronto",
    "roomType": "ensuite",
    "roomTypeTitle": "College Street En-suite Room (18m²)",
    "pricePerWeekGBP": 230,
    "priceGBP": 230,
    "depositGBP": 160,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 58,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "5 min walk to UofT Engineering and Science buildings",
    "commutes": [
      {
        "dest": "UofT St. George Campus",
        "uniId": "uoft",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "College Street En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Varsity Commons Downtown - Toronto"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "the-annex-flats",
    "title": "The Annex Student Flats - Toronto",
    "tagline": "Spacious 1-bedroom private apartment in Toronto’s prime student village",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Toronto",
    "district": "Toronto",
    "address": "320 Huron St, Toronto, ON M5S 3A7, Canada",
    "universityId": "uoft",
    "university": "uoft",
    "supportedUniversities": [
      "uoft"
    ],
    "supportedUnis": [
      "uoft"
    ],
    "universityName": "University of Toronto",
    "uniName": "University of Toronto",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Annex Student Apartment (33m²)",
    "pricePerWeekGBP": 290,
    "priceGBP": 290,
    "depositGBP": 190,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.92,
    "reviewsCount": 45,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "4 min walk to Robarts Library & UofT Campus",
    "commutes": [
      {
        "dest": "UofT Robarts Library",
        "uniId": "uoft",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Annex Student Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "The Annex Student Flats - Toronto"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "university-ave-waterloo",
    "title": "University Avenue Suites - Waterloo",
    "tagline": "Adjacent to University of Waterloo campus and Waterloo Innovation Park",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Waterloo",
    "district": "Waterloo",
    "address": "250 University Ave W, Waterloo, ON N2L 3G4, Canada",
    "universityId": "waterloo",
    "university": "waterloo",
    "supportedUniversities": [
      "waterloo"
    ],
    "supportedUnis": [
      "waterloo"
    ],
    "universityName": "University of Waterloo",
    "uniName": "University of Waterloo",
    "roomType": "studio",
    "roomTypeTitle": "Tech Corridor Studio Suite (21m²)",
    "pricePerWeekGBP": 215,
    "priceGBP": 215,
    "depositGBP": 150,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 52,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "6 min walk to University of Waterloo Davis Centre",
    "commutes": [
      {
        "dest": "University of Waterloo Davis Centre",
        "uniId": "waterloo",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Tech Corridor Studio Suite",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Waterloo Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "University Avenue Suites - Waterloo"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "laurel-creek-residence",
    "title": "Laurel Creek Student Living - Waterloo",
    "tagline": "Quiet, community-focused en-suite living with fast fiber connectivity",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Waterloo",
    "district": "Waterloo",
    "address": "330 Phillip St, Waterloo, ON N2L 3W9, Canada",
    "universityId": "waterloo",
    "university": "waterloo",
    "supportedUniversities": [
      "waterloo"
    ],
    "supportedUnis": [
      "waterloo"
    ],
    "universityName": "University of Waterloo",
    "uniName": "University of Waterloo",
    "roomType": "ensuite",
    "roomTypeTitle": "Silver En-suite in 5-Bed Suite (18m²)",
    "pricePerWeekGBP": 185,
    "priceGBP": 185,
    "depositGBP": 130,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.86,
    "reviewsCount": 44,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "8 min walk to University of Waterloo campus",
    "commutes": [
      {
        "dest": "University of Waterloo",
        "uniId": "waterloo",
        "time": "8 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Silver En-suite in 5-Bed Suite",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Laurel Creek Student Living - Waterloo"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "columbia-lake-village",
    "title": "Columbia Lake Village Flats - Waterloo",
    "tagline": "Spacious 1-bedroom apartments near parkland and recreational lakes",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "ontario",
    "stateName": "Ontario",
    "city": "Waterloo",
    "district": "Waterloo",
    "address": "Columbia St W, Waterloo, ON N2L 3G1, Canada",
    "universityId": "waterloo",
    "university": "waterloo",
    "supportedUniversities": [
      "waterloo"
    ],
    "supportedUnis": [
      "waterloo"
    ],
    "universityName": "University of Waterloo",
    "uniName": "University of Waterloo",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Lakeside Apartment (33m²)",
    "pricePerWeekGBP": 245,
    "priceGBP": 245,
    "depositGBP": 160,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.87,
    "reviewsCount": 36,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "10 min walk to University of Waterloo North Campus",
    "commutes": [
      {
        "dest": "University of Waterloo",
        "uniId": "waterloo",
        "time": "10 min walk",
        "distance": "0.6 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Lakeside Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Columbia Lake Village Flats - Waterloo"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "point-grey-vancouver",
    "title": "Point Grey Student Quarters - Vancouver",
    "tagline": "Surrounded by Pacific Spirit Regional Park, minutes to UBC Point Grey campus",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "bc",
    "stateName": "British Columbia",
    "city": "Vancouver",
    "district": "Vancouver",
    "address": "6138 Student Union Blvd, Vancouver, BC V6T 1Z1, Canada",
    "universityId": "ubc",
    "university": "ubc",
    "supportedUniversities": [
      "ubc"
    ],
    "supportedUnis": [
      "ubc"
    ],
    "universityName": "University of British Columbia",
    "uniName": "University of British Columbia",
    "roomType": "studio",
    "roomTypeTitle": "Private Studio Suite (21m²)",
    "pricePerWeekGBP": 280,
    "priceGBP": 280,
    "depositGBP": 190,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 65,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "6 min walk to UBC Student Nest & Walter C. Koerner Library",
    "commutes": [
      {
        "dest": "UBC Student Nest",
        "uniId": "ubc",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Private Studio Suite (21m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "UBC Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Point Grey Student Quarters - Vancouver"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kitsilano-village",
    "title": "Kitsilano Beach Student Suites - Vancouver",
    "tagline": "Beachside West Side living with easy 12-minute B-Line bus to UBC campus",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "bc",
    "stateName": "British Columbia",
    "city": "Vancouver",
    "district": "Vancouver",
    "address": "2200 W 4th Ave, Vancouver, BC V6K 1N8, Canada",
    "universityId": "ubc",
    "university": "ubc",
    "supportedUniversities": [
      "ubc"
    ],
    "supportedUnis": [
      "ubc"
    ],
    "universityName": "University of British Columbia",
    "uniName": "University of British Columbia",
    "roomType": "ensuite",
    "roomTypeTitle": "Kitsilano Coastal En-suite Room (19m²)",
    "pricePerWeekGBP": 240,
    "priceGBP": 240,
    "depositGBP": 170,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 48,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "12 min direct RapidBus to UBC Campus",
    "commutes": [
      {
        "dest": "UBC Point Grey Campus",
        "uniId": "ubc",
        "time": "12 min bus",
        "distance": "2.5 mi",
        "type": "bus"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Kitsilano Coastal En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Kitsilano Beach Student Suites - Vancouver"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "ubc-marine-drive-apartments",
    "title": "Marine Drive UBC Apartments - Vancouver",
    "tagline": "Ocean-view 1-bedroom private student apartment with mountain vistas",
    "countryCode": "canada",
    "country": "canada",
    "countryName": "Canada 🇨🇦",
    "stateCode": "bc",
    "stateName": "British Columbia",
    "city": "Vancouver",
    "district": "Vancouver",
    "address": "2205 Lower Mall, Vancouver, BC V6T 1Z4, Canada",
    "universityId": "ubc",
    "university": "ubc",
    "supportedUniversities": [
      "ubc"
    ],
    "supportedUnis": [
      "ubc"
    ],
    "universityName": "University of British Columbia",
    "uniName": "University of British Columbia",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Ocean View Apartment (34m²)",
    "pricePerWeekGBP": 310,
    "priceGBP": 310,
    "depositGBP": 200,
    "status": "available",
    "statusLabel": "Available for Sept 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.94,
    "reviewsCount": 55,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "4 min walk to UBC Main Mall & Buchanan Complex",
    "commutes": [
      {
        "dest": "UBC Main Mall",
        "uniId": "ubc",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "jason-r",
    "residentName": "Jason Roy",
    "residentId": "jason-r",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Ocean View Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Marine Drive UBC Apartments - Vancouver"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "broadway-sydney-lodge",
    "title": "Broadway Student Living - Sydney",
    "tagline": "Ultimate university location across from University of Sydney & Victoria Park",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "nsw",
    "stateName": "New South Wales",
    "city": "Sydney",
    "district": "Sydney",
    "address": "185 Broadway, Ultimo, Sydney NSW 2007, Australia",
    "universityId": "usyd",
    "university": "usyd",
    "supportedUniversities": [
      "usyd",
      "unsw"
    ],
    "supportedUnis": [
      "usyd",
      "unsw"
    ],
    "universityName": "University of Sydney",
    "uniName": "University of Sydney",
    "roomType": "studio",
    "roomTypeTitle": "Air-Conditioned Private Studio (22m²)",
    "pricePerWeekGBP": 285,
    "priceGBP": 285,
    "depositGBP": 190,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (4 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.91,
    "reviewsCount": 88,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "6 min walk to USYD Camperdown Quad • 8 min to Central Station",
    "commutes": [
      {
        "dest": "University of Sydney Camperdown",
        "uniId": "usyd",
        "time": "6 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      },
      {
        "dest": "UNSW Kensington Campus",
        "uniId": "unsw",
        "time": "20 min light rail",
        "distance": "3.1 mi",
        "type": "train"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Air-Conditioned Private Studio (22m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Sydney Studio",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Broadway Student Living - Sydney"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "kensington-terraces-sydney",
    "title": "Kensington Terraces Student Living - Sydney",
    "tagline": "Right beside UNSW Kensington campus and Anzac Parade light rail",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "nsw",
    "stateName": "New South Wales",
    "city": "Sydney",
    "district": "Sydney",
    "address": "142 Anzac Parade, Kensington NSW 2033, Australia",
    "universityId": "unsw",
    "university": "unsw",
    "supportedUniversities": [
      "unsw",
      "usyd"
    ],
    "supportedUnis": [
      "unsw",
      "usyd"
    ],
    "universityName": "UNSW Sydney",
    "uniName": "UNSW Sydney",
    "roomType": "ensuite",
    "roomTypeTitle": "Kensington Sunlit En-suite Room (19m²)",
    "pricePerWeekGBP": 240,
    "priceGBP": 240,
    "depositGBP": 170,
    "status": "available",
    "statusLabel": "Available for Semester 2",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 72,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "4 min walk to UNSW Gate 9 & Lower Campus",
    "commutes": [
      {
        "dest": "UNSW Main Walkway",
        "uniId": "unsw",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Kensington Sunlit En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Kensington Terraces Student Living - Sydney"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "darling-harbour-suites",
    "title": "Darling Harbour Student Suites - Sydney",
    "tagline": "Waterfront 1-bedroom apartments near Chinatown, Darling Harbour and Central",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "nsw",
    "stateName": "New South Wales",
    "city": "Sydney",
    "district": "Sydney",
    "address": "68 Quay St, Haymarket NSW 2000, Australia",
    "universityId": "usyd",
    "university": "usyd",
    "supportedUniversities": [
      "usyd",
      "unsw"
    ],
    "supportedUnis": [
      "usyd",
      "unsw"
    ],
    "universityName": "University of Sydney",
    "uniName": "University of Sydney",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom City Apartment (34m²)",
    "pricePerWeekGBP": 320,
    "priceGBP": 320,
    "depositGBP": 210,
    "status": "available",
    "statusLabel": "Available for Semester 2",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 65,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "12 min walk to USYD • 15 min light rail to UNSW",
    "commutes": [
      {
        "dest": "University of Sydney",
        "uniId": "usyd",
        "time": "12 min walk",
        "distance": "0.8 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom City Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Darling Harbour Student Suites - Sydney"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "parkville-student-lodge",
    "title": "Parkville Student Lodge - Melbourne",
    "tagline": "Opposite University of Melbourne Parkville campus & Melbourne Medical Precinct",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "vic",
    "stateName": "Victoria",
    "city": "Melbourne",
    "district": "Melbourne",
    "address": "780 Elizabeth St, Melbourne VIC 3000, Australia",
    "universityId": "unimelb",
    "university": "unimelb",
    "supportedUniversities": [
      "unimelb"
    ],
    "supportedUnis": [
      "unimelb"
    ],
    "universityName": "University of Melbourne",
    "uniName": "University of Melbourne",
    "roomType": "studio",
    "roomTypeTitle": "Parkville Studio Suite (21m²)",
    "pricePerWeekGBP": 275,
    "priceGBP": 275,
    "depositGBP": 180,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.91,
    "reviewsCount": 82,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "5 min walk to University of Melbourne Parkville campus",
    "commutes": [
      {
        "dest": "University of Melbourne Parkville",
        "uniId": "unimelb",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Parkville Studio Suite (21m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Melbourne Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Parkville Student Lodge - Melbourne"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "carlton-gardens-living",
    "title": "Carlton Gardens Student Living - Melbourne",
    "tagline": "Historic Italian Lygon Street cafes and parks, 8-minute walk to University of Melbourne",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "vic",
    "stateName": "Victoria",
    "city": "Melbourne",
    "district": "Melbourne",
    "address": "150 Drummond St, Carlton VIC 3053, Australia",
    "universityId": "unimelb",
    "university": "unimelb",
    "supportedUniversities": [
      "unimelb"
    ],
    "supportedUnis": [
      "unimelb"
    ],
    "universityName": "University of Melbourne",
    "uniName": "University of Melbourne",
    "roomType": "ensuite",
    "roomTypeTitle": "Carlton Balcony En-suite Room (19m²)",
    "pricePerWeekGBP": 235,
    "priceGBP": 235,
    "depositGBP": 160,
    "status": "available",
    "statusLabel": "Available for Semester 2",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.87,
    "reviewsCount": 59,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "8 min walk to University of Melbourne South Lawn",
    "commutes": [
      {
        "dest": "University of Melbourne South Lawn",
        "uniId": "unimelb",
        "time": "8 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Carlton Balcony En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Carlton Gardens Student Living - Melbourne"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "swanston-street-suites",
    "title": "Swanston Street Suites - Melbourne CBD",
    "tagline": "Central Melbourne CBD luxury 1-bedroom apartments on the free tram zone",
    "countryCode": "australia",
    "country": "australia",
    "countryName": "Australia 🇦🇺",
    "stateCode": "vic",
    "stateName": "Victoria",
    "city": "Melbourne",
    "district": "Melbourne",
    "address": "420 Swanston St, Melbourne VIC 3000, Australia",
    "universityId": "unimelb",
    "university": "unimelb",
    "supportedUniversities": [
      "unimelb"
    ],
    "supportedUnis": [
      "unimelb"
    ],
    "universityName": "University of Melbourne",
    "uniName": "University of Melbourne",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom CBD Skyline Apartment (35m²)",
    "pricePerWeekGBP": 295,
    "priceGBP": 295,
    "depositGBP": 195,
    "status": "available",
    "statusLabel": "Available for Semester 2",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 51,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "6 min direct tram to UniMelb • 2 min walk to RMIT",
    "commutes": [
      {
        "dest": "University of Melbourne Parkville",
        "uniId": "unimelb",
        "time": "6 min tram",
        "distance": "0.9 mi",
        "type": "tram"
      }
    ],
    "featuredResidentId": "ravi-s",
    "residentName": "Ravi Sharma",
    "residentId": "ravi-s",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom CBD Skyline Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Swanston Street Suites - Melbourne CBD"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "bavaria-student-quarters",
    "title": "Maxvorstadt Student Quarters - Munich",
    "tagline": "Heart of Munich university district, 4-minute walk to TUM & LMU main buildings",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "bavaria",
    "stateName": "Bavaria",
    "city": "Munich",
    "district": "Munich",
    "address": "Theresienstraße 40, 80333 Munich, Germany",
    "universityId": "tum",
    "university": "tum",
    "supportedUniversities": [
      "tum",
      "lmu"
    ],
    "supportedUnis": [
      "tum",
      "lmu"
    ],
    "universityName": "Technical University of Munich (TUM)",
    "uniName": "Technical University of Munich (TUM)",
    "roomType": "studio",
    "roomTypeTitle": "Einzelapartment (Single Studio) (21m²)",
    "pricePerWeekGBP": 175,
    "priceGBP": 175,
    "depositGBP": 130,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (2 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 76,
    "heroImage": "assets/images/merchant_studios.jpg",
    "image": "assets/images/merchant_studios.jpg",
    "commute": "4 min walk to TUM Main Campus • 8 min walk to LMU",
    "commutes": [
      {
        "dest": "TUM Main Campus Arcisstraße",
        "uniId": "tum",
        "time": "4 min walk",
        "distance": "0.2 mi",
        "type": "walk"
      },
      {
        "dest": "LMU Munich Geschwister-Scholl-Platz",
        "uniId": "lmu",
        "time": "8 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/merchant_studios.jpg",
      "roomTypeTitle": "Einzelapartment (Single Studio) (21m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Munich Studio",
          "image": "assets/images/merchant_studios.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/merchant_studios.jpg",
        "label": "Maxvorstadt Student Quarters - Munich"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "schwabing-student-hub",
    "title": "Schwabing Student Hub - Munich",
    "tagline": "Vibrant Schwabing neighborhood near English Garden and Leopoldstraße",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "bavaria",
    "stateName": "Bavaria",
    "city": "Munich",
    "district": "Munich",
    "address": "Leopoldstraße 130, 80804 Munich, Germany",
    "universityId": "lmu",
    "university": "lmu",
    "supportedUniversities": [
      "lmu",
      "tum"
    ],
    "supportedUnis": [
      "lmu",
      "tum"
    ],
    "universityName": "LMU Munich",
    "uniName": "LMU Munich",
    "roomType": "ensuite",
    "roomTypeTitle": "Schwabing WG En-suite Private Room (19m²)",
    "pricePerWeekGBP": 160,
    "priceGBP": 160,
    "depositGBP": 120,
    "status": "available",
    "statusLabel": "Available for Wintersemester",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.86,
    "reviewsCount": 65,
    "heroImage": "assets/images/buchanan_view.jpg",
    "image": "assets/images/buchanan_view.jpg",
    "commute": "8 min U-Bahn to LMU Main Building • 10 min U-Bahn to TUM",
    "commutes": [
      {
        "dest": "LMU Munich Main Campus",
        "uniId": "lmu",
        "time": "8 min U-Bahn",
        "distance": "1.4 mi",
        "type": "subway"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/buchanan_view.jpg",
      "roomTypeTitle": "Schwabing WG En-suite Private Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/buchanan_view.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/buchanan_view.jpg",
        "label": "Schwabing Student Hub - Munich"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "english-garden-apartments",
    "title": "English Garden Residence - Munich",
    "tagline": "Private 1-bedroom apartment overlooking the serene English Garden",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "bavaria",
    "stateName": "Bavaria",
    "city": "Munich",
    "district": "Munich",
    "address": "Königinstraße 28, 80539 Munich, Germany",
    "universityId": "tum",
    "university": "tum",
    "supportedUniversities": [
      "tum",
      "lmu"
    ],
    "supportedUnis": [
      "tum",
      "lmu"
    ],
    "universityName": "Technical University of Munich (TUM)",
    "uniName": "Technical University of Munich (TUM)",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Parkside Apartment (33m²)",
    "pricePerWeekGBP": 220,
    "priceGBP": 220,
    "depositGBP": 150,
    "status": "available",
    "statusLabel": "Available for Wintersemester",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 42,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "6 min walk to LMU • 12 min U-Bahn to TUM",
    "commutes": [
      {
        "dest": "LMU Munich Main Campus",
        "uniId": "lmu",
        "time": "6 min walk",
        "distance": "0.4 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Parkside Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "English Garden Residence - Munich"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "mitte-student-quarters",
    "title": "Mitte Student Quarters - Berlin",
    "tagline": "Prime Berlin Mitte location with full official Anmeldung landlord registration",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "berlin",
    "stateName": "Berlin",
    "city": "Berlin",
    "district": "Berlin",
    "address": "Friedrichstraße 120, 10117 Berlin, Germany",
    "universityId": "hu-berlin",
    "university": "hu-berlin",
    "supportedUniversities": [
      "hu-berlin"
    ],
    "supportedUnis": [
      "hu-berlin"
    ],
    "universityName": "Humboldt University of Berlin",
    "uniName": "Humboldt University of Berlin",
    "roomType": "studio",
    "roomTypeTitle": "Einzelapartment (Single Studio) (20m²)",
    "pricePerWeekGBP": 170,
    "priceGBP": 170,
    "depositGBP": 120,
    "status": "filling-fast",
    "statusLabel": "Filling Fast (3 Rooms Left)",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 70,
    "heroImage": "assets/images/ensuite_interior.jpg",
    "image": "assets/images/ensuite_interior.jpg",
    "commute": "8 min walk to Humboldt University Unter den Linden",
    "commutes": [
      {
        "dest": "Humboldt University Main Quad",
        "uniId": "hu-berlin",
        "time": "8 min walk",
        "distance": "0.5 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/ensuite_interior.jpg",
      "roomTypeTitle": "Einzelapartment (Single Studio) (20m²)",
      "scenes": [
        {
          "id": "studio",
          "name": "Studio",
          "sub": "Berlin Studio",
          "image": "assets/images/ensuite_interior.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/ensuite_interior.jpg",
        "label": "Mitte Student Quarters - Berlin"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "unter-den-linden-suites",
    "title": "Unter den Linden Student Suites - Berlin",
    "tagline": "Historic boulevard location, 5-minute walk to Humboldt University main campus",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "berlin",
    "stateName": "Berlin",
    "city": "Berlin",
    "district": "Berlin",
    "address": "Unter den Linden 42, 10117 Berlin, Germany",
    "universityId": "hu-berlin",
    "university": "hu-berlin",
    "supportedUniversities": [
      "hu-berlin"
    ],
    "supportedUnis": [
      "hu-berlin"
    ],
    "universityName": "Humboldt University of Berlin",
    "uniName": "Humboldt University of Berlin",
    "roomType": "ensuite",
    "roomTypeTitle": "Mitte En-suite Room in Shared Flat (18m²)",
    "pricePerWeekGBP": 155,
    "priceGBP": 155,
    "depositGBP": 110,
    "status": "available",
    "statusLabel": "Available for Wintersemester",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.85,
    "reviewsCount": 58,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "5 min walk to Humboldt University Unter den Linden",
    "commutes": [
      {
        "dest": "Humboldt University",
        "uniId": "hu-berlin",
        "time": "5 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Mitte En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Unter den Linden Student Suites - Berlin"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "alexanderplatz-apartments",
    "title": "Alexanderplatz Student Apartments - Berlin",
    "tagline": "Modern 1-bedroom apartment by Alexanderplatz TV Tower with U-Bahn & S-Bahn links",
    "countryCode": "germany",
    "country": "germany",
    "countryName": "Germany 🇩🇪",
    "stateCode": "berlin",
    "stateName": "Berlin",
    "city": "Berlin",
    "district": "Berlin",
    "address": "Alexanderstraße 7, 10178 Berlin, Germany",
    "universityId": "hu-berlin",
    "university": "hu-berlin",
    "supportedUniversities": [
      "hu-berlin"
    ],
    "supportedUnis": [
      "hu-berlin"
    ],
    "universityName": "Humboldt University of Berlin",
    "uniName": "Humboldt University of Berlin",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom City Apartment (32m²)",
    "pricePerWeekGBP": 205,
    "priceGBP": 205,
    "depositGBP": 140,
    "status": "available",
    "statusLabel": "Available for Wintersemester",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.9,
    "reviewsCount": 46,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "7 min S-Bahn to Humboldt University • 10 min to Hackescher Markt",
    "commutes": [
      {
        "dest": "Humboldt University",
        "uniId": "hu-berlin",
        "time": "7 min train",
        "distance": "1.1 mi",
        "type": "train"
      }
    ],
    "featuredResidentId": "sophie-m",
    "residentName": "Sophie Müller",
    "residentId": "sophie-m",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom City Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Alexanderplatz Student Apartments - Berlin"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "commonwealth-residence",
    "title": "Commonwealth Avenue Student Living - Boston",
    "tagline": "Classic brownstone student living on the Green Line B branch",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "mass",
    "stateName": "Massachusetts",
    "city": "Boston / Cambridge",
    "district": "Boston / Cambridge",
    "address": "610 Commonwealth Ave, Boston, MA 02215, United States",
    "universityId": "harvard",
    "university": "harvard",
    "supportedUniversities": [
      "harvard",
      "mit"
    ],
    "supportedUnis": [
      "harvard",
      "mit"
    ],
    "universityName": "Harvard University",
    "uniName": "Harvard University",
    "roomType": "ensuite",
    "roomTypeTitle": "Commonwealth Brownstone En-suite (19m²)",
    "pricePerWeekGBP": 310,
    "priceGBP": 310,
    "depositGBP": 220,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.89,
    "reviewsCount": 46,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "12 min T-subway to Harvard & Cambridge",
    "commutes": [
      {
        "dest": "Harvard Campus",
        "uniId": "harvard",
        "time": "12 min subway",
        "distance": "1.8 mi",
        "type": "subway"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Commonwealth Brownstone En-suite",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Commonwealth Avenue Student Living - Boston"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "sunset-blvd-apartments",
    "title": "Sunset Boulevard Student Suites - Los Angeles",
    "tagline": "Spacious 1-bedroom private apartments with private parking and pool",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Los Angeles",
    "district": "Los Angeles",
    "address": "10800 Sunset Blvd, Los Angeles, CA 90077, United States",
    "universityId": "ucla",
    "university": "ucla",
    "supportedUniversities": [
      "ucla"
    ],
    "supportedUnis": [
      "ucla"
    ],
    "universityName": "UCLA",
    "uniName": "UCLA",
    "roomType": "apartment",
    "roomTypeTitle": "1-Bedroom Sunset Apartment (35m²)",
    "pricePerWeekGBP": 380,
    "priceGBP": 380,
    "depositGBP": 250,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.93,
    "reviewsCount": 41,
    "heroImage": "assets/images/student_lounge.jpg",
    "image": "assets/images/student_lounge.jpg",
    "commute": "10 min walk to UCLA North Campus & Anderson School",
    "commutes": [
      {
        "dest": "UCLA North Campus",
        "uniId": "ucla",
        "time": "10 min walk",
        "distance": "0.6 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/student_lounge.jpg",
      "roomTypeTitle": "1-Bedroom Sunset Apartment",
      "scenes": [
        {
          "id": "apt",
          "name": "Apartment",
          "sub": "1-Bed",
          "image": "assets/images/student_lounge.jpg",
          "isPano": true,
          "icon": "fa-couch"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Sunset Boulevard Student Suites - Los Angeles"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  },
  {
    "id": "shattuck-avenue-suites",
    "title": "Shattuck Avenue Student Quarters - Berkeley",
    "tagline": "Central Downtown Berkeley en-suite rooms, 2-minute walk to Downtown Berkeley BART",
    "countryCode": "usa",
    "country": "usa",
    "countryName": "United States 🇺🇸",
    "stateCode": "california",
    "stateName": "California",
    "city": "Berkeley",
    "district": "Berkeley",
    "address": "2150 Shattuck Ave, Berkeley, CA 94704, United States",
    "universityId": "berkeley",
    "university": "berkeley",
    "supportedUniversities": [
      "berkeley"
    ],
    "supportedUnis": [
      "berkeley"
    ],
    "universityName": "UC Berkeley",
    "uniName": "UC Berkeley",
    "roomType": "ensuite",
    "roomTypeTitle": "Downtown Shattuck En-suite Room (19m²)",
    "pricePerWeekGBP": 290,
    "priceGBP": 290,
    "depositGBP": 200,
    "status": "available",
    "statusLabel": "Available for Aug 2026",
    "verified": true,
    "allBillsIncluded": true,
    "rating": 4.88,
    "reviewsCount": 39,
    "heroImage": "assets/images/chat_room.jpg",
    "image": "assets/images/chat_room.jpg",
    "commute": "6 min walk to UC Berkeley West Gate",
    "commutes": [
      {
        "dest": "UC Berkeley West Gate",
        "uniId": "berkeley",
        "time": "6 min walk",
        "distance": "0.3 mi",
        "type": "walk"
      }
    ],
    "featuredResidentId": "alex-t",
    "residentName": "Alex Turner",
    "residentId": "alex-t",
    "tourData": {
      "panoImage": "assets/images/chat_room.jpg",
      "roomTypeTitle": "Downtown Shattuck En-suite Room",
      "scenes": [
        {
          "id": "room",
          "name": "Room",
          "sub": "En-suite",
          "image": "assets/images/chat_room.jpg",
          "isPano": true,
          "icon": "fa-bed"
        }
      ],
      "angles": [
        {
          "id": "wide",
          "name": "Overview",
          "shortName": "Overview",
          "icon": "fa-arrows-spin",
          "zoomLevel": "100%",
          "description": "View",
          "pitch": 0,
          "yaw": 0,
          "hfov": 105
        }
      ]
    },
    "contractLengths": [
      "44 Weeks (Academic Year)",
      "51 Weeks (Full Year)",
      "Semester 1 (Autumn)"
    ],
    "moveInDates": [
      "12 September 2026",
      "19 September 2026",
      "03 October 2026"
    ],
    "amenities": [
      {
        "icon": "fa-bolt",
        "text": "All Utilities & Heating Included"
      },
      {
        "icon": "fa-wifi",
        "text": "250 Mbps Hyperfast Wi-Fi"
      },
      {
        "icon": "fa-shower",
        "text": "Private Power Shower En-suite"
      },
      {
        "icon": "fa-shield-halved",
        "text": "24/7 On-site Security & CCTV"
      },
      {
        "icon": "fa-dumbbell",
        "text": "Free Resident Fitness Suite"
      },
      {
        "icon": "fa-shirt",
        "text": "On-site App Laundry Room"
      },
      {
        "icon": "fa-box-archive",
        "text": "Secure Parcel Delivery Lockers"
      },
      {
        "icon": "fa-bicycle",
        "text": "Covered Bicycle Storage"
      }
    ],
    "gallery": [
      {
        "src": "assets/images/chat_room.jpg",
        "label": "Shattuck Avenue Student Quarters - Berkeley"
      },
      {
        "src": "assets/images/bathroom.jpg",
        "label": "Private Bathroom"
      },
      {
        "src": "assets/images/student_lounge.jpg",
        "label": "Resident Social Hub"
      }
    ]
  }
],

  // Universal Safe Property Lookup with Aliases
  getProperty(id) {
    if (!id) return this.properties[0];
    const cleanId = String(id).toLowerCase().trim();
    const aliasMap = {
      'manhattan-village': 'manhattan-student-loft',
      'columbia-heights': 'manhattan-student-loft',
      'toronto-varsity': 'bay-street-suites',
      'munich-schwabing': 'bavaria-student-quarters',
      'edinburgh-fountain': 'salisbury-court',
      'silk-mill-edinburgh': 'salisbury-court',
      'kings-cross-studios': 'bloomsbury-residence',
      'chapter-spitalfields': 'bloomsbury-residence',
      'riverside-quay': 'kelvin-court'
    };
    const targetId = aliasMap[cleanId] || cleanId;
    return this.properties.find(p => p.id === targetId || p.id === cleanId) || this.properties[0];
  },

  getResident: function(residentId) {
    if (!residentId) return this.residents[0];
    const cleanId = String(residentId).trim().toLowerCase();
    if (cleanId === 'manager' || cleanId === 'residence-manager' || cleanId === 'concierge' || cleanId === 'residence') {
      return this.residents.find(r => r.id === 'residence-manager') || this.residents[0];
    }
    return this.residents.find(r => r.id === cleanId) || this.residents[0];
  },

  // Verified International Student Resident Ambassadors & On-site Building Management
  residents: [
    {
      id: 'residence-manager',
      name: 'Sarah Jenkins (Building Concierge)',
      role: 'On-Site Residence Operations & Concierge Desk',
      country: 'Verified Management 🏢',
      flag: '🏢',
      origin: 'On-Site Concierge Desk',
      university: 'StudentStay Accredited Property Services',
      universityId: 'concierge',
      course: 'Licensed Building Management & Resident Concierge',
      year: 'On-Site Team 24/7',
      propertyId: 'buchanan-view',
      propertyName: 'StudentStay On-Site Concierge Desk',
      roomFloor: 'Ground Floor Reception & Key Desk',
      avatar: 'assets/images/concierge_manager.jpg',
      onlineStatus: 'Online Now (24/7 Desk)',
      isOnline: true,
      badge: 'Official Building Operations',
      bio: 'Official StudentStay on-site building concierge desk. I assist incoming residents with check-in keys, dual occupancy guidelines, summer luggage storage, lease agreements, and maintenance.',
      helpTopics: ['Key Collection & Check-in', 'Dual Occupancy Rules', 'Summer Luggage Storage', 'Escrow Deposit Refund Policy', 'Parcel Lockers'],
      verifiedMonths: 36
    },
    {
      id: 'ama-k',
      name: 'Ama Konadu',
      country: 'Ghana 🇬🇭',
      flag: '🇬🇭',
      origin: 'Accra, Ghana',
      university: 'Glasgow Caledonian University (GCU)',
      universityId: 'gcu',
      course: 'MSc Data Science & AI',
      year: 'Postgraduate Year 1',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View',
      roomFloor: 'Floor 3, Block B (Courtyard View)',
      avatar: 'assets/images/ama.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Moved from Accra to Glasgow in Sept 2025! Happy to share genuine photos of Buchanan View, winter heating warmth, and how to shop for African spices in Glasgow.',
      helpTopics: ['Room & Desk Space', 'Winter Heating & Bills', 'Cowcaddens Safety at Night', 'GCU Campus Walk'],
      verifiedMonths: 14
    },
    {
      id: 'kofi-m',
      name: 'Kofi Mensah',
      country: 'Ghana 🇬🇭',
      flag: '🇬🇭',
      origin: 'Accra, Ghana',
      university: 'Glasgow Caledonian University (GCU)',
      universityId: 'gcu',
      course: 'MSc International Project Management',
      year: 'Postgraduate Year 1',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View',
      roomFloor: 'Floor 4, Block B',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Living at Buchanan View since Sept 2025. Escrow deposit protection gave my parents in Accra total peace of mind. Happy to confirm my review live!',
      helpTopics: ['Escrow Protection', 'Winter Heating Warmth', 'GCU Walking Route'],
      verifiedMonths: 8
    },
    {
      id: 'david-s',
      name: 'David Smith',
      country: 'United Kingdom 🇬🇧',
      flag: '🇬🇧',
      origin: 'Glasgow, UK',
      university: 'University of Strathclyde',
      universityId: 'strath',
      course: 'BSc Mechanical Engineering',
      year: 'Undergraduate Year 3',
      propertyId: 'merchant-studios',
      propertyName: 'Merchant Studios',
      roomFloor: 'Floor 4, Rooftop Wing',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Host',
      bio: 'Local Scottish resident ambassador. I help international flatmates with Scottish council tax exemption, Glasgow Subway routes, and budget food shopping.',
      helpTopics: ['Council Tax Exemption', 'Subway & Trains', 'Night Safety', 'Weather Gear'],
      verifiedMonths: 24
    },
    {
      id: 'priya-p',
      name: 'Priya Patel',
      country: 'India 🇮🇳',
      flag: '🇮🇳',
      origin: 'Mumbai, India',
      university: 'University of Glasgow',
      universityId: 'uofg',
      course: 'MSc Data Science & AI',
      year: 'Postgraduate Year 1',
      propertyId: 'kelvin-court',
      propertyName: 'Riverside Quay Student Residence',
      roomFloor: 'Floor 2, River Wing',
      avatar: 'assets/images/meilin.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified UofG Ambassador',
      bio: 'International student from Mumbai. Commuting to Gilmorehill campus via subway is so convenient. Ask me about Indian groceries, quiet study spots, and bills!',
      helpTopics: ['Subway Commute', 'Indian Spices & Groceries', 'Silent Study Desks', 'All Bills Included'],
      verifiedMonths: 10
    },
    {
      id: 'ananya-s',
      name: 'Ananya Sharma',
      country: 'India 🇮🇳',
      flag: '🇮🇳',
      origin: 'New Delhi, India',
      university: 'University of Strathclyde',
      universityId: 'strath',
      course: 'MSc Artificial Intelligence',
      year: 'Postgraduate Year 1',
      propertyId: 'the-foundry',
      propertyName: 'The Foundry',
      roomFloor: 'Floor 3, East Wing',
      avatar: 'assets/images/meilin.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Came from Delhi to study AI at Strathclyde. 1 Gbps Wi-Fi is essential for model training and video calls home. Chat with me to confirm!',
      helpTopics: ['High Speed Wi-Fi', 'Strathclyde Library Commute', 'Safety Around Merchant City'],
      verifiedMonths: 7
    },
    {
      id: 'meilin-t',
      name: 'Mei Lin Tan',
      country: 'Malaysia 🇲🇾',
      flag: '🇲🇾',
      origin: 'Kuala Lumpur, Malaysia',
      university: 'University of Strathclyde',
      universityId: 'strath',
      course: 'BEng Civil Engineering',
      year: 'Year 2 Undergraduate',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View',
      roomFloor: 'Floor 2, Block A',
      avatar: 'assets/images/meilin.jpg',
      onlineStatus: 'Active 12m ago',
      isOnline: true,
      badge: 'Verified Resident',
      bio: 'Living at Buchanan View for 2 years. I know all the cheap food spots on Sauchiehall Street, bus routes, and how to set up UK bank accounts fast.',
      helpTopics: ['Bus & Subway Passes', 'Asian Supermarkets (Chung Ying/Oaka)', 'Soundproofing & Quiet Hours'],
      verifiedMonths: 20
    },
    {
      id: 'li-w',
      name: 'Li Wei',
      country: 'China 🇨🇳',
      flag: '🇨🇳',
      origin: 'Shanghai, China',
      university: 'University of Glasgow',
      universityId: 'uofg',
      course: 'BSc Accounting & Finance',
      year: 'Undergraduate Year 2',
      propertyId: 'kelvin-court',
      propertyName: 'Kelvin Court',
      roomFloor: 'Floor 2, Courtyard Wing',
      avatar: 'assets/images/ravi.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Second year at UofG. Kelvinbridge Subway station makes commuting seamless. Council tax exemption was handled automatically.',
      helpTopics: ['Subway Commutes', 'Council Tax Exemption', 'Automated Parcel Lockers', 'Kelvingrove Park Walks'],
      verifiedMonths: 18
    },
    {
      id: 'sophie-m',
      name: 'Sophie Müller',
      country: 'Germany 🇩🇪',
      flag: '🇩🇪',
      origin: 'Munich, Germany',
      university: 'University of Glasgow / GSA',
      universityId: 'uofg',
      course: 'MDes Communication Design',
      year: 'Master Student',
      propertyId: 'kelvin-court',
      propertyName: 'Kelvin Court',
      roomFloor: 'Floor 3, Park Wing',
      avatar: 'assets/images/sophie.jpg',
      onlineStatus: 'Active 1h ago',
      isOnline: false,
      badge: 'Verified Resident',
      bio: 'Loving Glasgow West End! West End cafes, cycling along Kelvin Walkway, and quiet study spots around campus are my specialty.',
      helpTopics: ['West End Living', 'Cycling & Public Transit', 'Studio Space & Lighting'],
      verifiedMonths: 11
    },
    {
      id: 'callum-r',
      name: 'Callum Robertson',
      country: 'United Kingdom 🇬🇧',
      flag: '🇬🇧',
      origin: 'Edinburgh, Scotland',
      university: 'University of Edinburgh',
      universityId: 'uoe',
      course: 'BSc Architecture',
      year: 'Year 3 Undergraduate',
      propertyId: 'salisbury-court',
      propertyName: 'Salisbury Court',
      roomFloor: 'Floor 2, Salisbury Wing',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Living at Salisbury Court in Edinburgh Newington. 12 minutes walk to George Square Library. Happy to answer questions on life in Edinburgh.',
      helpTopics: ['Edinburgh Uni Walk', 'Arthur’s Seat Hikes', 'Old Town Cafes', 'Heating in Winter'],
      verifiedMonths: 16
    },
    {
      id: 'jordan-m',
      name: 'Jordan MacLeod',
      country: 'United Kingdom 🇬🇧',
      flag: '🇬🇧',
      origin: 'Inverness, Scotland',
      university: 'University of Aberdeen',
      universityId: 'uab',
      course: 'BSc Marine Biology',
      year: 'Year 2 Undergraduate',
      propertyId: 'kings-links-lodge',
      propertyName: 'King’s Links Student Lodge',
      roomFloor: 'Floor 1, East Wing',
      avatar: 'assets/images/ravi.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Studying in Aberdeen! King’s College is an 8-minute walk from here. Ask me about Aberdeen student living.',
      helpTopics: ['King’s College Walk', 'Aberdeen Weather', 'Granite City Living'],
      verifiedMonths: 9
    },
    {
      id: 'chen-w',
      name: 'Chen Wei',
      country: 'China 🇨🇳',
      flag: '🇨🇳',
      origin: 'Beijing, China',
      university: 'University College London (UCL)',
      universityId: 'ucl',
      course: 'MSc Financial Technology',
      year: 'Postgraduate Year 1',
      propertyId: 'bloomsbury-residence',
      propertyName: 'Bloomsbury Student Quarters',
      roomFloor: 'Floor 4, Russell Wing',
      avatar: 'assets/images/ravi.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Living in London Zone 1! 6 minutes walk to UCL Gower Street. Ask me about London living costs, Russell Square transit, and grocery shopping.',
      helpTopics: ['UCL Gower St Walk', 'London Zone 1 Living', 'British Museum Study Spots', 'Oyster & Contactless'],
      verifiedMonths: 10
    },
    {
      id: 'marcus-v',
      name: 'Marcus Vance',
      country: 'United States 🇺🇸',
      flag: '🇺🇸',
      origin: 'Chicago, USA',
      university: 'Columbia University',
      universityId: 'columbia',
      course: 'MSc Computer Science',
      year: 'Graduate Student',
      propertyId: 'manhattan-student-loft',
      propertyName: 'Manhattan Student Loft',
      roomFloor: 'Floor 5, Loft B',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Living in Morningside Heights, 6 minutes from Columbia campus. Happy to verify room dimensions, 1 Train subway link to NYU, and Upper West Side grocery options.',
      helpTopics: ['Columbia Campus Commute', 'NYC 1 Train Subway', 'Morningside Heights Safety', 'Central Park Access'],
      verifiedMonths: 12
    },
    {
      id: 'chloe-d',
      name: 'Chloe Dubois',
      country: 'France 🇫🇷',
      flag: '🇫🇷',
      origin: 'Paris, France',
      university: 'New York University (NYU)',
      universityId: 'nyu',
      course: 'BFA Film & Television',
      year: 'Year 2 Student',
      propertyId: 'manhattan-student-loft',
      propertyName: 'Manhattan Student Loft',
      roomFloor: 'Floor 3, South Wing',
      avatar: 'assets/images/sophie.jpg',
      onlineStatus: 'Active 25m ago',
      isOnline: true,
      badge: 'Verified Resident',
      bio: 'International student from Paris attending NYU. I take the 1 train straight to Washington Square. Studio heating and AC are fully included.',
      helpTopics: ['NYU Commute via 1 Train', 'US Student Visa Escrow', 'Laundry & Parcel Delivery'],
      verifiedMonths: 8
    },
    {
      id: 'elena-r',
      name: 'Elena Rossi',
      country: 'Italy 🇮🇹',
      flag: '🇮🇹',
      origin: 'Milan, Italy',
      university: 'Harvard University',
      universityId: 'harvard',
      course: 'Postgrad Biomedical Sciences',
      year: 'Fellowship Student',
      propertyId: 'cambridge-court-boston',
      propertyName: 'Cambridge Common Student Residence',
      roomFloor: 'Floor 2, Garden Wing',
      avatar: 'assets/images/meilin.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Studying in Cambridge! 10-minute walk through the park to Harvard Yard, and quick Red Line subway to MIT. Ask me anything about Boston winter packing!',
      helpTopics: ['Harvard Yard Commute', 'MIT Red Line Link', 'Winter Heating & Snow', 'Cambridge Safety'],
      verifiedMonths: 11
    },
    {
      id: 'sarah-j',
      name: 'Sarah Jenkins',
      country: 'Canada 🇨🇦',
      flag: '🇨🇦',
      origin: 'Calgary, Canada',
      university: 'University of Toronto',
      universityId: 'uoft',
      course: 'BCom Rotman Commerce',
      year: 'Undergraduate Year 3',
      propertyId: 'bay-street-suites',
      propertyName: 'Bay & Bloor Student Residence',
      roomFloor: 'Floor 8, Bay Tower',
      avatar: 'assets/images/ama.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Studying Rotman Commerce at UofT. 8 minutes walk to St. George campus. Yorkville is right outside the lobby. Hydro and heating are 100% included.',
      helpTopics: ['UofT St George Walk', 'TTC Subway Connection', 'Canadian Winter Heating', 'Toronto Safety'],
      verifiedMonths: 22
    },
    {
      id: 'jessica-w',
      name: 'Jessica Wong',
      country: 'Canada 🇨🇦',
      flag: '🇨🇦',
      origin: 'Richmond, Canada',
      university: 'University of British Columbia',
      universityId: 'ubc',
      course: 'BSc Environmental Sciences',
      year: 'Year 2 Student',
      propertyId: 'point-grey-vancouver',
      propertyName: 'Point Grey Student Quarters',
      roomFloor: 'Floor 3, Pacific Wing',
      avatar: 'assets/images/meilin.jpg',
      onlineStatus: 'Active Today',
      isOnline: true,
      badge: 'Verified Resident',
      bio: 'Living at UBC Point Grey! 10 minutes walk to Main Mall. Beautiful mountain views and quiet study lounges.',
      helpTopics: ['UBC Campus Walk', 'Vancouver Weather', 'Campus Transit'],
      verifiedMonths: 14
    },
    {
      id: 'maya-l',
      name: 'Maya Lin',
      country: 'Australia 🇦🇺',
      flag: '🇦🇺',
      origin: 'Sydney, Australia',
      university: 'University of Sydney',
      universityId: 'usyd',
      course: 'Master of Commerce',
      year: 'Postgraduate Year 1',
      propertyId: 'broadway-sydney-lodge',
      propertyName: 'Broadway Student Living',
      roomFloor: 'Floor 4, Park Wing',
      avatar: 'assets/images/sophie.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Living opposite USYD Camperdown campus. 7 minutes walk to lectures. Broadway Shopping Mall is literally across the street. Air conditioning is a lifesaver in summer!',
      helpTopics: ['USYD Camperdown Walk', 'UNSW Light Rail Link', 'Sydney Living Costs', 'Opal Transport Card'],
      verifiedMonths: 15
    },
    {
      id: 'nathan-k',
      name: 'Nathan Kelly',
      country: 'Australia 🇦🇺',
      flag: '🇦🇺',
      origin: 'Brisbane, Australia',
      university: 'University of Melbourne',
      universityId: 'unimelb',
      course: 'MSc Management',
      year: 'Year 1 Master',
      propertyId: 'parkville-student-lodge',
      propertyName: 'Parkville Student Lodge',
      roomFloor: 'Floor 2, College Wing',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Parkville living in Melbourne! Literally 5 minutes walk to Melbourne University. Ask me about Carlton cafes and Melbourne student life.',
      helpTopics: ['Melbourne Uni Walk', 'Carlton & Lygon St Food', 'Tram Routes'],
      verifiedMonths: 10
    },
    {
      id: 'lukas-w',
      name: 'Lukas Weber',
      country: 'Germany 🇩🇪',
      flag: '🇩🇪',
      origin: 'Stuttgart, Germany',
      university: 'Technical University of Munich (TUM)',
      universityId: 'tum',
      course: 'MSc Informatics & Robotics',
      year: 'Master Student',
      propertyId: 'bavaria-student-quarters',
      propertyName: 'Maxvorstadt Student Quarters',
      roomFloor: 'Floor 3, Arcis Wing',
      avatar: 'assets/images/ravi.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Informatics student at TUM! 4 minutes walk to TUM main building, and 10 minutes to LMU. Warmmiete means no utility surprises. Ask me about Munich student life!',
      helpTopics: ['TUM Arcisstraße Walk', 'LMU Munich Commute', 'Warmmiete Bills Explanation', 'Anmeldung Registration'],
      verifiedMonths: 13
    },
    {
      id: 'felix-m',
      name: 'Felix Meyer',
      country: 'Germany 🇩🇪',
      flag: '🇩🇪',
      origin: 'Hamburg, Germany',
      university: 'Humboldt University of Berlin',
      universityId: 'hu-berlin',
      course: 'BA European Studies',
      year: 'Undergraduate Year 2',
      propertyId: 'mitte-student-quarters',
      propertyName: 'Mitte Student Quarters',
      roomFloor: 'Floor 2, Spree Wing',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Active Today',
      isOnline: true,
      badge: 'Verified Resident',
      bio: 'Living in Berlin Mitte! 8 minutes walk to Humboldt University Unter den Linden. Ask me about student housing in Berlin.',
      helpTopics: ['Humboldt Uni Walk', 'Berlin U-Bahn & S-Bahn', 'Warmmiete Tenancy'],
      verifiedMonths: 11
    },
    {
      id: 'tariq-a',
      name: 'Tariq Al-Mansoor',
      country: 'United Arab Emirates 🇦🇪',
      flag: '🇦🇪',
      origin: 'Dubai, UAE',
      university: 'University of Manchester',
      universityId: 'manchester',
      course: 'MSc Data Analytics',
      year: 'Postgraduate Year 1',
      propertyId: 'oxford-road-lodge',
      propertyName: 'Oxford Road Student Residence',
      roomFloor: 'Floor 4, Corridor Tower',
      avatar: 'assets/images/ravi.jpg',
      onlineStatus: 'Online Now',
      isOnline: true,
      badge: 'Verified Resident Ambassador',
      bio: 'Studying in Manchester on Oxford Road. 7 minutes walk to university buildings. Safe neighbourhood with 24/7 security.',
      helpTopics: ['Manchester Uni Walk', 'Oxford Road Buses', 'Halal Food Spots'],
      verifiedMonths: 9
    },
    {
      id: 'samuel-o',
      name: 'Samuel Osei',
      country: 'Nigeria 🇳🇬',
      flag: '🇳🇬',
      origin: 'Lagos, Nigeria',
      university: 'University of Birmingham',
      universityId: 'birmingham',
      course: 'BSc Mechanical Engineering',
      year: 'Year 2 Student',
      propertyId: 'selly-oak-living',
      propertyName: 'Selly Oak Student Living',
      roomFloor: 'Floor 2, Oak Wing',
      avatar: 'assets/images/james.jpg',
      onlineStatus: 'Active 30m ago',
      isOnline: true,
      badge: 'Verified Resident',
      bio: 'Selly Oak living near Birmingham campus. 10 minutes flat walk to the Clock Tower. SafeDeposits escrow was quick and transparent.',
      helpTopics: ['Birmingham Uni Walk', 'Selly Oak Groceries', 'Engineering Study Facilities'],
      verifiedMonths: 15
    }
  ],

  // Realistic Authenticated Chat History with Media Attachments for Every Ambassador
  chatHistory: {
    'residence-manager': [
      {
        id: 'mgr-1',
        sender: 'manager',
        text: 'Hello! Welcome to the official StudentStay Residence Concierge & Building Desk. I am Sarah Jenkins, operations lead. Are you preparing to move in or do you have questions about keys, leases, or building amenities?',
        time: '10:00'
      },
      {
        id: 'mgr-2',
        sender: 'user',
        text: 'Hi Sarah! How does key collection and check-in work when I arrive from the airport?',
        time: '10:02'
      },
      {
        id: 'mgr-3',
        sender: 'manager',
        text: 'Key collection is staffed 24/7! Once your room is reserved in escrow, your room number and electronic fob key are secured. Even if your flight lands after midnight or on a Sunday, our night concierge desk will check you in immediately.',
        time: '10:03'
      },
      {
        id: 'mgr-4',
        sender: 'user',
        text: 'Are utility bills really 100% included with no caps?',
        time: '10:05'
      },
      {
        id: 'mgr-5',
        sender: 'manager',
        text: 'Yes, 100%! All electricity, central heating, unlimited hot water, contents insurance, and 250Mbps dual-band Wi-Fi are fully inclusive. Zero hidden surcharges.',
        time: '10:06'
      }
    ],
    'ama-k': [
      {
        id: 'msg-1',
        sender: 'user',
        text: 'Hello Ama! I saw your verified review for Buchanan View on StudentStay. Is it genuinely an 8-minute walk to GCU campus?',
        time: '14:20'
      },
      {
        id: 'msg-2',
        sender: 'ama',
        text: 'Hello! Akwaaba! Yes, I 100% confirm my review! You literally walk out of Calgary Street, cut through Cowcaddens Road, and GCU library entrance is right there in 8 minutes. You will not need to spend any money on buses or subway tickets for university!',
        time: '14:22'
      },
      {
        id: 'msg-3',
        sender: 'user',
        text: 'That is such a relief to hear! What about the en-suite bathroom and winter heating? I have never experienced a Scottish winter before, does the heating stay on?',
        time: '14:24'
      },
      {
        id: 'msg-4',
        sender: 'ama',
        text: 'Heating is completely unlimited and included in your rent! There are radiators with thermostatic valves so you can set your own room temperature. The hot water pressure in the en-suite shower is strong 24/7. Here is an authentic photo of my actual en-suite bathroom right now:',
        time: '14:25',
        media: {
          type: 'image',
          src: 'assets/images/bathroom.jpg',
          caption: 'My private en-suite bathroom at Buchanan View (power shower, heated towel rack & mirror cabinet)'
        }
      },
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Wow, that looks super modern and clean! How about the study desk? Is there enough space for a dual monitor setup or large laptop?',
        time: '14:27'
      },
      {
        id: 'msg-6',
        sender: 'ama',
        text: 'Yes! The desk runs across the window wall. Here is my study setup with my books and laptop. Plenty of electrical sockets and an Ethernet port right next to the desk too.',
        time: '14:28',
        media: {
          type: 'image',
          src: 'assets/images/chat_room.jpg',
          caption: 'My desk & bedroom layout in Buchanan View — lots of daylight from the courtyard window'
        }
      }
    ],
    'kofi-m': [
      {
        id: 'kofi-msg-1',
        sender: 'user',
        text: 'Hi Kofi! I read your review about avoiding rental scams from Accra. Did the escrow protection really keep your money safe before flying to Scotland?',
        time: '15:10'
      },
      {
        id: 'kofi-msg-2',
        sender: 'kofi',
        text: '100% genuine! Before StudentStay, I almost paid a rogue agent on Facebook £1,200. With StudentStay, my holding deposit was deposited directly into SafeDeposits Scotland (government escrow). The landlord only receives funds after you pick up your keys in person. Total peace of mind!',
        time: '15:12'
      },
      {
        id: 'kofi-msg-3',
        sender: 'kofi',
        text: 'Also, during the heavy Scottish snow in December, the radiator in my room was toasty warm 24 hours a day with zero utility bills. Feel free to ask me anything about the flight or arrival shuttle!',
        time: '15:14'
      }
    ],
    'ananya-s': [
      {
        id: 'ananya-msg-1',
        sender: 'user',
        text: 'Hi Ananya! I am an incoming student from India heading to Strathclyde. Can you confirm the Wi-Fi speed and walk to campus library in your review?',
        time: '16:02'
      },
      {
        id: 'ananya-msg-2',
        sender: 'ananya',
        text: 'Namaste! Yes, absolutely confirming! The Wi-Fi is 250 Mbps with Ask4. I run Python machine learning scripts and stream 4K Zoom calls home to my family in Delhi without any lag. And Strathclyde library is literally a 5-minute walk down George Street!',
        time: '16:04'
      }
    ],
    'li-w': [
      {
        id: 'li-msg-1',
        sender: 'user',
        text: 'Hello Li Wei! Did you really get free Council Tax exemption through StudentStay?',
        time: '13:30'
      },
      {
        id: 'li-msg-2',
        sender: 'li-w',
        text: 'Ni hao! Yes, full-time international students in the UK are legally exempt from council tax. StudentStay generated my Glasgow City Council exemption letter automatically. Saved over £1,400 a year!',
        time: '13:33'
      }
    ],
    'callum-r': [
      {
        id: 'cal-msg-1',
        sender: 'user',
        text: 'Hi Callum! How is the walk from Salisbury Court to University of Edinburgh George Square?',
        time: '11:05'
      },
      {
        id: 'cal-msg-2',
        sender: 'callum',
        text: 'Hey! It is a flat 12-minute walk straight down South Bridge. You never need to catch a bus. Plus you have Arthur’s Seat right in your backyard for weekend runs!',
        time: '11:08'
      }
    ],
    'chen-w': [
      {
        id: 'chen-msg-1',
        sender: 'user',
        text: 'Hi Chen Wei! Is Bloomsbury Student Quarters really 6 minutes from UCL main campus?',
        time: '10:15'
      },
      {
        id: 'chen-msg-2',
        sender: 'chen',
        text: 'Ni hao! Yes! You walk straight across Russell Square and down Gower Street. You are at the UCL Main Quad in 6 minutes. And King’s College London on Strand is just 15 minutes walk down Kingsway!',
        time: '10:18'
      }
    ],
    'marcus-v': [
      {
        id: 'marcus-msg-1',
        sender: 'user',
        text: 'Hi Marcus! Is Manhattan Student Loft really a 6-minute walk to Columbia?',
        time: '17:20'
      },
      {
        id: 'marcus-msg-2',
        sender: 'marcus',
        text: 'Hey! Absolutely. 114th Street connects directly to the Columbia campus gates on Broadway and Amsterdam Ave. Safe neighbourhood with 24/7 doorman security.',
        time: '17:23'
      }
    ],
    'sarah-j': [
      {
        id: 'sarah-msg-1',
        sender: 'user',
        text: 'Hi Sarah! How is living at Bay & Bloor for University of Toronto students?',
        time: '12:40'
      },
      {
        id: 'sarah-msg-2',
        sender: 'sarah',
        text: 'Hi! It is amazing. 8 minutes walk into St. George campus. In winter you can hop into the underground PATH or Museum subway station so you never have to freeze.',
        time: '12:43'
      }
    ],
    'maya-l': [
      {
        id: 'maya-msg-1',
        sender: 'user',
        text: 'Hi Maya! Can you confirm the walk from Broadway Living to University of Sydney?',
        time: '09:30'
      },
      {
        id: 'maya-msg-2',
        sender: 'maya',
        text: 'G’day! Yes, literally 7 minutes. You walk across Victoria Park and you are right in front of the Quad. The air conditioning in the room works great in summer too!',
        time: '09:33'
      }
    ],
    'lukas-w': [
      {
        id: 'lukas-msg-1',
        sender: 'user',
        text: 'Hallo Lukas! How close is Maxvorstadt Student Quarters to TUM and LMU Munich?',
        time: '14:50'
      },
      {
        id: 'lukas-msg-2',
        sender: 'lukas',
        text: 'Servus! TUM is 4 minutes walk on Arcisstraße, and LMU is 10 minutes on Ludwigstraße. All heating and electricity are included under Warmmiete, so zero surprise utility bills!',
        time: '14:53'
      }
    ]
  },

  quickChatPrompts: [
    { text: 'Is the street safe to walk back late from the library?', topic: 'safety' },
    { text: 'Where is the nearest supermarket for groceries?', topic: 'groceries' },
    { text: 'How reliable is the Wi-Fi for coding and Zoom calls?', topic: 'wifi' },
    { text: 'How do deliveries and parcels get collected?', topic: 'parcels' },
    { text: 'Are there hidden charges or extra fees on utility bills?', topic: 'bills' },
    { text: 'What is the fastest way to get to campus from the building?', topic: 'commute' },
    { text: 'How does key collection and check-in work?', topic: 'keys' },
    { text: 'How does the escrow holding deposit protect me?', topic: 'escrow' },
    { text: 'How warm is the room in winter?', topic: 'heating' }
  ],

  smartResidentReplies: {
    safety: 'Very safe! The streets around our residences have regular street lighting, CCTV monitoring, and students walking back from university libraries at all hours. Building reception has 24/7 security staff.',
    groceries: 'Convenience supermarkets (Tesco Express, Sainsbury’s, Woolworths, Edeka, Whole Foods) are within 3-5 minutes walk. Major international grocery markets with authentic spices and ingredients are easily reachable on foot.',
    wifi: 'Super fast! Wi-Fi speeds range from 250 Mbps to 1 Gbps with dedicated student portals. Lag-free for model training, coding, Zoom video calls home, and streaming.',
    parcels: 'Reception has automated parcel delivery lockers. Whenever Amazon, DHL, or Royal Mail delivers, you get an SMS/email with a QR code to unlock your box anytime 24/7.',
    bills: 'Zero extra fees! Water, unlimited central heating/cooling, electricity, high-speed Wi-Fi, and contents insurance are all 100% included in the weekly rate. No unexpected winter utility bills.',
    commute: 'Super direct! You are within easy walking distance of campus (typically 4-12 minutes), and major subway/bus stations are right around the corner for city exploration.',
    keys: 'Key collection is 24/7! Our on-site concierge team is staffed around the clock. Your electronic smart fob and key are ready at reception whenever you arrive, even on late-night weekend international flights.',
    escrow: 'Your holding deposit is locked strictly in government-licensed custodial escrow (SafeDeposits Scotland / TDS). It is never released to landlords until you arrive and verify your room. 100% refundable if your student visa is denied or delayed.',
    heating: 'The heating is fantastic! Every room features thermostatic digital radiators that run 24/7 in winter. All heating electricity is fully inclusive, so you can stay wonderfully warm with zero worries.',
    dual: 'Selected Premium and Executive Studios support dual occupancy (couples) with a small 10-15% utility supplement. Standard en-suites are single occupancy to protect study peace.',
    luggage: 'We provide complimentary secure luggage holding rooms for international students arriving before their tenancy begins or between semesters.',
    maintenance: 'We have dedicated facilities technicians on site Monday through Saturday. Emergency repairs (heating, plumbing, door locks) are addressed within 1 hour 24/7.'
  },

  tourHotspots: [
    { id: 'spot-bed', title: 'Comfort 3/4 Double Bed', description: 'Orthopedic mattress with generous hydraulic under-bed luggage storage.', x: '24%', y: '68%', pitch: -8, yaw: -52, hfov: 58 },
    { id: 'spot-desk', title: 'Ergonomic Study Workspace', description: 'Wide desk with power plugs, USB charging outlets, and direct Ethernet port.', x: '55%', y: '65%', pitch: -12, yaw: 24, hfov: 52 },
    { id: 'spot-window', title: 'Acoustic Double-Glazed Window', description: 'Soundproof glazing with natural daylight and scenic views.', x: '52%', y: '35%', pitch: 4, yaw: 3, hfov: 55 },
    { id: 'spot-kitchen', title: 'Private Compact Kitchenette Pod', description: 'Integrated microwave oven, silent mini fridge, induction hob, and sink.', x: '86%', y: '55%', pitch: 2, yaw: 64, hfov: 54 },
    { id: 'spot-wardrobe', title: 'Built-in Double Wardrobe & Shelves', description: 'Floor-to-ceiling clothing wardrobe with hanging rail and shelves.', x: '38%', y: '45%', pitch: 5, yaw: -30, hfov: 62 }
  ],

  tourAngles: [
    { id: 'wide-overview', name: 'Full Studio Overview', shortName: '360° Overview', icon: 'fa-arrows-spin', description: 'Full wide-angle view showing the entire studio layout, open floor space, and natural lighting.', pitch: 0, yaw: 0, hfov: 105, zoomLevel: '100% Wide' },
    { id: 'window-angle', name: 'Skyline Window View', shortName: 'Window View', icon: 'fa-window-maximize', description: 'Zoomed angle into large acoustic windows showing natural daylight.', pitch: 5, yaw: 5, hfov: 52, zoomLevel: '190% Zoom' },
    { id: 'desk-angle', name: 'Dedicated Study Desk', shortName: 'Study Desk', icon: 'fa-laptop', description: 'Close inspection angle of the study desk, ergonomic chair, power outlets, and lighting.', pitch: -13, yaw: 24, hfov: 50, zoomLevel: '200% Zoom' },
    { id: 'bed-angle', name: 'Double Bed & Storage', shortName: 'Bed & Wardrobe', icon: 'fa-bed', description: 'Detailed angle of the comfortable mattress, bedding, and storage wardrobe.', pitch: -8, yaw: -50, hfov: 55, zoomLevel: '180% Zoom' },
    { id: 'kitchen-angle', name: 'Kitchenette & Dining Pod', shortName: 'Kitchenette', icon: 'fa-utensils', description: 'Detailed view of the kitchenette, induction stove, microwave, and fridge.', pitch: 1, yaw: 66, hfov: 52, zoomLevel: '190% Zoom' }
  ],

  // Community FAQs with Country and University Specific Guidance
  communityFaqs: [
    {
      countryCode: 'uk',
      category: 'UK Tenancy & Bills',
      question: 'Do international students have to pay UK Council Tax?',
      answer: 'No! As a full-time international student enrolled at an accredited UK university (like GCU, Strathclyde, Glasgow, Edinburgh, or UCL), you are 100% legally exempt from Council Tax. StudentStay generates an official exemption documentation for your city council automatically.',
      answeredBy: 'Verified UK Compliance Officer',
      upvotes: 98
    },
    {
      countryCode: 'all',
      category: 'Scam Protection',
      question: 'How does the Escrow Deposit Guarantee protect me from overseas?',
      answer: 'Your holding deposit is held safely in government-regulated custodial escrow (e.g. SafeDeposits Scotland in the UK). Funds are only released to the accommodation provider after you arrive in person and collect your room keys. If your visa is delayed or denied, you receive 100% refund within 48 hours.',
      answeredBy: 'StudentStay Legal Team',
      upvotes: 142
    },
    {
      countryCode: 'uk',
      category: 'Winter & Heating',
      question: 'How cold does the UK/Scotland get and will the room stay warm?',
      answer: 'UK winter temperatures range from 0°C to 7°C. All our accommodations feature heavy insulation and radiator heating that runs continually and is 100% included with zero utility bill surprises.',
      answeredBy: 'Ama K. (Resident Ambassador)',
      upvotes: 84
    },
    {
      countryCode: 'usa',
      category: 'US Leasing & SSN',
      question: 'Do I need a US Social Security Number (SSN) or US guarantor to book?',
      answer: 'No SSN or US guarantor is required! International students can reserve with their valid passport and university I-20 or offer letter. Your deposit is held in escrow.',
      answeredBy: 'US International Student Desk',
      upvotes: 91
    },
    {
      countryCode: 'canada',
      category: 'Canada Housing',
      question: 'Are winter hydro and heating bills included in Canadian residences?',
      answer: 'Yes! All hydro, heating, water, and high-speed Bell/Rogers fibre internet are completely included. Buildings feature indoor temperature controls and underground transit access.',
      answeredBy: 'Sarah J. (Toronto Ambassador)',
      upvotes: 76
    },
    {
      countryCode: 'germany',
      category: 'German Warmmiete',
      question: 'What is Warmmiete and do I get an Anmeldung certificate?',
      answer: 'All our German apartments are leased under Warmmiete, meaning heating, hot water, and electricity are 100% covered. Landlords provide the Wohnungsgeberbestätigung on day 1 so you can register your address (Anmeldung) immediately.',
      answeredBy: 'Lukas W. (Munich Ambassador)',
      upvotes: 88
    },
    {
      countryCode: 'australia',
      category: 'Australia Student Life',
      question: 'Do Australian residences include air conditioning and bills?',
      answer: 'Yes! Central air conditioning, electricity, water, and fibre internet are all included. Plus Broadway Living is right across from Broadway shopping mall and University of Sydney.',
      answeredBy: 'Maya L. (Sydney Ambassador)',
      upvotes: 82
    }
  ],

  // Comprehensive Authentic Testimonials for EVERY School in the Selector
  testimonials: [
    {
      id: 'test-ama',
      author: 'Ama Konadu',
      residentId: 'ama-k',
      avatar: 'assets/images/ama.jpg',
      university: 'Glasgow Caledonian University (GCU)',
      universityId: 'gcu',
      schoolShort: 'GCU',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'MSc Data Science & AI',
      country: 'Ghana 🇬🇭',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View - City Centre',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Sept 2025 • Room 304',
      title: 'Real photos, zero scams & 8-min walk to GCU library',
      comment: 'Moving from Accra to Scotland was my first time leaving West Africa. Paying rent in the UK was terrifying because of WhatsApp accommodation scams. Finding StudentStay changed everything. I chatted with senior students live, saw unedited photos of the en-suite bathroom, and the SafeDeposits Scotland escrow meant my money was never at risk. Heating is unlimited 24/7!',
      helpful: 58,
      confirmationBadge: 'Verified Tenancy • Online Now 🟢',
      confirmationQuote: 'Confirmed 8-minute flat walk to GCU & unlimited winter heating'
    },
    {
      id: 'test-kofi',
      author: 'Kofi Mensah',
      residentId: 'kofi-m',
      avatar: 'assets/images/james.jpg',
      university: 'Glasgow Caledonian University (GCU)',
      universityId: 'gcu',
      schoolShort: 'GCU',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'MSc International Project Management',
      country: 'Ghana 🇬🇭',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View - City Centre',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025 • Block B',
      title: 'Saved me so much stress coming from Accra!',
      comment: 'Booking from overseas was terrifying because of online fake landlord listings. StudentStay verified everything. When I arrived, the studio was identical to the 360 tour. The radiator in my room was toasty warm during December snow storms, and the 8-minute walk to GCU library saved me £80 a month on bus passes.',
      helpful: 42,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 100% scam-free government escrow holding'
    },
    {
      id: 'test-ananya',
      author: 'Ananya Sharma',
      residentId: 'ananya-s',
      avatar: 'assets/images/meilin.jpg',
      university: 'University of Strathclyde',
      universityId: 'strath',
      schoolShort: 'Strathclyde',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'MSc Artificial Intelligence',
      country: 'India 🇮🇳',
      propertyId: 'the-foundry',
      propertyName: 'The Foundry - Merchant City',
      rating: 5,
      date: 'January 2026',
      verifiedStay: 'Resident since Sept 2025 • Floor 3',
      title: 'Safe neighborhood, 5m to Strathclyde & 250 Mbps internet',
      comment: 'The Wi-Fi speed is genuine 250 Mbps with zero buffering on Zoom calls with my family back home in Delhi. SafeDeposits Scotland holding scheme gave my parents total peace of mind before transferring funds. Strathclyde library is a 5-minute walk down George Street, which is great for late study nights.',
      helpful: 35,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 5-min walk to Strathclyde & fast internet'
    },
    {
      id: 'test-meilin',
      author: 'Mei Lin Tan',
      residentId: 'meilin-t',
      avatar: 'assets/images/meilin.jpg',
      university: 'University of Strathclyde',
      universityId: 'strath',
      schoolShort: 'Strathclyde',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'BEng Civil Engineering',
      country: 'Malaysia 🇲🇾',
      propertyId: 'buchanan-view',
      propertyName: 'Buchanan View - City Centre',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident for 2 Years • Floor 2',
      title: 'Asian markets 10m away & strictly enforced quiet hours',
      comment: 'Living at Buchanan View for two full academic years. Asian supermarkets like Chung Ying and Oaka are literally a 10-minute walk away. Quiet hours from 10 PM are strictly enforced by reception security, so I can sleep peacefully before engineering exams. The automated parcel lockers mean deliveries never go missing.',
      helpful: 39,
      confirmationBadge: 'Senior Resident • Active 12m ago',
      confirmationQuote: 'Confirmed parcel lockers & quiet study environment'
    },
    {
      id: 'test-li',
      author: 'Li Wei',
      residentId: 'li-w',
      avatar: 'assets/images/ravi.jpg',
      university: 'University of Glasgow',
      universityId: 'uofg',
      schoolShort: 'Univ of Glasgow',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'BSc Accounting & Finance',
      country: 'China 🇨🇳',
      propertyId: 'kelvin-court',
      propertyName: 'Kelvin Court - West End',
      rating: 5,
      date: 'December 2025',
      verifiedStay: 'Resident since Sept 2024 • West Wing',
      title: 'Subway takes 10m to Hillhead & automated council tax exemption',
      comment: 'Subway takes 10 minutes to Hillhead for UofG classes. StudentStay generated my Glasgow Council tax exemption letter automatically, saving me over £1,400 a year. Reception collects all my online shopping packages in the automated parcel lockers. 100% recommend to incoming international students.',
      helpful: 29,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed council tax exemption & subway link to UofG'
    },
    {
      id: 'test-sophie',
      author: 'Sophie Müller',
      residentId: 'sophie-m',
      avatar: 'assets/images/sophie.jpg',
      university: 'University of Glasgow / GSA',
      universityId: 'uofg',
      schoolShort: 'Univ of Glasgow',
      city: 'Glasgow',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'MDes Communication Design',
      country: 'Germany 🇩🇪',
      propertyId: 'kelvin-court',
      propertyName: 'Kelvin Court - West End',
      rating: 5,
      date: 'January 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: 'Scenic West End living right by Kelvingrove Park',
      comment: 'The location is unbeatable if you appreciate architecture and nature. Kelvingrove Park is literally across the street. Double acoustic glazing keeps the studio whisper quiet. Chatting with residents before booking helped me decide on the room orientation with the best sunlight.',
      helpful: 31,
      confirmationBadge: 'Verified Resident • Active 1h ago',
      confirmationQuote: 'Confirmed quiet study rooms & Kelvingrove location'
    },
    {
      id: 'test-callum',
      author: 'Callum Robertson',
      residentId: 'callum-r',
      avatar: 'assets/images/james.jpg',
      university: 'University of Edinburgh',
      universityId: 'uoe',
      schoolShort: 'Edinburgh',
      city: 'Edinburgh',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'BSc Architecture',
      country: 'United Kingdom 🇬🇧',
      propertyId: 'salisbury-court',
      propertyName: 'Salisbury Court - Edinburgh',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Sept 2024',
      title: '12m walk to George Square Library & Arthur’s Seat views',
      comment: 'Salisbury Court is the best location for University of Edinburgh students. 12 minutes walk down South Bridge right to George Square. Heating is powerful during Edinburgh windy winters and bills are totally inclusive.',
      helpful: 38,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 12-min walk to Edinburgh George Square'
    },
    {
      id: 'test-jordan',
      author: 'Jordan MacLeod',
      residentId: 'jordan-m',
      avatar: 'assets/images/ravi.jpg',
      university: 'University of Aberdeen',
      universityId: 'uab',
      schoolShort: 'Aberdeen',
      city: 'Aberdeen',
      countryCode: 'uk',
      stateCode: 'scotland',
      course: 'BSc Marine Biology',
      country: 'United Kingdom 🇬🇧',
      propertyId: 'kings-links-lodge',
      propertyName: 'King’s Links Student Lodge',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '8 minutes walk to King’s College campus!',
      comment: 'Living in Old Aberdeen near King’s College has been fantastic. Warm rooms, fast internet, and zero hidden utility costs.',
      helpful: 24,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 8-minute walk to Aberdeen King’s College'
    },
    {
      id: 'test-chen',
      author: 'Chen Wei',
      residentId: 'chen-w',
      avatar: 'assets/images/ravi.jpg',
      university: 'University College London (UCL)',
      universityId: 'ucl',
      schoolShort: 'UCL',
      city: 'London',
      countryCode: 'uk',
      stateCode: 'england',
      course: 'MSc Financial Technology',
      country: 'China 🇨🇳',
      propertyId: 'bloomsbury-residence',
      propertyName: 'Bloomsbury Student Quarters - London',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Sept 2025 • Russell Wing',
      title: '6-minute walk to UCL Main Quad in London Zone 1',
      comment: 'Finding genuine housing in Central London without crazy agent commissions is tough. StudentStay protected my deposit in escrow and the room is literally 6 minutes walk from UCL Gower Street. Never had to buy an expensive monthly tube pass.',
      helpful: 47,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 6-min walk to UCL & Zone 1 central location'
    },
    {
      id: 'test-priya',
      author: 'Priya Patel',
      residentId: 'chen-w',
      avatar: 'assets/images/meilin.jpg',
      university: 'King’s College London (KCL)',
      universityId: 'kcl',
      schoolShort: 'King’s College',
      city: 'London',
      countryCode: 'uk',
      stateCode: 'england',
      course: 'LLM International Law',
      country: 'India 🇮🇳',
      propertyId: 'bloomsbury-residence',
      propertyName: 'Bloomsbury Student Quarters - London',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '15m walk to Strand Campus & zero London guarantor stress',
      comment: 'London landlords usually demand 6 months rent upfront if you don’t have a UK guarantor. With StudentStay, I paid termly in installments with zero guarantor needed. Strand campus is a 15-minute walk down Kingsway!',
      helpful: 41,
      confirmationBadge: 'Verified Resident • Active Today',
      confirmationQuote: 'Confirmed no UK guarantor required & 15m to KCL Strand'
    },
    {
      id: 'test-tariq',
      author: 'Tariq Al-Mansoor',
      residentId: 'tariq-a',
      avatar: 'assets/images/ravi.jpg',
      university: 'University of Manchester',
      universityId: 'manchester',
      schoolShort: 'Manchester',
      city: 'Manchester',
      countryCode: 'uk',
      stateCode: 'england',
      course: 'MSc Data Analytics',
      country: 'United Arab Emirates 🇦🇪',
      propertyId: 'oxford-road-lodge',
      propertyName: 'Oxford Road Student Residence',
      rating: 5,
      date: 'January 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '7 min walk down Oxford Road to university lectures',
      comment: 'Oxford Road is the heart of Manchester student life. The room is modern, quiet, and 24/7 security reception handles all online parcels safely.',
      helpful: 29,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 7-min walk to Manchester University Place'
    },
    {
      id: 'test-samuel',
      author: 'Samuel Osei',
      residentId: 'samuel-o',
      avatar: 'assets/images/james.jpg',
      university: 'University of Birmingham',
      universityId: 'birmingham',
      schoolShort: 'Birmingham',
      city: 'Birmingham',
      countryCode: 'uk',
      stateCode: 'england',
      course: 'BSc Mechanical Engineering',
      country: 'Nigeria 🇳🇬',
      propertyId: 'selly-oak-living',
      propertyName: 'Selly Oak Student Living',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Sept 2024',
      title: '10 min walk to University of Birmingham Clock Tower',
      comment: 'Coming from Lagos, having all heating and electricity covered was a huge relief. Quick 10-minute walk to engineering labs every morning.',
      helpful: 33,
      confirmationBadge: 'Verified Resident • Active 30m ago',
      confirmationQuote: 'Confirmed 10-min flat walk to UoB campus'
    },
    {
      id: 'test-marcus',
      author: 'Marcus Vance',
      residentId: 'marcus-v',
      avatar: 'assets/images/james.jpg',
      university: 'Columbia University',
      universityId: 'columbia',
      schoolShort: 'Columbia',
      city: 'New York City',
      countryCode: 'usa',
      stateCode: 'ny',
      course: 'MSc Computer Science',
      country: 'United States 🇺🇸',
      propertyId: 'manhattan-student-loft',
      propertyName: 'Manhattan Student Loft',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Aug 2025',
      title: '6 min walk to Columbia campus & 1 Train is 2 blocks away',
      comment: 'Morningside Heights is a wonderful academic neighborhood. The loft is spacious, doorman security is top notch, and Columbia Library is literally 6 minutes on foot.',
      helpful: 52,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 6-minute walk to Columbia Low Library'
    },
    {
      id: 'test-chloe',
      author: 'Chloe Dubois',
      residentId: 'chloe-d',
      avatar: 'assets/images/sophie.jpg',
      university: 'New York University (NYU)',
      universityId: 'nyu',
      schoolShort: 'NYU',
      city: 'New York City',
      countryCode: 'usa',
      stateCode: 'ny',
      course: 'BFA Film & Television',
      country: 'France 🇫🇷',
      propertyId: 'manhattan-student-loft',
      propertyName: 'Manhattan Student Loft',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '1 Train direct to NYU Washington Square in 18 minutes',
      comment: 'Living near Morningside Park while taking classes at NYU Tisch in Greenwich Village has been seamless. 1 Train runs 24/7 and the apartment is super quiet.',
      helpful: 36,
      confirmationBadge: 'Verified Resident • Active Today',
      confirmationQuote: 'Confirmed direct subway connection to NYU'
    },
    {
      id: 'test-elena',
      author: 'Elena Rossi',
      residentId: 'elena-r',
      avatar: 'assets/images/meilin.jpg',
      university: 'Harvard University',
      universityId: 'harvard',
      schoolShort: 'Harvard',
      city: 'Boston / Cambridge',
      countryCode: 'usa',
      stateCode: 'mass',
      course: 'Postgrad Biomedical Sciences',
      country: 'Italy 🇮🇹',
      propertyId: 'cambridge-court-boston',
      propertyName: 'Cambridge Common Student Residence',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '10 min walk to Harvard Yard & cozy winter heating',
      comment: 'Cambridge in winter gets very cold, but heating inside is always warm and bills are completely covered. 10 minutes walk across Cambridge Common right into Harvard Yard.',
      helpful: 44,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 10-min walk to Harvard Yard'
    },
    {
      id: 'test-sarah',
      author: 'Sarah Jenkins',
      residentId: 'sarah-j',
      avatar: 'assets/images/ama.jpg',
      university: 'University of Toronto',
      universityId: 'uoft',
      schoolShort: 'Univ of Toronto',
      city: 'Toronto',
      countryCode: 'canada',
      stateCode: 'ontario',
      course: 'BCom Rotman Commerce',
      country: 'Canada 🇨🇦',
      propertyId: 'bay-street-suites',
      propertyName: 'Bay & Bloor Student Residence',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Sept 2024',
      title: '8 min walk to UofT St. George & Museum Subway station',
      comment: 'Bay & Bloor is the premier student location in Toronto. 8 minutes walk to Rotman Commerce buildings. In winter, having Museum Subway station across the street makes getting around easy.',
      helpful: 48,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 8-minute walk to UofT St. George'
    },
    {
      id: 'test-jessica',
      author: 'Jessica Wong',
      residentId: 'jessica-w',
      avatar: 'assets/images/meilin.jpg',
      university: 'University of British Columbia',
      universityId: 'ubc',
      schoolShort: 'UBC',
      city: 'Vancouver',
      countryCode: 'canada',
      stateCode: 'bc',
      course: 'BSc Environmental Sciences',
      country: 'Canada 🇨🇦',
      propertyId: 'point-grey-vancouver',
      propertyName: 'Point Grey Student Quarters',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Sept 2025',
      title: '10 min walk to UBC Main Mall & ocean air',
      comment: 'Living on campus in Point Grey is peaceful and scenic. The studio is warm, Wi-Fi is fast, and walking to classes takes only 10 minutes.',
      helpful: 31,
      confirmationBadge: 'Verified Resident • Active Today',
      confirmationQuote: 'Confirmed 10-minute walk to UBC Main Mall'
    },
    {
      id: 'test-maya',
      author: 'Maya Lin',
      residentId: 'maya-l',
      avatar: 'assets/images/sophie.jpg',
      university: 'University of Sydney',
      universityId: 'usyd',
      schoolShort: 'Univ of Sydney',
      city: 'Sydney',
      countryCode: 'australia',
      stateCode: 'nsw',
      course: 'Master of Commerce',
      country: 'Australia 🇦🇺',
      propertyId: 'broadway-sydney-lodge',
      propertyName: 'Broadway Student Living',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since July 2025',
      title: '7 min walk to USYD Camperdown Quad & great AC',
      comment: 'Broadway Living is literally opposite Victoria Park. 7 minutes walk to USYD main quad. Central air conditioning is fully included which is a huge deal during Sydney heatwaves.',
      helpful: 45,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 7-min walk to USYD & central air conditioning'
    },
    {
      id: 'test-nathan',
      author: 'Nathan Kelly',
      residentId: 'nathan-k',
      avatar: 'assets/images/james.jpg',
      university: 'University of Melbourne',
      universityId: 'unimelb',
      schoolShort: 'Melbourne Uni',
      city: 'Melbourne',
      countryCode: 'australia',
      stateCode: 'vic',
      course: 'MSc Management',
      country: 'Australia 🇦🇺',
      propertyId: 'parkville-student-lodge',
      propertyName: 'Parkville Student Lodge',
      rating: 5,
      date: 'February 2026',
      verifiedStay: 'Resident since Feb 2026',
      title: '5 min walk across the road to University of Melbourne',
      comment: 'Location in Parkville could not be better. Tram stops right outside and campus is 5 minutes walk. All bills are included in the weekly rent.',
      helpful: 34,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 5-min walk to Melbourne University campus'
    },
    {
      id: 'test-lukas',
      author: 'Lukas Weber',
      residentId: 'lukas-w',
      avatar: 'assets/images/ravi.jpg',
      university: 'Technical University of Munich (TUM)',
      universityId: 'tum',
      schoolShort: 'TUM Munich',
      city: 'Munich',
      countryCode: 'germany',
      stateCode: 'bavaria',
      course: 'MSc Informatics & Robotics',
      country: 'Germany 🇩🇪',
      propertyId: 'bavaria-student-quarters',
      propertyName: 'Maxvorstadt Student Quarters',
      rating: 5,
      date: 'March 2026',
      verifiedStay: 'Resident since Oct 2025',
      title: '4 min walk to TUM Arcisstraße & Warmmiete included',
      comment: 'Munich rental market is famously difficult, but StudentStay made reserving painless. Arcisstraße TUM building is 4 minutes on foot, and Warmmiete means zero Nebenkosten utility surprises.',
      helpful: 43,
      confirmationBadge: 'Verified Resident • Online Now 🟢',
      confirmationQuote: 'Confirmed 4-min walk to TUM & Warmmiete all-inclusive'
    },
    {
      id: 'test-felix',
      author: 'Felix Meyer',
      residentId: 'felix-m',
      avatar: 'assets/images/james.jpg',
      university: 'Humboldt University of Berlin',
      universityId: 'hu-berlin',
      schoolShort: 'Humboldt Berlin',
      city: 'Berlin',
      countryCode: 'germany',
      stateCode: 'berlin',
      course: 'BA European Studies',
      country: 'Germany 🇩🇪',
      propertyId: 'mitte-student-quarters',
      propertyName: 'Mitte Student Quarters',
      rating: 5,
      date: 'January 2026',
      verifiedStay: 'Resident since Oct 2025',
      title: '8 min walk to Humboldt University Unter den Linden',
      comment: 'Central Berlin Mitte apartment with immediate Anmeldung address registration support from the landlord. 8 minutes walk to Humboldt lectures.',
      helpful: 28,
      confirmationBadge: 'Verified Resident • Active Today',
      confirmationQuote: 'Confirmed 8-min walk to Humboldt Uni Unter den Linden'
    }
  ],

  // Arrival Add-ons and Guarantees
  arrivalServices: [
    { id: 'airport-pickup', title: 'Free Welcome Airport Shuttle', tagline: 'Driver meets you at arrivals hall with luggage assistance', cost: 'FREE with full-year bookings', icon: 'fa-van-shuttle' },
    { id: 'bedding-pack', title: 'Pre-ordered Winter Bedding Pack', tagline: 'Warm duvet, 2 pillows, mattress protector & sheets waiting on your bed', cost: '£45 (or included in Early Bird)', icon: 'fa-bed' },
    { id: 'uk-sim', title: 'Local SIM Card with 50GB Data Ready on Check-in', tagline: 'Instant mobile network for family calls & Google Maps navigation', cost: 'FREE on arrival', icon: 'fa-sim-card' },
    { id: 'council-tax', title: 'Local Tax Exemption Automation', tagline: 'Official exemption documentation pre-formatted for city councils', cost: 'FREE Student Service', icon: 'fa-file-shield' }
  ],

  guaranteePolicies: {
    noVisaNoPay: {
      title: 'No Visa, No Pay 100% Money-Back Guarantee',
      terms: 'If your International Student Visa application is refused or delayed past the course start date, you are legally entitled to cancel your reservation with a 100% full refund of your deposit within 48 hours.'
    },
    noPlaceNoPay: {
      title: 'No University Place, No Pay Guarantee',
      terms: 'If your unconditional university offer is not confirmed, simply upload your official university letter for a complete refund.'
    },
    escrowDeposit: {
      title: 'Government-Backed Escrow Protection',
      terms: 'Your holding deposit is protected under tenancy legislation in a government-approved custodial scheme, never kept directly by landlords.'
    }
  }
};

// Global window export for browser script compatibility
if (typeof window !== 'undefined') {
  window.APP_AUTH = APP_AUTH;
  window.APP_DATA = APP_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { APP_DATA, APP_AUTH };
}
