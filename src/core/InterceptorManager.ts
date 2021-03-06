interface Interceptor<T> {
  resolved: ResolveFn<T>
  rejected: RejectFn
}

export default class InterceptorManager<T> {
  interceptors: Array<Interceptor<T> | null>

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolveFn<T>, rejected: RejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
