/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
    
      colors: {
        DefaultGray: '#D9D9D9', 
        StrongGray: '#1E1E1E',
        NormalGray: '#B2B4B8',
        WeakGray: '#7F8086',
        WeakLightGray: '#CBCBCB',
        DefaultOrange : '#DE651A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}

