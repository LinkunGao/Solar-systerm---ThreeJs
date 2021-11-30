function getData() {
  const k = 6;
  return {
    sun: {
      name: "Sun",
      R: 10 * k,
      URL: "../assets/sun/512/sun.jpg",
    },
    planet: [
      {
        name: "Mercury",
        R: 2.5 * k,
        URL: "../assets/mercury/mercury.jpg",
        revolutionR: 20 * k,
      },
      {
        name: "Venus",
        R: 3 * k,
        URL: "../assets/venus/venus.jpg",
        revolutionR: 30 * k,
      },
      {
        name: "Earth",
        R: 3.2 * k,
        URL: "../assets/earth/diffuse.png",
        URL_Nor: "../assets/earth/normal.png",
        moon: {
          name: "Moon",
          R: 1.9 * k,
          URL: "../assets/moon/moon.jpg",
          URL_Nor: "../assets/moon/normal.jpg",
        },
        revolutionR: 40 * k,
      },
      {
        name: "Mars",
        R: 2.5 * k,
        URL: "../assets/mars/mars.jpg",
        revolutionR: 50 * k,
      },
      {
        name: "Jupiter",
        R: 5.5 * k,
        URL: "../assets/jupiter/jupiter.jpg",
        revolutionR: 65 * k,
      },
      {
        name: "Saturn",
        shpere: {
          R: 3.5 * k,
          URL: "../assets/saturn/saturn.jpg",
        },
        ring: {
          r: 4 * k,
          R: 6 * k,
          URL: "../assets/saturn/saturn_ring.png",
        },
        revolutionR: 80 * k,
      },
      {
        name: "Uranus",
        shpere: {
          R: 3.5 * k,
          URL: "../assets/uranus/uranus.jpg",
        },
        ring: {
          r: 4 * k,
          R: 6 * k,
          URL: "../assets/uranus/uranus_ring.png",
        },
        revolutionR: 100 * k,
      },
      {
        name: "Neptune",
        R: 4 * k,
        URL: "../assets/neptune/neptune.jpg",
        revolutionR: 120 * k, //公转半径
      },
    ],
  };
}

function getPlanetData() {
  return {
    Sun: {
      discription:
        "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating the energy mainly as visible light, ultraviolet light, and infrared radiation.",
    },
    Mercury: {
      discription:
        "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",
    },
    Venus: {
      discription:
        "Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four inner, terrestrial (or rocky) planets, and it’s often called Earth’s twin because it’s similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.",
    },
    Earth: {
      discription:
        "Earth is the third planet from the Sun and the only astronomical object known to harbour and support life. 29.2% of Earth's surface is land consisting of continents and islands. ",
    },
    Moon: {
      discription:
        "The Moon is Earth's only natural satellite. At about one-quarter the diameter of Earth (comparable to the width of Australia),[16] it is the largest natural satellite in the Solar System relative to the size of its planet,[f] the fifth largest satellite in the Solar System overall, and is larger than any known dwarf planet. ",
    },
    Mars: {
      discription:
        "​Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. Mars is also a dynamic planet with seasons, polar ice caps, canyons, extinct volcanoes, and evidence that it was even more active in the past.",
    },
    Jupiter: {
      discription:
        "Jupiter has a long history of surprising scientists – all the way back to 1610 when Galileo Galilei found the first moons beyond Earth. That discovery changed the way we see the universe.",
    },
    Saturn: {
      discription:
        "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system.",
    },
    Uranus: {
      discription:
        "Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.",
    },
    Neptune: {
      discription:
        "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.",
    },
  };
}

export { getData, getPlanetData };
