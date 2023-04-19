
const rentals = [
    {
    headline: "Cozy Lakefront Log Cabin",
    numSleeps: 2,
    numBedrooms: 1,
    numBathrooms: 1,
    pricePerNight: 125.99,
    city: "Whistler",
    province: "British Columbia",
    imageUrl: "/images/a1.jpg",
    featuredRental: true,
  },
  
  
   {
    headline: "Modern and Spacious Downtown Loft",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 2,
    pricePerNight: 189.99,
    city: "Whistler",
    province: "British Columbia",
    imageUrl: "/images/a2.jpg",
    featuredRental: true,
  },
  
  
 {
    headline: "Cozy Mountain Chalet",
    numSleeps: 6,
    numBedrooms: 3,
    numBathrooms: 2,
    pricePerNight: 239.99,
    city: "Whistler",
    province: "British Columbia",
    imageUrl: "/images/a3.jpg",
    featuredRental: true,
  },
  
  {
    headline: "Beachfront Villa with Private Pool",
    numSleeps: 8,
    numBedrooms: 4,
    numBathrooms: 3,
    pricePerNight: 349.99,
    city: "Banff",
    province: "Alberta",
    imageUrl: "/images/a4.jpg",
    featuredRental: true,
  },
  {
    headline: "Charming Bungalow",
    numSleeps: 5,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 129.99,
    city: "Banff",
    province: "Alberta",
    imageUrl: "images/a1.jpg",
    featuredRental: false
  },
  {
  headline: "Coastal Cottage",
  numSleeps: 4,
  numBedrooms: 2,
  numBathrooms: 1,
  pricePerNight: 149.99,
  city: "Victoria",
  province: "British Columbia",
  imageUrl: "images/a4.jpg",
  featuredRental: true
  },
  {
    headline: "Rustic Farmhouse",
    numSleeps: 10,
    numBedrooms: 4,
    numBathrooms: 2,
    pricePerNight: 399.99,
    city: "Victoria",
    province: "British Columbia",
    imageUrl: "images/a6.jpg",
    featuredRental: false
  },
   {
    headline: "Luxury Penthouse with Stunning Views",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 2,
    pricePerNight: 499.99,
    city: "Banff",
    province: "Alberta",
    imageUrl: "/images/a5.jpg",
    featuredRental: true,
  },
  
 {
    headline: "Rustic Cottage in the Woods",
    numSleeps: 4,
    numBedrooms: 2,
    numBathrooms: 1,
    pricePerNight: 159.99,
    city: "Banff",
    province: "Alberta",
    imageUrl: "/images/a6.jpg",
    featuredRental: true,
  }
]
  
module.exports.getFeaturedRentals= function() {
    let filterData = [];

    for (let i = 0; i < (rentals.length) - 1; i++) {
        if (rentals[i].featuredRental) {
            filterData.push(rentals[i]);
        }
    }

    return filterData;
  };
  
  module.exports.getRentalsByCityAndProvince = function() {
    let rentalCities = [];
    for (let rental of rentals) {
      let cityProvince = rental.city + ", " + rental.province;
      if (!rentalCities[cityProvince]) {
        rentalCities[cityProvince] = { cityProvince: cityProvince, rentals: [] };
      }
      rentalCities[cityProvince].rentals.push(rental);
    }
    return Object.values(rentalCities);
  

  }