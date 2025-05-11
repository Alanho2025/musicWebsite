const pets = [
    {
        id: 1,
        name: "Lucky Cat",
        age: 2,
        species: "Cat",
        breed: "Japanese Bobtail",
        gender: "Female",
        medical_record: "Vaccinated, spayed, in good health",
        adopted: false
    },
    {
        id: 2,
        name: "Max",
        age: 4,
        species: "Dog",
        breed: "Golden Retriever",
        gender: "Male",
        medical_record: "Vaccinated, neutered, minor allergies",
        adopted: true
    },
    {
        id: 3,
        name: "Snowball",
        age: 1,
        species: "Rabbit",
        breed: "Holland Lop",
        gender: "Female",
        medical_record: "Vaccinated, healthy",
        adopted: false
    },
    {
        id: 4,
        name: "Shadow",
        age: 3,
        species: "Cat",
        breed: "Bombay",
        gender: "Male",
        medical_record: "Vaccinated, neutered, sensitive stomach",
        adopted: false
    },
    {
        id: 5,
        name: "Bella",
        age: 2,
        species: "Dog",
        breed: "French Bulldog",
        gender: "Female",
        medical_record: "Vaccinated, spayed, clean bill of health",
        adopted: true
    },
    {
        id: 6,
        name: "Mochi",
        age: 1,
        species: "Rabbit",
        breed: "Mini Rex",
        gender: "Male",
        medical_record: "Vaccinated, recovering from surgery",
        adopted: false
    },
    {
        id: 7,
        name: "Kiwi",
        age: 5,
        species: "Bird",
        breed: "Parakeet",
        gender: "Female",
        medical_record: "Healthy, wing trimmed",
        adopted: false
    },
    {
        id: 8,
        name: "Tank",
        age: 8,
        species: "Other",
        breed: "African Spurred Tortoise",
        gender: "Male",
        medical_record: "Healthy, special calcium diet",
        adopted: false
    },
    {
        id: 9,
        name: "Luna",
        age: 6,
        species: "Cat",
        breed: "Persian",
        gender: "Female",
        medical_record: "Spayed, tear duct issue monitored",
        adopted: true
    },
    {
        id: 10,
        name: "Rocky",
        age: 2,
        species: "Dog",
        breed: "Shiba Inu",
        gender: "Male",
        medical_record: "Vaccinated, neutered, energetic",
        adopted: false
    },
    {
        id: 11,
        name: "Peanut",
        age: 1,
        species: "Rabbit",
        breed: "Lionhead",
        gender: "Female",
        medical_record: "Vaccinated, mild ear mites treated",
        adopted: false
    },
    {
        id: 12,
        name: "Coco",
        age: 4,
        species: "Cat",
        breed: "Siamese",
        gender: "Female",
        medical_record: "Spayed, healthy, picky eater",
        adopted: true
    },
    {
        id: 13,
        name: "Buddy",
        age: 7,
        species: "Dog",
        breed: "Beagle",
        gender: "Male",
        medical_record: "Vaccinated, chronic ear infection monitored",
        adopted: false
    },
    {
        id: 14,
        name: "Sky",
        age: 3,
        species: "Bird",
        breed: "Cockatiel",
        gender: "Male",
        medical_record: "Healthy, enjoys human interaction",
        adopted: true
    },
    {
        id: 15,
        name: "Bubbles",
        age: 2,
        species: "Other",
        breed: "Goldfish",
        gender: "Unknown",
        medical_record: "Healthy, in filtered tank",
        adopted: false
    }
];

export function retrievePets(search) {
    let matchingPets = pets;

    if (!search) return matchingPets;

    const { species, breed, gender } = search;

    // 只回傳未領養的
    matchingPets = matchingPets.filter(pet => pet.adopted === false);

    // 如果有指定 species，就篩選
    if (species) {
        matchingPets = matchingPets.filter(pet =>
            pet.species.toLowerCase().includes(species.toLowerCase())
        );
    }

    // 如果有指定 breed，就篩選
    if (breed) {
        matchingPets = matchingPets.filter(pet =>
            pet.breed.toLowerCase().match(breed.toLowerCase())
        );
    }

    // 如果有指定 gender，就篩選
    if (gender) {
        matchingPets = matchingPets.filter(pet =>
            pet.gender.toLowerCase() === gender.toLowerCase()
        );
    }

    return matchingPets;
}
export function retrievePetById(id) {
    return pets.find((pets) => pets.id == id);
}
