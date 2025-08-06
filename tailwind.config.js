// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Custom color palette cho bookstore
          primary: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          },
          secondary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
          },
          accent: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          }
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Poppins', 'system-ui', 'sans-serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in-out',
          'slide-up': 'slideUp 0.3s ease-out',
          'slide-down': 'slideDown 0.3s ease-out',
          'pulse-slow': 'pulse 3s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          }
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        }
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  
  // src/index.css
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
  
  /* Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  /* Custom base styles */
  @layer base {
    html {
      scroll-behavior: smooth;
    }
    
    body {
      @apply font-sans text-gray-900 bg-gray-50;
    }
    
    h1, h2, h3, h4, h5, h6 {
      @apply font-display font-semibold;
    }
  }
  
  /* Custom components */
  @layer components {
    .btn {
      @apply px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
    }
    
    .btn-primary {
      @apply btn bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
    }
    
    .btn-secondary {
      @apply btn bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500;
    }
    
    .btn-outline {
      @apply btn border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500;
    }
    
    .card {
      @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
    }
    
    .card-hover {
      @apply card hover:shadow-md transition-shadow duration-200;
    }
    
    .input {
      @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
    }
    
    .container-custom {
      @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
    }
}