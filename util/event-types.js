export const userInfoFormSubmit = "userInfoFormSubmit"
export const passwordInfoFormSubmit = "passwordInfoFormSubmit"

export const emitEventType = (event, eventType) => {
  event.preventDefault()
  event.stopPropagation()
  if (process.browser) {
    document.dispatchEvent(new Event(eventType))
  }
}