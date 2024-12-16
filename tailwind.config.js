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
        title1920: '1.75rem',
        titleDescript1920: '0.75rem',
        subtitle1920: '1.25rem',
        p1920: '0.8rem',


        titleDescript1920Model: '0.6rem',
        subtitle1920Model: '1rem',
        title1920Model: '1.5rem',      
        p1920Model: '0.7rem',
      }
    },
  },
  plugins: [],
}

