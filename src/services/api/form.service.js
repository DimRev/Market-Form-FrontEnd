// import { storageService } from '../helpers/async-storage.service.js'
import { httpService } from '../helpers/http.service.js'
export const formService = {
  getForms,
  getFormById,
  addForm,
  updateForm,
  deleteForm,
  // getEmptyForm,
}

// const DB_KEY = 'formDB'
const BASE_URL = 'form/'

// ! CHECK BACKEND FOR COMPLETABLE REST METHODS FOR HTTP SERVICE ! //

// const demoData = [{ _id: 'i101', name: 'form1' }]

// _initDemoData()

function getForms() {
  return httpService.get(BASE_URL)
  // return storageService.query(DB_KEY)
}

function getFormById(formId) {
  return httpService.get(BASE_URL + formId)
  // return storageService.get(DB_KEY, formId)
}

function addForm(form) {
  return httpService.post(BASE_URL, { form })
  // return storageService.post(DB_KEY, form)
}

function updateForm(form) {
  return httpService.put(BASE_URL, { form })
  // return storageService.put(DB_KEY, form)
}

function deleteForm(formId) {
  return httpService.delete(BASE_URL + formId)
  // return storageService.remove(DB_KEY, formId)
}

// function _initDemoData() {
//   const forms = JSON.parse(localStorage.getItem(DB_KEY))
//   if (!forms || forms.length === 0)
//     localStorage.setItem(DB_KEY, JSON.stringify(demoData))
// }

// function getEmptyForm() {
//   return {}
// }
