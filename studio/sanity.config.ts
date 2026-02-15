import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: '9ldegek1',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'pl', title: 'Polish'},
      ],
      schemaTypes: [
        'heroPage',
        'aboutMePage',
        'skillsPage',
        'experiencePage',
        'project',
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
