import {defineType, defineField} from 'sanity'

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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skillCategory',
          title: 'Category',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'skills',
              title: 'Technologies',
              type: 'array',
              of: [{type: 'technology'}],
            }),
          ],
          preview: {
            select: {title: 'title', skills: 'skills'},
            prepare: ({title, skills}) => ({
              title,
              subtitle: (skills ?? []).map((s: {name: string}) => s.name).join(', '),
            }),
          },
        },
      ],
    }),
  ],
})
