import fs from 'fs'
import { Helmet } from 'react-helmet'
import cheerio from 'cheerio'
import {resolve} from "path"
import config from '../../../config'

const templatePath = resolve(config.local.public, 'client.html')

export default function (componentHTML, script) {
  const prepareStore = {a: 'aaaaaaaaaaaaaaaaaa'}
  const helmet = Helmet.renderStatic()

  const HTML_TEMPLATE = fs.readFileSync(templatePath).toString()
  const $template = cheerio.load(HTML_TEMPLATE, { decodeEntities: false })

  $template('head').append(helmet.title.toString() + helmet.meta.toString() + helmet.link.toString())

  $template('#app').html(componentHTML)
  $template('#app').after(`<script>window.__INITIAL_STATE__ = ${JSON.stringify(prepareStore)}</script>`)
  $template('body').append(script)

  return $template.html()
}
