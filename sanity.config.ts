import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Brew & Bean',

  projectId: 'nfr65h0c',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      {
        name: 'category',
        title: 'Category',
        type: 'document',
        fields: [
          { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 },
          { name: 'icon', title: 'Icon', type: 'string', description: 'Icon name from @sanity/icons' }
        ]
      },
      {
        name: 'menuItem',
        title: 'Menu Item',
        type: 'document',
        fields: [
          { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
          { name: 'description', title: 'Description', type: 'text', validation: (Rule: any) => Rule.required() },
          { name: 'price', title: 'Price', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
          { name: 'has3DModel', title: 'Has 3D Model', type: 'boolean', initialValue: false, description: 'Enable this to show AR preview' },
          { name: 'modelFileAndroid', title: '3D Model (Android - .glb)', type: 'file', hidden: ({ parent }: any) => !parent?.has3DModel, options: { accept: '.glb' }, description: 'Upload .glb file for Android AR (Scene Viewer)' },
          { name: 'modelFileIOS', title: '3D Model (iOS - .usdz)', type: 'file', hidden: ({ parent }: any) => !parent?.has3DModel, options: { accept: '.usdz' }, description: 'Upload .usdz file (keep under 2MB for best results - use modelconvert.com to compress)' },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'isAvailable', title: 'Available', type: 'boolean', initialValue: true },
          { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }
        ],
        preview: {
          select: { title: 'name', subtitle: 'price', media: 'image' }
        }
      },
      {
        name: 'siteSettings',
        title: 'Site Settings',
        type: 'document',
        fields: [
          { name: 'siteName', title: 'Site Name', type: 'string', validation: (Rule: any) => Rule.required() },
          { name: 'tagline', title: 'Tagline', type: 'string' },
          { name: 'established', title: 'Established Year', type: 'string' },
          { name: 'address', title: 'Address', type: 'text' },
          { name: 'phone', title: 'Phone', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'hours', title: 'Hours', type: 'array', of: [{ type: 'object', fields: [
            { name: 'day', type: 'string', title: 'Day' },
            { name: 'time', type: 'string', title: 'Time' }
          ]}]},
          { name: 'socialLinks', title: 'Social Links', type: 'array', of: [{ type: 'object', fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' }
          ]}]}
        ]
      }
    ],
  },
})
