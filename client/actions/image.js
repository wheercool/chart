export const CHANGE_IMAGE_URL = 'CHANGE_IMAGE_URL'

export function changeImageUrl(url) {
  return {
    type: CHANGE_IMAGE_URL,
    url
  }
}
