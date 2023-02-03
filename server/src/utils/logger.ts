const { log, error } = console

const info = (...params) => {
  log('--- InfoLog start ---')
  log(new Date().toLocaleString())
  log('Message: ', ...params)
  log(`--- InfoLog end --- \n`)
}

const err = (...params) => {
  log('--- ErrorLog start ---')
  log(new Date().toLocaleString())
  error('Message: ', ...params)
  log(`--- ErrorLog end --- \n`)
}

export default {
  info,
  error
}
