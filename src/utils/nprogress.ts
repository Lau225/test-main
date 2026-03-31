import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

class Progress {
  private static instance: Progress
  private progressStarted = false

  constructor() {
    this.configure()
  }

  static getInstance(): Progress {
    if (!Progress.instance) {
      Progress.instance = new Progress()
    }
    return Progress.instance
  }

  private configure(): void {
    NProgress.configure({
      // 动画方式
      easing: 'ease',
      // 递增进度条的速度
      speed: 500,
      // 是否显示加载ico
      showSpinner: false,
      // 自动递增间隔
      trickleSpeed: 200,
      // 初始化时的最小百分比
      minimum: 0.08,
      // 父元素
      parent: 'body'
    })
  }

  // 自定义配置
  setOptions(options: NProgress.NProgressOptions): void {
    NProgress.configure(options)
  }

  // 开始进度条
  start(): void {
    if (!this.progressStarted) {
      NProgress.start()
      this.progressStarted = true
    }
  }

  // 结束进度条
  done(): void {
    if (this.progressStarted) {
      NProgress.done()
      this.progressStarted = false
    }
  }

  // 设置进度
  set(value: number): void {
    NProgress.set(value)
  }

  // 递增进度
  inc(amount?: number): void {
    NProgress.inc(amount)
  }

  // 移除进度条
  remove(): void {
    NProgress.remove()
  }

  // 获取状态
  status(): number | null {
    return NProgress.status
  }

  // 获取是否已经开始
  isStarted(): boolean {
    return this.progressStarted
  }
}

export const progress = Progress.getInstance()