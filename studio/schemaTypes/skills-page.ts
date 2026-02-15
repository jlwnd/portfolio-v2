import {defineType, defineField} from 'sanity'
import {technologyType} from './technology'

export const skillsPageType = defineType({
  name: 'skillsPage',
  title: 'Skills Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'skills',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'technology'}],
    }),
  ],
})
