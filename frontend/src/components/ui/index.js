export default {
  install(app) {
    const components = import.meta.glob('./**/*.vue', { eager: true })

    Object.entries(components).forEach(([path, component]) => {
      const componentName = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
      app.component(componentName, component.default)
    })
  },
}
