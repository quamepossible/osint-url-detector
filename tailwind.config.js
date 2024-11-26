/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.ejs"],
  theme: {
    extend: {
      height: {
        "90": "90%",
        "900": "900px",
        "800": "800px",
        "500": "500px",
        "400": "400px"
      },
      width: {
        "90": "90%",
        "900": "900px",
        "800": "800px",
        "450": "450px"
      }
    },
    fontFamily: {
      "Parkinsans":"'Parkinsans', sans-serif;"
    }
  },
  plugins: [],
}

