export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        ink: "#111111",
        muted: "#666666",
        hairline: "#EAEAEA",
      },
      spacing: {
        'section': '5rem',
        'section-lg': '8rem',
      },
      animation: {
        'wiggle': 'wiggle 2.2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'float': 'float 3.6s ease-in-out infinite',
        'shimmer-sweep': 'shimmerSweep 5s ease-in-out infinite',
      },
      keyframes: {
        shimmerSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '15%, 100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 75%, 100%': { transform: 'rotate(0deg) scale(1) translateY(0)' },
          '78%': { transform: 'rotate(-18deg) scale(1.08) translateY(-4px)' },
          '81%': { transform: 'rotate(18deg) scale(1.08) translateY(-4px)' },
          '84%': { transform: 'rotate(-14deg) scale(1.06) translateY(-3px)' },
          '87%': { transform: 'rotate(14deg) scale(1.06) translateY(-3px)' },
          '90%': { transform: 'rotate(-8deg) scale(1.03) translateY(-2px)' },
          '93%': { transform: 'rotate(8deg) scale(1.03) translateY(-2px)' },
          '96%': { transform: 'rotate(0deg) scale(1) translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};