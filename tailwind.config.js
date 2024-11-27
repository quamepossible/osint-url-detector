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
        "450": "450px",
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
  safelist: [
    "border-green-400",
    "text-green-400",
    "border-red-400",
    "text-red-400",
    "border-orange-400",
    "text-orange-400",
    "border-yellow-400",
    "text-yellow-400",
    "border-blue-400",
    "text-blue-400",
    "text-red-500",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
  ],
  plugins: [],
}

