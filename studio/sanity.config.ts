import {defineConfig, type Template} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

const SINGLETONS = ['siteSettings']

const base = {
  projectId: '9ldegek1',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETONS.includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'pl', title: 'Polish'},
      ],
      schemaTypes: ['heroPage', 'aboutMePage', 'skillsPage', 'experiencePage', 'project', 'uiStrings'],
    }),
  ],

  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu.
    templates: (templates: Template[]) =>
      templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },
}

export default defineConfig([
  {...base, name: 'production', title: 'Portfolio (production)', basePath: '/production', dataset: 'production'},
  {...base, name: 'development', title: 'Portfolio (development)', basePath: '/development', dataset: 'development'},
])
