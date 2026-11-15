import {defineField, defineType} from 'sanity'

/**
 * Interface texts (buttons, headings, labels, SEO) — one document per language.
 * Field names map 1:1 to next-intl message keys, e.g. `projects.viewDetails`.
 * Placeholders in curly braces (e.g. {year}, {number}) are filled in by the site — keep them.
 */

const str = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'string', description, validation: (r) => r.required()})

const txt = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'text', rows: 3, description, validation: (r) => r.required()})

const group = (
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[],
) =>
  defineField({
    name,
    title,
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields,
  })

export const uiStringsType = defineType({
  name: 'uiStrings',
  title: 'UI Strings',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    group('metadata', 'SEO / Metadata', [
      str('title', 'Site title'),
      txt('description', 'Site description'),
      str('projectsTitle', 'Projects page title'),
      txt('projectsDescription', 'Projects page description'),
      str('projectsImageAlt', 'Projects OG image alt'),
    ]),
    group('nav', 'Navigation', [
      str('home', 'Home'),
      str('projects', 'Projects'),
      str('openMenu', 'Mobile: open menu (screen readers)'),
      str('closeMenu', 'Mobile: close menu (screen readers)'),
    ]),
    group('hero', 'Hero', [
      str('viewProjects', '"View projects" button'),
      str('imageAlt', 'Image alt text'),
    ]),
    group('about', 'About', [str('heading', 'Heading')]),
    group('skills', 'Skills', [str('heading', 'Heading')]),
    group('timeline', 'Timeline', [
      str('heading', 'Heading'),
      str('professional', 'Professional tab'),
      str('education', 'Education tab'),
    ]),
    group('featuredProjects', 'Featured projects', [
      str('heading', 'Heading'),
      str('viewAll', '"View all" link'),
    ]),
    group('projects', 'Projects list', [
      str('heading', 'Heading'),
      txt('description', 'Description'),
      str('filterAll', '"All" filter'),
      str('viewDetails', '"View details" button'),
      str('noImage', 'No image placeholder'),
      str('confidential', 'Commercial project card label'),
      str('status', 'Status label'),
      str('completed', 'Status: completed'),
      str('inProgress', 'Status: in progress'),
    ]),
    group('projectDetail', 'Project detail', [
      str('details', 'Details card title'),
      str('projectType', 'Project type label'),
      str('timeline', 'Timeline label'),
      str('links', 'Links card title'),
      str('viewSourceCode', '"View source code" link'),
      str('visitLiveSite', '"Visit live site" link'),
      str('overview', 'Overview heading'),
      str('features', 'Features heading'),
      str('technicalDetails', 'Technical details heading'),
      str('challenges', 'Challenges heading'),
      str('outcome', 'Outcome heading'),
      str('previousImage', 'Gallery: previous image'),
      str('nextImage', 'Gallery: next image'),
      str('ndaNote', 'Commercial project note on project page'),
      str('imageAlt', 'Gallery image alt text'),
      str('goToImage', 'Gallery: go to image', 'Keep the {number} placeholder.'),
    ]),
    group('notFound', '404 page', [
      str('title', 'Title'),
      str('description', 'Description'),
      str('backToHome', '"Back to home" button'),
      str('goBack', '"Go back" button'),
    ]),
    group('footer', 'Footer', [
      str('designedBy', 'Credits'),
      str('emailLabel', 'Email icon label (screen readers)'),
      str('contactButton', 'Floating email button label (screen readers)'),
      str('allRightsReserved', 'Copyright', 'Keep the {year} placeholder.'),
    ]),
    group('localeSwitcher', 'Language switcher', [
      str('en', 'English label'),
      str('pl', 'Polish label'),
      str('label', 'Accessible label'),
    ]),
  ],
  preview: {
    select: {language: 'language'},
    prepare: ({language}) => ({title: 'UI Strings', subtitle: language?.toUpperCase()}),
  },
})
