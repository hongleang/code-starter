export function debounce(fn, wait) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export function imageUrl(url) {
  if (!url) return 'https://placehold.co/600x400'
  
  return `${import.meta.env.VITE_API_URL}${url}`
}
