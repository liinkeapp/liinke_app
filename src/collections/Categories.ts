import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'parent'],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug (Do not touch)',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.name) return slugify(data.name, { lower: true, strict: true })
            return value
          },
        ],
      },
    },
  ],
}
