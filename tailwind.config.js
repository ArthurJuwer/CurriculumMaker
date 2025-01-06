/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        DefaultGray: '#D9D9D9',
        TitleGray: '#3B3C3F', 
        BorderInputGray: '#A5A5A5',
        StrongGray: '#1E1E1E',
        NormalGray: '#B2B4B8',
        WeakGray: '#7F8086',
        WeakLightGray: '#CBCBCB',
        DefaultOrange : '#DE651A',
        scoreColors:{
          red: '#FE7D8B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      fontSize: {        
        title1920: '28px',
        titleDescript1920: '11px',
        subtitle1920: '20px',
        p1920: '12px',

        title1920Model: '1.5rem',  
        subtitle1920Model: '1rem',
        titleDescript1920Model: '0.6rem',
        p1920Model: '0.7rem',
      }
    },
  },
  plugins: [],
}

