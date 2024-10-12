import type { Plugin } from 'vite'

export default function myLibPlugin(): Plugin {
  return {
    name: 'vite-plugin-mylib',
    transform(code, id) {
      // Add your plugin logic here
      return code
    }
  }
}