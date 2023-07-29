import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import Components from 'unplugin-vue-components/vite'
import useJsx from "@vitejs/plugin-vue-jsx"
// https://vitejs.dev/config/
export default defineConfig({
	dts: true,
	plugins: [
		uni({
			vueOptions: {
				template: {
					compilerOptions: {
						isCustomElement: tag => (
							tag === 'anydoor-native-webview'
							|| tag === 'anydoor-native-lottie'
							|| tag === 'anydoor-native-scroll')
					}
				}
			}
		}),
		useJsx()
		// Components({
		//       dirs: ['src/tm-vuetify/components'],
		// extensions: ['vue'],
		//  resolvers: [
		//     // example of importing Vant
		//     (name) => {
		// 		console.log(name)
		//       // where `name` is always CapitalCase
		//       if (name.startsWith('tm'))
		//         return { importName: name.slice(2), path: './src/tm-vuetify/components' }
		//     },
		//   ],
		//  })
	],
});
