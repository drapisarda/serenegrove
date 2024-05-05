export interface Step {
  id: number
  name: string
  duration: number
  file: string
  description: string
  icon: string
  pauseAfter: number
}

// TODO use standard
export interface TimeFormat {
  hours: string
  minutes: string
  seconds: string
}

export interface ToastMessage {
  message: string
  id: number
  style: string
}

export enum ToastStyles {
  Success = 'success',
  Warning = 'warning',
}

export interface RoutineTimeVariationType {
  id: number
  label: string
  modifier: number
}
