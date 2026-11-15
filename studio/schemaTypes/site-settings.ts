import {defineField, defineType} from 'sanity'

/** Global, language-independent settings (singleton, _id: "siteSettings"). */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Shown in the navbar next to the logo.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({
      name: 'logo',
      title: 'Navbar logo',
      type: 'image',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image (OG)',
      type: 'image',
      description: 'Recommended 1200×630.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
