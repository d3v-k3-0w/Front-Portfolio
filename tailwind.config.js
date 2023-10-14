/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx}'];
export const mode = 'jit';
export const theme = {
	extend: {
		colors: {
			primary: '#050816',
			secondary: '#aaa6c3',
			tertiary: '#151030',
			'black-100': '#100d25',
			'black-200': '#090325',
			'white-100': '#f3f3f3',
			'custom-focus': '#00cea8',
		},
		backgroundColor: {
			'custom-hover': '#00cea8',
		},
		boxShadow: {
			card: '0px 35px 120px -15px #211e35',
		},
		screens: {
			'mobile': '450px',
			'tablet': '768px',
			'laptop': '1026px',
			'laptop-l': '1440px',
			'4k': '2560px',
		},
		backgroundImage: {
			'hero-pattern': "url('/herobg.png')",
		},
	},
};
export const plugins = [];
