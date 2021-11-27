export function getData() {
  const k = 5;
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
        revolutionR: 60 * k,
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
        revolutionR: 70 * k,
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
        revolutionR: 80 * k,
      },
      {
        name: "Neptune",
        R: 4 * k,
        URL: "../assets/neptune/neptune.jpg",
        revolutionR: 100 * k, //公转半径
      },
    ],
  };
}
