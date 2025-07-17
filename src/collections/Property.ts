import { CollectionConfig } from 'payload'
import slugify from 'slugify'

const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'price', 'status'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title && !data.slug) {
          data.slug = slugify(data.title, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'The slug is automatically generated from the title if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return slugify(value, { lower: true, strict: true })
            if (data?.title) return slugify(data.title, { lower: true, strict: true })
            return value
          },
        ],
      },
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['available', 'occupied', 'under construction'],
      defaultValue: 'available',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'lat',
          type: 'number',
          required: true,
        },
        {
          name: 'lng',
          type: 'number',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: false,
      hasMany: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    // {
    //   name: 'agent',
    //   type: 'relationship',
    //   relationTo: 'agents',
    //   required: false,
    // },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
}

export default Properties
