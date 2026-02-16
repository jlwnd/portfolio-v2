import {defineField, defineType} from 'sanity'

export const aboutMePageType = defineType({
  name: 'aboutMePage',
  title: 'About Me Page',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
