import {defineType, defineField} from 'sanity'

export const technologyType = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'icon',
      title: 'Technology Icon (SVG only)',
      description: 'Optional. Without an icon, the first letters of the name are shown.',
      type: 'file',
      options: {
        accept: 'image/svg+xml',
      },
    }),
  ],
})
